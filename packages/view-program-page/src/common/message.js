/*
 * @Date: 2020-07-14 10:30:25
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 10:36:14
 */ 
// 开发环境下，与父子页面之间的通信机制
let receiver;
const fnCollection = {};
export default {
  init() {
    receiver = window.parent;
    window.addEventListener('message', event => {
      const data = event.data;
      const emitFn = fnCollection[data.name];
      if (emitFn) {
        emitFn(...data.args);
      }
    });
  },
  on(name, fn) {
    if (typeof fn === 'function' && typeof name === 'string') {
      fnCollection[name] = fn;
    }
  },
  emit(name, ...args) {
    receiver.postMessage({
      name,
      args,
    }, '*');
  },
};