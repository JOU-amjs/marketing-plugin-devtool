<!--
 * @Date: 2020-08-24 15:41:49
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-21 15:34:20
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
        <van-button round class="btn-receive"
          :text="btnTextComputed"
          @click.stop="receiveHandler" 
          :disabled="couponDisabled || couponReceiveOver || btnDisabled"
          :loading="btnLoading"
        ></van-button>
      </div>
    </div>
    <van-progress v-if="!couponDisabled"
      class="progress"
      stroke-width="2"
      :inactive="couponReceiveOver" 
      :pivot-text="`剩${leftPercent}%`" 
      :percentage="leftPercent"
      color="linear-gradient(to right, #fbe8ee, #eea29d)"
      pivot-color="#ff0047"
    />
	</div>
</template>

<script>
import PromotionalTag from './promotional-tag.vue';
import PriceText from './price-text.vue';
import {
  btnTextComputed,
  leftPercent,
  couponDisabled,
} from './helper';

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
    btnText: String,
    btnDisabled: {
      type: Boolean,
      default: false,
    },
    btnLoading: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      validate: val => val > 0 && val < 1,
    }
  },
  components: {
    PromotionalTag,
    PriceText,
  },
  computed: {
    priceDisabled() {
      return priceDisabled.call(this);
    },
    discount() {
      return discount.call(this);
    },
    couponDisabled() {
      return couponDisabled.call(this);
    },
    couponReceiveOver() {
       return this.leftPercent <= 0;
    },
    btnTextComputed() {
      return btnTextComputed.call(this);
    },
    leftPercent() {
      return leftPercent.call(this);
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
  position: relative;
  padding: 10px;
  padding-bottom: 20px;
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
}
.progress {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>