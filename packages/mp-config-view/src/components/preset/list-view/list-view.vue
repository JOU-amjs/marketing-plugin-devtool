<!--
 * @Date: 2019-07-07 20:28:12
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-18 11:15:47
 -->
<template>
  <div class="container">
    <!-- 第一个list是不会显示删除按钮的，所以如果第一个list没有子标签则header需要向下间隔20px -->
    <div class="list-view-wrap border-bottom" 
      v-if="$scopedSlots.header" 
      :style="editableComputed && subLabel(0) ? '' : { marginBottom: '20px' }"
    >
      <slot name="header"></slot>
    </div>
    <div class="container" v-for="(viewItem, i) in multipleListComputed" :key="i">
      <div class="label-wrap" v-if="(labelText = subLabel(i)) || editableComputed && i > 0">
        <span class="label">{{ labelText }}</span>
        <!-- 第一个不支持删除 -->
        <span @click="edit('remove', i)" v-if="editableComputed && i > 0" class="btn-remove">×</span>
      </div>
      <div class="list-view-wrap border-top border-bottom" :style="{
        marginTop: i === 0 || editableComputed ? 0 : '20px'
      }">
        <slot :dataItem="viewItem"></slot>
      </div>
    </div>
    <div class="add-wrap border-all" v-if="editableComputed">
      <span class="btn-add" @click="edit('add')">+</span>
    </div>
    <div class="list-view-wrap border-bottom border-top footer" v-if="$scopedSlots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: [String, Number],
    name: [String, Number],
    multipleList: Array,
    subLabel: {
      type: Function,
      default: () => {},
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    label(newVal) {
      this.$parent.updateTabs(newVal, this.name);
    }
  },
  computed: {
    multipleListComputed() {
      return this.multipleList || [{}];
    },
    editableComputed() {
      return this.multipleList && this.editable;
    }
  },
  methods: {
    edit(action, index) {
      this.$emit('edit', action, {
        list: this.multipleList,
        name: this.name,
        index
      });
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
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.label-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 12px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.label {
  font-size: 14px;
  color: #999;
}
.btn-remove {
  font-size: 30px;
  line-height: 20px;
  padding-left: 20px;
  padding-top: 4px;
}
.list-view-wrap {
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  width: 100%;
  box-sizing: border-box;
  background: white;
}
.add-wrap {
  align-self: flex-end;
  background: white;
  margin-right: 12px;
  margin-top: 8px;
}
.btn-add {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #ddd;
}
.header {
  margin-bottom: 20px;
}
.footer {
  margin-top: 20px;
}
</style>