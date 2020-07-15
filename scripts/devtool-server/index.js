/*
 * @Date: 2020-07-10 09:39:54
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 13:06:27
 */ 
const express = require('express');
const path = require('path');
const router = require('./routers');
const mockRouter = require('./routers/mock');
const nodeServer = require('./routers/node-server');
const app = express();
const bodyParser = require('body-parser');

app.use((_, res, next) => {
  // 跨域设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('content-type', 'application/json;charset=utf-8');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.static(
    path.join(__dirname, '../../dist-program-views/devtool-template')
  )
);
app.use('/', router);
app.use('/mock', mockRouter);
app.use('/v1', nodeServer);

// 启动开发者工具服务器
exports.start = port => {
  return new Promise(resolve => {
    app.listen(port, resolve);
  });
};