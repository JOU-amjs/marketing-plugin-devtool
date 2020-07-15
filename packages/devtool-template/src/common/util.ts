/*
 * @Date: 2019-08-27 15:08:10
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 14:50:16
 */

import { IGeneralObject } from './common.inter';

/**
 * @description: 解析url中的参数
 * @author: JOU(wx: huzhen555)
 * @param {string} url 待解析的url
 * @return: 解析后的参数对象
 */
export function parseUrlParams(url: string) {
  let params: IGeneralObject<string> = {};
  (url.match(/\?(.*)$/) || ['', ''])[1]
  .split('&').forEach(param => {
    const keyVal = param.split('=');
    if (keyVal.length === 2) {
      params[keyVal[0]] = keyVal[1];
    }
  });
  return params;
}