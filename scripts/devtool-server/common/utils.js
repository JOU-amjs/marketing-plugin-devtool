/*
 * @Date: 2020-07-15 12:38:10
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 12:01:41
 */ 
const { existsSync, readFileSync } = require('fs');
const { paths } = require('../../../config');

exports.readConfigData = () => {
  let configValue = '';
  if (existsSync(paths.mockConfigData)) {
    let configData = readFileSync(paths.mockConfigData) || '{}';
    configValue = JSON.parse(configData);
  }
  return configValue;
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