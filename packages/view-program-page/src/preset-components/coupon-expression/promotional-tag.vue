<!--
 * @Date: 2020-08-14 13:25:11
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 15:22:57
-->
<template>
  <span class="promotional-tag" :style="textColor">{{ text }}</span>
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
  border-width: 1px;
  font-size: 10px;
  padding: 0px 3px;
  border-radius: 20px;
  display: flex;
}
</style>
