<!--
 * @Date: 2020-04-09 15:15:50
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-04-09 15:16:58
 -->
<template>
  <div>
    <header :title="title" />
    <span>This is a Rank page.</span>
  </div>
</template>

<script>
import Header from '../../components/Header.vue';

EL.Page({
  components: { Header },
  data() {
    return {
      title: '排行榜',
    };
  },
  mounted() {},
});
</script>
<style scoped>

</style>