/*
 * @Date: 2019-08-27 14:09:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-18 10:20:05
 */

import {
  getShopDishes,
  getShopDishCategories,
  getCoupons
} from "../../common/request";

function _navigate(page, payload) {
  return new Promise(async resolve => {
    let res;

    // 目前都只是demo假数据返回，后续开发页面供开发者自行选择
    if (page === 'dishes') {
      let { data } = await getShopDishes();
      data = Object.values(data);
      if (payload.multiple) {
        const resObj = {};
        for (let i = 0; i < 2; i++) {
          let random = Math.floor(Math.random() * data.length);
          resObj[random] = data[random];
        }
        res = Object.values(resObj);
      }
      else {
        let random = Math.floor(Math.random() * data.length);
        res = data[random];
      }
    }
    else if (page === 'categories') {
      let { data } = await getShopDishCategories();
      data = Object.values(data);
      if (payload.multiple) {
        const resObj = {};
        for (let i = 0; i < 2; i++) {
          let random = Math.floor(Math.random() * data.length);
          resObj[random] = data[random];
        }
        res = Object.values(resObj);
      }
      else {
        let random = Math.floor(Math.random() * data.length);
        res = data[random];
      }
    }
    else if (page === 'date') {
      if (payload.mode === 'multiple') {
        res = ['2019-12-10', '2019-12-12'];
      }
      else if (payload.mode === 'range') {
        res = { startDate: '2019-12-10', endDate: '2019-12-14' };
      }
      else {
        res = '2019-12-10';
      }
    }
    else if (page === 'couponGroup') {
      let { data } = await getCoupons();
      data = Object.values(data);
      if (payload.multiple) {
        const resObj = {};
        for (let i = 0; i < 2; i++) {
          let random = Math.floor(Math.random() * data.length);
          resObj[random] = data[random];
        }
        res = Object.values(resObj);
      }
      else {
        let random = Math.floor(Math.random() * data.length);
        res = data[random];
      }
    }
    else if (page === 'time') {
      res = payload.mode === 'range' ? {
        startTime: '12:00',
        endTime: '21:00',
      } : '12:00';
    }
    resolve(res);
  });
}

export default {
  /**
   * @description: 跳转到native选择菜品页，并异步返回菜品数据
   * @param {object} payload 跳转时传递的参数对象 
   * @return: Promise promise对象，resolve数据为native端选中回传的数据
   */
  selectDishes(params = {}) {
    return _navigate('dishes', params);
  },

  /**
   * @description: 跳转到native选择分类页，并异步返回分类数据
   * @param {object} payload 跳转时传递的参数对象 
   * @return: Promise promise对象，resolve数据为native端选中回传的数据
   */
  selectCategories(params = {}) {
    return _navigate('categories', params);
  },

  /**
   * @description: 跳转到native选择优惠券组页，并异步返回优惠券组数据
   * @return: Promise promise对象，resolve数据为native端选中回传的数据
   */
  selectCouponGroup(params = {}) {
    return _navigate('couponGroup', params);
  },

  /**
   * @description: 跳转到native选择时间页，并异步返回时间数据
   * @return: Promise promise对象，resolve数据为native端选中回传的数据
   */
  selectTime(params = {}) {
    return _navigate('time', params);
  },

  /**
   * @description: 跳转到native选择日期页，并异步返回日期数据
   * @param {object} payload 跳转时传递的参数对象 
   * @return: Promise promise对象，resolve数据为native端选中回传的数据
   */
  selectDate(params = {}) {
    return _navigate('date', params);
  },

  /**
   * @description: 跳转到自定义参数设置页，并异步返回日期数据
   * @author: JOU(wx: huzhen555)
   * @param {object} payload 跳转时传递的参数对象 
   * @return: Promise promise对象，resolve数据为native端选中回传的数据
   */
  fillFormData(params = {}) {
    return _navigate('formData', params);
  },
};