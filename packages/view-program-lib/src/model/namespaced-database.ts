/*
 * @Date: 2020-04-11 21:13:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 10:24:25
 */
import { IGeneralObject } from '../common/common.inter';
import { javaRequest } from '../common/network';

type IStringObject = IGeneralObject<string>;
type IAnyObject = IGeneralObject<any>;
const 
  commonWord = (name: string) => `forbidden call function \`${name}\``,
  collectionForbiddenCalledFns: IStringObject = {
    drop: commonWord('drop') + ', instead you can delete collection by editing property `database` in plugin.js',
  };



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
        target[key] = args;
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
            db: proxyObject,
          },
        }).then(res => resolve(res), rej => reject(rej));
      }
      else {
        resolve({ activityId, db: proxyObject });
      }
    });
  });
  return collectionProxyedPromise;
}

const dbForbiddenCalledFns: IStringObject = {
  dropDatabase: commonWord('dropDatabase'),
  createDatabase: commonWord('createDatabase'),
  createCollection: commonWord('createCollection') + ', collections will create automatically when uploading',
};
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