/*
 * @Date: 2020-07-13 10:52:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 10:53:01
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.conf');

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  progress: false,
  stats: {
    colors: true,
  },
});

// 启动webpack开发服务器
exports.start = (host, port) => {
  return new Promise(resolve => {
    new WebpackDevServer(compiler, devServerOptions)
    .listen(port, host, resolve);
  });
};