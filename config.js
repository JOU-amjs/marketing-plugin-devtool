/*
 * @Date: 2020-07-10 16:43:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 23:29:06
 */ 
const { join } = require('path');
const cacheDir = join(__dirname, './.cache');

exports.paths = {
  cacheDirectory: cacheDir,
  scaffolding: () => process.cwd(),
  devtool: __dirname,
  configViewDirectory: () => `${process.cwd()}/config-view`,
  configView: () => `${process.cwd()}/config-view/index.vue`,
  tempCompiledConfigView: join(cacheDir, './config-view.js'),
  offlineDirectory: () => `${process.cwd()}/offline`,
  offline: () => `${process.cwd()}/offline/index.js`,
  onlineDirectory: () => `${process.cwd()}/online`,
  assets: () => `${process.cwd()}/assets`,
  serverDirectory: () => `${process.cwd()}/server`,
  mockConfigData: () => `${process.cwd()}/mocks/config-data.json`,
  pluginFile: () => `${process.cwd()}/plugin.json`,
  scaffoldingMock: {
    shopInfo: () => `${process.cwd()}/mocks/shop-info.js`,
    userInfo: () => `${process.cwd()}/mocks/user-info.js`,
    couponInfo: () => `${process.cwd()}/mocks/coupon-info.js`,
    dishes: () => `${process.cwd()}/mocks/dishes.js`,
    category: () => `${process.cwd()}/mocks/categories.js`,
  },
  envVariable: {
    configView: () => `${process.cwd()}/env/config-view.env.js`,
    online: () => `${process.cwd()}/env/online.env.js`,
    offline: () => `${process.cwd()}/env/offline.env.js`,
  },
  distDirectory: {
    root: join(__dirname, './dist'),
    assets: join(__dirname, './dist/assets'),
    configView: join(__dirname, './dist/config-view'),
    online: join(__dirname, './dist/online'),
    offline: join(__dirname, './dist/offline'),
    server: join(__dirname, './dist/server'),
  },
  compiledZipFile: join(cacheDir, './dist.zip'),
  scriptsDirectory: join(__dirname, './scripts'),
};

const distPath = join(__dirname, 'dist-program-views');
exports.moduleUrls = {
  devtoolTemplate: {
    protocol: 'http',
    host: 'localhost',
    port: 18001,
    publicPath: join(distPath, 'devtool-template'),
  },
  mpConfigView: {
    protocol: 'http',
    host: 'localhost',
    port: 18002,
    publicPath: join(distPath, 'mp-config-view'),
  },
  viewProgramPage: {
    protocol: 'http',
    host: 'localhost',
    port: 18003,
    publicPath: join(distPath, 'view-program-page'),
  },
  shopfrontOrder: {
    protocol: 'http',
    host: 'localhost',
    port: 18004,
    publicPath: join(distPath, 'shopfront-order'),
  },
};

// java服务端地址
exports.host = 'http://148.70.36.197:8080';

// 用于接口签名的key和分隔符，需与服务器一致
exports.apiSign = {
  connectSymbol: '-',
  key: 'sd8mow3RPMDS0PMPmMP98AS2RG43T',
};