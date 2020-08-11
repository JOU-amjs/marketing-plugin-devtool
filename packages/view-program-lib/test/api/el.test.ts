/*
 * @Date: 2020-08-11 10:40:50
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-11 11:27:14
 */
import * as EL from '../../src/api/el';
var expect = require('expect.js');

// ts 测试编译后文件
describe('测试el api函数', function () {
  describe('EL.subscribeMessage', function () {
    it('订阅单个消息', async () => {
      const subRes = await EL.subscribeMessage({
        activity: {
          notifyData: { name: 'strate', value: 'rree' },
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
  });
});