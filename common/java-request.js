/*
 * @Date: 2020-07-17 22:14:52
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 12:48:04
 */ 
const axios = require('axios').default;
const { host, apiSign } = require('../config');
const FormData = require('form-data');
const hash = require('crypto').createHash('md5');


const javaRequest = axios.create({
  baseURL: host,
});

/**
 * @description: 创建接口的签名，签名会自动过滤没有值的参数
 * @author: JOU(wx: huzhen555)
 * @param {object}  params 需要加密签名的数据对象
 * @return: 签名
 */
function createApiSign(params = {}) {
  const rawStr = Object.keys(params).sort()
  .map(key => params[key] !== undefined ? `${key}=${params[key]}` : undefined)
  .filter(item => item)
  .join(apiSign.connectSymbol) + apiSign.key;
  return hash.update(rawStr).digest('hex');
}

// request拦截器
// 客户端每个接口需要统一传以下参数：
// 1. timestamp：时间戳，用来验证接口调用时效性的
// 2. sign：接口参数加密串，用来服务端安全验证的，算法可以看上面的截图
javaRequest.interceptors.request.use(config => {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  let method = (config.method || 'get').toLowerCase(), args;
  if (/^put|post|patch|delete$/i.test(method)) {
    args = config.data = config.data || {};
  }
  else {
    args = config.params = config.params || {};
  }

  let assignObj = { timestamp };
  Object.assign(args, assignObj);
  // 如果type为formData，增使用FormData对象替代data
  if (config.type === 'formData') {
    const formData = new FormData();
    const signMap = {};
    Object.keys(args).forEach(fieldName => {
      let value = args[fieldName];
      formData.append(fieldName, value);
      if (/number|string/.test(typeof value)) {
        signMap[fieldName] = value;
      }
    });
    formData.append('sign', createApiSign(signMap));
    config.data = formData;
    Object.assign(config.headers || {}, formData.getHeaders());
  }
  else {
    args.sign = createApiSign(args);
  }
  
  return config;
},
error => {
  Promise.reject(error);
});

// response拦截器
javaRequest.interceptors.response.use(response => {
  if (response.status === 200) {
    //当返回的相应中有code才做进一步判断
    if (response.data.code === 200) {
      return response.data;
    }
    else {
      return Promise.reject(new Error(response.data.msg));
    }
  }
  else {
    //错误的响应码交由ErrorHandler处理
    return Promise.reject(response);
  }
},
error => {
  //返回的异常统一交由错误处理器决定处理
  return Promise.reject(error.response);
});


module.exports = javaRequest;