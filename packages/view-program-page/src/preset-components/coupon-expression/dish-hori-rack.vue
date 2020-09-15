<template>
  <div class="dish-wrap" @click="boxPressHandler">
    <div class="dish-tag" v-if="data.tag">
      <badge :text="data.tag" :color="dishTagColors" inverted shape="triangle" />
    </div>
    <img class="dish-img" v-if="data.media[0]" :src="data.media[0]" />
    <div class="dish-img" v-else />
    <div class="dish-info">
    	<div class="info-top">
        <div class="dish-name-wrap">
        	<span class="dish-name">{{ data.name }}</span>
        </div>
        <span class="describe" v-if="data.describe">{{ data.describe }}</span>
      </div>
      <div class="info-bottom flex-row align-right justify-between">
      	<div class="price-discount">
      		<div class="price" v-if="couponPrice > 0">
      		  <!-- 当没有saledPrice参数时不显示第一个price-text组件，且第二个组件的disabled为false -->
      			<price-text :amount="couponPrice" size="large" />
      		  <price-text :amount="data.price" :disabled="priceDisabled" size="large" />
      		</div>
      		<div class="discount" v-if="priceDisabled">
      			<promotional-tag color="#FF8558" :text="discount || ''" />
      		  <span v-if="data.limitCopies" class="limit-copies">优惠限{{ data.limitCopies }}份</span>
      		</div>
      	</div>
        <div class="btn-operate flex-column">
        	<button :class="{ 'btn-receive': true, 'btn-disabled': couponDisabled || couponReceiveOver }" 
            @click.stop="receiveHandler" 
            :disabled="couponDisabled"
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
  </div>
</template>

<script>
import PromotionalTag from './promotional-tag.vue';
import PriceText from './price-text.vue';
import Badge from './badge.vue';
import Progress from 'vant/lib/progress';
import 'vant/lib/progress/style';

export default {
  components: {
    PromotionalTag,
    PriceText,
    Badge,
    [Progress.name]: Progress,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    couponData: {
      type: Object,
      required: true,
    },
    couponPrice: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    priceDisabled() {
      return this.couponPrice > 0 && this.data.price > this.couponPrice;
    },
    discount() {
      return this.priceDisabled ? ((this.couponPrice / this.data.price * 10).toFixed(1) + '折') : '';
    },
    dishTagColors() {
      const colorMap = {
        '招牌': ['#FFCC25', '#333333'],
        '优惠组合': ['#333333', '#FFCC25'],
      };
      
      return colorMap[this.data.tag] || '#ff0047';
    },
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
      let { limitAmount, receivedAmount } = this.couponData;
      let leftPercent = (limitAmount - receivedAmount) / limitAmount * 100;
      console.log(limitAmount, receivedAmount);
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
};
</script>

<style lang="scss" scoped>
.dish-wrap {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-right: $page-margin-width;
  // min-height: 170px;
}
.dish-tag {
  position: absolute;
  top: -3px;
  left: 0;
}
.dish-name-wrap {
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dish-spicy-level {
  color: #ff0000;
  font-size: 14px;
}
.dish-name {
  font-size: $font-text;
  color: $color-gray-4;
}
.dish-img {
  width: 80px;
  height: 80px;
  border-radius: $b-rds-10;
  flex-shrink: 0;
  background: $color-gray-bg;
}
.dish-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
  flex-grow: 1;
}
.info-top {
  display: flex;
  flex-direction: column;
}
.info-bottom {
  margin-top: 26px;
}
.price-discount {
  display: flex;
  flex-direction: column;
}
.describe {
  font-size: $font-explain;
  line-height: $font-explain + 4;
  color: $color-gray-2;
  @include line-2-overflow-hidden;
}
.promo-tags {
  margin-top: 8px;
}
.tag-item {
  margin-right: 10px;
}
.price {
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
  align-items: center;
}
.discount {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.limit-copies {
  font-size: 20px;
  color: $color-gray-3;
  margin-left: 4px;
}
.btn-operate {
  // flex-basis: 138rpx;
}
.progress {
  margin-top: 14px;
}
.btn-receive {
  @extend .u-btn;
}
.btn-disabled {
  opacity: 0.5;
}
</style>