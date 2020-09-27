<!--
 * @Date: 2020-07-06 21:28:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-26 15:21:25
--> 
<template>
  <div class="flex-column-center payment-container">
    <div class="flex-column-center payment-info">
      <h1 class="tips">￥{{ (options.amount || 0).toFixed(2) }}</h1>
      <h4>购买 {{ couponName }}</h4>
    </div>
    <el-button class="btn-pay" type="success" @click="pay" :loading="btnLoading">确认支付</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Image, Button } from 'element-ui';
import { TPayData, TPayOptions } from '../plugin-view-online.vue';

@Component({
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  }
})
export default class ConfigFrame extends Vue {
  @Prop(Object) private data!: TPayData;
  get options() {
    return this.data.payOptions;
  }
  get couponName() {
    return this.data.couponInfo ? this.data.couponInfo.name : '';
  }
  private btnLoading = false;
  pay() {
    this.btnLoading = true;
    setTimeout(() => {
      this.$emit('payed', true, this.data.payOptions);
      this.btnLoading = false;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.payment-container {
  .payment-info {
    h1, h4 {
      margin: 0
    }
  }
  .btn-pay {
    margin-top: 50px;
  }
}
</style>