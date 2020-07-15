/*
 * @Date: 2020-07-06 15:50:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 09:17:57
 */ 
const commander = require('commander');
const ora = require('ora');
const assert = require('assert');
const devtoolServer = require('../scripts/devtool-server');
const mpConfigViewServer = require('../scripts/mp-config-view');
const pageServer = require('../scripts/view-program-page');
const { writeFileSync } = require('fs');
const { paths, moduleUrls } = require('../config');
const buildURL = require('../utils/buildURL');
const chalk = require('chalk');
const compareVersions = require('compare-versions');

commander
  .name('el')
  .usage('dev <plugin-environment>')
  .description('根据营销插件运行环境(线上/线下)，启动开发营销插件，可选项为`online`或`offline`')
  .option('-r --runtime-environment <env>', '插件运行环境, `dev`或`prod`，决定插件数据来源，默认为`dev`', 'dev')
  .parse();
  
const requiredVersion = '12.10.0';
assert.strictEqual(
  compareVersions.compare(process.versions.node, requiredVersion, '>='),
  true,
  chalk.bgRedBright(`请使用\`${requiredVersion}\`以上的node版本运行命令`)
);
const [ pluginEnvironment ] = commander.args;
assert.strict.match(pluginEnvironment, /^online|offline$/, '请指定营销插件开发环境，可选项为`online`或`offline`');
assert.notStrictEqual(pluginEnvironment, 'offline', chalk.bgRedBright('抱歉，线下插件开发功能暂未上线'));  // 临时添加
assert.strict.match(commander.runtimeEnvironment, /^dev|prod$/, '请指定正确的营销插件运行环境，可选值为`dev`或`prod`');

// 将当前运行命令行的路径缓存起来
writeFileSync(paths.cwdfile, process.cwd());

(async () => {
  let spinner = ora('启动中...\n').start();
  const {
    devtoolTemplate,
    mpConfigView,
    viewProgramPage,
  } = moduleUrls;
  await Promise.all([
    devtoolServer.start(devtoolTemplate.port),
    mpConfigViewServer.start(mpConfigView.host, mpConfigView.port),
    pageServer.start(viewProgramPage.host, viewProgramPage.port),
  ]);
  spinner.succeed(
    chalk.bgGreen('success') + chalk.blue(`  启动成功，开发工具请访问：${buildURL(devtoolTemplate)}`)
  );
})();