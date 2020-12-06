/*
 * @Date: 2020-07-14 15:56:52
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-01 13:15:36
 */ 
import { TBaseType } from '../../typings/common';

let errorPrefix = 'assert';

function assert(val: any, message?: string) {
  if (!val) {
    throw new Error(`[${errorPrefix}]${message || '参数断言失败'}`);
  }
}

assert.notNull = function(val: any, message?: string) {
  assert(val !== null && val !== undefined, message || '参数不能为空');
}

assert.match = function(val: any, reg: RegExp, message?: string) {
  assert(reg.test(val), message || '参数与指定正则表达式不匹配');
},
assert.equal = function(val: any, equalVal: any, message?: string) {
  assert(val === equalVal, message || '参数与指定参数不相等');
},
assert.equalType = function(val: any, type: TBaseType|TBaseType[], message?: string) {
  let typeAry = Array.isArray(type) ? type : [type];
  let equalPass = false;
  for (let i in typeAry) {
    if (typeAry[i] === val?.constructor) {
      equalPass = true;
      break;
    }
  }
  assert(equalPass, message || '参数与指定类型不匹配');
}

export default assert;