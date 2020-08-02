<!--
 * @Date: 2020-07-06 21:28:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-20 15:44:05
--> 
<template>
  <div class="container">
    <iframe ref="configFrame" class="main-frame" :src="configUrl"></iframe>
    <div class="btn-submit" @click="reviewData">
      <span>提交配置参数</span>
    </div>
  </div>
</template>

<script lang="ts">
import WindowMessage from '@/common/window-message';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { localhostRequest } from '@/common/network/request';
import { Mutation } from 'vuex-class';
import { TMutationFn } from '@/store';
import { config } from '@vue/test-utils';

@Component
export default class ConfigFrame extends Vue {
  @Prop(String) private configUrl!: string;
  @Mutation('updateState') updateState!: TMutationFn;
  private message: WindowMessage|undefined;
  private reviewData() {
    this.message?.emit('_emitSubmit');
  }
  private async postData(configData: any) {
    let { data } = await localhostRequest.post('/mock/save_config_data', {
      configData,
    });
    if (data.code === 200) {
      this.updateState({ configData });
      let programFrameMessage = WindowMessage.getWindowMessage('programFrame');
      programFrameMessage?.emit('configData', configData);
      this.$message.success('提交成功，请左侧查看数据');
    }
  }
  mounted() {
    let message = this.message = new WindowMessage((this.$refs.configFrame as HTMLIFrameElement).contentWindow, 'configFrame');
    message.on('postData', this.postData);
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .main-frame {
    width: 100%;
    height: 100%;
    border: none;
  }
  .btn-submit {
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 25%;
    bottom: 30px;
    background: linear-gradient(to right, #ff5f58, #ff0047);
    border-radius: 25px;
    cursor: pointer;
    z-index: 100;
    transition: all 0.5s;
  }
  .btn-submit span {
    color: white;
    font-size: 16px;
  }
  .btn-submit:hover {
    opacity: 0.6;
  }
}
</style>