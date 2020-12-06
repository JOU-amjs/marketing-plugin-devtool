/*
 * @Date: 2020-07-21 15:55:33
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-01 13:15:47
 */

import assert from '../common/assert';
import { IGeneralObject } from '../../typings/common';
type IAnyObject = IGeneralObject<any>;

const converterErrors = {
  argsLength(fnName: string, length: number) {
    return `function ${fnName} expected 1 arg bug got ${length}`;
  },
}

// 方法转换函数
// 如果此集合中定义了指定方法名的转换函数，则使用此方法处理一遍值
export default {
  insert(val: any[], _: IAnyObject) {
    assert(val.length === 1, converterErrors.argsLength('insert', val.length));
    val[0] = Array.isArray(val[0]) ? val[0] : [val[0]];
    return val;
  },
  limit(val: any[], _: IAnyObject) {
    assert(val.length === 1, converterErrors.argsLength('limit', val.length));
    return val[0];
  },
  skip(val: any[], _: IAnyObject) {
    assert(val.length === 1, converterErrors.argsLength('skip', val.length));
    return val[0];
  },
  sync: (_: any[], target: IAnyObject) => {
    assert(Object.keys(target).length === 1 && target.collection, 'function sync must call after collection name');
    return true;
  },
};