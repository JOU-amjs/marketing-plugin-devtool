# 有吃生活营销小程序开发脚手架

### 依赖安装
```
npm install
```

### 进入开发
``` bash
# 营销小程序开发
npm run start
# 脚手架模板代码开发
npm run dev:template
```
> 注意:
1. 营销小程序开发时，需通过根目录的plugin-info.json中配置开发项目的名称、版本号等，同时在`src/`下创建一个对应名称的文件夹，文件夹内包含`config-view.vue`和`index.js`两个文件，分别代表配置页视图和具体的小程序代码实现。然后将currentDev的值改为当前需开发的名字，`npm run start`时会自动打开该项目
2. 脚手架模板代码开发时，默认打开`public/mp-config-view`下的配置页外框代码，如果需要联合开发中的外框代码进行调试，则在地址后添加`isCross=1`即可打开运行中的外框代码项目
3. 开发完成后`dist/config-view.js`即为配置页视图编译后的代码