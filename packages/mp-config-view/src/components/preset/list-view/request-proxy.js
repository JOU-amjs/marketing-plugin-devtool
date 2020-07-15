/*
 * @Date: 2019-12-05 15:01:36
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-05 21:04:14
 */

import { getShopDishes, getShopDishCategories } from '@/common/request';

// 用于处理菜品数据请求的代理类
class DishesProxy {
  static dishesCache = {};
  ids = [];
  dishesFromCache = [];
  dataCallbacks = [];
  // 手机数据参数及数据分发回调
  collectParams(id, dataCallback) {
    if (!id || id.length <= 0) {
      return;
    }
    const ids = Array.isArray(id) ? id : [id];
    ids.forEach(idItem => {
      if (DishesProxy.dishesCache[idItem]) {
        this.dishesFromCache.push(DishesProxy.dishesCache[idItem]);
      } else {
        this.ids.push(idItem);
      }
    });
    this.dataCallbacks.push({ ids, dataCallback });
  }

  // 发送请求，并分发数据
  async request() {
    let dishes = this.dishesFromCache;
    if (this.ids.length > 0) {
      const { code, data } = await getShopDishes(this.ids.join(','));
      if (code === 200) {
        dishes = dishes.concat(data);
      }
    }
    if (dishes.length > 0) {
      const dataMap = {};
      dishes.forEach(dataItem => dataMap[dataItem.dishId] = DishesProxy.dishesCache[dataItem.dishId] = dataItem);
      this.dataCallbacks.forEach(distrubiteItem => {
        const dishData = distrubiteItem.ids.map(idItem => dataMap[idItem]).filter(dishObj => dishObj);
        distrubiteItem.dataCallback(dishData);
      });
    }
    this.dishesFromCache = [];
  }
}
// 用于处理菜品分类数据请求的代理类
class CategoriesProxy {
  static catsCache = {};
  ids = [];
  dataCallbacks = [];
  catsFromCache = [];
  // 手机数据参数及数据分发回调
  collectParams(id, dataCallback) {
    if (!id || id.length <= 0) {
      return;
    }
    const ids = (Array.isArray(id) ? id : [id])
    ids.forEach(idItem => {
      if (CategoriesProxy.catsCache[idItem]) {
        this.catsFromCache.push(CategoriesProxy.catsCache[idItem]);
      } else {
        this.ids.push(idItem);
      }
    });
    this.dataCallbacks.push({ ids, dataCallback });
  }

  // 发送请求，并分发数据
  async request() {
    let categories = this.catsFromCache;
    if (this.ids.length > 0) {
      const { code, data } = await getShopDishCategories(this.ids.join(','));
      if (code === 200) {
        categories = categories.concat(data);
      }
    }
    
    if (categories.length > 0) {
      const dataMap = {};
      categories.forEach(dataItem => dataMap[dataItem.categoryId] = CategoriesProxy.catsCache[dataItem.categoryId] = dataItem);
      this.dataCallbacks.forEach(distrubiteItem => {
        const categoryData = distrubiteItem.ids.map(idItem => dataMap[idItem]).filter(dishObj => dishObj);
        distrubiteItem.dataCallback(categoryData);
      });
    }
    this.catsFromCache = [];
  }
}

// 各个类型的代理类
const proxies = {
  dish: DishesProxy,
  category: CategoriesProxy,
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