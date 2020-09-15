import { message } from '@/common/util';

/*
 * @Date: 2019-08-27 14:04:22
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 20:30:34
 */

let submitEventCallback = null;

message.on('_emitSubmit', async () => {
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
    message.emit('postData', postData);
  }
});

export default {
  onSubmit(callback) {
    if (typeof callback === 'function') {
      submitEventCallback = callback;
    }
  },
};