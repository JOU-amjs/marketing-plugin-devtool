/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-23 11:41:54
 */
import { MP_WEIXIN, MP_ALIPAY, BROWSER, NODE, WEBVIEW_BASE_URL } from './constant';
import { IGeneralObject } from './common.inter';
import wx from './jweixin';
import { apiSign } from '../common/config';
import { Md5 } from 'ts-md5';
import globalData from '../model/global-data';

/**
 * @description: 获取运行环境
 * @author: JOU(wx: huzhen555)
 * @return: 运行环境，mpWx/mpAlipay/browser
 */
export function getEnvironment() {
  let userAgent = '';
  try {
    userAgent = window.navigator.userAgent.toLowerCase();
  } catch (error) {
    userAgent = 'nodejs';
  }

  if(userAgent.indexOf('miniprogram') !== -1) {
    return MP_WEIXIN;
  }
  // TODOS: 支付宝小程序webview的环境判断
  else if (userAgent.indexOf('alipay miniprogram') !== -1) {
    return MP_ALIPAY;
  }
  else if (userAgent.indexOf('node') !== -1) {
    return NODE;
  }
  else {
    return BROWSER;
  }
}

type TParam = IGeneralObject<string|number>;

/**
 * @description: 构建有参数的路径
 * @author: JOU(wx: huzhen555)
 * @param {string}  url 路径
 * @param {object}  params 参数对象
 * @return: 拼接好的路径
 */
export function buildPath(url: string, params: TParam = {}) {
  let argStr = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  if (argStr) {
    // 判断url是否已经带有参数
    argStr = (url.indexOf('?') >= 0 ? '&' : '?') + argStr;
  }
  return url + argStr;
}

/**
 * @description: 小程序页面跳转
 * @author: JOU(wx: huzhen555)
 * @param {string} url 小程序路径
 * @param {object} params 小程序路径参数集合
 * @return: 调用成功与否的promise
 */
export async function navigateTo(url: string, params: TParam = {}) {
  let environment = getEnvironment();
  return new Promise<any>((resolve, reject) => {
    if (environment === MP_WEIXIN) {
      wx.miniProgram.navigateTo({
        url: buildPath(url, params),
        success: (...args: any[]) => resolve(args),
        fail: (reason: string) => reject(reason),
      });
    }
    else if (environment === MP_ALIPAY) {
      // TODOS： 支付宝小程序跳转逻辑
    }
  });
}

/**
 * @description: 小程序页面回退
 * @author: JOU(wx: huzhen555)
 * @param {number} 回退层级
 * @return: 调用成功与否的promise
 */
export async function navigateBack(delta = 1) {
  let environment = getEnvironment();
  return new Promise<any>((resolve, reject) => {
    if (environment === MP_WEIXIN) {
      wx.miniProgram.navigateBack({
        delta,
        success: (...args: any[]) => resolve(args),
        fail: (reason: string) => reject(reason),
      });
    }
    else if (environment === MP_ALIPAY) {
      // TODOS： 支付宝小程序回退逻辑
    }
  });
}

/**
 * @description: 获取模式，意思是在正式环境下运行的，还是在插件开发环境下运行的
 * @author: JOU(wx: huzhen555)
 * @return {string} 正式环境下运行返回`prod`，插件开发环境下运行返回`plugin-dev`;
 */
export function getMode() {
  let devMode = globalData.get<string>('devMode');
  return devMode?.toString() === '1' && getEnvironment() === 'browser' ? 'plugin-dev' : 'prod';
}

/**
 * @description: 创建接口的签名，签名会自动过滤没有值的参数
 * @author: JOU(wx: huzhen555)
 * @param {object}  params 需要加密签名的数据对象
 * @return: 签名
 */
export function createApiSign(params: IGeneralObject<string> = {}) {
  const rawStr = Object.keys(params).sort()
  .map(key => params[key] !== undefined ? `${key}=${params[key]}` : undefined)
  .filter(item => item)
  .join(apiSign.connectSymbol) + apiSign.key;
  return Md5.hashStr(rawStr) as string;
}

/**
 * @description: 解析url中的参数
 * @author: JOU(wx: huzhen555)
 * @param {string} url 待解析的url
 * @return: 解析后的参数对象
 */
export function parseUrlParams(url: string) {
  let params: IGeneralObject<string> = {};
  (url.match(/\?(.*)$/) || ['', ''])[1]
  .split('&').forEach(param => {
    const keyVal = param.split('=');
    if (keyVal.length === 2) {
      params[keyVal[0]] = keyVal[1];
    }
  });
  return params;
}

/**
 * @description: 解析出pluginId、activityId、shopId等关键数据
 * @author: JOU(wx: huzhen555)
 * @param {string} 待解析的pathname(相对路径)
 * @return 包含pluginId、activityId、shopId的数据对象
 */
export function parseKeyParams(pathname: string = '') {
  const keyParams = {
    pluginId: '',
    activityId: '',
    shopId: '',
  }
  pathname = pathname.substr(0, 1) === '/' ? pathname.substr(1) : pathname;
  let pathDataAry = pathname.split('/');
  let onlineStrIndex = pathDataAry.indexOf('online');
  if (onlineStrIndex <= -1) {
    throw new Error(`current url is not a online program's url`);
  }
  pathDataAry = pathDataAry.slice(0, onlineStrIndex);
  keyParams.pluginId = pathDataAry[0] || '';
  keyParams.activityId = pathDataAry[1] || '';
  keyParams.shopId = pathDataAry[2] || '';
  return keyParams;
}

/**
 * @description: 获取数据交互时的标识，此标识需要一个用户在一个活动中唯一
 * @author: JOU(wx: huzhen555)
 * @param {boolean} isEcho 是否为回传标识，此用于区分发送数据和回传数据
 * @return: 数据交互的key
 */
export function getInteractKey(isEcho = true) {
  return (globalData.get<string>('activityId') || '') + (globalData.get<string>('token') || '') + (isEcho ? '-echo' : '');
}


export type TNavOptions = {
  url: string,
  routePath?: string,
  params?: IGeneralObject<string|number>,
};
/**
 * @description: 构建web页的绝对路径
 * @author: JOU(wx: huzhen555)
 * @param {TNavOptions}  options 跳转路径的参数对象
 * @return: 构建后的路径
 */
export function buildWebAbsolutePath({ url, params = {}, routePath = '' }: TNavOptions) {
  url = url.substr(0, 1) === '/' ? url.substr(1) : url;   // 如果路径以`/`开头，则去掉
  
  // 相对路径格式为：[pluginId]/[url.html]/#/[routePath]?xx=xx&yy=yy
  // 全路径示例：https://mp.online.ycsh6.com/7asd897gasd90f/pages/index.html/#/second?activityId=2211&shopId=113
  let relativePath = buildPath(`/${globalData.get<string>('pluginId')}/${url}.html/#/${routePath}`, {
    activityId: globalData.get<string>('activityId') || '',
    shopId: globalData.get<string>('shopId') || '',
    ...params,
  });
  return WEBVIEW_BASE_URL + relativePath;
}