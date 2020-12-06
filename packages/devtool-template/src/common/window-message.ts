import { assert } from 'ycsh6-helper';
import { IGeneralObject } from '@/common/common.inter';

/*
 * @Date: 2020-07-14 14:50:05
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-30 20:30:00
 */ 
type TCallbackFn = (...args: any[]) => void;

// 开发环境下，与父子页面之间的通信机制
export default class WindowMessage {
  static messages: IGeneralObject<WindowMessage> = {};
  private receiver: Window | null;
  private fnCollection: IGeneralObject<TCallbackFn> = {};
  constructor(originReceive: Window | null, name: string) {
    assert.notNull(originReceive);
    this.receiver = originReceive;
    window.addEventListener('message', event => {
      const data = event.data;
      const emitFn = this.fnCollection[data.name];
      if (emitFn) {
        emitFn(...data.args);
      }
    });
    WindowMessage.messages[name] = this;
  }

  // 绑定消息事件
  on(name: string, fn: TCallbackFn) {
    if (typeof fn === 'function' && typeof name === 'string') {
      this.fnCollection[name] = fn;
    }
  }

  // 触发消息事件
  emit(name: string, ...args: any[]) {
    this.receiver?.postMessage({ name, args }, '*');
  }

  // 根据名称获取对应的WindowMessage对象
  static getWindowMessage(name: string) {
    return this.messages[name] ? this.messages[name] : null;
  }
}