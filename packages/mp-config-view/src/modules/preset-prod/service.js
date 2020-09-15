/*
 * @Date: 2019-08-26 19:22:14
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-15 18:27:21
 */
import invoke from 'react-native-webview-invoke/browser';

// postData：参数为需要提交的配置参数
// _emitSubmit：触发onSubmit事件回调
let submitEventCallback = null;
// const postDataCallbacks = {};
// /**
//  * @description: native端选择数据后触发此函数将选择数据传递给web端
//  * @param {any}   data native端回传给web端的数据 
//  * @return: void
//  */
// invoke.define('_emitSubmited', (id, status, dataOrReason) => {
//   const postCallback = postDataCallbacks[id];
//   if (postCallback) {
//     postCallback[status](dataOrReason);
//   }
// });

/**
 * @description: native端点击“提交参数”后调用此函数来触发onSumbmit回调
 * @return: void
 */
invoke.define('_emitSubmit', async () => {
  if (submitEventCallback) {
    let postData = { code: 200, data: undefined, message: '' };
    try {
      let retData = await submitEventCallback();
      if (retData === undefined || retData === false || retData === null) {
        return;
      }
      postData.data = retData;
    } catch (error) {
      postData.code = 500;
      postData.message = error.message;
    }
    invoke.fn.postData(postData);
  }
  // submitEventCallback.forEach(callbackItem => {
  //   const postData = callbackItem();
  //   if (postData) {
  //     // 调用native端的提交参数函数，将配置数据提交上去
  //      // 随机生成10000以内的随机数再加上时间戳，不重复即可
  //     // const callingId = Date.now() + Math.floor(Math.random() * 10000);
  //     invoke.fn.postData(postData);
  //     // return new Promise((resolve, reject) => {
  //     //   // alert(Object.keys(invoke));
  //     //   invoke.fn.postData(postData, callingId);
  //     //   postDataCallbacks[callingId] = {
  //     //     success: resData => resolve(resData),
  //     //     fail: reason => reject(reason),
  //     //   };
  //     // });
  //   }
  // });
});

export default {
  /**
   * @description: 绑定配置页提交按钮的点击事件回调，通过该回调返回保存的配置数据，抛出错误则会弹出警告弹框
   * @author: JOU(wx: huzhen555)
   * @param {function} callback 配置页提交按钮的点击事件回调
   */
  onSubmit(callback) {
    if (typeof callback === 'function') {
      submitEventCallback = callback;
    }
  },

  // /**
  //  * @description: 调用native端的提交参数函数，将配置数据提交上去
  //  * @param {any} data 待提交的参数
  //  * @return: Promise对象
  //  */
  // postData(data) {
  //   const id = Date.now() + Math.floor(Math.random() * 10000);  // 随机生成10000以内的随机数
  //   return new Promise((resolve, reject) => {
  //     // alert(Object.keys(invoke));
  //     invoke.fn.postData(data, id);
  //     postDataCallbacks[id] = {
  //       success: resData => resolve(resData),
  //       fail: reason => reject(reason),
  //     };
  //   });
  // },
};