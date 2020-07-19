/*
 * @Date: 2020-07-17 22:10:30
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-17 22:23:07
 */
const { existsSync } = require('fs');
const { paths } = require('../config');

 
/**
 * @description: 通过prototol、host、port构建url
 * @author: JOU(wx: huzhen555)
 * @param {object} 包含prototol、host、port的url对象
 * @return: 构建后的url
 */
exports.buildURL = function ({ protocol, host, port }) {
  return `${protocol}://${host}:${port}`;
};

/**
 * @description: 获取当前插件的类型
 * @author: JOU(wx: huzhen555)
 * @param {object} options 如果给定此参数，则将插件类型转换为对应的值
 * @return: 线上插件 online；线下插件 offline；线上线下插件 online-offline；或通过options参数转换后的值
 */
exports.getPluginType = function(options) {
  // 根据插件类型的不同打印不同提示文字
  let pluginType = options ? options['online-offline'] : 'online-offline';
  let offlineDirExists = existsSync(paths.offlineDirectory());
  let onlineDirExists = existsSync(paths.onlineDirectory());
  if (onlineDirExists && !offlineDirExists) {
    pluginType = options ? options['online'] : 'online';
  }
  else if (offlineDirExists && !onlineDirExists) {
    pluginType = options ? options['offline'] : 'offline';
  }
  else if (!onlineDirExists && !offlineDirExists) {
    throw new Error('plugin type invalid');
  }

  return pluginType;
}