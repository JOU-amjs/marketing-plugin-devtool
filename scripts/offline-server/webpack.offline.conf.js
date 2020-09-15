/*
 * @Date: 2019-08-25 11:53:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-28 17:22:02
 */
'use strict'
const { paths, moduleUrls } = require('../../config');
const { getEnvConfiguration } = require('./env');
const { createWebpackEnvPlugin, buildWebpackAlias, getDevtool } = require('../common-webpack-config');
const envConfig = getEnvConfiguration();

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: paths.offline(),
  output: {
    path: envConfig.dist,
    filename: 'index.js',
    library: 'mpClass',
    libraryTarget: 'this',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: buildWebpackAlias(paths.offlineDirectory()),
  },
  devtool: getDevtool(process.env.NODE_ENV),
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    host: moduleUrls.shopfrontOrder.host,
    port: moduleUrls.shopfrontOrder.port,
    open: false,
    overlay: { warnings: false, errors: true },
    quiet: true, // necessary for FriendlyErrorsPlugin
    inline: true,
    contentBase: moduleUrls.shopfrontOrder.publicPath,
  },
  plugins: [
    createWebpackEnvPlugin(envConfig.envs),
  ],
}