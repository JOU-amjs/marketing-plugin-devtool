/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-30 20:53:13
 */
import { MP_WEIXIN, MP_ALIPAY, BROWSER, NODE } from './constant';
import { IGeneralObject } from './common.inter';
import wx from './jweixin';
import { viewProgramPath } from '../common/config';
import globalData from '../model/global-data';

/**
 * @description: 获取运行的所在平台
 * @author: JOU(wx: huzhen555)
 * @return: 运行环境，mpWx/mpAlipay/browser
 */
export function getPlatform() {
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
  return BROWSER;
}

type TParam = IGeneralObject<string|number>;

/**
 * @description: 构建有参数的路径
 * @author: JOU(wx: huzhen555)
 * @param {string}  url 路径
 * @param {object}  params 参数对象
 * @return: 拼接好的路径
 */
export function buildPath(url: string, params: TParam = {}, restfulParams: TParam = {}) {
  Object.keys(restfulParams).forEach(paramName => {
    url = url.replace(`{${paramName}}`, restfulParams[paramName].toString());
  });
  
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
 * @description: 构造在线插件url
 *  /7asd897gasd90f/2211/113/online/index?accessToken=xxx#/second?p1=xxx&p2=xxx
 * @author: JOU(wx: huzhen555)
 * @param {type} 
 * @return {type} 
 */
export function buildViewProgramUrl(pluginId: string, activityId: string, shopId: string, webPagePath: string, routePath = '', query = {}) {
  // 将webPagePath 格式化成`{webPagePath}/`，当webPagePath为空时末尾不加`/`
  webPagePath = webPagePath.substr(0, 1) === '/' ? webPagePath.substr(1) : webPagePath;
  webPagePath = webPagePath ? 
    webPagePath.substr(-1) === '/' ? webPagePath : (webPagePath + '/')
    : webPagePath;
  let routeQuery = buildUrlParams(query);
  const queries: any = { accessToken: globalData.get<string>('accessToken') || '' };

  // 构造url时要保持一样的devMode值
  let mode = globalData.get<string>('mode');
  if (mode === 'plugin-dev') {
    queries.devMode = 1;
  }
  else if (mode === 'debug') {
    queries.devMode = 2;
  }
  return buildPath('/{pluginId}/{activityId}/{shopId}/online/{webPagePath}', queries, {
    pluginId,
    activityId,
    shopId,
    webPagePath,
  }) + `#/${routePath + routeQuery}`;
}

/**
 * @description: 小程序页面跳转
 * @author: JOU(wx: huzhen555)
 * @param {string} url 小程序路径
 * @param {object} params 小程序路径参数集合
 * @return: 调用成功与否的promise
 */
export async function navigateTo(url: string, params: TParam = {}) {
  let environment = getPlatform();
  return new Promise<any>((resolve, reject) => {
    let urlBuilded = buildPath(url, params);
    if (environment === MP_WEIXIN) {
      wx.miniProgram.navigateTo({
        url: urlBuilded,
        success: (...args: any[]) => resolve(args),
        fail: (reason: string) => reject(reason),
      });
    }
    else if (environment === MP_ALIPAY) {
      // TODOS： 支付宝小程序跳转逻辑
      throw new Error('暂不支持支付宝小程序');
    }
    else if (environment === BROWSER) {
      // 网页端跳转，开发环境下可用
      // 以http或https开头的直接重定向，其他则抛出跳转提示
      if (!/^https?/.test(url)) {
        let params = parseUrlParams(url);
        params.query = JSON.parse(decodeURIComponent(params.query || '') || '{}');
        url = buildViewProgramUrl(params.pluginId, params.activityId, params.shopId, params.path, params.routePath, params.query);
      }
      location.href = url;
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
  let environment = getPlatform();
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

// /**
//  * @description: 创建接口的签名，签名会自动过滤没有值的参数
//  * @author: JOU(wx: huzhen555)
//  * @param {object}  params 需要加密签名的数据对象
//  * @return: 签名
//  */
// export function createApiSign(params: IGeneralObject<string> = {}) {
//   const rawStr = Object.keys(params).sort()
//   .map(key => params[key] !== undefined ? `${key}=${params[key]}` : undefined)
//   .filter(item => item)
//   .join(apiSign.connectSymbol) + apiSign.key;
//   return Md5.hashStr(rawStr) as string;
// }

/**
 * @description: 构建url中的参数
 * @author: JOU(wx: huzhen555)
 * @param {object} params 待构建的参数对象
 * @return: 构建后的参数字符串
 */
export function buildUrlParams(params: IGeneralObject<any> = {}, needQuestionMark = true) {
  let paramStr = Object.keys(params)
  .map((key) => `${key}=${params[key]}`)
  .join('&');
  if (needQuestionMark) {
    paramStr = (paramStr ? '?' : '') + paramStr;  // 如果有参数则需要在开头加一个`?`
  }
  return paramStr;
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

/**
 * @description: 构建插件页的跳转路径
 * @author: JOU(wx: huzhen555)
 * @param {string} path 页面路径
 * @param {string} routePath 路由路径
 * @param {string} query 参数对象
 * @return: 构建后的路径
 */
export function getMPPath(path: string, routePath?: string, query?: IGeneralObject<any>, hasBasePath = true) {
  let fillParams: IGeneralObject<any> = {};
  if (routePath) {
    fillParams.routePath = routePath;
  }
  if (query) {
    fillParams.query = encodeURIComponent(JSON.stringify(query));
  }

  return buildPath(hasBasePath ? viewProgramPath : '', {
    activityId: globalData.get<string>('activityId') || '',
    pluginId: globalData.get<string>('pluginId') || '',
    shopId: globalData.get<string>('shopId') || '',
    path,
    ...fillParams
  });
}

/**
 * @description: 格式化时间
 * @author: JOU(wx: huzhen555)
 * @param {Date} time 需要格式化的Date对象
 * @return {string} 格式化后的时间字符串
 */
export function formatTime(time: Date) {
  const fillZero = (num: number) => num >= 0 && num < 10 ? ('0' + num) : num.toString();
  return `${time.getFullYear()}-${fillZero(time.getMonth() + 1)}-${fillZero(time.getDate())} ${fillZero(time.getHours())}:${fillZero(time.getMinutes())}:${fillZero(time.getSeconds())}`;
}