/*
 * @Date: 2019-08-25 11:53:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 14:01:33
 */
'use strict'
const webpack = require('webpack');
const { paths, moduleUrls } = require('../../config');
const { getEnvConfiguration } = require('./env');
const envConfig = getEnvConfiguration();


module.exports = {
  mode: 'development',  // 这样才不自动压缩代码
  entry: paths.offline(),
  output: {
    path: envConfig.dist,
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': paths.offlineDirectory(),
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //     },
      //   },
      //   include: [paths.offlineDirectory()]
      // },
    ]
  },
  devtool: 'inline-source-map',
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: process.env.NODE_ENV,
        ...envConfig.envs,
      })
    }),
  ],
}