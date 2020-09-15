/*
 * @Date: 2020-04-11 22:47:32
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 10:31:36
 */

import { MP_WEIXIN, MP_ALIPAY } from './constant';
import { IGeneralObject } from './common.inter';
import getMode from './get-mode';

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


export const host = environmentValue({
  'plugin-dev': 'http://localhost:18001',
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