/*
 * @Date: 2019-12-05 15:01:36
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 19:57:48
 */

import { getShopDishes, getShopDishCategories } from '@/common/request';
import { getCoupons } from '@/common/request';

function createProxyClass(tagName, requestFn) {
  // 用于处理各类数据请求的代理类
  return class EntityProxy {
    static cache = {};
    ids = [];
    fromCache = [];
    dataCallbacks = [];
    // 收集数据参数及数据分发回调
    collectParams(id, dataCallback) {
      if (!id || id.length <= 0) {
        return;
      }
      const ids = Array.isArray(id) ? id : [id];
      ids.forEach(idItem => {
        if (EntityProxy.cache[idItem]) {
          this.fromCache.push(EntityProxy.cache[idItem]);
        } else {
          this.ids.push(idItem);
        }
      });
      this.dataCallbacks.push({ ids, dataCallback });
    }

    // 发送请求，并分发数据
    async request() {
      let entities = this.fromCache;
      if (this.ids.length > 0) {
        const { code, data } = await requestFn(this.ids);
        if (code === 200) {
          entities = entities.concat(data);
        }
      }
      if (entities.length > 0) {
        const dataMap = {};
        entities.forEach(dataItem => dataMap[dataItem[tagName]] = EntityProxy.cache[dataItem[tagName]] = dataItem);
        this.dataCallbacks.forEach(distrubiteItem => {
          const entityData = distrubiteItem.ids.map(idItem => dataMap[idItem]).filter(item => item);
          distrubiteItem.dataCallback(entityData);
        });
      }
      this.fromCache = [];
    }
  }
}

// 各个类型的代理类
const proxies = {
  dish: createProxyClass('dishId', ids => getShopDishes(ids)),
  category: createProxyClass('categoryId', ids => getShopDishCategories(ids)),
  coupon: createProxyClass('id', ids => getCoupons(ids)),
};
const requestProxyMap = {};
// 请求代理，用于多个view-item中需要请求菜品或分类数据
// 使用请求代理将多个请求合并为一个请求发出，并将请求数据分发给指定view-item
export function proxyRequestData(namespace, id, dataCallback) {
  let proxy = requestProxyMap[namespace];
  if (!proxy) {
    proxy = requestProxyMap[namespace] = new proxies[namespace]();
    setTimeout(() => {
      proxy.request();
      delete requestProxyMap[namespace];
    }, 50);   // 50毫秒后发送请求
  }
  proxy.collectParams(id, dataCallback);
}