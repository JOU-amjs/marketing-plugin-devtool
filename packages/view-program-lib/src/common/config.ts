/*
 * @Date: 2020-04-11 22:47:32
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-10 16:58:21
 */

import { MP_WEIXIN, MP_ALIPAY } from './constant';

// 根据环境变量返回对应数据
type TRuntimeEnv = {
  'plugin-dev': string,
  prod: string,
};
export function environmentValue(envOption: TRuntimeEnv) {
  let href = '';
  // 兼容单元测试
  try {
    href = window.location.href;
  } catch (error) {
    href = '';
  }
  const pluginMode = /devMode=1/.test(href) ? 'plugin-dev' : 'prod';
  return envOption[pluginMode as 'plugin-dev'|'prod'] || '';
}


export const host = environmentValue({
  'plugin-dev': 'http://localhost:18001',
  // prod: 'https://api.ycsh6.com',
  prod: 'http://localhost:7001',
});
export const javaHost = environmentValue({
  'plugin-dev': 'http://148.70.36.197:8080',
  prod: 'https://api.java.ycsh6.com',
});

// 用于接口签名的key和分隔符，需与服务器一致
export const apiSign = {
  connectSymbol: '-',
  key: 'sd8mow3RPMDS0PMPmMP98AS2RG43T',
  // key: '',
};

// 订阅的消息模板的代码和id映射
export const tmplCodeMap = {
  [MP_WEIXIN]: {
    activity: 'i5sdedogJeiICuz0dfX-FC2yBdRdkwwcxCg1okRmnys',
    payResult: '',
  },
  [MP_ALIPAY]: {
    activity: '',
    payResult: '',
  },
}

// 视图插件页面路径
export const viewProgramPath = 'pages/webview-container/webview-container';