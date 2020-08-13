<!--
 * @Date: 2020-06-02 15:22:39
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-13 21:49:44
--> 
<template>
  <div id="__MARKETING_AD__" v-if="nodeEnv === 'production'">
    <!-- <unpayed></unpayed> -->
  </div>
  <template-index v-else />
</template>

<script>
import Unpayed from './modules/Unpayed.vue';
import TemplateIndex from './template/index.vue';

export default {
  components: {
    Unpayed,
    TemplateIndex
  },
  computed: {
    nodeEnv() {
      return process.env.NODE_ENV;
    }
  }
};
</script>

<style lang="scss">
#__MARKETING_AD__ {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
