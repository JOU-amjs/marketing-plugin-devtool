/*
 * @Date: 2020-07-14 14:52:35
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 14:53:45
 */ 
export default class Assert {
  static notNull(val: any) {
    if (val === null || val === undefined) {
      throw new Error('[assert]参数不能为空');
    }
  }
}