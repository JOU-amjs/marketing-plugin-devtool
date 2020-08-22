<!--
 * @Date: 2020-08-14 11:47:53
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-14 13:36:37
-->
<template>
  <div>
    <dish-hori-rack v-for="couponDish in couponDishes" :key="couponDish.id"
      
    />
  </div>
</template>
<script>
import dishHoriRack from './dish-hori-rack.vue';

export default {
  components: { dishHoriRack },
  data() {
    return {
      couponDishes: [{}, {}],
    };
  }
};
</script>

<style lang="scss" scoped>

</style>