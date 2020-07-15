<!--
 * @Date: 2020-04-09 15:15:50
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 16:22:15
 -->
<template>
  <div>
    <header :title="title" />
    <span>This is a Rank page.</span>
  </div>
</template>

<script>
import Header from '../../components/Header.vue';

export default {
  components: { HeaderLayout: Header },
  data() {
    return {
      title: '排行榜',
    };
  },
  mounted() {
    console.log('rank mounted');
  },
};
</script>
<style scoped>

</style>