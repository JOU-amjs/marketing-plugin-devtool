/*
 * @Date: 2020-05-29 09:30:15
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-11 21:26:09
 */
import { request } from '.';
import { IGeneralObject, IResponse } from '../common.inter';
import globalData from '../../model/global-data';

type TViewProgrammeOptions = {
  name: 'giveCoupon'|'getCouponInfo'|'getUserInfo'|'getShopInfo'|'getConfiguration'|'subscribeMessage'|'unifiedorder'|'notifyMessage',
  data?: IGeneralObject<any>,
};

/**
 * @description: 调用服务端ViewProgramme相关方法的统一处理函数
 * @author: JOU(wx: huzhen555)
 * @param {TViewProgrammeOptions} options 调用视图函数的参数
 * @return: 包含响应数据的promise
 */
export default async function<T>(options: TViewProgrammeOptions) {
  let activityId = globalData.get<string>('activityId');
  let shopId = globalData.get<string>('shopId');
  let { data } = await request.post<IResponse<T>>('/v1/call_viewprogramme_function', {
    activityId,
    shopId,
    ...options,
  });
  if (data.code !== 200) {
    throw new Error(`[ViewProgramServerError]${data.msg}`);
  }
  return data.data;
}