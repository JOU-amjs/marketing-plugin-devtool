var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner =
  `/*!
  * ${pkg.name} ${version} (https://github.com/JOU amjs/view-program-lib)
  * API https://github.com/JOU amjs/view-program-lib/blob/master/doc/api.md
  * Copyright 2017-${(new Date).getFullYear()} JOU amjs. All Rights Reserved
  * Licensed under MIT (https://github.com/JOU amjs/view-program-lib/blob/master/LICENSE)
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

exports.name = 'EL';
exports.banner = banner;
exports.getCompiler = getCompiler;
