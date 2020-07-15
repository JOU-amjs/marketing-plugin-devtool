/*
 * @Date: 2019-08-27 15:08:10
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-04 14:22:13
 */
// 开发环境下，与父子页面之间的通信机制
let receiver;
const fnCollection = {};
export const message = {
  init(originReceive) {
    receiver = originReceive;
    window.addEventListener('message', event => {
      const data = event.data;
      const emitFn = fnCollection[data.name];
      if (emitFn) {
        emitFn.apply(null, data.args);
      }
    });
  },
  on(name, fn) {
    if (typeof fn === 'function' && typeof name === 'string') {
      fnCollection[name] = fn;
    }
  },
  emit(name, ...args) {
    receiver.postMessage({ name, args }, '*');
  },
};