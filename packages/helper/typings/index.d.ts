/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-26 15:32:43
 */
import { IGeneralObject } from '../src/common/common.inter';
import { TBaseType } from '../src/common/assert';

type TRequestFn = (proxyObject: IGeneralObject<any>) => any;

export function createNamespacedDatabase(sendRequest: TRequestFn): Promise<any>;
export function assert(val: any, message?: string | undefined): void;
export namespace assert {
  function notNull(val: any, message?: string): void;
  function match(val: any, reg: RegExp, message?: string): void;
  function equal(val: any, equalVal: any, message?: string): void;
  function equalType(val: any, type: TBaseType|TBaseType[], message?: string): void;
}