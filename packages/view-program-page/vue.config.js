/*
 * @Date: 2020-06-02 15:54:23
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-26 17:21:09
 */ 
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  lintOnSave: false,
  outputDir: '../../dist-program-views/view-program-page',
  chainWebpack: config => {
    // 自动注入通用的scss，不需要自己在每个文件里手动注入
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      config.module.rule('scss').oneOf(type)
      .use('sass-resource')
      .loader('sass-resources-loader')
      .options({
        resources: [
          path.resolve(__dirname, './src/assets/styles/global.scss'),
        ],
      });
    });

    // 添加插件
    config.plugin('compression').use(CompressionWebpackPlugin, [{
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    }]);
  },
};