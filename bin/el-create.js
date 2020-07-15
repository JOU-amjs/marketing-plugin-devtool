/*
 * @Date: 2020-07-06 11:44:12
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 15:36:53
 */

const commander = require('commander');
const assert = require('assert');
const ora = require('ora');
const inquirer = require('inquirer');
const { dirname } = require('path');

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
        return (input || '').split(/,|，/);
      }
    },
  ]);
  
  let spinner = ora('正在创建脚手架...').start();
  setTimeout(() => {
    spinner.succeed('成功');
  }, 2000);
})();