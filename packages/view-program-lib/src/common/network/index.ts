/*
 * @Date: 2020-04-11 22:44:36
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 15:11:07
 */
import axios from 'axios';
import { host, javaHost } from '../config';
import interceptor from './interceptor';

export const request = axios.create({
  baseURL: host, // api的base_url
  timeout: 30000,   // 请求超时时间
});
interceptor(request);


export const javaRequest = axios.create({
  baseURL: javaHost, // api的base_url
  timeout: 30000,   // 请求超时时间
});
interceptor(javaRequest);