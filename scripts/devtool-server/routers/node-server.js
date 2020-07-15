/*
 * @Date: 2020-07-15 11:45:15
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 16:05:11
 */ 
const { paths } = require('../../../config');
const { Router } = require('express');
const { readConfigData } = require('../common/utils');
const router = Router();
const viewProgramObject = {
  getShopInfo() {
    const shopInfo = require(paths.scaffoldingMock.shopInfo);
    return shopInfo;
  },
  getUserInfo() {
    const userInfo = require(paths.scaffoldingMock.userInfo);
    return userInfo;
  },
  getCouponInfo() {
    const couponInfo = require(paths.scaffoldingMock.couponInfo);
    return couponInfo;
  },
  getConfiguration() {
    return readConfigData();
  }
}

// 模拟调用视图营销插件的各类function
router.post('/call_viewprogramme_function', (request, response) => {
  let { name, data } = request.body;
  let dataFn = viewProgramObject[name];
  let code = 200, resVal, message = '';
  if (typeof dataFn === 'function') {
    resVal = dataFn(data);
  }
  else {
    code = 500;
    message = '未找到对应函数';
  }
  
  response.json({
    code,
    data: resVal,
    message,
  });
});

module.exports = router;