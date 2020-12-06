/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-03 14:06:36
 */
var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner =
  `/*!
  * ${pkg.name} ${version} (https://github.com/JOU amjs/aop-js)
  * API https://github.com/JOU amjs/aop-js/blob/master/doc/api.md
  * Copyright 2017-${(new Date).getFullYear()} JOU amjs. All Rights Reserved
  * Licensed under MIT (https://github.com/JOU amjs/aop-js/blob/master/LICENSE)
  */
`;

function getCompiler(opt) {
  opt = opt || {
    // objectHashIgnoreUnknownHack: true,
    // clean: true,
    tsconfigOverride: { compilerOptions: { module: 'ES2015' } }
  }

  return typescript(opt);
}

exports.name = 'AopJS';
exports.banner = banner;
exports.getCompiler = getCompiler;
