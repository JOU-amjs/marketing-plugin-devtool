/*
 * @Date: 2020-07-15 11:45:15
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:54:42
 */ 
const { paths } = require('../../../config');
const { Router } = require('express');
const { readConfigData, setCors } = require('../common/utils');
const router = Router();
const viewProgramObject = {
  getShopInfo() {
    const shopInfo = require(paths.scaffoldingMock.shopInfo());
    return shopInfo;
  },
  getUserInfo() {
    const userInfo = require(paths.scaffoldingMock.userInfo());
    return userInfo;
  },
  getCouponInfo(data) {
    const couponInfo = require(paths.scaffoldingMock.couponInfo());
    let groupIds = Array.isArray(data.groupId) ? data.groupId : [data.groupId];
    let resData = groupIds.map(idItem => couponInfo[idItem]).filter(item => item);
    return  groupIds.length > 1 ? resData : resData[0];
  },
  getConfiguration() {
    return readConfigData();
  }
}

setCors(router);
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