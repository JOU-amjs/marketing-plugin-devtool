/*
 * @Date: 2020-07-21 09:51:08
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-21 10:06:45
 */ 
const rm = require('rimraf');
const { paths } = require('../../../config');

module.exports = {
  /**
   * @description: 过滤线下文件
   * @author: JOU(wx: huzhen555)
   */
  filterOfflineFiles() {
    rm.sync(paths.offlineDirectory());
  },

  /**
   * @description: 过滤线上文件
   * @author: JOU(wx: huzhen555)
   */
  filterOnlineFiles() {
    rm.sync(paths.onlineDirectory());
    rm.sync(paths.serverDirectory());
  }
}