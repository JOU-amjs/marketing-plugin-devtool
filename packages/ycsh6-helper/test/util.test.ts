/*
 * @Date: 2020-06-02 14:42:16
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-09 09:55:20
 */ 
import { buildAssetsPath } from '../src/common/utils';
import expect = require('expect.js');

describe('测试utils.ts', function () {
  describe('buildAssetsPath', function () {
    it('插件图片地址(地址将会自动处理斜杆)', async () => {
      let path1 = buildAssetsPath('program', 'assets/aa.jpg', 'test_plugin');
      let path2 = buildAssetsPath('program', '/assets/aa.jpg', '/test_plugin/');
      expect(path1).to.equal('https://static.ycsh6.com/program/test_plugin/assets/aa.jpg');
      expect(path2).to.equal('https://static.ycsh6.com/program/test_plugin/assets/aa.jpg');
    });
    it('头像图片地址(地址将会自动处理斜杆)', async () => {
      let path1 = buildAssetsPath('avatar', 'avatar/assets/aa.jpg');
      let path2 = buildAssetsPath('avatar', '/avatar/assets/aa.jpg');
      expect(path1).to.equal('https://static.ycsh6.com/avatar/assets/aa.jpg');
      expect(path2).to.equal('https://static.ycsh6.com/avatar/assets/aa.jpg');
    });
    it('以http或https开头的绝对地址不会被处理', async () => {
      let path = buildAssetsPath('avatar', 'https://txt.com/avatar/assets/aa.jpg');
      expect(path).to.equal('https://txt.com/avatar/assets/aa.jpg');
    });
  });
});