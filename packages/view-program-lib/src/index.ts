/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 09:19:50
 */
import Page from './page';
import * as el from './api/el';
import * as mp from './api/mp';
import NamespacedStorage, {LOCAL_STORAGE, SESSION_STORAGE } from './model/namespaced-storage-factory';
import createNamespacedDatabase from './model/namespaced-database';
import globalData from './model/global-data';
import { MESSAGE_CODE } from './common/constant';
import { parseUrlParams, parseMpCode, getMode } from './common/util';

const pluginMode = getMode();

/* 初始化 */
// 解析get参数和插件标识并存储到全局对象中
let params = parseUrlParams(window.location.href);
params.mpCode = parseMpCode(window.location.pathname);
globalData.set(params);

// 如果没有shopId和activityId则报错
if (!params.activityId || !params.shopId) {
  throw new Error(`query \`activityId\` and \`shopId\` must be given`);
}

// 初始化各个命名空间下的重要存储对象
let 
  { activityId } = params,
  namespace = activityId || '',
  localStorage = new NamespacedStorage(namespace, LOCAL_STORAGE),
  sessionStorage = new NamespacedStorage(namespace, SESSION_STORAGE),
  database = createNamespacedDatabase(namespace),
  warnGetter = (storageTag: string) => () => console.warn(`please use \`EL.${storageTag}\` with the same usage.`);

// 在非插件开发环境下，禁用自带的localStorage和sessionStorage
if (pluginMode === 'prod') {
  Object.defineProperties(window, {
    localStorage: { get: warnGetter('localStorage') },
    sessionStorage: { get: warnGetter('sessionStorage') },
  });
}

export default {
  Page,
  MESSAGE_CODE,
  localStorage,
  sessionStorage,
  database,
  ...el,
  ...mp,
};