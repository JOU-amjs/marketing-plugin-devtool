/*
 * @Date: 2020-04-10 09:27:48
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-01 13:10:04
 */
// 任何自定义的对象
export interface IGeneralObject<T> {
  [attr: string]: T;
}
export type TBaseType = String|Number|Function|Boolean|Object|Symbol;

// 提取一个对象值的类型集合
export type TMapValues<T> = T[keyof T];

// 通用的返回数据接口
export interface IResponse<T> {
  code: number,
  data: T,
  msg: string,
}

// 通用的交互数据接口
// 交互传输数据
export interface IInteractData {
  intent: string,
  args: IGeneralObject<string|number>,
}

// 交互回传数据
export interface IInteractEchoData<T> {
  exception: string,
  response: T,
}