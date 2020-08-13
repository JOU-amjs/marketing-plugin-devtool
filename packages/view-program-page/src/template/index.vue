<!--
 * @Date: 2019-12-04 11:45:38
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-13 21:45:52
 -->
<template>
  <component :is="current"></component>
</template>

<script>
const currentComponent = 'union-shop-collection';   // 当前显示的组件名
export default {
  data() {
    return {
      current: currentComponent,
    };
  },
};
</script>