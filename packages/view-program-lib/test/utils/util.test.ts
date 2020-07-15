/*
 * @Date: 2020-07-15 09:44:49
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 14:56:43
 */ 
import { environmentValue } from '../../src/common/config';
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
});