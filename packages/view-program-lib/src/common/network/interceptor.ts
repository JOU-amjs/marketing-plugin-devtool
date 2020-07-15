/*
 * @Date: 2020-05-28 10:45:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 15:29:16
 */
import { AxiosInstance } from 'axios';
import { getEnvironment, createApiSign } from '../util';
import globalData from '../../model/global-data';
import qs from 'qs';

 
// 客户端每个接口需要统一传以下参数：
// 1. timestamp：时间戳，用来验证接口调用时效性的
// 2. sign：接口参数加密串，用来服务端安全验证的，算法可以看上面的截图
// 3. platform：请求来源，商户端可以传mpWx或mpAlipay
export default function (request: AxiosInstance) {
  request.interceptors.request.use(config => {
    const 
      platform = getEnvironment(),
      accessToken = globalData.get<string>('accessToken') || '',
      timestamp = Date.parse(new Date().toString()) / 1000;

    let method = config.method || 'get', args;
    if (/^put|post|patch|delete$/i.test(method)) {
      args = config.data = config.data || {};
    }
    else {
      args = config.params = config.params || {};
    }

    Object.assign(args, { platform, timestamp });
    args.sign = createApiSign(args);

    if (/^put|post|patch|delete$/i.test(method)) {
      config.data = qs.stringify(args);
    }
    
    // 添加headers
    if (accessToken) {
      config.headers[method.toLowerCase() || 'get']['x-access-token'] = accessToken;
    }
    
    return config;
  },
  error => {
    Promise.reject(error);
  });

  // response拦截器
  request.interceptors.response.use(response => {
    if (response.status === 200) {
      //当返回的相应中有code才做进一步判断
      if (response.data.code === 200) {
        return response;
      }
      else {
        console.log('数据返回了非200状态 ==> ', response.data);
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
}