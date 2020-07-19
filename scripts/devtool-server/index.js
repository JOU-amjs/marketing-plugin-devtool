/*
 * @Date: 2020-07-10 09:39:54
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:52:19
 */ 
const express = require('express');
const path = require('path');
const router = require('./routers');
const mockRouter = require('./routers/mock');
const nodeServer = require('./routers/node-server');
const app = express();
const bodyParser = require('body-parser');
const { moduleUrls } = require('../../config');

// 启动开发者工具服务器
class DevtoolServer {
  port = '';
  constructor(port) {
    this.port = port;
    app.use(bodyParser.json());
    app.use(
      express.static(
        path.join(__dirname, '../../dist-program-views/devtool-template')
      )
    );
    app.use('/', router);
    app.use('/mock', mockRouter);
    app.use('/v1', nodeServer);
  }
  
  /**
   * @description: 启动开发者工具服务器
   * @author: JOU(wx: huzhen555)
   */
  start() {
    return new Promise(resolve => {
      app.listen(this.port, resolve);
    });
  }
};

module.exports = new DevtoolServer(moduleUrls.devtoolTemplate.port);