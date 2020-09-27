/*
 * @Date: 2020-07-06 15:50:38
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-17 09:27:22
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
const inquirer = require('inquirer');
const inquirerConfig = require('../common/bin-modules/el-publish/inquirer-config');
const {
  createWriteStream,
  readdirSync,
  statSync,
  createReadStream,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} = require('fs');
const path = require('path');
const { getPluginType, createHashCode } = require('../common/util');
const javaRequest = require('../common/java-request');
const dataAssert = require('../common/common-assert');
const package = require('../package.json');
const {
  hashName, 
  renameFilepath
} = require('../common/bin-modules/el-publish/helper');

commander
  .name('el')
  .usage('publish')
  .description('发布营销插件')
  .parse();

(async () => {
  process.env.NODE_ENV = 'production';
  let spinner = ora(chalk.dim('检查编译文件...\n')).start();

  // 检查plugin.json是否
  if (!existsSync(paths.pluginFile())) {
    spinner.fail(chalk.redBright('😣未在根目录找到plugin.json'));
    process.exit(1);
  }
  const pluginJsonContent = readFileSync(paths.pluginFile(), { encoding: 'utf-8' }).toString();
  const pluginConfig = JSON.parse(pluginJsonContent);
  // 参数验证
  dataAssert.assertPluginName(pluginConfig.name);
  dataAssert.assertVersion(pluginConfig.version);
  dataAssert.assertIntro(pluginConfig.intro);
  dataAssert.assertDescription(pluginConfig.description);
  dataAssert.assertPluginID(pluginConfig.pluginID);
  dataAssert.assertDeveloper(pluginConfig.developer || {});
  dataAssert.assertIcon(pluginConfig.icon);
  // 插件类型验证
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
    spinner.fail(chalk.redBright('😣发布失败，该插件线上线下两部分的目录结构均缺失' + readTips));
    process.exit(1);
  }
  
  spinner.stop();
  // 版本号更新询问
  let answers = await inquirer.prompt(inquirerConfig.selectVersionStrategy(pluginConfig.version));
  if (!answers.version) {
    let inputAns = await inquirer.prompt(inquirerConfig.inputVersion);
    answers.version = inputAns.version;
  }
  const originalVersion = pluginConfig.version;
  pluginConfig.version = answers.version;

  // 将新版本号更新到原plugin.json文件中
  writeFileSync(paths.pluginFile(), pluginJsonContent.replace(originalVersion, answers.version), 'utf-8');

  spinner.start();
  spinner.text = chalk.dim('编译中...');
  // 编译打包
  try {
    const hash = createHashCode(Date.now().toString());   // 随机hash
    // 根据插件类型打包不同部分
    const builder = [];
    const configViewBuildFn = pluginConfig.hasConfigView ? () => configViewServer.build() : () => Promise.resolve();
    if (pluginType === 1) {
      if (!pluginConfig.onlinePages || pluginConfig.onlinePages.length <= 0) {
        throw new Error('😣发布失败，未在plugin.json中找到onlinePages数组');
      }
      builder.push(configViewBuildFn(), onlineServer.build());
    }
    else if (pluginType === 2) {
      builder.push(configViewBuildFn(), offlineServer.build());
    }
    else {
      builder.push(configViewBuildFn(), onlineServer.build(), offlineServer.build());
    }

    builder.push(
      // 拷贝静态资源到目标目录(先判断是否存在)
      existsSync(paths.assets()) ? cpy('**/*', paths.distDirectory.assets, {
        parents: true,
        cwd: paths.assets(),
        rename: filename => hashName(filename, hash),     // 静态资源增加随机hash值
      }) : Promise.resolve(),

      // 拷贝服务端代码文件夹到目标目录(先判断是否存在)
      existsSync(paths.serverDirectory()) ? cpy('**/*', paths.distDirectory.server, {
        parents: true,
        cwd: paths.serverDirectory()
      }) : Promise.resolve()
    );
    
    rm.sync(paths.distDirectory.root);
    await Promise.all([
      ...builder,
      
      // 拷贝plugin.json到目标目录
      cpy(paths.pluginFile(), paths.distDirectory.root),
    ]);

    // 将资源地址编译成有hash码的地址
    writeFileSync(paths.distDirectory.pluginFile, renameFilepath(pluginConfig, hash), 'utf-8');
    
    spinner.succeed(chalk.green('🤗编译成功。'));
    // 压缩编译后的文件
    let filepaths = readdirSync(paths.distDirectory.root);
    if (filepaths.length <= 0) {
      throw new Error('未找到编译文件');
    }
    
    spinner = ora(chalk.dim('正在处理编译文件...')).start();
    // 如果没有缓存目录则先创建
    if (!existsSync(paths.cacheDirectory)) {
      mkdirSync(paths.cacheDirectory);
    }
    
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
    spinner.fail(chalk.redBright('🙄发布失败，请重试'));
  }
})();