import { message } from '@/common/util';

/*
 * @Date: 2019-08-27 14:04:22
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-06-18 17:11:35
 */

const submitEventCallback = [];

message.on('_emitSubmit', () => {
  submitEventCallback.forEach(callbackItem => {
    const postData = callbackItem();
    if (postData) {
      // 调用native端的提交参数函数，将配置数据提交上去
      message.emit('postData', postData);
      // return new Promise(resolve => {
      //   message.emit('postData', postData);
      //   resolve({code: 200, data: {success: true}});
      // });
    }
  });
});

export default {
  onSubmit(callback) {
    if (submitEventCallback.indexOf(callback) <= -1) {
      submitEventCallback.push(callback);
    }
  },
};