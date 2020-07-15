<!--
 * @Date: 2020-04-09 14:35:58
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-04-09 15:09:01
 -->
<template>
  <span class="main">This is a {{ name }}.</span>
</template>
<script>
export default {
  data() {
    return {
      name: 'header',
    };
  },
};
</script>
<style scoped>
.main {
  color: #000;
}
</style>