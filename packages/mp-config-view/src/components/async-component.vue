<!--
 * @Date: 2019-07-06 23:41:42
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-11 23:01:39
 -->
<template>
  <component :is="mode" :value="value" v-bind="$attrs" v-on="$listeners"></component>
</template>

<script>
import invoke from 'react-native-webview-invoke/browser';
import { getConfigComponent } from '@/common/request';
import { localDataMap } from '@/common/util';
export default {
  name: 'AsyncComponent',
  inheritAttrs: true,
  data() {
    return {
      mode: undefined,
      value: undefined,
    };
  },
  async mounted() {
    // 请求外部组件
    const { code, data } = await getConfigComponent(localDataMap.get('query'));
    let loadSuccess = false;
    if (code === 200 && typeof data.componentStr === 'string') {
      let module = new Function(`return ${data.componentStr}`)();
      this.mode = (module || { default: {} }).default;
      this.value = data.config;
      loadSuccess = true;
      this.$nextTick(() => {
        if (invoke.fn.autoHeight) {
          invoke.fn.autoHeight(document.body.scrollHeight + 50);
        }
      });
    }
    this.$emit('loaded', loadSuccess);
  },
};
</script>