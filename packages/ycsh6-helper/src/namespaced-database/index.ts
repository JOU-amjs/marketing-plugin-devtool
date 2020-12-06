/*
 * @Date: 2020-04-11 21:13:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-01 13:09:13
 */
import { IGeneralObject } from '../../typings/common';
import argsConverters from './args-converters';
import {
  collectionForbiddenCalledFns,
  dbForbiddenCalledFns
} from './forbidden-called-fns';
import responseConvert from './response-convert';
import assert from '../common/assert';

type IAnyObject = IGeneralObject<any>;
type TRequestFn = (proxyObject: IAnyObject) => any;

/**
 * @description: 对promise对象进行改造，使它支持Proxy的功能，并返回此对象
 * @author: JOU(wx: huzhen555)
 * @return: 带有Proxy功能的promise对象
 */
function createProxyedPromise<R>(target: IAnyObject, handler: ProxyHandler<object>, executor: (
  resolve: (value?: R) => void, 
  reject: (reason?: any) => void
) => void) {
  let protoProxy = new Proxy(target, handler);
  Object.setPrototypeOf(Promise.prototype, protoProxy);
  return new Promise<R>(executor);
}

/**
 * @description: 创建一个collection的代理对象
 * @author: JOU(wx: huzhen555)
 * @return: proxy对象
 */
function createCollectionProxy(collectionName: string, sendRequest: TRequestFn) {
  let proxyObject: IAnyObject = { collection: collectionName };
  const collectionProxyedPromise = createProxyedPromise(proxyObject, {
    get(target: IAnyObject, key: string) {
      let exceptionstring = collectionForbiddenCalledFns[key];
      assert(typeof exceptionstring !== 'string', exceptionstring);
      
      return (...args: any[]) => {
        let convertFn = argsConverters[key as keyof typeof argsConverters] || ((val: any[], _: IAnyObject) => val);
        target[key] = convertFn(args, target);
        return collectionProxyedPromise;
      };
    },
  }, (resolve, reject) => {
    // 设置一个异步触发器，进行自动触发请求操作
    setTimeout(() => {
      sendRequest(proxyObject).then((resp: any) => {
        // 测试时使用，如果返回的数据为proxyObject本身则直接返回
        if (resp === proxyObject) {
          resolve(resp);
          return;
        }
        let data = resp.data;
        if (data.code !== 200) {
          reject(new Error(data.msg));
          return;
        }
        resolve(responseConvert(data.data));
      }, (rej: any) => reject(rej));
    });
  });
  return collectionProxyedPromise;
}

export default function createNamespacedDatabase(sendRequest: TRequestFn) {
  return new Proxy({}, {
    get(_: IAnyObject, key: string) {
      let exceptionstring = dbForbiddenCalledFns[key];
      if (typeof exceptionstring === 'string') {
        throw new Error(exceptionstring);
      }
      
      return createCollectionProxy(key, sendRequest);
    },
  });
}