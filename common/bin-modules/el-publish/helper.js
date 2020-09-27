/*
 * @Date: 2020-08-27 17:30:48
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-17 09:18:01
 */
const { join } = require('path');

exports.hashName = function(filename, hash) {
  if (typeof filename !== 'string' || filename.indexOf('.') < 0) {
    return filename;
  }
  let nameSplited = filename.split('.');
  nameSplited.splice(nameSplited.length - 1, 0, hash);
  return nameSplited.join('.');
};

/**
 * @description: 渲染编译目录内的plugin.json
 * @author: JOU(wx: huzhen555)
 * @param {string} pluginContent plugin.json文件内容
 * @return {string} 渲染后的文件内容
 */
exports.renameFilepath = function(pluginJson, hash) {
  pluginJson.icon = join(exports.hashName(pluginJson.icon, hash));
  if (pluginJson.cover) {
    pluginJson.cover = join(exports.hashName(pluginJson.cover, hash));
  }
  if (Array.isArray(pluginJson.examplePictures)) {
    pluginJson.examplePictures = pluginJson.examplePictures.map(picturePath => 
      join(
        exports.hashName(picturePath, hash)
      )
    );
  }
  return JSON.stringify(pluginJson);
}