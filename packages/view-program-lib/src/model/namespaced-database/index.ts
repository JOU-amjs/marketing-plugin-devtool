/*
 * @Date: 2020-04-11 21:13:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-21 16:09:55
 */
import { IGeneralObject } from '../../common/common.inter';
import { javaRequest } from '../../common/network';
import { getMode } from '../../common/util';
import globalData from '../global-data';
import argsConverters from './args-converters';
import {
  collectionForbiddenCalledFns,
  dbForbiddenCalledFns
} from './forbidden-called-fns';
import responseConvert from './response-convert';

type IAnyObject = IGeneralObject<any>;


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
function createCollectionProxy(collectionName: string, activityId: string) {
  let proxyObject: IAnyObject = { collection: collectionName };
  const collectionProxyedPromise = createProxyedPromise(proxyObject, {
    get(target: IAnyObject, key: string) {
      let exceptionstring = collectionForbiddenCalledFns[key];
      if (typeof exceptionstring === 'string') {
        throw new Error(exceptionstring);
      }
      
      return (...args: any[]) => {
        let convertFn = argsConverters[key as keyof typeof argsConverters] || ((val: any[]) => val);
        target[key] = convertFn(args);
        return collectionProxyedPromise;
      };
    },
  }, (resolve, reject) => {
    // 设置一个异步触发器，进行自动触发请求操作
    setTimeout(() => {
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
        javaRequest({
          url: '/mongo/collections/operation', 
          method: 'post',
          data: {
            activityId,
            pluginId: globalData.get<string>('pluginId'),
            env: getMode() === 'plugin-dev' ? 1 : 2,
            db: proxyObject,
          },
        }).then(({ data }) => {
          if (data.code !== 200) {
            reject(new Error(data.msg));
            return;
          }
          
          resolve(responseConvert(data.data));
        }, rej => reject(rej));
      }
      else {
        resolve({ activityId, db: proxyObject });
      }
    });
  });
  return collectionProxyedPromise;
}

export default function createNamespacedDatabase(activityId: string) {
  return new Proxy({}, {
    get(_: IAnyObject, key: string) {
      let exceptionstring = dbForbiddenCalledFns[key];
      if (typeof exceptionstring === 'string') {
        throw new Error(exceptionstring);
      }
      
      return createCollectionProxy(key, activityId);
    },
  });
}