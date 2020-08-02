/*
 * @Date: 2020-07-21 16:05:41
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-21 16:07:26
 */ 

import { IGeneralObject } from '../../common/common.inter';

type IStringObject = IGeneralObject<string>;

// 数据集合层面禁止调用的函数
const commonWord = (name: string) => `forbidden call function \`${name}\``;
export const collectionForbiddenCalledFns: IStringObject = {
  drop: commonWord('drop') + ', instead you can delete collection by editing property `database` in plugin.js',
};

// 数据库层面禁止调用的函数
export const dbForbiddenCalledFns: IStringObject = {
  dropDatabase: commonWord('dropDatabase'),
  createDatabase: commonWord('createDatabase'),
  createCollection: commonWord('createCollection') + ', collections will create automatically when uploading',
};