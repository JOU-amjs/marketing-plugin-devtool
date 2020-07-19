/*
 * @Date: 2019-08-25 11:53:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:09:30
 */
'use strict'
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { paths, moduleUrls } = require('../../config');
const localApis = require('./local-apis');
const { getEnvConfiguration } = require('./env');
const envConfig = getEnvConfiguration();

module.exports = {
  mode: 'development',
  entry: paths.configView(),
  output: {
    path: envConfig.dist,
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': paths.configViewDirectory(),
    }
  },
  externals: {
    vue: 'vue',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            transformToRequire: {
              video: 'src',
              source: 'src',
              img: 'src',
              image: 'xlink:href',
            }
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          },
        },
        include: [paths.configViewDirectory()]
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
          name: path.join(paths.distDirectory.configView, 'img/[name]_[hash:7].[ext]'),
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(paths.distDirectory.configView, 'media/[name]_[hash:7].[ext]'),
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(paths.distDirectory.configView, 'font/[name]_[hash].[ext]'),
        }
      }
    ]
  },
  devtool: 'inline-source-map',
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: process.env.NODE_ENV,
        ...envConfig.envs,
      })
    }),
  ],
}