<!--
 * @Date: 2020-04-09 14:48:24
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-05-28 17:40:36
 -->
<template>
  <div>
    <header :title="title" />
    <router-view></router-view>
  </div>
</template>

<script>
import { routes, beforeEach } from './routes';
import storeOne from './store/store-one';
import Header from '../../components/Header.vue';
import vuePlugin from 'vue-plugin';
import myPlugin from 'my-plugin';

const globalConfig = {
  routers: { routes, beforeEach },
  stores: { modules: { storeOne } },
  plugins: [
    [ vuePlugin, true ],
    [ myPlugin ],
  ],
  title: async () => {    // 当前页面的标题，可以指定一个字符串，或一个(异步)函数，此函数可以返回页面标题
    let { shopName } = await EL.getShopInfo();
    return `消灭病毒 - ${shopName}`;
  },
  shareMessage: {
    title: '分享标题',  // 默认为文件标题
    path: 'pages/index',  // 页面路径，与plugin.json中的一致，如需要添加参数请放在params字段中
    routePath: '',     // 路由路径，此为router.js中配置的子路径
    params: {},       // 分享的地址参数，通过this.$route.params.xx获取
    imageUrl: '',     // 分享的图片地址
  },
};

EL.Page({
  components: { Header },
  data() {
    return {
      title: '首页',
    };
  },
  mounted() {
    this.title = EL.database.collection('title').get('abc');
  },
}, globalConfig);
</script>
<style scoped>

</style>