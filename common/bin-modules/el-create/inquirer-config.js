const chalk = require("chalk");

/*
 * @Date: 2020-07-16 10:32:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 22:40:09
 */ 
module.exports = [
  {
    type: 'input',
    message: '输入营销插件名' + chalk.dim('(中文、英文或数字)'),
    name: 'name',
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
    type: 'input',
    message: '指定插件所用到的数据表\n' + chalk.dim('多个表名用逗号隔开，如不确定后续可在plugin.json中添加)\n'),
    name: 'collection',
    filter(input) {
      return (input || '').split(/,|，/)
        .map(item => `"${item.trim()}"`)
        .filter(item => item);
    }
  },
];