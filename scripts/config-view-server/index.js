/*
 * @Date: 2020-07-13 10:28:04
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 13:25:39
 */

const CompileServer = require('../../common/compile-server');
const { moduleUrls, paths } = require('../../config');
const { host, port } = moduleUrls.mpConfigView;
const { join } = require('path');

module.exports = new CompileServer(
  'configView', 
  host, 
  port, 
  join(paths.scriptsDirectory, './config-view-server/webpack.configview.conf.js')
);