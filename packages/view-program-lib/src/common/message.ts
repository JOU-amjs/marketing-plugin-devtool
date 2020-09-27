/*
 * @Date: 2020-07-14 10:30:25
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-23 10:35:56
 */
import { IGeneralObject } from './common.inter';

type TCallbackFn = (...args: any[]) => void;
 
// 开发环境下，与父子页面之间的通信机制
let receiver: Window | null;
const fnCollection: IGeneralObject<{once: boolean, fn: TCallbackFn}> = {};
const onFn = (name: string, fn: TCallbackFn, once = false) => {
  if (typeof fn === 'function' && typeof name === 'string') {
    fnCollection[name] = {
      once: false,
      fn,
    };
  }
}
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
        emitFn.fn.apply(null, data.args);
        // 如果为一次性监听则触发后删除
        if (emitFn.once) {
          delete fnCollection[data.name];
        }
      }
    });
  },
  on(name: string, fn: TCallbackFn) {
    onFn(name, fn);
  },
  once(name: string, fn: TCallbackFn) {
    onFn(name, fn, true);
  },
  emit(name: string, ...args: any[]) {
    if (receiver) {
      receiver.postMessage({ name, args }, '*');
    }
  },
};