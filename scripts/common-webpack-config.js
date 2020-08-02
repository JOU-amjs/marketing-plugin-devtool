/*
 * @Date: 2020-08-02 17:33:41
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 17:52:31
 */

const webpack = require('webpack');
const { paths } = require('../config');

/**
 * @description: 构建webpack module对象
 * @author: JOU(wx: huzhen555)
 * @param {string[]} babelIncludePaths 需要babel编译的目录路径
 * @param {string}   assetsPath 编译的资源路径
 * @return: 
 */
exports.buildWebpackModule = function(babelIncludePaths, assetsPath) {
  return {
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
        include: babelIncludePaths || [],
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
          esModule: false,
          limit: 5012,
          name: 'img/[name].[hash:7].[ext]',
          publicPath: assetsPath || '',
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 5012,
          name: 'media/[name]_[hash:7].[ext]',
          publicPath: assetsPath || '',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 5012,
          name: 'font/[name]_[hash:7].[ext]',
          publicPath: assetsPath || '',
        }
      }
    ]
  };
}

/**
 * @description: 获取webpack devtool参数
 * @author: JOU(wx: huzhen555)
 * @param {string} nodeEnv NODE_ENV
 * @return: devtool参数
 */
exports.getDevtool = function(nodeEnv) {
  return nodeEnv === 'production' ? false : 'inline-source-map';
}

/**
 * @description: 创建webpack环境变量插件对象
 * @author: JOU(wx: huzhen555)
 * @param {object} envs 环境变量对象
 * @return: definePlugin对象
 */
exports.createWebpackEnvPlugin = function(envs) {
  return new webpack.DefinePlugin({
    'process.env': JSON.stringify({
      NODE_ENV: process.env.NODE_ENV,
      ...(envs || {}),
    })
  });
}

/**
 * @description: 构建webpack alias参数
 * @author: JOU(wx: huzhen555)
 * @param {string} subRoot 子目录的路径
 * @return: alias对象
 */
exports.buildWebpackAlias = function(subRoot) {
  return {
    '@@': paths.scaffolding(),
    '@': subRoot,
  };
}