/*
 * @Date: 2020-07-06 11:44:12
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-16 10:03:42
 */

const commander = require('commander');
const assert = require('assert');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { paths } = require('../config');
const shell = require('shelljs');
const artTemplate = require('art-template');
const download = require('download-git-repo');

commander
  .name('el')
  .usage('create <dir-name>')
  .description('创建一个新的插件开发环境')
  .option('-r --runtime-environment <env>', '插件运行环境, `dev`或`prod`，决定插件数据来源，默认为`dev`', 'dev')
  .parse();

const [ dirname ] = commander.args;
assert.notStrictEqual(dirname, undefined, '请正确输入保存插件的目录名');
assert.notStrictEqual(dirname, null, '请正确输入保存插件的目录名');
assert.notStrictEqual(dirname, '', '请正确输入保存插件的目录名');

/**
 * @description: 复制指定目录下的内容到目标目录，如果目标目录不存在则创建它
 * @author: JOU(wx: huzhen555)
 * @param {string} src  源目录路径
 * @param {string} dist 目标目录路径
 */
function copy(src, dist) {
  try {
    let dirStat = fs.statSync(dist);
    if (!dirStat.isDirectory()) {
      throw new Error('Is not directory');
    }
  } catch (error) {
    fs.mkdirSync(dist);
  }
  
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(path => {
    let _src = `${src}/${path}`;
    let _dist = `${dist}/${path}`;
    let stats = fs.statSync(_src);    //stats  该对象 包含文件属性
    if (stats.isFile()) { //如果是文件则拷贝
      let readable = fs.createReadStream(_src);   //创建读取流
      let writable = fs.createWriteStream(_dist);   //创建写入流
      readable.pipe(writable);
    }
    else if (stats.isDirectory()) {     // 是目录则 递归 
      copy(_src, _dist);
    }
  });
}

(async () => {
  let answers = await inquirer.prompt([
    {
      type: 'input',
      message: '输入插件名(中文、英文或数字)',
      name: 'name',
      validate(value) {
        return /^[\u4e00-\u9fa5\w]+$/i.test(value) ? true : '请输入中文、英文或数字组成的插件名';
      }
    },
    {
      type: 'input',
      message: '输入开发者账号',
      name: 'devid',
      validate(input) {
        return !!input;
      }
    },
    {
      type: 'password',
      message: '输入开发者秘钥',
      name: 'secret',
      validate(input) {
        return !!input;
      }
    },
    {
      type: 'list',
      message: '选择插件类型',
      name: 'type',
      choices: ['线下插件', '线上插件', '线上线下插件'],
    },
    {
      type: 'input',
      message: '指定插件所用到的数据表(多个表名用逗号隔开，如不确定后续可在plugin.json中添加)',
      name: 'collection',
      filter(input) {
        return (input || '').split(/,|，/).map(item => item.trim());
      }
    },
  ]);
  
  let spinner = ora('正在创建脚手架...').start();
  let programDir = path.join(process.cwd(), dirname);
  
  // 拷贝文件到当前目录下
  // copy(paths.scaffoldingTemplate, programDir);
  download(
    'direct:https://gitlab.com/flippidippi/download-git-repo-fixture/repository/archive.zip',
    programDir,
    (err, res) => {
      console.log('result:', err, res);
    }
  )
  
  // 对脚手架内容进行编译
  spinner.text = '正在生成项目信息...';
  // setTimeout(() => {
  //   shell.cd(dirname);
  //   let pluginFilePath = paths.pluginFile();
  //   let pluginJsonFile = fs.readFileSync(pluginFilePath, { encoding: 'utf-8' }).toString();

  //   pluginJsonFile = artTemplate.render(pluginJsonFile, {
  //     pluginName: answers.name,
  //     devId: answers.devid || '',
  //     devSecret: answers.secret || '',
  //     collectionNames: answers.collection.join(', '),
  //   });
  //   fs.writeFileSync(pluginFilePath, pluginJsonFile, 'utf-8');
    
  //   spinner.succeed('完成');
  // }, 2000);
})();