/*
 * @Date: 2020-07-06 15:50:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-05 12:44:21
 */ 
const commander = require('commander');
const ora = require('ora');
const assert = require('assert');
const devtoolServer = require('../scripts/devtool-server');
const configViewServer = require('../scripts/config-view-server');
const onlineServer = require('../scripts/online-server');
// const offlineServer = require('../scripts/offline-server');
const { moduleUrls, paths } = require('../config');
const { buildURL } = require('../common/util');
const chalk = require('chalk');
const { getPluginType } = require('../common/util');
const pluginConfig = require(paths.pluginFile());

commander
  .name('el')
  .usage('dev <plugin-environment>')
  .description('根据营销插件运行环境(线上/线下)，启动开发营销插件，可选项为`online`或`offline`')
  .option('-r --runtime-environment <env>', '插件运行环境, `dev`或`prod`，决定插件数据来源，默认为`dev`', 'dev')
  .parse();

const [ pluginEnvironment ] = commander.args;
assert.strict.match(pluginEnvironment, /^online|offline$/, chalk.redBright('请指定营销插件开发环境，可选项为`online`或`offline`'));
assert.strict.match(commander.runtimeEnvironment, /^dev|prod$/, chalk.redBright('请指定正确的营销插件运行环境，可选值为`dev`或`prod`'));

// 将环境变量设置为对应值
const envs = { dev: 'development', prod: 'production' };
process.env.NODE_ENV = envs[commander.runtimeEnvironment];

(async () => {
  let spinner = ora('启动中...\n').start();
  const readTips = '，具体请看：' + chalk.blue('https://test.ycsh6.com/readme');
  
  // 根据插件类型的不同打印不同提示文字
  const pluginTypeTips = {
    online: {
      name: '线上插件',
      tips: '  如需增加插件线下扫码点餐部分，请在根目录下创建' + chalk.blue('`offline/index.js`'),
    },
    offline: {
      name: '线下插件',
      tips: '  如需增加插件线上视图部分，请在根目录下创建' + chalk.blue('`online/pages/[视图页面文件]`'),
    },
    'online-offline': {
      name: '线上线下插件',
      tips: '  此插件类型可同步餐厅线上线下的营销活动数据',
    }
  };
  let pluginType = '';
  try {
    pluginType = getPluginType();
  } catch (error) {
    spinner.fail(chalk.redBright('😣启动失败，该插件线上线下两部分的目录结构均缺失' + readTips));
    process.exit(1);
  }
  
  const configViewStartFn = pluginConfig.hasConfigView ? () => configViewServer.start() : () => Promise.resolve();
  const pluginTypeInfo = pluginTypeTips[pluginType];
  const starter = [];
  if (pluginEnvironment === 'online') {
    if (!pluginConfig.onlinePages || pluginConfig.onlinePages.length <= 0) {
      spinner.fail(chalk.redBright('😣启动失败，未在plugin.json中找到onlinePages数组'));
      process.exit(1);
    }
    else {
      starter.push(devtoolServer.start(), configViewStartFn(), onlineServer.start());
    }
  }
  else if (pluginEnvironment === 'offline') {
    starter.push(devtoolServer.start(), configViewStartFn());    // 暂时缺少onlineServer.start()
  }
  
  await Promise.all(starter);
  console.log('\n\n');
  spinner.succeed(chalk.bgGreen('SUCCESS') + chalk.green(' 启动成功🎉🎉🎉'));
  console.log('\n');
  console.info(
    chalk.dim('  开发工具请访问：') + 
    chalk.bold(
      chalk.blue(buildURL(moduleUrls.devtoolTemplate))
    )
  );
  
  console.log('\n');
  console.log('  当前营销插件的开发类型为：' + chalk.bold(pluginTypeInfo.name));
  console.log(pluginTypeInfo.tips + readTips);
})();