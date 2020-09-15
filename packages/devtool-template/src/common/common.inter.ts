/*
 * @Date: 2020-07-07 19:15:21
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 20:37:09
 */ 

// 任何自定义的对象
export interface IGeneralObject<T> {
  [attr: string]: T;
};

// 提取一个对象值的类型集合
export type TMapValues<T> = T[keyof T];

// 服务端返回数据格式
export interface IResponse<T> {
  code: number,
  data: T,
  message?: string,
}