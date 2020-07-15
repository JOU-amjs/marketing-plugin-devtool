/*
 * @Date: 2020-07-13 10:08:28
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 15:58:04
 */ 
import page from './index.vue';
import { routes, beforeEach } from './routes';
import storeOne from './store/store-one';

EL.Page(page, {
  routers: { routes, beforeEach },
  stores: { modules: { storeOne } },
  title: async () => {    // 当前页面的标题，可以指定一个字符串，或一个(异步)函数，此函数可以返回页面标题
    let shopInfo = await EL.getShopInfo() || {};
    return `{{ pluginName }} - ${shopInfo.shopName || ''}`;
  },
  shareMessage: {
    title: '分享标题',  // 默认为文件标题
    path: 'pages/index',  // 页面路径，与plugin.json中的一致，如需要添加参数请放在params字段中
    routePath: '',     // 路由路径，此为router.js中配置的子路径
    params: {},       // 分享的地址参数，通过this.$route.params.xx获取
    imageUrl: '',     // 分享的图片地址
  },
});