/*
 * @Date: 2020-07-15 09:44:49
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-21 16:58:16
 */ 
import { environmentValue } from '../../src/common/config';
import { parseKeyParams, buildViewProgramUrl } from '../../src/common/util';
var expect = require('expect.js');

describe('测试common/util.ts', function () {
  describe('测试environmentValue函数', function () {
    const options = {
      'plugin-dev': 'https://plugin-dev',
      prod: 'https://prod',
    };

    it('production环境下输出prod-prod的值', () => {
      const host = environmentValue(options);
      expect(host).to.equal('https://prod');
    });
  });

  describe('测试parseKeyParams函数', function () {
    const pathname = '/testPlugin/1/2/online/index/';
    it('可以获取到正确的值', () => {
      const { pluginId, activityId, shopId } = parseKeyParams(pathname);
      expect(pluginId).to.equal('testPlugin');
      expect(activityId).to.equal('1');
      expect(shopId).to.equal('2');
    });

    it('没有`online`关键字将会解析出错', () => {
      const errorPathname = '/testPlugin/1/2/index/';
      expect(() => {
        parseKeyParams(errorPathname);
      }).to.throwError();
    });
  });

  describe('测试buildViewProgramUrl函数', () => {
    it('不带query参数的url', () => {
      let path = buildViewProgramUrl('test_plugin', '1', '1', 'index', 'first');
      expect(path).to.equal('/test_plugin/1/1/online/index/?accessToken=#/first');
    });
    it('带query参数的url', () => {
      let path = buildViewProgramUrl('test_plugin', '1', '1', 'index', 'first', { aa: 1, bb: 2 });
      expect(path).to.equal('/test_plugin/1/1/online/index/?accessToken=#/first?aa=1&bb=2');
    });
  });
});