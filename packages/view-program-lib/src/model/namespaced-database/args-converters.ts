/*
 * @Date: 2020-07-21 15:55:33
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-21 16:03:53
 */

import assert from '../../common/assert';

const converterErrors = {
  argsLength(length: number) {
    return `function insert expected 1 arg bug got ${length}`;
  },
}

// 方法转换函数
// 如果此集合中定义了指定方法名的转换函数，则使用此方法处理一遍值
export default {
  insert(val: any[]) {
    assert(val.length === 1, converterErrors.argsLength(val.length));
    val[0] = Array.isArray(val[0]) ? val[0] : [val[0]];
    return val;
  },
  limit(val: any[]) {
    assert(val.length === 1, converterErrors.argsLength(val.length));
    return val[0];
  },
  skip(val: any[]) {
    assert(val.length === 1, converterErrors.argsLength(val.length));
    return val[0];
  }
};