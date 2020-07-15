/*
 * @Date: 2020-07-10 10:53:58
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-10 11:19:44
 */ 
const
  gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  webpackVueConf = require('./scripts/webpack.vue.conf'),
  webpackCompConf = require('./scripts/webpack.comp.conf'),
  webpackStream = require('webpack-stream'),
  webpack = require('webpack'),
  pluginInfo = require('./plugin-info.json'),
  localApis = require('./scripts/local-apis'),

  url = require('url');

if (!pluginInfo.list.hasOwnProperty(pluginInfo.currentDev)) {
  throw new Error(`There has no a plugin named \`${pluginInfo.currentDev}\`,please check the same name direction in \`src\` and key in \`pluginInfo.list\``);
}
const currentDev = pluginInfo.currentDev;
// ============= task =============
/**
 * @description: 注册gulp编译任务
 * @author: JOU(wx: huzhen555)
 * @param {string}  type 任务类型 
 * @return: 任务名称
 */
function registerGulpCompile(type) {
  // webpack
  const confMap = {
    vue: {
      src: 'template-view/main.js',
      conf: webpackVueConf,
    },
    comp: {
      src: `./src/${currentDev}/configure-view.vue`,
      conf: webpackCompConf,
    },
  };
  const confItem = confMap[type];
  gulp.task('compile:' + type, () => {
    return gulp.src(confItem.src)
      .pipe(webpackStream(confItem.conf, webpack))
      .pipe(gulp.dest('dist/'));
  });

  return 'compile:' + type;
}

/**
 * @description: 注册gulp监听任务
 * @author: JOU(wx: huzhen555)
 * @param {string}  fileDir 监听的文件路径
 * @param {array}   watchingTaskList 监听的任务名列表 
 * @return: 任务名称
 */
function registerWatchFile(fileDir, watchingTaskList) {
  const taskName = 'watch';
  gulp.task(taskName, () => {
    gulp.watch(`${fileDir}/**/*`, gulp.series(...watchingTaskList));
  });

  return taskName;
}

// 开启服务器进行模拟数据
gulp.task('serve', () => {
  return gulp.src(['./dist', './public'])
  .pipe(webserver({
    livereload: true,
    port: 8080,
    middleware: (req, res, next) => {
      const
        urlObj = url.parse(req.url, true),
        method = req.method,
        callingMethod = method.toLowerCase();

      // localApis中编写了需要拦截的api及处理
      let callingApi = localApis[urlObj.pathname] || { method: 'get' };
      if (typeof callingApi === 'function') {
        callingApi = { callback: callingApi, method: 'get' };
      }
      if (callingApi.method.toLowerCase() === callingMethod && typeof callingApi.callback === 'function') {
        // 跨域设置
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        callingApi.callback(req, res, currentDev);
      }

      next();
    }
  }));
});

const compCompileTask = registerGulpCompile('comp');
const vueCompileTask = registerGulpCompile('vue');

// default任务
gulp.task(
  'default', 
  gulp.series(compCompileTask, 'serve', registerWatchFile('src', [compCompileTask]))
);

// template任务
gulp.task(
  'template', 
  gulp.series(vueCompileTask, 'serve', registerWatchFile('template-view', [vueCompileTask]))
);

// build任务
gulp.task(
  'build', 
  gulp.series(compCompileTask)
);