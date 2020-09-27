/*
 * @Date: 2020-07-16 10:34:27
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-19 11:37:04
 */ 
const { paths } = require("../../../config");
const fs = require('fs');
const path = require('path');
const artTemplate = require("art-template");


const renders = {
  // 基础班模板渲染函数
  common({ dirname, pluginID, intro, description, name, devid, type, secret, union, hasConfigView },  filePaths, files) {
    // 渲染package.json文件内容
    let packageFilePath = filePaths.packageJson;
    if (files[packageFilePath]) {
      files[packageFilePath] = artTemplate.render(files[packageFilePath], {
        pluginDirName: dirname,
      });
    }
    
    // 渲染plugin.json文件内容
    let pluginFilePath = filePaths.pluginJson;
    if (files[pluginFilePath]) {
      files[pluginFilePath] = artTemplate.render(files[pluginFilePath], {
        pluginName: name,
        intro,
        description,
        pluginDirName: dirname,
        devId: devid || '',
        devSecret: secret || '',
        union,
        hasConfigView,
        type,
      });
    }
    
    // 渲染线上文件入口
    let onlineEntryPath = filePaths.onlineEntry;
    if (files[onlineEntryPath]) {
      files[onlineEntryPath] = artTemplate.render(files[onlineEntryPath], {
        pluginName: name,
      });
    }

    // 渲染线下文件入口
    let offlineEntryPath = filePaths.offlineEntry;
    if (files[offlineEntryPath]) {
      files[offlineEntryPath] = artTemplate.render(files[offlineEntryPath], {
        pluginID,
      });
    }
    
    return files;
  }
}

/**
 * @description: 文件渲染函数，可根据不同的模板类型渲染对应文件内容并回写
 * @author: JOU(wx: huzhen555)
 * @param {string} type 模板类型，目前只支持common模板
 */
module.exports = async function(type, options = {}) {
  // 不同模板内需要渲染的文件路径
  const typedRenderFiles = {
    common: {
      packageJson: path.join(paths.scaffolding(), './package.json'),
      pluginJson: paths.pluginFile(),
      onlineEntry: path.join(paths.onlineDirectory(), './pages/index/index.js'),
      offlineEntry: path.join(paths.offlineDirectory(), './index.js'),
    },
  };
  
  
  let renderFilePaths = typedRenderFiles[type];
  if (!renderFilePaths) {
    throw new Error('创建的模板类型错误');
  }

  // 读取需要渲染文件的内容
  let fileContents = {};
  let notExistsFiles = [];
  Object.values(renderFilePaths).forEach(filePath => {
    if (fs.existsSync(filePath)) {
      fileContents[filePath] = fs.readFileSync(filePath, { encoding: 'utf-8' }).toString();
    }
    else {
      notExistsFiles.push(filePath);
      fileContents[filePath] = '';
    }
  });
  if (options.dirname) {
    options.pluginID = options.dirname
      .replace(/[_-](\w)/g, (_, letter) => letter.toUpperCase())  // 插件目录名将下划线或中划线转大写
      .replace(/\w/, match => match.toUpperCase());   // 首字母大写
  }
  fileContents = await renders[type](options, renderFilePaths, fileContents);
  
  // 将渲染后的文件内容回写到对应地址
  // 如果文件不存在则不写入
  Object.keys(fileContents).forEach(filePath => {
    if (notExistsFiles.indexOf(filePath) <= -1) {
      fs.writeFileSync(filePath, fileContents[filePath], 'utf-8');
    }
  });
};