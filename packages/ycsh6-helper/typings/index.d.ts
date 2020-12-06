/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-19 15:53:26
 */
import { IGeneralObject, TBaseType } from './common';

type TRequestFn = (proxyObject: IGeneralObject<any>) => any;

/** namespace-database */
export function createNamespacedDatabase(sendRequest: TRequestFn): Promise<any>;

/** assert.ts */
export function assert(val: any, message?: string | undefined): void;
export namespace assert {
  function notNull(val: any, message?: string): void;
  function match(val: any, reg: RegExp, message?: string): void;
  function equal(val: any, equalVal: any, message?: string): void;
  function equalType(val: any, type: TBaseType|TBaseType[], message?: string): void;
}

/** util.ts */
export class ApiSign {
  private connectSymbol: string;
  private key: string;
  constructor(connectSymbol: string, key: string);
  create(params: IGeneralObject<any>): string;
}
export function buildAssetsPath(
  type: 'avatar'|'homepage'|'program'|'dishes'|'dishes-category'|'theme', 
  path: string,
  fillDir?: string
): string;

/** ts-md5 */
export declare class md5 {
  static hashStr(str: string, raw?: boolean): string | Int32Array;
  static hashAsciiStr(str: string, raw?: boolean): string | Int32Array;
  private static stateIdentity;
  private static buffer32Identity;
  private static hexChars;
  private static hexOut;
  private static onePassHasher;
  private static _hex;
  private static _md5cycle;
  private _dataLength;
  private _bufferLength;
  private _state;
  private _buffer;
  private _buffer8;
  private _buffer32;
  constructor();
  start(): this;
  appendStr(str: string): this;
  appendAsciiStr(str: string): this;
  appendByteArray(input: Uint8Array): this;
  getState(): {
      buffer: any;
      buflen: number;
      length: number;
      state: number[];
  };
  setState(state: any): void;
  end(raw?: boolean): string | Int32Array;
}