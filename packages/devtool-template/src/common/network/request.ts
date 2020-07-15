/*
 * @Date: 2020-07-13 17:41:36
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 17:24:58
 */ 
import axios from 'axios';
export default axios.create({
  timeout: 30000, // 请求超时时间
});