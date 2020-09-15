<!--
 * @Date: 2020-06-02 15:22:39
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 10:02:18
--> 
<template>
  <div id="__MARKETING_AD__" v-if="nodeEnv === 'production' || isCross">
    <!-- <unpayed></unpayed> -->
  </div>
  <template-index v-else />
</template>

<script>
import Unpayed from './modules/Unpayed.vue';
import TemplateIndex from './template/index.vue';
import './assets/fonts/iconfont.css';

export default {
  components: {
    Unpayed,
    TemplateIndex
  },
  data() {
    return {
      isCross: process.env.VUE_APP_DEV_CROSS === '1',
    };
  },
  computed: {
    nodeEnv() {
      return process.env.NODE_ENV;
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';
  src: url('./assets/fonts/iconfont.eot');
  src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/iconfont.woff') format('woff'),
  url('./assets/fonts/iconfont.ttf') format('truetype'),
  url('./assets/fonts/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width:  0.2px;
  -moz-osx-font-smoothing: grayscale;
}
#__MARKETING_AD__ {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
