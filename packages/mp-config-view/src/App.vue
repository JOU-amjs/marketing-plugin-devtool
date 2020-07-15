<!--
 * @Date: 2019-07-06 23:41:42
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-06-18 16:13:38
 -->
<template>
  <div id="app">
    <div v-if="nodeEnv === 'production' || isCross">
      <div class="loading-wrap" v-if="loadingComponent">
        <vue-loading type="cylon" color="#ff0047" :size="{ width: '30px', height: '30px' }" />
      </div>
      <async-component v-show="!loadingComponent && loadSuccess" @loaded="componentLoaded" />
      <div class="flex-column align-center" v-if="!loadSuccess">
        <span class="text-load-failed">配置页加载失败，稍后再试！</span>
      </div>
    </div>
    <template-index v-else></template-index>
  </div>
</template>

<script>
import AsyncComponent from '@/components/async-component.vue';
import TemplateIndex from '@/template/index.vue';
import { VueLoading } from 'vue-loading-template';
import { localDataMap } from '@/common/util';
export default {
  components: {
    AsyncComponent,
    VueLoading,
    TemplateIndex,
  },
  data() {
    return {
      accessToken: localDataMap.get('accessToken'),
      loadingComponent: true,
      loadSuccess: true,

      // 用于区分当前的模式
      nodeEnv: process.env.NODE_ENV,
      isCross: process.env.VUE_APP_DEV_CROSS === '1',
    };
  },
  methods: {
    componentLoaded(success) {
      this.loadingComponent = false;
      this.loadSuccess = success;
    }
  },
};
</script>

<style>
body {
  /* background: red; */
  margin: 0;
  padding: 0;
  background: white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.text-load-failed {
  color: #999;
  font-size: 18px;
}
@font-face {
  font-family: 'iconfont';  /* project id 1117541 */
  src: url('https://at.alicdn.com/t/font_1281750_0vc6svep28so.ttf') format('truetype');
}
.iconfont {
  font-family: 'iconfont';
}
@media(-webkit-min-device-pixel-ratio: 1),(min-device-device-pixel-ratio: 1) {
  .border-top {
    border-top: solid 1px #ddd;
  }
  .border-bottom {
    border-bottom: solid 1px #ddd;
  }
  .border-all {
    border: solid 1px #ddd;
  }
}
@media(-webkit-min-device-pixel-ratio: 1.5),(min-device-device-pixel-ratio: 1.5) {
  .border-top {
    border-top: solid 0.66px #ddd;
  }
  .border-bottom {
    border-bottom: solid 0.66px #ddd;
  }
  .border-all {
    border: solid 0.66px #ddd;
  }
}
@media(-webkit-min-device-pixel-ratio: 2),(min-device-device-pixel-ratio: 2) {
  .border-top {
    border-top: solid 0.5px #ddd;
  }
  .border-bottom {
    border-bottom: solid 0.5px #ddd;
  }
  .border-all {
    border: solid 0.5px #ddd;
  }
}
@media(-webkit-min-device-pixel-ratio: 2.5),(min-device-device-pixel-ratio: 2.5) {
  .border-top {
    border-top: solid 0.4px #ddd;
  }
  .border-bottom {
    border-bottom: solid 0.4px #ddd;
  }
  .border-all {
    border: solid 0.4px #ddd;
  }
}
.loading-wrap {
  margin-top: 60px;
}

/* 通用样式 */
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.justify-between {
  justify-content: space-between;
}
.align-center {
  align-items: center;
}
.tap-highlight:active {
  background: #f5f5f5;
}
</style>