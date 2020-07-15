/*
 * @Date: 2020-04-09 16:17:20
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 13:38:07
 */

import { navigateTo, buildPath, getInteractKey, buildWebAbsolutePath } from '../common/util';
import { IGeneralObject } from '../common/common.inter';
import { MESSAGE_CODE } from '../common/constant';
import { TShareMessage } from '../page';
import callServerFunction from '../common/network/call-server-function';
import globalData from '../model/global-data';
import Assert from '../common/assert';
import getEchoData from '../common/network/get-echo-data';

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
    data: window.encodeURIComponent(JSON.stringify({
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

type TNoticeOptions = {
  tmplCodes: (keyof typeof MESSAGE_CODE)[],
  tipText?: string,
  btnText?: string,
};
/**
 * @description: 订阅消息
 * @author: JOU(wx: huzhen555)
 * @param {array} tmplCodes 模板code数组
 * @return: 订阅结果的promise
 */
export async function subscribeMessage(noticeOptions: TNoticeOptions) {
  let echoKey = getInteractKey();
  navigateTo(interactPage, {
    data: window.encodeURIComponent(JSON.stringify({
      intent: 'notice',
      echoKey,
      payload: noticeOptions,
    })),
  });
  return getEchoData<any>(echoKey);
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
        ...shareOptions,
        absolutePath: buildWebAbsolutePath({
          url: shareOptions.path,
          routePath: shareOptions.routePath,
          params: shareOptions.params,
        }),
      },
    })),
  });
}


// 可跳转的小程序页面
const pageCodes = {
  shopHomepage: 'pages/shop-homepage/shop-homepage',
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
  Assert.notNull(path, `invalid pageCode\`${pageCode}\``);
  return navigateTo(buildPath(path, params));
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
    navigateTo(buildPath('pages/login/login', { tips, echoKey }));
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
  Assert.equal(!userId || !groupId, true, 'both params `userId` and `groupId` must be given');
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
  Assert.equalType(groupId, [String, Array], 'groupIds must be given a string or a array of string');
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