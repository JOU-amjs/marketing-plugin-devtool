/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-11-09 20:51:40
 */
import Page from './page';
import * as el from './api/el';
import * as mp from './api/mp';
import NamespacedStorage, {LOCAL_STORAGE, SESSION_STORAGE } from './model/namespaced-storage-factory';
import { createNamespacedDatabase } from 'ycsh6-helper';
import globalData from './model/global-data';
import { parseUrlParams, parseKeyParams } from './common/util';
import getMode from './common/get-mode';
import { IGeneralObject } from './common/common.inter';
import { javaRequest } from './common/network';

/* 初始化 */
// 解析get参数和插件标识并存储到全局对象中
let params = parseUrlParams(window.location.search);
let hashParams = parseUrlParams(window.location.hash);
let keyParams = parseKeyParams(window.location.pathname);
let pluginMode = getMode();
globalData.set({
  ...params,
  ...hashParams,
  ...keyParams,
  mode: pluginMode,
});

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
  database = createNamespacedDatabase((proxyObject: IGeneralObject<any>) => {
    return javaRequest({
      url: '/mongo/collections/operation', 
      method: 'post',
      data: {
        activityId: namespace,
        pluginId: globalData.get<string>('pluginId'),
        env: getMode() === 'plugin-dev' ? 1 : 2,
        db: proxyObject,
      },
    });
  });

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