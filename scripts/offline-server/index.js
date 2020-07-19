/*
 * @Date: 2020-07-13 10:52:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 13:24:41
 */

const CompileServer = require('../../common/compile-server');
const { moduleUrls, paths } = require('../../config');
const { host, port } = moduleUrls.shopfrontOrder;
const { join } = require('path');

module.exports = new CompileServer(
  'offline', 
  host, 
  port, 
  join(paths.scriptsDirectory, './offline-server/webpack.offline.conf.js')
);