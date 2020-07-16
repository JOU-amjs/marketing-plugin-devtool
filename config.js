/*
 * @Date: 2020-07-10 16:43:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-16 09:16:32
 */ 
const path = require('path');
const cacheDir = path.join(__dirname, './__cache');

exports.paths = {
  cacheDirectory: cacheDir,
  scaffolding: process.cwd(),
  devtool: __dirname,
  configViewDirectory: () => `${process.cwd()}/config-view`,
  configView: () => `${process.cwd()}/config-view/index.vue`,
  tempCompiledConfigView: path.join(cacheDir, './config-view.js'),
  offlineDirectory: () => `${process.cwd()}/offline`,
  offline: () => `${process.cwd()}/offline/index.js`,
  onlineDirectory: () => `${process.cwd()}/online`,
  mockConfigData: path.join(__dirname, './mocks/config-data.json'),
  buildDist: path.join(__dirname, './dist'),
  pluginFile: () => `${process.cwd()}/plugin.json`,
  scaffoldingMock: {
    shopInfo: () => `${process.cwd()}/mocks/shop-info.js`,
    userInfo: () => `${process.cwd()}/mocks/shop-info.js`,
    couponInfo: () => `${process.cwd()}/mocks/shop-info.js`,
  },
  scaffoldingTemplate: path.join(__dirname, './packages/plugin-scaffolding'),
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