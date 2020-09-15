<!--
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 10:41:15
 -->
# 有吃生活小程序端 - h5营销插件js函数库(非通用库)
此js库用于有吃生活的h5营销插件，为开发者提供的开放api集合，包括创建h5营销程序页面、有吃生活小程序内的接口调用、商家的接口调用等功能。此js库的页面创建是基于vue的二次封装，除了使用EL.Page创建一个页面外，其他功能与vue保持一致。

## :pill: 兼容性
单元测试保证支持如下环境：

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 6+   | 29+ | 55+  | 9+   | 50+  | 9+   | 4+   | 4+ |

**注意：编译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](./demo/demo-global.html)中的例子**

## :open_file_folder: 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## :bookmark_tabs: 文档
[API](./doc/api.md)

## :kissing_heart: 开发指南
首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

运行单元测试:

```bash
$ npm test
```

> 注意：浏览器环境需要手动测试，位于`test/browser`

修改 package.json 中的版本号，修改 README.md 中的版本号，修改 CHANGELOG.md，然后发布新版

```bash
$ npm run release
```
请将更新后的版本发布到npm，以供其他端获取最新内容。

```bash
$ npm publish
```

## 环境介绍
为满足此js库在不同环境下表现出不同的运行效果，将分为以下环境：
1. (debug)调试环境：在url中添加`devMode=2`即表示该环境，此时将会请求本地服务器，便于接口调试
2. (plugin-dev)插件开发环境：在url中添加`devMode=1`即表示该环境，此时将会请求`http://localhost:18001`，这个地址表示在插件开发环境下对真实请求的模拟
3. (prod)生产环境：url中没有`devMode`参数即表示该环境，此时将会请求生产环境下的接口

## :gear: 更新日志
[CHANGELOG.md](./CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](./TODO.md)