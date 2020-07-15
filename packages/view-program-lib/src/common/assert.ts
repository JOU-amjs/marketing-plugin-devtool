/*
 * @Date: 2020-07-14 15:56:52
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 16:14:12
 */ 
type TBaseType = String|Number|Function|Boolean|Object|Symbol;
let errorPrefix = 'assert';
export default class Assert {
  static notNull(val: any, message?: string) {
    if (val === null || val === undefined) {
      throw new Error(`[${errorPrefix}]${message || '参数不能为空'}`);
    }
  }

  static match(val: any, reg: RegExp, message?: string) {
    if (!reg.test(val)) {
      throw new Error(`[${errorPrefix}]${message || '参数与指定正则表达式不匹配'}`);
    }
  }

  static equal(val: any, equalVal: any, message?: string) {
    if (val !== equalVal) {
      throw new Error(`[${errorPrefix}]${message || '参数与指定参数不相等'}`);
    }
  }

  static equalType(val: any, type: TBaseType|TBaseType[], message?: string) {
    let typeAry = Array.isArray(type) ? type : [type];
    let equalPass = false;
    for (let i in typeAry) {
      if (typeAry[i] === val?.constructor) {
        equalPass = true;
        break;
      }
    }
    if (!equalPass) {
      throw new Error(`[${errorPrefix}]${message || '参数与指定类型不匹配'}`);
    }
  }
}