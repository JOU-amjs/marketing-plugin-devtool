/*
 * @Date: 2020-07-15 13:36:48
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 13:38:22
 */
import { javaRequest } from '.';
import { IResponse, IInteractEchoData } from '../common.inter';

 
/**
 * @description: 根据echoKey获取回传数据，并在获取后通知服务端已获取到
 * @author: JOU(wx: huzhen555)
 * @param {string} echoKey 回传key
 * @return: 带回传数据的promise
 */
export default function<T>(echoKey: string) {
  return new Promise<T>((resolve, reject) => {
    if (!echoKey) {
      reject('echoKey不能为空');
      return;
    }
    
    let timer = setInterval(async () => {
      let { data } = await javaRequest.get<IResponse<IInteractEchoData<T>>>('/user/interact/get', {
        params: { key: echoKey },
      });
      let echoData = data.data;
      if (data.code !== 200 || !echoData) {
        return;
      }
      
      // 通知回传数据获取成功
      javaRequest.get<IResponse<any>>('/user/interact/notify', {
        params: { key: echoKey },
      });
      
      clearInterval(timer);
      if (echoData.exception) {
        reject(echoData.exception);
      }
      else {
        resolve(echoData.response);
      }
    }, 1500);
  });
}