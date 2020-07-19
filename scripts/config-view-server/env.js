/*
 * @Date: 2020-07-16 15:36:58
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-16 16:05:25
 */ 
const { paths } = require("../../config");
const envVariables = require(paths.envVariable.configView());

const envConfigurations = {
  development: {
    dist: paths.cacheDirectory,
    envs: envVariables.dev || {},
  },
  production: {
    dist: paths.distDirectory.configView,
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