/*
 * @Date: 2019-08-24 13:23:44
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-05 20:55:47
 */
import md5 from 'js-md5';

// 用于保存全局本地数据的对象
export const localDataMap = {
  inited: false,
  data: {},
  get(key) {
    const data = this.data;
    if (!this.inited) {
      // 初始化，接收url中的参数并保存
      // 解析url并将数据保存到localDataMap中
      const query = {};
      (window.location.href.match(/\?(.*)$/) || ['', ''])[1]
      .split('&').forEach(param => {
        const keyVal = param.split('=');
        if (keyVal.length === 2) {
          query[keyVal[0]] = keyVal[1];
        }
      });
      // 请求服务时accessToken需要添加都header中
      data.accessToken = query.accessToken;
      // rootUrl为请求的根域名
      data.rootUrl = query.rootUrl;
      data.signKey = query.signKey || '';
      data.connectSymbol = query.connectSymbol || '';
      data.platform = query.platform;
      data.shopId = query.shopId;
      delete query.accessToken;
      delete query.rootUrl;
      delete query.signKey;
      delete query.connectSymbol;
      delete query.platform;
      delete query.shopId;
      // query为剩余的请求参数了
      data.query = query;
      this.inited = true;
    }
    return data[key];
  },
  set(key, value) {
    this.data[key] = value;
  }
};

/**
 * 创建api提交的sign参数（签名）
 *
 * @author JOU
 * @time   2019-08-24T13:29:31+0800
 * @param  {object}                 params 用于签名的params
 */
export function createSign(params) {
  const rawsign = Object.keys(params)
  .sort().map(key => `${key}=${params[key]}`)
  .join(localDataMap.get('connectSymbol')) + localDataMap.get('signKey');
  return md5(rawsign);
}

// 开发环境下，与父子页面之间的通信机制
let receiver;
const fnCollection = {};
export const message = {
  init() {
    receiver = window.parent;
    window.addEventListener('message', event => {
      const data = event.data;
      const emitFn = fnCollection[data.name];
      if (emitFn) {
        emitFn.apply(null, data.args);
      }
    });
  },
  on(name, fn) {
    if (typeof fn === 'function' && typeof name === 'string') {
      fnCollection[name] = fn;
    }
  },
  emit(name, ...args) {
    receiver.postMessage({
      name,
      args,
    }, '*');
  },
};