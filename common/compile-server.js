/*
 * @Date: 2020-07-18 12:52:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:05:50
 */ 
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = class CompileServer {
  host = '';
  port = '';
  confFilePath = '';
  name = '';
  constructor(partial, host, port, confFilePath) {
    this.host = host;
    this.port = port;
    this.confFilePath = confFilePath;
    this.name = ({
      online: '营销插件视图部分',
      offline: '营销插件线下扫码点餐部分',
      configView: '营销插件配置页部分',
    })[partial] || '';
  }

  /**
   * @description: 启动webpack开发服务器
   * @author: JOU(wx: huzhen555)
   */
  start() {
    const webpackConfig = require(this.confFilePath);
    const compiler = webpack(webpackConfig);
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      progress: false,
      stats: {
        colors: true,
      },
    });
    
    return new Promise(resolve => {
      new WebpackDevServer(compiler, devServerOptions).listen(this.port, this.host, resolve);
    });
  }

  /**
   * @description: 编译构建代码
   * @author: JOU(wx: huzhen555)
   */
  build() {
    const webpackConfig = require(this.confFilePath);
    delete webpackConfig.devServer;
    return new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        if (stats.hasErrors()) {
          reject(chalk.red(`🙄${this.name}编译失败。\n`));
        }
        resolve();
      });
    });
  }
}