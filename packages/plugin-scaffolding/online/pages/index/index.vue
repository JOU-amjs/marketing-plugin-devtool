<!--
 * @Date: 2020-04-09 14:48:24
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 16:03:42
 -->
<template>
  <div>
    <header-layout :title="title" />
    <button @click="printConfig">打印配置信息</button>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: { HeaderLayout: Header },
  data() {
    return {
      title: '首页',
    };
  },
  methods: {
    async printConfig() {
      let config = await EL.getConfiguration();
      console.log(config);
    }
  },
  mounted() {
    // this.title = EL.database.title.get('abc');
  },
};
</script>
<style scoped>
</style>