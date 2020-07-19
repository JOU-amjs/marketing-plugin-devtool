/*
 * @Date: 2020-07-13 10:52:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 13:24:53
 */

const CompileServer = require('../../common/compile-server');
const { moduleUrls, paths } = require('../../config');
const { host, port } = moduleUrls.viewProgramPage;
const { join } = require('path');

module.exports = new CompileServer(
  'online', 
  host, 
  port, 
  join(paths.scriptsDirectory, './online-server/webpack.online.conf.js')
);