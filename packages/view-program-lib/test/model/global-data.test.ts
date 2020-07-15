/*
 * @Date: 2020-04-09 14:17:42
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-06-02 14:31:20
 */
import globalData from '../../src/model/global-data';
var expect = require('expect.js');

// ts 测试编译后文件
describe('测试global-data.ts', function () {
  describe('保存单个值', function () {
    it('单个值保存成功', () => {
      globalData.set('testKey', 'value');
      expect(globalData.get<string>('testKey')).to.equal('value');
    });
  });

  describe('保存多个值', function () {
    it('多个值保存成功', function () {
      globalData.set({
        testKey1: 'value1',
        testKey2: 'value2',
      });
      expect(globalData.get<string>('testKey1')).to.equal('value1');
      expect(globalData.get<string>('testKey2')).to.equal('value2');
    });
  });
});