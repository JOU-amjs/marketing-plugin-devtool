/*
 * @Date: 2020-07-15 14:16:20
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 15:30:28
 */ 

import callServerFunction from '../../src/common/network/call-server-function';
var expect = require('expect.js');

describe('测试common/network/call-server-function.ts', function () {
  it('post请求成功(需在服务端开启模拟接口)', async () => {
    try {
      let shopInfo = await callServerFunction<any>({ name: 'getShopInfo' });
      expect(typeof shopInfo).to.equal('object');
    } catch (error) {
      throw new Error('请求失败，请检查是否启动localhost:18001服务器');
    }
  });
});