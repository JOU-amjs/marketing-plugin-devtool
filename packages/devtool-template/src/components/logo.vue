<!--
 * @Date: 2020-07-10 10:27:11
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 13:49:01
--> 
<template>
  <div class="container flex-row align-center">
    <img class="logo" src="@/assets/logo.png" />
    <span class="title-3">有吃生活营销插件开发工具</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Logo extends Vue {

};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 20px;
}
.logo {
  width: 40px;
  margin-right: 10px;
}
</style>