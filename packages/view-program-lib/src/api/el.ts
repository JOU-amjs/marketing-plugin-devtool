/*
 * @Date: 2020-04-09 16:17:20
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-30 20:30:27
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
import { assert } from 'ycsh6-helper';
import getEchoData from '../common/network/get-echo-data';
import { tmplCodeMap } from '../common/config';
import getMode from '../common/get-mode';
import { message } from '../common/message';

const interactPage = '/pages/interact-webview-miniprogram/interact-webview-miniprogram';
type TPayOptions = {
  intent: 'couponPurchase'|'recharge',   // purchaseCoupon为购买券，recharge为预充值
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
export const payIntent = {
  COUPON_PURCHASE: 'couponPurchase',
  RECHARGE: 'recharge',
};
export async function pay(payOptions: TPayOptions) {
  assert(Object.values(payIntent).indexOf(payOptions.intent) >= 0, 'intent不正确，请使用`EL.payIntent`中的属性');
  assert(payOptions.amount > 0, '支付金额必须大于0，单位(元)');
  if (payOptions.intent === 'couponPurchase') {
    assert(payOptions.couponGroupId, '购买卡券支付时，需传入couponGroupId');
  }
  
  if (getMode() === 'plugin-dev') {
    let data: any = { payOptions };
    if (payOptions.intent === 'couponPurchase' && payOptions.couponGroupId) {
      data.couponInfo = await getCouponInfo(payOptions.couponGroupId);
    }
    message.emit('pay', data);
    return new Promise((resolve, reject) => {
      message.once('payComplete', (finish: boolean) => finish ? resolve() : reject(new Error('取消支付')));
    });
  }
  else {
    let echoKey = getInteractKey();
    let activityId = globalData.get<string>('activityId');
    let shopId = globalData.get<string>('shopId');
    navigateTo(interactPage, {
      data: encodeURIComponent(JSON.stringify({
        intent: 'pay',
        echoKey,
        payload: {
          payOptions,
          activityId,
          shopId,
        },
      })),
    });
    return getEchoData<any>(echoKey);
  }
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
export async function subscribeMessage(options: TNoticeBased<(string|number)[], Date, number>, tipText?: string, btnText?: string) {
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
  if (getMode() === 'plugin-dev') {
    message.emit('toShare', shareOptions);
  }
  else {
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
type TInfoLevel = 0|1|2|3;
export const userInfo: IGeneralObject<TInfoLevel> = {
  SIMPLE: 0,
  PERSON: 1,
  LOYALTY: 2,
  WHOLE: 3,
};
export async function getUserInfo<T>(infoLevel: TInfoLevel = 0, tips = '') {
  type TUserSimple = {
    userId: string,
  };
  type TUserPerson = TUserSimple & {
    avatar: string,
    nickname: string,
    province: string,
    city: string,
    gender: 0|1|2,  //性别 0：未知、1：男、2：女
  };
  type TUserLoyalty = TUserSimple & {
    loyalValue: number,
    level: number,
    nextLevelValue: number,
    levelTheme: {
      alias: string,
      color: string,
      icon: string,
    }
  };
  type TUserWhole = TUserPerson & TUserLoyalty;
  const requestInfo = () => callServerFunction<T extends 'whole' ? TUserWhole 
  : T extends 'loyalty' ? TUserLoyalty
    : T extends 'person' ? TUserPerson 
      : TUserSimple>({
        name: 'getUserInfo',
        data: { info: infoLevel },
      });
  
  let userInfo = await requestInfo();
  if ((!userInfo || !(userInfo as TUserPerson).nickname) && (infoLevel === 1 || infoLevel === 3)) {
    let echoKey = getInteractKey();
    navigateTo('/pages/login/login', {
      tips,
      infoLevel,
      echoKey,
      save: 'true',
    });
    let finish = await getEchoData<boolean>(echoKey);
    if (finish) {
      userInfo = await requestInfo();
    }
  }
  return userInfo;
}

/**
 * @description: 发放优惠券
 * @author: JOU(wx: huzhen555)
 * @param {string} groupId 发放的优惠券组id
 * @param {string} userId  用户id，如果此参数为空则发放给当前用户
 * @return: 包含发放结果的promise
 */
export async function giveCoupon(groupId: string, userId?: string) {
  assert(groupId, 'param `groupId` must be given');
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
 * @description: 根据id获取对应优惠券组的信息
 * @author: JOU(wx: huzhen555)
 * @param {string|string[]}  groupId 优惠券组id
 * @return: 对应优惠券组id的信息
 */
export async function getCouponInfo(groupId: string|string[]) {
  type TCouponInfo = {
    id: string,
    name: string;
    expireTime: number|Date;
    couponStr: string;
    couponData: IGeneralObject<string>,
    useLimit: IGeneralObject<string>[]|string;
    useLimitStrArray: string[],
    useDays: number,
    status: number,
  };
  
  // 断言参数
  assert.equalType(groupId, [Number, String, Array], 'groupIds must be given a string or a array of string');
  let globalCouponKey = 'couponInfo';
  let couponInfoMap = globalData.get<IGeneralObject<TCouponInfo>>(globalCouponKey) || {};
  let groupIds = Array.isArray(groupId) ? groupId : [groupId];
  let couponRes: IGeneralObject<TCouponInfo|undefined> = {};
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
    let currentMilTs = Date.now();
    requestGroupIds.forEach(groupId => {
      let couponInfo = couponInfos.find(({ id }) => id === groupId);
      if (couponInfo) {
        // 如果有数据，则格式化数据并缓存到couponInfoMap中
        couponInfo.expireTime = new Date((couponInfo.expireTime as number) * 1000);
        couponInfo.status = couponInfo.expireTime.getTime() < currentMilTs ? 0 : couponInfo.status;
        if (typeof couponInfo.useLimit === 'string') {
          couponInfo.useLimit = JSON.parse((couponInfo.useLimit as string) || '[]');
        }
        couponInfoMap[couponInfo.id] = couponInfo;
      }
      couponRes[groupId] = couponInfo;
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
 * @description: 传入dishId返回对应菜品的信息
 * @author: JOU(wx: huzhen555)
 * @param {string|string[]}  dishId 菜品id
 * @return: 对应菜品id的信息
 */
export async function getDishInfo(dishId: string|string[]) {
  type TDishInfo = {
    id: string,
    name: string,
    media: string[],
    describe: string, 
    price: number, 
    tag: string, 
    spicyLevel: number, 
    skuOptions: { name: string, options: string[] }[],
    status: number,
  };
  
  // 断言参数
  assert.equalType(dishId, [String, Array], 'dishIds must be given a string or a array of string');
  let globalDishesKey = 'dishesInfo';
  let dishesInfoMap = globalData.get<IGeneralObject<TDishInfo>>(globalDishesKey) || {};
  let dishIds = Array.isArray(dishId) ? dishId : [dishId];
  let dishesRes: IGeneralObject<TDishInfo|undefined> = {};
  let requestDishIds: string[] = [];
  // 将缓存中已存在的数据取到，同时记录缓存中不存在的数据
  for (let i in dishIds) {
    let idItem = dishIds[i];
    let dishInfo = dishesInfoMap[idItem];
    if (!dishInfo) {
      requestDishIds.push(idItem);
    }
    else {
      dishesRes[dishInfo.id] = dishInfo;
    }
  }

  // 如果需要请求获取数据，则调用服务方法获取
  if (requestDishIds.length > 0) {
    let dishInfos = await callServerFunction<TDishInfo[]>({
      name: 'getDishInfo',
      data: { dishId: requestDishIds },
    });
    requestDishIds.forEach(dishId => {
      let couponInfo = dishInfos.find(({ id }) => id === dishId);
      if (couponInfo) {
        // 如果有数据，则格式化数据并缓存到dishesInfoMap中
        dishesInfoMap[couponInfo.id] = couponInfo;
      }
      dishesRes[dishId] = couponInfo;
    });
  }

  if (Array.isArray(dishId)) {
    return dishesRes;
  }
  else {
    let keys = Object.keys(dishesRes);
    return keys.length > 0 ? dishesRes[keys[0]] : null;
  }
}

/**
 * @description: 获取当前餐厅的门店信息
 * @author: JOU(wx: huzhen555)
 * @return: 包含餐厅门店信息的promise
 */
export async function getShopInfo() {
  type TShopInfo = {
    id: string,
    shopName: string, 
    avatar: string, 
    shortIntro?: string, 
    openTime: {
      day: (0|1|2|3|4|5|6)[], 
      startTime: string,
      endTime: string
    }[],
    detailedIntro: {title: string, content: string},
    address: string,
    coordinate: number[],
    homepageImage?: string,
  };

  let globalShopInfoKey = 'shopInfo';
  let shopInfo = globalData.get<TShopInfo>(globalShopInfoKey);
  if (!shopInfo) {
    shopInfo = await callServerFunction<TShopInfo>({ name: 'getShopInfo' });
    globalData.set(globalShopInfoKey, shopInfo);
  }
  
  return shopInfo;
}

/**
 * @description: 获取当前餐厅的活动配置信息，获取联合商家配置时支持分页获取
 * @author: JOU(wx: huzhen555)
 * @param {boolean} allUnions 是否获取全部联合商家的配置
 * @param {number} page 页码
 * @param {number} pageSize 每页行数
 * @return: 餐厅在配置页配置的数据，即配置页中`this.onSubmit`回调函数中返回的数据，如果allUnions=true则返回所以联合商家的配置数组
 */
export async function getConfiguration(allUnions = false, page = 1, pageSize = 50) {
  let globalConfigKey = 'shopConfiguration';
  let configData = globalData.get<any>(globalConfigKey);
  if (!configData) {
    configData = await callServerFunction<any>({
      name: 'getConfiguration',
      data: { allUnions, page, pageSize },
    });
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
  shopId = shopId.toString().trim();
  let currentShopId = globalData.get<string>('shopId') || '';
  if (shopId && currentShopId !== shopId) {
    location.href = location.href.replace(/\w+(\/\w+\/)online/, (mat, rep) => {
      return mat.replace(rep, `/${shopId}/`);
    });
  }
}