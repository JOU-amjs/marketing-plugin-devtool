/*
 * @Date: 2019-12-05 11:30:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-10 18:02:48
 */
import axios from 'axios';
import { createSign, localDataMap } from './util';

const request = axios.create({
  // api的base_url
  baseURL: localDataMap.get('rootUrl') || 'http://localhost:18002',
  timeout: 30000, // 请求超时时间
});

// 请求拦截器，添加参数
request.interceptors.request.use(config => {
  const params = config.params = config.params || {};
  params.timestamp = Date.parse(new Date()) / 1000;
  params.shopId = localDataMap.get('shopId');
  params.platform = localDataMap.get('platform');
  params.sign = createSign(params);

  // 添加headers
  const accessToken = localDataMap.get('accessToken');
  if (accessToken) {
    config.headers[config.method.toLowerCase() || 'get']['x-access-token'] = accessToken;
  }
  return config;
});
// 响应拦截器 
request.interceptors.response.use(response => {
  return response.data;
})

//////////////////////////////
//////////////////////////////
// api方法列表
// 获取配置页组件和初始参数 
export function getConfigComponent(params) {
  return request({
    url: '/v1/get_mp_config_component',
    params,
  });
}

// 获取指定菜品信息
export function getShopDishes(dishIds) {
  return request({
    url: '/v1/get_shop_dishes',
    params: { dishIds },
  });
}

// 获取指定菜品分类信息
export function getShopDishCategories(catIds) {
  return request({
    url: '/v1/get_shop_dish_categories',
    params: { catIds },
  });
}