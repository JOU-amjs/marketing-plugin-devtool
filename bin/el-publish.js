/*
 * @Date: 2020-07-06 15:50:38
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 13:28:28
 */ 
const commander = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const rm = require('rimraf');
const { paths } = require('../config');
const configViewServer = require('../scripts/config-view-server');
const onlineServer = require('../scripts/online-server');
const offlineServer = require('../scripts/offline-server');
const cpy = require('cpy');
const archiver = require('archiver');
const {
  createWriteStream,
  readdirSync,
  statSync,
  createReadStream
} = require('fs');
const path = require('path');
const { getPluginType } = require('../common/util');
const javaRequest = require('../common/java-request');
const dataAssert = require('../common/common-assert');
const pluginConfig = require(paths.pluginFile());


commander
  .name('el')
  .usage('publish')
  .description('发布营销插件')
  .parse();

process.env.NODE_ENV = 'production';


// 参数验证
dataAssert.assertPluginName(pluginConfig.name);
dataAssert.assertVersion(pluginConfig.version);
dataAssert.assertIntro(pluginConfig.intro);
dataAssert.assertDescription(pluginConfig.description);
dataAssert.assertPluginID(pluginConfig.pluginID);
dataAssert.assertDeveloper(pluginConfig.developer || {});
dataAssert.assertIcon(pluginConfig.icon);


// 插件类型验证
let spinner = ora(chalk.dim('编译中...')).start();
const readTips = '，具体请看：' + chalk.blue('https://test.ycsh6.com/readme');
let pluginType = '';
try {
  pluginType = getPluginType({
    online: 1,
    offline: 2,
    'online-offline': 3,
  });
} catch (error) {
  console.log(error);
  spinner.fail('😣发布失败，该插件线上线下两部分的目录结构均缺失' + readTips);
  process.exit(1);
}


// 编译打包
(async () => {
  try {
    rm.sync(paths.distDirectory.root);
    await Promise.all([
      configViewServer.build(),
      onlineServer.build(),
      offlineServer.build(),
      
      // 拷贝plugin.json到目标目录
      cpy(paths.pluginFile(), paths.distDirectory.root),
      
      // 拷贝静态资源到目标目录
      cpy('**/*', paths.distDirectory.assets, {
        parents: true,
        cwd: paths.assets()
      }),

      // 拷贝服务端代码文件夹到目标目录
      cpy('**/*', paths.distDirectory.server, {
        parents: true,
        cwd: paths.serverDirectory()
      })
    ]);
    spinner.succeed(chalk.green('🤗编译成功。'));
    
    // 压缩编译后的文件
    let filepaths = readdirSync(paths.distDirectory.root);
    if (filepaths.length <= 0) {
      spinner.fail('😣发布失败，未找到编译文件');
      return;
    }

    spinner = ora(chalk.dim('正在处理编译文件...')).start();
    let output = createWriteStream(paths.compiledZipFile);
    let archiveObj = archiver('zip');
    archiveObj.pipe(output);
    filepaths.forEach(file => {
      let filepath = path.join(paths.distDirectory.root, file);
      let stats = statSync(filepath);
      if (stats.isFile()) {
        archiveObj.file(filepath, { name: file });
      }
      else if (stats.isDirectory()) {
        archiveObj.directory(filepath, file);
      }
    });
    await archiveObj.finalize();
    
    spinner.text = chalk.dim('正在发布插件...');
    let { code, msg } = await javaRequest.post('/open/program/upload', {
      type: pluginType.toString(),
      zipFile: createReadStream(paths.compiledZipFile)
    }, { type: 'formData' });
    if (code !== 200) {
      throw new Error(msg);
    }
    
    spinner.succeed(chalk.bgGreen('SUCCESS') + chalk.green(' 发布成功，请前往查看商户端查看🎉🎉🎉'));
  } catch (error) {
    console.error('\nError:', error);
    spinner.fail('🙄发布失败，请重试。');
  }
})();