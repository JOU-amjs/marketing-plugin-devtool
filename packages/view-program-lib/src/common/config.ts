/*
 * @Date: 2020-04-11 22:47:32
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-26 11:06:54
 */

import { MP_WEIXIN, MP_ALIPAY } from './constant';
import { IGeneralObject } from './common.inter';
import getMode from './get-mode';
import globalData from '../model/global-data';

// 根据环境变量返回对应数据
type TRuntimeEnv = {
  'plugin-dev': string,   // 插件开发环境
  prod: string,           // 生产环境
  debug: string,           // 调试环境
};
export function environmentValue(envOption: TRuntimeEnv) {
  const mode = getMode();
  return envOption[mode] || '';
}

/**
 * @description: 测试环境下调用，模拟生产环境的数据，测试api时需要用到
 * @author: JOU(wx: huzhen555)
 */
export function mockProdEnvironment() {
  globalData.set({
    shopId: 1,
    activityId: 1,
    pluginId: 'test_plugin',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTU5MDY0NzA2MCwiZXhwIjoxNjIxNzUxMDYwfQ.sbgWHNE_f9R-sbfzQ1R7LSQxWfpFbWIt181bU9Q62Sk',
  });
}

// 兼容mocha单元测试
const hostname = process.env.NODE_ENV ? location.hostname : '';
export const host = environmentValue({
  'plugin-dev': `http://${hostname}:18001`,  // 用hostname可以支持在手机预览时的接口通常
  prod: 'https://api.ycsh6.com',
  // prod: 'http://localhost:7001',
  debug: 'http://localhost:7001',
});
export const javaHost = environmentValue({
  // 'plugin-dev': 'http://148.70.36.197:8080',
  'plugin-dev': 'https://api.java.ycsh6.com',
  prod: 'https://api.java.ycsh6.com',
  debug: 'https://api.java.ycsh6.com',
});

// 用于接口签名的key和分隔符，需与服务器一致
export const apiSign = {
  connectSymbol: '-',
  key: 'sd8mow3RPMDS0PMPmMP98AS2RG43T',
  // key: '',
};

type TTmplCodeData = {
  id: string,
  dataNames: string[],
  errorText: string,
};
// 订阅的消息模板的代码和id映射
export const tmplCodeMap: IGeneralObject<IGeneralObject<TTmplCodeData>> = {
  [MP_WEIXIN]: {
    activity: {
      id: 'i5sdedogJeiICuz0dfX-FC2yBdRdkwwcxCg1okRmnys',
      dataNames: ['name3', 'name2', 'thing1', 'thing4'],
      errorText: 'notifyData中必须包含受邀人、邀请人、活动名称、温馨提示4个数据',
    },
    payResult: {
      id: 'xxxxx',
      dataNames: ['name1'],
      errorText: 'notifyData中必须包含名称数据',
    },
  },
  [MP_ALIPAY]: {
    activity: {
      id: '',
      dataNames: [],
      errorText: 'notifyData中必须包含受邀人、邀请人、活动名称、温馨提示4个数据',
    },
    payResult: {
      id: '',
      dataNames: [],
      errorText: 'notifyData中必须包含受邀人、邀请人、活动名称、温馨提示4个数据',
    },
  },
}

// 视图插件页面路径
export const viewProgramPath = '/pages/webview-container/webview-container';