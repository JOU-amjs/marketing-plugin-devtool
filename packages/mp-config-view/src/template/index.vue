<!--
 * @Date: 2019-12-04 11:45:38
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-04 11:50:37
 -->
<template>
  <component :is="current"></component>
</template>

<script>
import TemplateListView from './list-view.vue';

const currentComponent = 'template-list-view';   // 当前显示的组件名
export default {
  components: {
    TemplateListView,
  },
  data() {
    return {
      current: currentComponent,
    };
  },
};
</script>