<!--
 * @Date: 2020-07-06 21:32:30
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 14:59:32
--> 
<template>
  <div class="container">
    <iframe ref="programFrame" class="main-frame" :src="programUrl"></iframe>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import WindowMessage from '@/common/window-message';
import { TMutationFn } from '@/store';

@Component
export default class PluginViewOnline extends Vue {
  @Prop(String) private programUrl!: string;
  @Mutation updateState!: TMutationFn;
  private titleChanged(pageTitle: string) {
    this.updateState({ pageTitle });
  }
  mounted() {
    let message = new WindowMessage((this.$refs.programFrame as HTMLIFrameElement).contentWindow, 'programFrame');
    message.on('titleChanged', this.titleChanged);
  }
};
</script>

<style scoped>
.main-frame {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>