<!--
 * @Date: 2020-06-02 15:22:39
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 09:13:40
--> 
<template>
  <div id="__MARKETING_AD__">
    <unpayed></unpayed>
  </div>
</template>

<script>
import Unpayed from './modules/Unpayed.vue';

export default {
  components: {
    Unpayed
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
