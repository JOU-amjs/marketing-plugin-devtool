/*
 * @Date: 2019-08-25 11:53:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 17:57:11
 */
'use strict'
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { paths, moduleUrls } = require('../../config');
const localApis = require('./local-apis');
const { getEnvConfiguration } = require('./env');
const { getDevtool, createWebpackEnvPlugin, buildWebpackModule, buildWebpackAlias } = require('../common-webpack-config');
const envConfig = getEnvConfiguration();

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: paths.configView(),
  output: {
    path: envConfig.dist,
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: buildWebpackAlias(paths.configViewDirectory()),
  },
  externals: {
    vue: 'vue',
  },
  module: buildWebpackModule([paths.configViewDirectory()], envConfig.assetsPath),
  devtool: getDevtool(process.env.NODE_ENV),
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    host: moduleUrls.mpConfigView.host,
    port: moduleUrls.mpConfigView.port,
    open: false,
    overlay: { warnings: false, errors: true },
    contentBase: moduleUrls.mpConfigView.publicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
    inline: true,
    before(app) {
      Object.keys(localApis).forEach(path => {
        let callingApi = localApis[path];
        if (typeof callingApi === 'function') {
          callingApi = { callback: callingApi, method: 'get' };
        }
        app[callingApi.method.toLowerCase()](path, callingApi.callback);
      });
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    createWebpackEnvPlugin(envConfig.envs),
  ],
}