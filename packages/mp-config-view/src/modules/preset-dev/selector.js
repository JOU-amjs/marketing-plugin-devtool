/*
 * @Date: 2019-08-27 14:09:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-05 17:18:14
 */

import { getShopDishes, getShopDishCategories } from "../../common/request";

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
  selectCoupons() {
    return _navigate('coupons');
  },

  /**
   * @description: 跳转到native选择时间页，并异步返回时间数据
   * @return: Promise promise对象，resolve数据为native端选中回传的数据
   */
  selectTime() {
    return _navigate('time');
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