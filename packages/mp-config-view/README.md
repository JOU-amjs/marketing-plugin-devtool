<!--
 * @Date: 2019-07-06 23:42:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-05 09:39:08
 -->
# 有吃生活商户端 - 营销小程序参数配置外框页

### 依赖安装
```
npm install
```

### 进入开发
``` bash
# 内置全局组件开发
npm run start
# 跨端通信开发
npm run start:cross
```
> 注意:
1. 内置全局组件开发时，在`src/template/index.vue`中进行配置当前显示的组件页面，建议一类组件一个页面
2. 跨端通信开发时必须启动`marketing-program-plugin-dev`项目(该项目的启动端口为8081)，作为跨端通信的另一端

### 生产环境编译
```
npm run build
```
> 注意：打包过后的代码需要部署到`marketing-program-plugin-dev`项目下的`public/mp-config-view`中，以及生产环境中

### 单元测试(暂时没使用)
```
npm run test:unit
```