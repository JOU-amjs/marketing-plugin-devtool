#!/usr/bin/env node

/*
 * @Date: 2020-07-06 11:39:29
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 22:24:51
 */ 
const commander = require('commander');
const assert = require('assert');
const compareVersions = require('compare-versions');
const package = require('../package.json');
const chalk = require('chalk');

const requiredVersion = '12.10.0';
assert.strictEqual(
  compareVersions.compare(process.versions.node, requiredVersion, '>='),
  true,
  chalk.bgRedBright(`请使用\`${requiredVersion}\`以上的node版本运行命令`)
);

commander
  .name('el')
  .usage('<command> [options]')
  .version(`v${package.version}`);

commander
  .command('create <plugin-name>', '创建一个新的营销插件开发环境')
  .command('dev <plugin-environment>', '根据营销插件运行环境(线上/线下)，启动开发插件，可选项为`online`或`offline`')
  .command('publish', '发布营销插件')

commander.parse();