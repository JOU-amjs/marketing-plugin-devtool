/*
 * @Date: 2020-07-06 11:44:12
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-11-09 11:11:49
 */

const commander = require('commander');
const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');
const shell = require('shelljs');
const rm = require('rimraf');
const download = require('download-git-repo');
const inquirerConfig = require('../common/bin-modules/el-create/inquirer-config');
const filesRender = require('../common/bin-modules/el-create/files-render');
const chalk = require('chalk');
const { assertPluginID } = require('../common/common-assert');
const pluginTypeFilter = require('../common/bin-modules/el-create/plugin-type-filter');

commander
  .name('el')
  .usage('create <dir-name>')
  .description('创建一个新的插件开发环境')
  .parse();

const [ dirname ] = commander.args;
assertPluginID(dirname);

(async () => {
  let answers = await inquirer.prompt(inquirerConfig);
  console.log('\n');
  let spinner = ora(chalk.dim('📦正在创建脚手架...\n')).start();
  let programDir = path.join(process.cwd(), dirname);
  try {
    await new Promise((resolve, reject) => {
      download('JOU-amjs/plugin-scaffolding-common', programDir, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    shell.cd(dirname);
    // 根据插件类型删除对应的文件夹
    if (answers.type === 'online') {
      pluginTypeFilter.filterOfflineFiles();
    }
    else if (answers.type === 'offline') {
      pluginTypeFilter.filterOnlineFiles();
    }
    
    // 对脚手架内容进行编译
    spinner.text = chalk.dim('🤞正在生成项目信息...\n');
    spinner.stop();
    await filesRender('common', { ...answers, dirname });

    let initCommand = '';
    let startupCommand = chalk.cyan('未安装依赖，请手动执行命令');
    if (answers.command === 'yarn') {
      initCommand = 'yarn';
      startupCommand = 'yarn ' + chalk.bold('dev:online') + chalk.cyan(' OR ') + 'yarn ' + chalk.bold('dev:offline');
    }
    else if (answers.command === 'npm') {
      initCommand = 'npm install --registry=https://registry.npm.taobao.org';
      startupCommand = 'npm run ' + chalk.bold('dev:online') + chalk.cyan(' OR ') + 'npm run ' + chalk.bold('dev:offline');
    }
    
    // let code = await new Promise(resolve => {
      
    // });
    // 有初始化命令才执行此命令，否则不做依赖安装操作
    if (initCommand) {
      let code = await new Promise(resolve => {
        shell.exec(initCommand, { async: true }, code => {
          resolve(code);
        });
      });
      // let { code } = shell.exec(initCommand);
      if (code !== 0) {
        throw new Error('依赖包安装失败\n');
      }
    }
    
    spinner.succeed('营销插件开发目录创建完成🎉🎉🎉');
    console.log('\n');
    console.log(' ', `cd ${chalk.bold(dirname)}`);
    console.log(' ', startupCommand);
    console.log('\n');
  } catch (error) {
    rm.sync(programDir);
    console.error('\n', error, '\n');
    spinner.fail('脚手架创建失败，请重试');
  }
})();