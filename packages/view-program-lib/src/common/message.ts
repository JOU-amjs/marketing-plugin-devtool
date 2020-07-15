/*
 * @Date: 2020-07-14 10:30:25
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 10:56:42
 */
import { IGeneralObject } from './common.inter';

type TCallbackFn = (...args: any[]) => void;
 
// 开发环境下，与父子页面之间的通信机制
let receiver: Window | null;
const fnCollection: IGeneralObject<TCallbackFn> = {};
export const message = {
  init(originReceive: Window | null) {
    if (!originReceive) {
      return;
    }
    receiver = originReceive;
    window.addEventListener('message', event => {
      const data = event.data as { name: string, args: any[] };
      const emitFn = fnCollection[data.name];
      if (emitFn) {
        emitFn.apply(null, data.args);
      }
    });
  },
  on(name: string, fn: TCallbackFn) {
    if (typeof fn === 'function' && typeof name === 'string') {
      fnCollection[name] = fn;
    }
  },
  emit(name: string, ...args: any[]) {
    if (receiver) {
      receiver.postMessage({ name, args }, '*');
    }
  },
};