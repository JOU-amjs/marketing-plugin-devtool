/*
 * @Date: 2020-07-13 17:41:36
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:30:01
 */ 
import axios from 'axios';
const request = axios.create({
  timeout: 30000, // 请求超时时间
});
request.interceptors.request.use(config => {
  config.headers = {
    ...(config.headers || {}),
    'Content-Type': 'application/json;charset=UTF-8',
  };
  return config;
});

export default request;