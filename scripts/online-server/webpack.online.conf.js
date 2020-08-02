/*
 * @Date: 2019-08-25 11:53:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 17:52:42
 */
'use strict'
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { paths, moduleUrls } = require('../../config');
const localApis = require('./local-apis');
const pluginConfig = require(paths.pluginFile());
const { getEnvConfiguration } = require('./env');
const { buildWebpackModule, getDevtool, createWebpackEnvPlugin, buildWebpackAlias } = require('../common-webpack-config');
const envConfig = getEnvConfiguration();
const entryObject = {};

// 使用plugin.json内的onlinePages进行编译和监听
(pluginConfig.onlinePages || []).forEach(({ path }) => {
  entryObject[path] = `${paths.onlineDirectory()}/pages/${path}/index.js`;
});


// class WebpackPolyfillPlugin {
//   apply(compiler) {
//     // compiler.hooks.emit.tap()
//     compiler.plugin('emit', compilation => {
//       console.log(Object.keys(compilation.assets));
//     });
//   }
// }

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: entryObject,
  output: {
    path: envConfig.dist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: buildWebpackAlias(paths.onlineDirectory()),
  },
  module: buildWebpackModule([paths.onlineDirectory()], envConfig.assetsPath),
  devtool: getDevtool(process.env.NODE_ENV),
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    host: moduleUrls.viewProgramPage.host,
    port: moduleUrls.viewProgramPage.port,
    open: false,
    overlay: { warnings: false, errors: true },
    quiet: true, // necessary for FriendlyErrorsPlugin
    inline: true,
    contentBase: moduleUrls.viewProgramPage.publicPath,
    hot: true,
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