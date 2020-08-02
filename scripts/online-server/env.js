/*
 * @Date: 2020-07-16 15:58:04
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 17:29:35
 */

const { paths } = require('../../config');
const envVariables = require(paths.envVariable.online());
const pluginConfig = require(paths.pluginFile());

const envConfigurations = {
  development: {
    dist: paths.cacheDirectory,
    envs: envVariables.dev || {},
    assetsPath: '/',
  },
  production: {
    dist: paths.distDirectory.online,
    envs: envVariables.prod || {},
    assetsPath: `https://static.ycsh6.com/program/${pluginConfig.pluginID}/online`,
  },
};

exports.getEnvConfiguration = function() {
  const envConfig = envConfigurations[process.env.NODE_ENV];
  if (!envConfig) {
    throw new Error('环境变量错误，当前环境变量：' + process.env.NODE_ENV);
  }
  return envConfig;
}