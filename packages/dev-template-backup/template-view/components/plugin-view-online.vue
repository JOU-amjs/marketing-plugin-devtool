<!--
 * @Date: 2020-07-06 21:32:30
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 21:34:03
--> 
<template>
  <div class="container">
    <iframe ref="configFrame" class="main-frame" :src="programUrl"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    programUrl: String,
  },
};
</script>

<style scoped>

</style>