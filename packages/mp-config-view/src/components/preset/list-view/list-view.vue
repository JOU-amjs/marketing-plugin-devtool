<!--
 * @Date: 2019-07-07 20:28:12
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-05 14:54:55
 -->
<template>
  <div class="list-view-wrap border-top border-bottom">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: [String, Number],
    name: [String, Number],
  },
  watch: {
    label(newVal) {
      this.$parent.updateTabs(newVal, this.name);
    }
  },
  created() {
    if (this.$parent.pushTabs) {
      this.$parent.pushTabs(this.label, this.name);
    }
  },
  beforeDestroy() {
    if (this.$parent.removeTabs) {
      this.$parent.removeTabs(this.name);
    }
  }
};
</script>

<style scoped>
.list-view-wrap {
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  width: 100%;
  box-sizing: border-box;
  background: white;
}
</style>