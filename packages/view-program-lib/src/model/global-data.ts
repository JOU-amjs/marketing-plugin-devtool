/*
 * @Date: 2020-04-11 22:26:41
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-05-28 17:44:55
 */

import { IGeneralObject } from '../common/common.inter';

/** 全局存储对象，如存储get参数、运行环境等 */
const data: IGeneralObject<any> = {};
function setItem(key: string, val: any) {
  if (val) {
    data[key] = val;
  }
  else {
    delete data[key];
  }
}

export default {

  /**
   * @description: 设置全局存储值的函数，可通过传入一个对象保存多个值
   * 存储相同的key会覆盖前一个值
   * @author: JOU(wx: huzhen555)
   * @param {string|object}    keyOrObject  作为`key`时为string；作为多个key/value集合时为object
   * @param {any}   val 存储的值
   * @return: void
   */
  set(keyOrObject: string|IGeneralObject<any>, val?: any) {
    const map = typeof keyOrObject === 'object' ? keyOrObject : { [keyOrObject]: val };
    for (const key in map) {
      setItem(key, map[key]);
    }
  },

  /**
   * @description: 获取对应key的值，没有则返回undefined
   * @author: JOU(wx: huzhen555)
   * @param {string}   key 键
   * @return: any 保存的值
   */
  get<T>(key: string) {
    const typeOfKey = typeof key;
    if (typeOfKey === 'string' || typeOfKey === 'number') {
      return data[key] as T;
    }
  }
};