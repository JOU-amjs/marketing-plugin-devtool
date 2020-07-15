<!--
 * @Date: 2019-08-24 15:19:59
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 21:44:53
 -->
<template>
  <div id="container">
    <div class="module">
      <span class="module__hd">插件配置页</span>
      <div class="module__body">
        <config-frame class="module__entity" :config-url="containerUrl" />
      </div>
    </div>
    <div class="module">
      <span class="module__hd">插件视图(线上)</span>
      <div class="module__body">
        <plugin-view-online class="module__entity" :program-url="programUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import ConfigFrame from './components/config-frame';
import PluginViewOnline from './components/plugin-view-online';

export default {
  components: { ConfigFrame, PluginViewOnline },
  data() {
    const params = {
      devMode: 1,
    };
    const paramStr = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    return {
      containerUrl: `${/isCross=1/.test(window.location.href) ? 'http://localhost:8081/' : 'mp-config-view/'}?${paramStr}`,
      programUrl: `${/isCross=1/.test(window.location.href) ? 'http://localhost:8081/' : 'mp-config-view/'}?${paramStr}`,
    };
  },
  computed: {
    // heightStyle() {
    //   return {
    //     height: window.document.documentElement.clientHeight - 20 + 'px',
    //   };
    // },
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 20px 100px;
  background: #f5f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* justify-content: space-between; */
}
.module {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 120px;
}
.module__hd {
  color: #999;
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 12px;
}
.module__body {
  position: relative;
  width: 325px;
  height: 587px;
  box-shadow: 2px 2px 16px #eee;
  border-radius: 8px;
  border: solid 1px #ddd;
  overflow: hidden;
  display: flex;
}
.module__entity {
  width: 100%;
  height: 100%;
}

.main-frame {
  width: 100%;
  height: 100%;
  border: none;
}
.btn-submit {
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 25%;
  bottom: 30px;
  background: linear-gradient(to right, #ff5f58, #ff0047);
  border-radius: 25px;
  cursor: pointer;
  z-index: 100;
}
.btn-submit span {
  color: white;
  font-size: 18px;
}
</style>
