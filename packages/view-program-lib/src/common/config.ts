/*
 * @Date: 2020-04-11 22:47:32
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 15:45:16
 */

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
  prod: 'https://api.ycsh6.com',
});
export const javaHost = environmentValue({
  'plugin-dev': 'http://148.70.36.197:8080',
  prod: 'http://148.70.36.197:8080',
});

// 用于接口签名的key和分隔符，需与服务器一致
export const apiSign = {
  connectSymbol: '-',
  key: 'sd8mow3RPMDS0PMPmMP98AS2RG43T',
  // key: '',
};