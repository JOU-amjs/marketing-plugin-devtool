/*
 * @Date: 2020-07-16 10:32:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-11-09 11:19:16
 */ 
const chalk = require('chalk');
const { assertPluginName } = require('../../common-assert');
const shell = require('shelljs');

let choices = ['不安装依赖(通常用于多个项目集中管理依赖)'];
if (shell.which('npm')) {
  choices.unshift('npm');
}
if (shell.which('yarn')) {
  choices.unshift('yarn');
}
module.exports = [
  {
    type: 'input',
    message: '输入营销插件名' + chalk.dim('(中文、英文或数字)'),
    name: 'name',
    validate(name) {
      try {
        assertPluginName(name);
        return true;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    type: 'input',
    message: '请一句话介绍此营销插件' + chalk.dim('(20字内)'),
    name: 'intro',
  },
  {
    type: 'input',
    message: '详细介绍插件功能\n' + chalk.dim('(以`\\n`换行，1500字以内，如不确定后续可在plugin.json中补充)\n'),
    name: 'description',
  },
  {
    type: 'input',
    message: '输入开发者账号',
    name: 'devid',
  },
  {
    type: 'input',
    message: '输入开发者秘钥',
    name: 'secret',
  },
  {
    type: 'list',
    message: '选择插件类型',
    name: 'type',
    choices: ['线上线下插件', '线下插件', '线上插件'],
    filter(input) {
      return ({
        '线上线下插件': 'online-offline',
        '线下插件': 'offline',
        '线上插件': 'online',
      })[input];
    }
  },
  {
    type: 'confirm',
    message: '本插件是否支持联合营销？' + chalk.dim('(默认No)'),
    name: 'union',
    default: false,
  },
  {
    type: 'list',
    message: '选择安装命令',
    name: 'command',
    choices,
  }
];