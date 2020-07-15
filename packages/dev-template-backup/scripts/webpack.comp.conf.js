/*
 * @Date: 2019-08-25 11:53:13
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-04 16:42:38
 */
'use strict'
const path = require('path');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // mode: 'development',
  // entry: './src/configure-view/index.vue',
  output: {
    path: resolve('dist'),
    filename: 'configure-view.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  externals: {
    vue: 'vue',
    axios: 'axios'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: false,
          loaders: {
            css: ['vue-style-loader', {
              loader: 'css-loader',
            }],
          },
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
        include: [resolve('src')]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //   ]
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name]_[hash:7].[ext]',
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name]_[hash:7].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/font/[name]_[hash].[ext]',
        }
      }
    ]
  },
  plugins: [
    // new VueLoaderPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': '(' + JSON.stringify({
    //     NODE_ENV: 'development222',
    //   }) + ')'
    // }),
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // })
  ],
}