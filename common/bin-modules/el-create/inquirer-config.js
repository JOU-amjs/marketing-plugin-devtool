const chalk = require("chalk");
const { assertPluginName } = require("../../common-assert");

/*
 * @Date: 2020-07-16 10:32:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-21 10:27:55
 */ 
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
    message: '请一句话介绍此营销插件' + chalk.dim('(14字内)'),
    name: 'intro',
  },
  {
    type: 'input',
    message: '详细介绍插件功能\n' + chalk.dim('(以`\\n`换行，200字以内，如不确定后续可在plugin.json中补充)\n'),
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
    message: '插件是否需要使用商家填写自定义参数' + chalk.dim('(默认Yes)'),
    name: 'hasConfigView',
    default: true,
  }
];