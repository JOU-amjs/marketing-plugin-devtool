/*
 * @Date: 2020-07-15 12:38:10
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 12:39:11
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