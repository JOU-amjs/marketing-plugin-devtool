/*
 * @Date: 2020-07-15 11:45:15
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-26 15:48:28
 */ 
const { paths } = require('../../../config');
const { Router } = require('express');
const { readConfigData, setCors, getServerModule } = require('../common/utils');
const Server = require('../common/Server').default;
const { createNamespacedDatabase } = require('ycsh6-helper');
const { javaHost } = require('../common/config');
const axios = require('axios').default;

const router = Router();
const viewProgramObject = {
  getShopInfo() {
    const shopInfo = require(paths.scaffoldingMock.shopInfo());
    return shopInfo;
  },
  getUserInfo(data) {
    const userInfo = require(paths.scaffoldingMock.userInfo());
    if (!data.info || data.info === 0) {
      return { userId: userInfo.userId };
    }
    else if (data.info === 1) {
      return {
        userId: userInfo.userId,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        gender: userInfo.gender,
        province: userInfo.province,
        city: userInfo.city,
      };
    }
    else if (data.info === 2) {
      return {
        userId: userInfo.userId,
        level: userInfo.level,
        levelTheme: userInfo.levelTheme,
        alias: userInfo.alias,
        color: userInfo.color,
        icon: userInfo.icon,
        nextLevelValue: userInfo.nextLevelValue,
      };
    }
    return userInfo;
  },
  getCouponInfo(data) {
    const couponInfo = require(paths.scaffoldingMock.couponInfo());
    let groupIds = Array.isArray(data.groupId) ? data.groupId : [data.groupId];
    let resData = groupIds.map(idItem => couponInfo[idItem]).filter(item => item);
    return  typeof data.groupId === 'string' ? resData[0] : resData;
  },
  getConfiguration() {
    return readConfigData();
  },
  giveCoupon(_) {
    return {
      couponId: 123,
      couponName: '测试优惠券',
      couponStr: '可抵用10元',
      useLimit: '周六日不可用',
      useDays: 30,
    };
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

// 模拟nodejs服务端运行支付成功和失败回调
router.post('/callback_payment', async (request, response) => {
  let {
    activityId,
    pluginId,
    type,
    intent,
    clientParams,
  } = request.body;
  let ret = { code: 200 };
  try {
    let mpConfig = readConfigData();
    // 创建营销程序类的对象，并初始化
    let moduleReturnValue = true;   // 如果插件没有回调，则直接通过支付回调
    const server = new Server(
      intent, 
      createNamespacedDatabase(proxyObject => {
        return axios.post('/mongo/collections/operation', {
          activityId,
          pluginId,
          env: 1,   // 1表示开发环境，2表示生产环境
          db: proxyObject,
        }, {
          baseURL: javaHost,
          headers: {
            'Content-Type': 'application/json;charset=utf-8;',
            'x-access-token': request.headers['x-access-token'],
          }
        });
      }),
      mpConfig,
      clientParams,
    );
    let exportedModule = getServerModule('payment-callback');
    if (type === 'payed' && exportedModule.payed) {
      moduleReturnValue = await exportedModule.payed(server);
    }
    else if (type === 'refund' && exportedModule.refund) {
      moduleReturnValue = await exportedModule.refund(server);
    }
    ret.data = { moduleReturnValue };
  } catch(error) {
    ret.code = 500;
    ret.message = error.stack;
  }
  response.json(ret);
});

module.exports = router;