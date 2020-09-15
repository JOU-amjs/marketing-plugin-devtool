<!--
 * @Date: 2020-08-24 15:41:49
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 12:44:41
-->
<template>
	<div class="container" @click="boxPressHandler">
		<div class="flex-row justify-between align-center">
      <span class="name">{{ couponData.name }}</span>
      <span class="describe" v-if="couponData.couponStr">{{ couponData.couponStr }}</span>
    </div>
    <div v-if="couponData.useLimitStrArray.length > 0" class="use-limit">{{ couponData.useLimitStrArray.join(' / ') }}</div>
    <div class="info-bottom flex-row justify-between">
      <div>
        <price-text v-if="couponPrice > 0" :amount="couponPrice" size="large" />
      </div>
      <div class="flex-column">
        <button :class="{ 'btn-receive': true, 'btn-disabled': couponDisabled || couponReceiveOver }" 
          @click.stop="receiveHandler"
          :disabled="couponDisabled || couponReceiveOver"
        >{{ btnText }}</button>
        <van-progress v-if="!couponDisabled" 
          class="progress" 
          :inactive="couponReceiveOver" 
          :pivot-text="`剩余${leftPercent}%`" 
          :percentage="leftPercent"
        />
      </div>
    </div>
	</div>
</template>

<script>
import PromotionalTag from './promotional-tag.vue';
import PriceText from './price-text.vue';
import Progress from 'vant/lib/progress';
import 'vant/lib/progress/style';

export default {
  props: {
    couponData: {
      type: Object,
      required: true,
    },
    couponPrice: {
      type: Number,
      default: 0,
    },
  },
  components: {
    PromotionalTag,
    PriceText,
    [Progress.name]: Progress,
  },
  computed: {
    couponDisabled() {
      return this.couponData.status.toString() === '0';
    },
    couponReceiveOver() {
       return this.leftPercent <= 0;
    },
    btnText() {
      if (this.couponDisabled) {
        return '已过期';
      }
      if (this.leftPercent <= 0) {
        return '已领完';
      }
      return this.couponPrice > 0 ? '抢券' : '领券';
    },
    leftPercent() {
      let { limitAmount, receivedAmount } = this.couponData
      let leftPercent = (limitAmount - receivedAmount) / limitAmount * 100;
      return Math.round(leftPercent);
    }
  },
  methods: {
    boxPressHandler() {
      this.$emit('box-press');
    },
    receiveHandler() {
      this.$emit('btn-press');
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
.name {
  font-size: $font-title-4;
  color: $color-gray-4;
  font-weight: bolder;
}
.describe {
  font-size: $font-text-secondary;
  color: $color-gray-4;
}
.use-limit {
  margin-top: 4px;
  font-size: $font-text-secondary;
  color: $color-gray-2;
}
.info-bottom {
  margin-top: 20px;
  .btn-receive {
    @extend .u-btn;
  }
  .btn-disabled {
    opacity: 0.5;
  }
  .progress {
    margin-top: 14px;
  }
}
</style>