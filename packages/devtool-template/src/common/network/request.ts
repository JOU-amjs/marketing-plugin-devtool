/*
 * @Date: 2020-07-13 17:41:36
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-20 17:00:36
 */ 
import axios, { AxiosRequestConfig } from 'axios';
import { javaHost, accessToken } from '../config';

function requestFilter(config: AxiosRequestConfig) {
  config.headers = {
    ...(config.headers || {}),
    'Content-Type': 'application/json;charset=UTF-8',
    'x-access-token': accessToken,
  };
  return config;
}

export const localhostRequest = axios.create({
  timeout: 30000, // 请求超时时间
});
localhostRequest.interceptors.request.use(requestFilter);


export const javaRequest = axios.create({
  baseURL: javaHost,
  timeout: 30000, // 请求超时时间
});
javaRequest.interceptors.request.use(requestFilter);