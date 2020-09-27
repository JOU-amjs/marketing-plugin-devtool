/*
 * @Date: 2020-07-15 12:38:10
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-25 18:19:13
 */ 
const { existsSync, readFileSync } = require('fs');
const { paths } = require('../../../config');
const { parseModule } = require('./module-based');
const { ok } = require('assert');

exports.readConfigData = () => {
  let configValue = '';
  if (existsSync(paths.mockConfigData())) {
    let configData = readFileSync(paths.mockConfigData()) || '{}';
    configValue = JSON.parse(configData);
  }
  return configValue;
}

// 读取并解析服务端模块代码
exports.getServerModule = moduleType => {
  let exportedModule = {};
  let serverCodePath = paths.serverDirectory() + `/${moduleType}.js`;
  if (existsSync(serverCodePath)) {
    let mpServerCode = readFileSync(serverCodePath);
    exportedModule = parseModule(mpServerCode, true);
    ok(exportedModule && typeof exportedModule === 'object', '服务端模块没有导出有效的对象');
  }
  return exportedModule;
}

/**
 * @description: 设置跨域返回头
 * @author: JOU(wx: huzhen555)
 * @param {object} router 路由对象
 */
exports.setCors = router => {
  router.use((_, res, next) => {
    // 跨域设置
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
    res.setHeader('content-type', 'application/json;charset=utf-8');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    next();
  });
}