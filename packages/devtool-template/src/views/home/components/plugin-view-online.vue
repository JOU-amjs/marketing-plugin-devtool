<!--
 * @Date: 2020-07-06 21:32:30
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-23 10:15:51
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
import { TNavOptions, TPageConfig, TShareMessage } from '../../../store';
import { IGeneralObject } from '@/common/common.inter';

export type TPayOptions = {
  intent: 'couponPurchase'|'recharge',   // purchaseCoupon为购买券，recharge为预充值
  couponGroupId?: string,
  amount: number,
  clientParams?: IGeneralObject<any>,   // 客户端参数，该参数可在服务端代码处理时原样获取
};
export type TPayData = {
  payOptions: TPayOptions,
  couponInfo?: IGeneralObject<any>,
};

@Component
export default class PluginViewOnline extends Vue {
  @Prop(String) private programUrl!: string;
  @Mutation updateState!: TMutationFn;
  mounted() {
    let message = new WindowMessage((this.$refs.programFrame as HTMLIFrameElement).contentWindow, 'programFrame');
    const messageListeners = {
      titleChanged: (pageTitle: string) => this.updateState({ pageTitle }),
      pageConfig: (pageConfig: TPageConfig) => this.updateState({
        pageConfig,
        shareMessage: pageConfig.shareMessage,
      }),
      navigate: (page: TNavOptions) => this.$emit('navigate', page),
      toShare: (shareMessage: TShareMessage) => this.$emit('share', shareMessage),
      pay: (payData: TPayData) => this.$emit('pay', payData),
    };

    for (let name in messageListeners) {
      message.on(name, messageListeners[name as keyof typeof messageListeners]);
    }
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