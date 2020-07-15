<!--
 * @Date: 2020-07-06 21:28:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 21:35:26
--> 
<template>
  <div class="container">
    <iframe ref="configFrame" class="main-frame" :src="configUrl"></iframe>
    <div class="btn-submit" @click="reviewData">
      <span>提交配置参数</span>
    </div>
  </div>
</template>

<script>
import { message } from '../util';
export default {
  props: {
    configUrl: String,
  },
  methods: {
    reviewData() {
      message.emit('_emitSubmit');
    },
  },
  mounted() {
    message.init(this.$refs.configFrame.contentWindow);
  }
};
</script>

<style scoped>
.container {
  position: relative;
}
</style>