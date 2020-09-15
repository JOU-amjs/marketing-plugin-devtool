/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 11:40:13
 */
import Page from './page';
import * as el from './api/el';
import * as mp from './api/mp';
import NamespacedStorage, {LOCAL_STORAGE, SESSION_STORAGE } from './model/namespaced-storage-factory';
import createNamespacedDatabase from './model/namespaced-database';
import globalData from './model/global-data';
import { parseUrlParams, parseKeyParams } from './common/util';
import getMode from './common/get-mode';

/* 初始化 */
// 解析get参数和插件标识并存储到全局对象中
let params = parseUrlParams(window.location.search);
let keyParams = parseKeyParams(window.location.pathname);
globalData.set({
  ...params,
  ...keyParams,
});
const pluginMode = getMode();

// 如果没有shopId和activityId则报错
if (!keyParams.activityId || !keyParams.shopId) {
  throw new Error(`query \`activityId\` and \`shopId\` must be given`);
}

// 初始化各个命名空间下的重要存储对象
let 
  { activityId } = keyParams,
  namespace = activityId || '',
  localStorage = new NamespacedStorage(namespace, LOCAL_STORAGE),
  sessionStorage = new NamespacedStorage(namespace, SESSION_STORAGE),
  database = createNamespacedDatabase(namespace);

// 在非插件开发环境下，将原生的localStorage和sessionStorage替换为带有命名空间的对象
if (pluginMode === 'prod') {
  Object.defineProperties(window, {
    localStorage: { value: localStorage },
    sessionStorage: { value: sessionStorage },
  });
}

export default {
  Page,
  database,
  ...el,
  ...mp,
};