/*
 * @Date: 2019-12-05 11:30:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 20:56:26
 */
import axios from 'axios';
import { createSign, localDataMap } from './util';

let baseURL = localDataMap.get('rootUrl');
if (!baseURL) {
  // 如果baseURL没有且在生产环境下，则它是在开发工具中运行的
  baseURL = process.env.NODE_ENV === 'production' ? 'http://localhost:18002' : 'http://localhost:7001';
}
const request = axios.create({
  // api的base_url
  baseURL,
  timeout: 30000, // 请求超时时间
});

// 请求拦截器，添加参数
request.interceptors.request.use(config => {
  let isDev = process.env.NODE_ENV === 'development';
  const params = config.params = config.params || {};
  params.timestamp = Date.parse(new Date()) / 1000;
  params.shopId = localDataMap.get('shopId');
  params.platform = isDev ? 'browser' : localDataMap.get('platform');
  params.sign = createSign(params);

  // 添加headers
  const accessToken = isDev ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTU5NzAyNjAwNCwiZXhwIjoxNjI4MTMwMDA0fQ.vdgPdm6Fz_VmwirlX1RXn1DzfVzDTb091HIJthfUITE' : localDataMap.get('accessToken');
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
  return request.get('/v1/get_shop_dishes', {
    params: { dishIds: (dishIds || []).join() },
  });
}

// 获取指定菜品分类信息
export function getShopDishCategories(catIds) {
  return request.get('/v1/get_shop_dish_categories', {
    params: { catIds: (catIds || []).join() },
  });
}

export function getCoupons(couponIds) {
  return request.get('/v1/get_shop_coupon_groups', {
    params: { couponGroupIds: (couponIds || []).join() }
  })
}