/*
 * @Date: 2020-05-28 09:00:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-07 17:17:05
 */ 

/**
 * @description: 支付成功的回调函数，此代码会在服务端的支付回调中运行，运行完成后需返回true表示执行成功，否则会多次调用
 * @author: JOU(wx: huzhen555)
 * @param {ELServer} elServer 服务端操作对象，通过此录入数据、发放卡券等
 * @returns {boolean} 是否处理成功
 */
async function payed(elServer) {
  // TODOS: 支付回调处理
  if (elServer.getIntent() === 'prePurchase') {
    await elServer.database.user.update({
      buyCoupons: [elServer.getClientParams('couponGroupId')],
    });
  }
  return true;
}

/**
 * @description: 退款成功的回调函数，此代码会在服务端的退款回调中运行，运行完成后需返回true表示执行成功，否则会多次调用
 * @author: JOU(wx: huzhen555)
 * @param {ELServer} elServer 服务端操作对象，通过此录入数据、发放卡券等
 * @returns {boolean} 是否处理成功
 */
async function refund(elServer) {
  // TODOS: 支付退款回调
  
}

module.exports = { payed, refund };