<!--
 * @Date: 2019-08-27 08:48:59
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-15 20:10:35
 -->
<template>
  <div class="container">
    <div class="header-wrap flex-row justify-between align-center">
      <div class="scroll-container scroll-x">
        <div class="flex-row" :style="tabsWrapStyle">
          <div class="tab-label-item flex-row border-all" v-for="(tab, i) in tabs" :key="tab.name">
            <span :class="{ selected: selectedIndex === i, 'tab-text': true }" @click="toggleTab(tab.name, i)">{{ tab.label }}</span>
            <span class="btn-close" v-if="editable && tabs.length > 1" @click="editTab('remove', tab.name, i)">×</span>
          </div>
        </div>
      </div>
      <div class="add-wrap border-all" v-if="editable">
        <span class="btn-add" @click="editTab('add')">+</span>
      </div>
    </div>
    <div class="scroll-container">
      <div class="scroll-bd flex-row" :style="listWrapStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
const findTabsIndex = (tabs, name) => {
  let index = -1;
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].name === name) {
      index = i;
      break;
    }
  }
  return index;
}

export default {
  props: {
    editable: Boolean,
    selectedName: [String, Number],
  },
  data() {
    return {
      tabs: [],
      selectedIndex: 0,
    };
  },
  watch: {
    selectedName(newVal) {
      if (!newVal) {
        this.selectedIndex = 0;
      }
      else {
        this.selectedIndex = findTabsIndex(this.tabs, newVal)
      }
    }
  },
  computed: {
    tabsWrapStyle() {
      return {
        width: `${this.tabs.length * 100}px`,
      };
    },
    listWrapStyle() {
      const style = {
        width: `${this.tabs.length * 100}%`,
        left: `-${this.selectedIndex * 100}%`,
      };
      if (this.selectedIndex <= -1) {
        style.display = 'none';
      }

      return style;
    }
  },
  mounted() {
    if (this.selectedName) {
      this.selectedIndex = findTabsIndex(this.tabs, this.selectedName);
    }
  },
  methods: {
    /**
     * @description: 此方法给list-view组件调用，用于通知该组件有几个list-view需要管理
     * @author: JOU(wx: huzhen555)
     * @param {string} label 标签名
     * @param {string} name  唯一名称
     * @return: void
     */
    pushTabs(label, name) {
      this.tabs.push({ label, name });
    },

    /**
     * @description: 此方法给list-view组件调用，当一个list-view被销毁时会通知该组件移除对应的标签
     * @author: JOU(wx: huzhen555)
     * @param {string} label 标签名
     * @return: void
     */
    removeTabs(name) {
      let index = findTabsIndex(this.tabs, name);
      if (index >= 0) {
        this.tabs.splice(index, 1);
      }
    },

    /**
     * @description: 此方法给list-view组件调用，当一个list-view的label值改变时触发
     * @author: JOU(wx: huzhen555)
     * @param {string} label 标签名
     * @param {string} name  唯一名称
     * @return: void
     */
    updateTabs(label, name) {
      let index = findTabsIndex(this.tabs, name);
      if (index >= 0) {
        this.tabs.splice(index, 1, { label, name });
      }
    },

    /**
     * @description: 标签页切换方法
     * @author: JOU(wx: huzhen555)
     * @param {string} name  唯一名称
     * @param {number} index 切换的下标
     * @return: void
     */
    toggleTab(name, index) {
      this.selectedIndex = index;
      this.$emit('tab-changed', { name, index });
    },

    /**
     * @description: 标签页增加或移除方法
     * @author: JOU(wx: huzhen555)
     * @param {string} action 编辑动作，add或remove
     * @param {string} name  唯一名称
     * @param {number} index 切换的下标
     * @return: void
     */
    editTab(action, name, index) {
      this.$emit('edit', action, action === 'remove' ? { name, index } : {});
      if (action === 'remove') {
        this.$nextTick(() => {
          if (!this.tabs[index]) {
            this.selectedIndex = index - 1;
          }
        });
      }
    }
  },
};
</script>

<style scoped>
.header-wrap {
  margin: 0 10px;
}
.scroll-container {
  width: 100%;
  overflow: hidden;
}
.scroll-bd {
  position: relative;
  transition: left 0.3s;
}
.scroll-x {
  overflow-x: auto;
}
.tab-label-item {
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-bottom: none;
  background: white;
  position: relative;
}
.btn-close {
  position: absolute;
  font-size: 20px;
  color: #ddd;
  top: 4px;
  right: 2px;
  padding: 4px;
}
.tab-text {
  padding: 6px 16px;
}
.selected {
  color: #ff0047;
}
.add-wrap {
  background: white;
  margin-left: 10px;
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
</style>