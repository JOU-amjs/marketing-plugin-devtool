/*
 * @Date: 2020-07-06 15:50:38
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 15:53:14
 */ 
const commander = require('commander');
const chalk = require('chalk');

commander
  .name('el')
  .usage('publish')
  .description('发布营销插件')
  .parse();

// const [ pluginName ] = commander.args;
// if (!pluginName) {
//   console.error(chalk.red('请输入插件名称'));
//   process.exit(1);
// }

console.log('发布中...');