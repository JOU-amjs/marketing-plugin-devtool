<!--
 * @Date: 2020-04-09 14:35:58
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 15:30:44
 -->
<template>
  <span class="main">This is a {{ name }}. And title is {{ title }}</span>
</template>
<script>
export default {
  props: ['title'],
  data() {
    return {
      name: '导航栏',
    };
  },
};
</script>
<style scoped>
.main {
  color: #000;
}
</style>