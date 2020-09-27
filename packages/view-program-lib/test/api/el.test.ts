/*
 * @Date: 2020-08-11 10:40:50
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-22 11:56:46
 */
import * as EL from '../../src/api/el';
import { mockProdEnvironment } from '../../src/common/config';
var expect = require('expect.js');

mockProdEnvironment();  // 测试api必须调用
// ts 测试编译后文件
describe('测试el api函数', function () {
  describe('EL.subscribeMessage', function () {
    it('订阅单个消息', async () => {
      const subRes = await EL.subscribeMessage({
        activity: {
          notifyData: ['val1', 'val2', 'val3', 'val4'],
          timing: new Date(),
          path: 'index',
          query: {
            a: 1,
            b: 2,
          }
        }
      }, '提示文字', '按钮文字');
      expect(subRes).to.eql({ activity: 'accept' });
    });
    it('订阅多条消息', async () => {
      const subRes = await EL.subscribeMessage({
        activity: {
          notifyData: ['val1', 'val2', 'val3', 'val4'],
          timing: new Date(),
          path: 'index',
        },
        payResult: {
          notifyData: ['abc', 'ddd'],
          timing: new Date(),
          path: 'index',
          query: {
            a: 1,
            b: 2,
          }
        }
      }, '提示文字', '按钮文字');
      expect(subRes).to.eql({ activity: 'accept', payResult: 'accept' });
    });
  });

  // describe('EL.getDishInfo', () => {
  //   it('不是套餐时没有suitsDishes', async () => {
  //     await EL.getDishInfo('1');
      
  //   });

  //   it('套餐时有suitsDishes', async () => {
  //     // let dishInfo = await EL.getDishInfo('9');
  //     // console.log(dishInfo);
  //   });
  // });

  describe('EL.getUserInfo(需在服务端开启模拟接口)', () => {
    it('获取用户id', async () => {
      let userInfo = await EL.getUserInfo();
      expect(userInfo.hasOwnProperty('userId')).to.equal(true);
      expect(Object.values(userInfo).length).to.equal(1);
    });
    it('获取用户信息', async () => {
      let userInfo = await EL.getUserInfo<'person'>(EL.userInfo.PERSON, '登录提示');
      expect(Object.values(userInfo).length).to.equal(6);
    });
    it('获取用户门店信息', async () => {
      let userInfo = await EL.getUserInfo<'loyalty'>(EL.userInfo.LOYALTY);
      expect(Object.values(userInfo).length).to.equal(4);
      expect(userInfo.hasOwnProperty('levelTheme')).to.equal(true);
      expect(userInfo.hasOwnProperty('level')).to.equal(true);
    });
    it('获取用户完整信息', async () => {
      let userInfo = await EL.getUserInfo<'whole'>(EL.userInfo.WHOLE, '登录提示');
      expect(Object.values(userInfo).length).to.equal(9);
    });
  });
});