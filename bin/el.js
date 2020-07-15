#!/usr/bin/env node

/*
 * @Date: 2020-07-06 11:39:29
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 15:52:48
 */ 
const commander = require('commander');
const package = require('../package.json');

commander
  .name('el')
  .usage('<command> [options]')
  .version(`v${package.version}`);

commander
  .command('create <plugin-name>', '创建一个新的营销插件开发环境')
  .command('dev <plugin-environment>', '根据营销插件运行环境(线上/线下)，启动开发插件，可选项为`online`或`offline`')
  .command('publish', '发布营销插件')

commander.parse();