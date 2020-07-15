/*
 * @Date: 2020-07-10 16:43:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 12:34:30
 */ 
const path = require('path');
const { readFileSync } = require('fs');
const cacheDir = path.join(__dirname, './__cache');
const cwdfile = path.join(cacheDir, './cwd');
const getCwdpath = () => readFileSync(cwdfile, { encoding: 'utf-8' });

exports.paths = {
  cacheDirectory: cacheDir,
  cwdfile,
  cwdpath: getCwdpath(),
  devtool: __dirname,
  configViewDirectory: `${getCwdpath()}/config-view`,
  configView: `${getCwdpath()}/config-view/index.vue`,
  tempCompiledConfigView: path.join(cacheDir, './config-view.js'),
  offlineDirectory: `${getCwdpath()}/offline`,
  offline: `${getCwdpath()}/offline/index.js`,
  onlineDirectory: `${getCwdpath()}/online`,
  mockConfigData: path.join(__dirname, './mocks/config-data.json'),
  buildDist: path.join(__dirname, './dist'),
  pluginFile: `${getCwdpath()}/plugin.json`,
  scaffoldingMock: {
    shopInfo: `${getCwdpath()}/mocks/shop-info.js`,
    userInfo: `${getCwdpath()}/mocks/shop-info.js`,
    couponInfo: `${getCwdpath()}/mocks/shop-info.js`,
  }
};

const distPath = path.join(__dirname, 'dist-program-views');
exports.moduleUrls = {
  devtoolTemplate: {
    protocol: 'http',
    host: 'localhost',
    port: 18001,
    publicPath: path.join(distPath, 'devtool-template'),
  },
  mpConfigView: {
    protocol: 'http',
    host: 'localhost',
    port: 18002,
    publicPath: path.join(distPath, 'mp-config-view'),
  },
  viewProgramPage: {
    protocol: 'http',
    host: 'localhost',
    port: 18003,
    publicPath: path.join(distPath, 'view-program-page'),
  },
}