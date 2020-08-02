<!--
 * @Date: 2020-06-02 15:22:39
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-23 12:57:24
--> 
<template>
  <div id="__ERROR__">
    <div class="error-text">
      <span>o(╥﹏╥)o</span>
      <span>您访问的活动不存在！</span>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="scss">
#__ERROR__ {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.error-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;
  font-size: 20px;
  margin-top: 80px;
}
</style>
