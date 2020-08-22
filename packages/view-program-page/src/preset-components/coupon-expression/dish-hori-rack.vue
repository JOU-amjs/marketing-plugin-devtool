<template>
  <view class="dish-wrap" @tap="clickHandler">
    <view class="dish-tag" v-if="tag">
      <Badge :text="tag" :color="dishTagColors" inverted shape="triangle"></Badge>
    </view>
    <image class="dish-img" v-if="img" :src="img" mode="aspectFill" :lazy-load="true"></image>
    <view class="dish-info">
    	<view class="info-top">
        <view class="dish-name-wrap">
          <text v-for="i in spicyLevel" :key="i" class="iconfont dish-spicy-level">&#xe601;</text>
        	<text class="dish-name">{{ name }}</text>
        </view>
        <text class="describe" v-if="describe">{{ describe }}</text>
        <view class="promo-tags flex-row align-center" v-if="hasUsableCoupon || (promoTags && promoTags.length > 0)">
          <badge v-if="hasUsableCoupon" class="tag-item" text="有券可用" shape="triangle" inverted />
        	<promotional-tag class="tag-item" v-for="tag in promoTags" :key="tag" :text="tag || ''"></promotional-tag>
        </view>
      </view>
      <view class="info-bottom">
      	<view class="price-discount">
      		<view class="price">
      		  
      		  <!-- 当没有saledPrice参数时不显示第一个price-text组件，且第二个组件的disabled为false -->
      			<price-text v-if="saledPrice" :amount="saledPrice"></price-text>
      		  <price-text :amount="price" :disabled="priceDisabled"></price-text>
      		</view>
      		<view class="discount" v-if="saledPrice">
      			<promotional-tag color="#FF8558" :text="discount || ''"></promotional-tag>
      		  <text v-if="limitCopies" class="limit-copies">优惠限{{ limitCopies }}份</text>
      		</view>
      	</view>
        <view class="btn-operate">
        	<view :class="number > 0 && skuOptions.length <= 0 ? 'btn-reduce-dish' : 'btn-reduce-dish btn-hidden'" @tap="reduceDish">
        		<!-- <image class="img-reduce-dish" :src="require('@/assets/images/components/dish-vert-rack/icon_reduce.svg')" mode="widthFix"></image> -->
        	</view>
          <view class="btn-add-dish" @tap="addDish(false)" @longpress="addDish(true)">
            <view :class="number > 0 ? 'dish-number' : 'dish-number btn-hidden'">
              <badge :text="number" :hasPadding="false"></badge>
            </view>
          	<!-- <image class="img-add-dish" :src="require('@/assets/images/components/dish-vert-rack/icon_add.svg')" mode="widthFix"></image> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import PromotionalTag from './promotional-tag.vue';
  import PriceText from './price-text.vue';
  import Badge from './badge.vue';
  
  export default {
    components: { PromotionalTag, PriceText, Badge },
    props: {
      dishId: {
        type: [String, Number],
        required: true,
      },
      categoryId: {
        type: [String, Number],
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      number: {
        validator: val => typeof val === 'number' && val >= 0,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      describe: String,
      price: {
        type: Number,
        required: true,
      },
      saledPrice: Number,
      tag: String,
      promoTags: Array,
      limitCopies: Number,
      spicyLevel: Number,
      skuOptions: {
        type: Array,
        default: [],
      },
      hasUsableCoupon: Boolean,
    },
    computed: {
      priceDisabled() {
        return !!this.saledPrice;
      },
      discount() {
        return this.saledPrice ? ((this.saledPrice / this.price * 10).toFixed(1) + '折') : '';
      },
      dishTagColors() {
        const colorMap = {
          '招牌': ['#FFCC25', '#333333'],
          '优惠组合': ['#333333', '#FFCC25'],
        };
        
        return colorMap[this.tag] || '#ff0047';
      }
    },
    methods: {
      
      /**
       * 触发click事件
       */
      clickHandler() {
        this.$emit('click');
      },
      
      /**
       * 增加一个菜品
       */
      addDish(batch) {
        this.$emit('edit-order-dish', {
          dishId: this.dishId,
          categoryId: this.categoryId,
          ctrl: 1,
          batch,
        });
      },
      
      /**
       * 减去一个菜品
       */
      reduceDish() {
        if (this.number > 0) {
          this.$emit('edit-order-dish', {
          dishId: this.dishId,
          categoryId: this.categoryId,
          ctrl: 0,
        });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.dish-wrap {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-right: $page-margin-width;
  // min-height: 170upx;
}
.dish-tag {
  position: absolute;
  top: -6upx;
  left: 0;
}
.dish-name-wrap {
  margin-bottom: 4upx;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dish-spicy-level {
  color: #ff0000;
  font-size: 22upx;
}
.dish-name {
  font-size: $font-text;
  color: $color-gray-4;
}
.dish-img {
  width: 160upx;
  height: 160upx;
  border-radius: $b-rds-10;
  flex-shrink: 0;
  @include box-shadow(rgba(0, 0, 0, 0.2));
  background: $color-gray-bg;
}
.dish-info {
  display: flex;
  flex-direction: column;
  margin-left: 10upx;
  justify-content: space-between;
  flex-grow: 1;
}
.info-top {
  display: flex;
  flex-direction: column;
}
.info-bottom {
  display: flex;
  flex-direction: row;
  height: 70upx;
  margin-bottom: -20upx;
  justify-content: space-between;
  align-items: flex-end;
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
  margin-top: 8upx;
}
.tag-item {
  margin-right: 10upx;
}
.price {
  display: flex;
  flex-direction: row;
  margin-bottom: 4upx;
  align-items: center;
}
.discount {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.limit-copies {
  font-size: 20upx;
  color: $color-gray-3;
  margin-left: 4upx;
}
.btn-operate {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-basis: 138rpx;
  justify-content: space-between;
  position: relative;
}
.btn-add-dish {
  display: flex;
}
.img-add-dish {
  width: 50upx;
  // @include box-shadow(rgba(178,178,178,0.2));
}
.btn-reduce-dish {
  display:flex;
}
.btn-hidden {
  visibility: hidden;
}
.img-reduce-dish {
  width: 40upx;
}
.dish-number {
  position: absolute;
  top: -18upx;
  right: -8upx;
}
</style>
