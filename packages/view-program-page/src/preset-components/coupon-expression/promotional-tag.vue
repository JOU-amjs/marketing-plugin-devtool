<!--
 * @Date: 2020-08-14 13:25:11
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-14 13:25:29
-->
<template>
  <text class="promotional-tag" :style="textColor">{{ text }}</text>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#FF0047'
    }
  },
  data() {
    return {
      textColor: `border-color: ${this.color}; color: ${this.color}`,
    };
  }
};
</script>

<style lang="scss" scoped>
.promotional-tag {
  border-style: solid;
  border-width: 1upx;
  font-size: 16upx;
  padding: 2upx 6upx;
  border-radius: 20upx;
  display: flex;
}
</style>
