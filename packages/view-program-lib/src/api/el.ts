/*
 * @Date: 2020-04-09 16:17:20
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-13 17:25:09
 */

import {
  navigateTo,
  getInteractKey,
  formatTime,
  getPlatform,
  getMPPath
} from '../common/util';
import { IGeneralObject } from '../common/common.inter';
import { MP_WEIXIN, MP_ALIPAY } from '../common/constant';
import { TShareMessage } from '../page';
import callServerFunction from '../common/network/call-server-function';
import globalData from '../model/global-data';
import assert from '../common/assert';
import getEchoData from '../common/network/get-echo-data';
import { tmplCodeMap } from '../common/config';

const interactPage = '/pages/interact-webview-miniprogram/interact-webview-miniprogram';
type TPayOptions = {
  intent: 'purchaseCoupon'|'recharge',   // purchaseCoupon为购买券，recharge为预充值
  couponGroupId?: string,
  amount: number,
  clientParams?: IGeneralObject<any>,   // 客户端参数，该参数可在服务端代码处理时原样获取
};
/**
 * @description: 支付
 * @author: JOU(wx: huzhen555)
 * @param {TPayOptions} payOptions 支付选项
 * @param {object} payOptions
 * @return: 支付结果的promise
 */
export async function pay(payOptions: TPayOptions) {
  let echoKey = getInteractKey();
  navigateTo(interactPage, {
    data: encodeURIComponent(JSON.stringify({
      intent: 'pay',
      echoKey,
      payload: {
        ...payOptions,
        shopId: globalData.get<string>('shopId') || '',
      },
    })),
  });
  return getEchoData<any>(echoKey);
}

type TNoticeBased<T, U, O> = IGeneralObject<{
  notifyData: T,
  timing?: U,
  channel?: string,
  path: string,
  routePath?: string,
  query?: O extends number ? IGeneralObject<string|number> : string,  // 传递到营销插件中的参数，可通过this.$route.query获取
}>;
/**
 * @description: 订阅消息
 * @author: JOU(wx: huzhen555)
 * @param {array} tmplCodes 模板code数组
 * @return: 订阅结果的promise
 */
export async function subscribeMessage(options: TNoticeBased<(string|number)[], Date, number>, tipText?: string, btnText?: string,) {
  let messageNames = Object.keys(options);
  assert(messageNames.length > 0, '请至少订阅一条消息');
  // 检查参数
  Object.keys(options).forEach(msgCode => {
    let { timing, channel, notifyData } = options[msgCode];
    assert(timing instanceof Date || typeof channel === 'string', `[MESSAGE_CODE:${msgCode}]必须指定timing或channel其中之一`);
    assert(notifyData.length > 0, `[MESSAGE_CODE:${msgCode}]模板数据不能为空`);
  });
  let platform = getPlatform();
  if (process.env.NODE_ENV !== 'production') {
    platform = MP_WEIXIN;
  }
  if (platform !== MP_WEIXIN && platform !== MP_ALIPAY) {
    throw new Error(`'${platform}'平台上不支持订阅消息`);
  }
  
  let notifyDataMap: IGeneralObject<IGeneralObject<any>> = {};
  let platformMsgCodeMap = tmplCodeMap[platform];
  let tmplIds = messageNames.map(msgName => {
    let tmplCodeItem = platformMsgCodeMap[msgName as keyof typeof platformMsgCodeMap];
    // 如果有值，则去比对一下发送的数据个数是否够
    if (tmplCodeItem) {
      let notifyData = options[msgName].notifyData || [];
      if (notifyData.length >= tmplCodeItem.dataNames.length) {
        // 创建一个对象，将dataNames和notifyData合并成一个对象
        let notifyDataObj: IGeneralObject<any> = {};
        tmplCodeItem.dataNames.forEach((dataName, index) => notifyDataObj[dataName] = notifyData[index]);
        notifyDataMap[tmplCodeItem.id] = notifyDataObj;
      }
      else {
        throw new Error(`[消息:${msgName}]${tmplCodeItem.errorText}`);
      }
    }
    return tmplCodeItem.id;
  }).filter(tmplCodeItem => tmplCodeItem);
  assert(tmplIds.length > 0, '请传入有效的消息名');

  let echoKey = getInteractKey();
  if (process.env.NODE_ENV === 'production') {
    navigateTo(interactPage, {
      data: encodeURIComponent(JSON.stringify({
        intent: 'notice',
        echoKey,
        payload: {
          tmplIds,
          tipText,
          btnText,
        },
      })),
    });
  }

  type TSubscribeResult = IGeneralObject<'accept'|'reject'|'ban'>;
  let subscribeRes: TSubscribeResult = {};
  if (process.env.NODE_ENV === 'production') {
    subscribeRes = await getEchoData<TSubscribeResult>(echoKey);
  }
  else {
    tmplIds.forEach(tmplId => subscribeRes[tmplId] = 'accept');
  }
  
  // 将模板名称=>模板id转换成模板id=>模板名称的对象
  let tmplId2NameMap: IGeneralObject<string> = {};
  for (let name in platformMsgCodeMap) {
    let tmplCodeItem = platformMsgCodeMap[name as keyof typeof platformMsgCodeMap];
    tmplId2NameMap[tmplCodeItem.id] = name;
  }
  const resAvailable: TNoticeBased<IGeneralObject<any>, string, string> = {};
  // 过滤出订阅成功的模板消息，发送到服务端
  for (let tmplId in subscribeRes) {
    let optionMsgData = options[tmplId2NameMap[tmplId]];
    if (subscribeRes[tmplId] === 'accept' && optionMsgData) {
      resAvailable[tmplId] = {
        notifyData: notifyDataMap[tmplId],
        timing: optionMsgData.timing ? formatTime(optionMsgData.timing) : '',
        channel: optionMsgData.channel,
        path: getMPPath(
          optionMsgData.path,
          optionMsgData.routePath,
          optionMsgData.query,
          false
        ),
      };
    }
  }

  if (process.env.NODE_ENV === 'production') {
    await callServerFunction({
      name: 'subscribeMessage',
      data: resAvailable,
    });
  }
  else {
    console.log(resAvailable);
  }

  const resTransform: TSubscribeResult = {};
  Object.keys(subscribeRes).forEach(tmplId => {
    resTransform[tmplId2NameMap[tmplId] || tmplId] = subscribeRes[tmplId];
  });
  return resTransform;
}

/**
 * @description: 跳转到交互页引导分享
 * @author: JOU(wx: huzhen555)
 * @param {TShareMessage} shareOptions 分享的内容
 */
export async function share(shareOptions: TShareMessage) {
  navigateTo(interactPage, {
    data: window.encodeURIComponent(JSON.stringify({
      intent: 'share',
      payload: {
        title: shareOptions.title,
        imageUrl: shareOptions.imageUrl,
        path: getMPPath(shareOptions.path, shareOptions.routePath, shareOptions.query),
      },
    })),
  });
}


// 可跳转的小程序页面
const pageCodes = {
  shopHomepage: '/page-other/shop-homepage/shop-homepage',
};
/**
 * @description: 跳转到小程序页面，页面通过pageCodes进行限制
 * @author: JOU(wx: huzhen555)
 * @param {keyof typeof pageCodes} pageCode 页面代码
 * @param {object} params 参数对象
 * @return: 跳转成功或失败的promise
 */
export async function navigateELPage(pageCode: keyof typeof pageCodes, params: IGeneralObject<string|number> = {}) {
  let path = pageCodes[pageCode];
  assert.notNull(path, `invalid pageCode\`${pageCode}\``);
  return navigateTo(path, params);
}

/**
 * @description: 获取用户授权信息，如果用户未授权则会跳转到授权页面让用户授权
 * @author: JOU(wx: huzhen555)
 * @param {string} tips 授权页面的提示文字
 * @return: 用户信息
 */
export async function getUserInfo(tips: string) {
  type TUserInfo = {
    avatar: string,
    nickname: string,
    province: string,
    city: string,
    gender: 0|1,
  };
  
  let userInfo = await callServerFunction<TUserInfo>({ name: 'getUserInfo' });
  if (!userInfo) {
    let echoKey = getInteractKey();
    navigateTo('/pages/login/login', {
      tips, 
      echoKey,
      save: 'true',
    });
    userInfo = await getEchoData<TUserInfo>(echoKey);
  }
  return userInfo;
}

/**
 * @description: 发放优惠券
 * @author: JOU(wx: huzhen555)
 * @param {string} userId  用户id
 * @param {string} groupId 发放的优惠券组id
 * @return: 包含发放结果的promise
 */
export async function giveCoupon(userId: string, groupId: string) {
  assert(userId && groupId, 'both params `userId` and `groupId` must be given');
  type TCouponRes = {
    success: boolean,
    couponId: string,
    couponName: string,
    couponStr: string,
    useLimit: string,
    useDays: number,
  };
  return callServerFunction<TCouponRes>({
    name: 'giveCoupon',
    data: { customerId: userId, groupId },
  });
}

/**
 * @description: 传入couponGroupId返回对应优惠券组的信息
 * @author: JOU(wx: huzhen555)
 * @param {string}  groupId 优惠券组id
 * @return: 对应优惠券组id的信息
 */
export async function getCouponInfo(groupId: string|string[]) {
  type TCouponInfo = {
    id: string,
    name: string;
    createTimestamp: number;
    couponData: string;
    useLimit: string;
    useDays: number;
  };
  
  // 断言参数
  assert.equalType(groupId, [String, Array], 'groupIds must be given a string or a array of string');
  let globalCouponKey = 'couponInfo';
  let couponInfoMap = globalData.get<IGeneralObject<TCouponInfo>>(globalCouponKey) || {};
  let groupIds = Array.isArray(groupId) ? groupId : [groupId];
  let couponRes: IGeneralObject<TCouponInfo> = {};
  let requestGroupIds: string[] = [];
  // 将缓存中已存在的数据取到，同时记录缓存中不存在的数据
  for (let i in groupIds) {
    let idItem = groupIds[i];
    let couponInfo = couponInfoMap[idItem];
    if (!couponInfo) {
      requestGroupIds.push(idItem);
    }
    else {
      couponRes[couponInfo.id] = couponInfo;
    }
  }

  // 如果需要请求获取数据，则调用服务方法获取
  if (requestGroupIds.length > 0) {
    let couponInfos = await callServerFunction<TCouponInfo[]>({
      name: 'getCouponInfo',
      data: { groupId: requestGroupIds },
    });
    couponInfos.forEach(couponInfo => {
      couponRes[couponInfo.id] = couponInfoMap[couponInfo.id] = couponInfo
    });
  }

  if (Array.isArray(groupId)) {
    return couponRes;
  }
  else {
    let keys = Object.keys(couponRes);
    return keys.length > 0 ? couponRes[keys[0]] : null;
  }
}

/**
 * @description: 获取当前餐厅的门店信息
 * @author: JOU(wx: huzhen555)
 * @return: 包含餐厅门店信息的promise
 */
export async function getShopInfo() {
  let globalShopInfoKey = 'shopInfo';
  let shopInfo = globalData.get<any>(globalShopInfoKey);
  if (!shopInfo) {
    shopInfo = await callServerFunction<any>({ name: 'getShopInfo' });
    shopInfo.detailedIntroStr = JSON.parse(shopInfo.detailedIntroStr || '{}');
    globalData.set(globalShopInfoKey, shopInfo);
  }
  
  return shopInfo;
}

/**
 * @description: 获取当前餐厅的活动配置信息
 * @author: JOU(wx: huzhen555)
 * @return: 包含活动配置信息的promise
 */
export async function getConfiguration() {
  let globalConfigKey = 'shopConfiguration';
  let configData = globalData.get<any>(globalConfigKey);
  if (!configData) {
    configData = await callServerFunction<any>({ name: 'getConfiguration' });
    globalData.set(globalConfigKey, configData);
  }
  
  return configData;
}

/**
 * @description: 根据频道发送通知
 * @author: JOU(wx: huzhen555)
 * @param {string} userId  用户id
 * @param {string} groupId 发放的优惠券组id
 * @return: 包含发放结果的promise
 */
export async function notifyMessage(channel?: string) {
  return callServerFunction<boolean>({
    name: 'notifyMessage',
    data: { channel },
  });
}

/**
 * @description: 在当前页面切换其他餐厅
 * @author: JOU(wx: huzhen555)
 * @param {string} shopId 餐厅id
 */
export function changeShop(shopId: string) {
  shopId = shopId.trim();
  let currentShopId = globalData.get<string>('shopId') || '';
  if (shopId && currentShopId !== shopId) {
    location.href = location.href.replace(/\w+(\/\w+\/)online/, (mat, rep) => {
      return mat.replace(rep, `/${shopId}/`);
    });
  }
}