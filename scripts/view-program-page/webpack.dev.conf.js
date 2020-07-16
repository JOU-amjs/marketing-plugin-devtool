/*
 * @Date: 2019-08-25 11:53:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 16:34:00
 */
'use strict'
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { paths, moduleUrls } = require('../../config');
const localApis = require('./local-apis');
const pluginConfig = require(paths.pluginFile());
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
    path: paths.buildDist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': paths.onlineDirectory(),
    }
  },
  // externals: {
    // vue: 'vue',
    // axios: 'axios'
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href',
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [paths.offlineDirectory()]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(paths.buildDist, 'img/[name]_[hash:7].[ext]'),
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(paths.buildDist, 'media/[name]_[hash:7].[ext]'),
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(paths.buildDist, 'font/[name]_[hash].[ext]'),
        }
      }
    ]
  },
  devtool: 'inline-source-map',
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
    new webpack.DefinePlugin({
      'process.env': '(' + JSON.stringify({
        NODE_ENV: 'development',
      }) + ')'
    }),
    // new WebpackPolyfillPlugin(),
  ],
}