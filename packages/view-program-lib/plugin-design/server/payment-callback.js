/*
 * @Date: 2020-05-28 09:00:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-06-01 11:06:28
 */ 

/**
 * @description: 支付回调，此代码会在服务端的支付回调中运行，运行完成后需返回true表示执行成功，否则会多次调用
 * @author: JOU(wx: huzhen555)
 * @param {ELServer} elserver 服务端操作对象，通过此录入数据、发放卡券等
 * @param {string} intent 支付意图，可选值有`consumption`(消费)，`recharge`(充值)
 * @param {object} params 用户传递的自定义参数，与客户端传递时的相同
 */ 
async function paymentCallback(elserver) {
  // TODOS: 支付回调处理
  if (elserver.getIntent() === 'prePurchase') {
    await elserver.database.collection('user').update({
      buyCoupons: [elserver.getClientParams('couponGroupId')],
    });
  }
  
  return true;
}

module.entry = paymentCallback;