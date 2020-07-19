/*
 * @Date: 2020-07-16 15:58:04
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 13:54:11
 */

const { paths } = require("../../config");
const envVariables = require(paths.envVariable.offline());

const envConfigurations = {
  development: {
    dist: paths.cacheDirectory,
    envs: envVariables.dev || {},
  },
  production: {
    dist: paths.distDirectory.offline,
    envs: envVariables.prod || {},
  },
};

exports.getEnvConfiguration = function() {
  const envConfig = envConfigurations[process.env.NODE_ENV];
  if (!envConfig) {
    throw new Error('环境变量错误，当前环境变量：' + process.env.NODE_ENV);
  }
  return envConfig;
}