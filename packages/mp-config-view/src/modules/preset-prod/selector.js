/*
 * @Date: 2019-07-09 14:35:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-15 20:29:08
 */
import invoke from 'react-native-webview-invoke/browser';

// ①selectDishes：返回promise，内部为跳转页面返回时传递的参数；②selectCategories：同上；③selectTime：同上；④selectDate：同上；⑤selectCoupon：同上；⑥onSubmit：参数为回调函数，供rn端提交参数时调用；⑧_emitSelected：触发select系列函数的回调函数，此函数参数为rn端回传的json字符串；
let navigateDataReturnCallback;
/**
 * @description: 跳转到native指定页面
 * @param {string}  page 跳转的native页面
 * @param {any}     payload 传递给native页的参数
 * @return: Promise promise对象，resolve数据为native端选中回传的数据
 */
function _navigate(page, payload) {
  if (!page) {
    throw Error('需指定跳转的native页面');
  }
  return new Promise(resolve => {
    navigateDataReturnCallback = data => resolve(data);
    invoke.fn.navigate(page, payload);
  });
}
/**
 * @description: native端选择数据后触发此函数将选择数据传递给web端
 * @param {any}   data native端回传给web端的数据 
 * @return: void
 */
invoke.define('_emitSelected', data => {
  (navigateDataReturnCallback || (() => {}))(data);
  navigateDataReturnCallback = undefined;
});

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