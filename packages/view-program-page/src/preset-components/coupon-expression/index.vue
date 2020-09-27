<!--
 * @Date: 2020-08-14 11:47:53
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-23 09:04:57
-->
<!--
 * @Date: 2020-08-14 11:47:53
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 15:39:06
-->
<template>
  <div v-if="loading" class="flex-column align-center loading-wrap">
    <van-loading size="24px">加载中...</van-loading>
  </div>
  <div class="flex-column" v-else>
    <div :class="['dish-item-wrap', typeof itemStyle === 'string' ? itemStyle : '']" 
      :style="typeof itemStyle === 'object' ? itemStyle : ''"
      v-for="couponInfo in couponInfos" 
      :key="couponInfo.id"
    >
      <dish-hori-rack v-if="couponInfo.couponData.dishes_id && couponDishInfos[couponInfo.couponData.dishes_id]" 
        :coupon-data="couponInfo"
        :data="couponDishInfos[couponInfo.couponData.dishes_id]"
        :coupon-price="listDataMap[couponInfo.id].price"
        :btn-text="btnText"
        :btn-disabled="listDataMap[couponInfo.id].btnDisabled"
        :btn-loading="listDataMap[couponInfo.id].btnLoading"
        :progress="listDataMap[couponInfo.id].progress"
        @box-press="boxPressHandler(couponInfo, couponDishInfos[couponInfo.couponData.dishes_id])"
        @btn-press="btnPressHandler(couponInfo, couponDishInfos[couponInfo.couponData.dishes_id])"
      />
      <amount-sales v-else 
        :coupon-data="couponInfo" 
        :coupon-price="listDataMap[couponInfo.id].price"
        :btn-text="btnText"
        :btn-disabled="listDataMap[couponInfo.id].btnDisabled"
        :btn-loading="listDataMap[couponInfo.id].btnLoading"
        :progress="listDataMap[couponInfo.id].progress"
        @box-press="boxPressHandler(couponInfo, {})"
        @btn-press="btnPressHandler(couponInfo, {})"
      />
    </div>
  </div>
</template>
<script>
import EL from 'view-program-lib';
import dishHoriRack from './dish-hori-rack.vue';
import AmountSales from './amount-sales.vue';

// const { request } = EL.Page();
export default {
  props: {
    listData: {
      type: Array,
      required: true,
    },
    btnText: String,
    showPrepurchaseCoupon: {
      type: Boolean,
      default: false,
    },
    itemStyle: [String, Object],
  },
  components: {
    dishHoriRack,
    AmountSales,
  },
  data() {
    return {
      loading: false,
      page: 1,
      row: 10,
      listDataMap: {},
      couponInfos: [],
      couponDishInfos: {},
    };
  },
  watch: {
    listData(newVal) {
      this.reload();
    }
  },
  mounted() {
    this.getPageCouponInfo();
  },
  computed: {
    requestCoupon() {
      let start = (this.page - 1) * this.row;
      let end = this.page * this.row;
      return this.listData.slice(start, end);
    }
  },
  methods: {
    async getPageCouponInfo() {
      if (this.requestCoupon.length > 0) {
        this.requestCoupon.forEach(dataItem => this.listDataMap[dataItem.id] = dataItem);
        let couponInfos = await EL.getCouponInfo(this.requestCoupon.map(({ id }) => id));
        if (couponInfos.length > 0) {
          return false;
        }
        this.couponInfos.push(...Object.values(couponInfos).filter(item => item && !item.disabled));
        this.page++;
        
        // 如果有菜品相关优惠券则去获取菜品数据
        let couponDishIds = this.couponInfos.map(({ couponData }) => couponData.dishes_id).filter(item => item);
        this.couponDishInfos = await EL.getDishInfo(couponDishIds);
        Object.values(this.couponDishInfos).forEach(dishInfo => dishInfo.tag = dishInfo.suitsDishes ? '优惠组合' : dishInfo.tag);
        return true;
      }
      return false;
    },
    loadMore() {
      return this.getPageCouponInfo();
    },
    reload() {
      this.couponInfos = [];
      this.page = 1;
      this.getPageCouponInfo();
    },
    boxPressHandler(couponInfo, couponRefInfo) {
      let reqData = this.listDataMap[couponInfo.id];
      this.$emit('item-press', reqData, couponInfo, couponRefInfo);
    },
    btnPressHandler(couponInfo, couponRefInfo) {
      let reqData = this.listDataMap[couponInfo.id];
      this.$emit('item-btn-press', reqData, couponInfo, couponRefInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-wrap {
  padding: 100px 0px;
}
.dish-item-wrap {
  margin: 0 $page-margin-width;
  margin-bottom: 10px;
  border-radius: $b-rds-10;
  @include box-shadow(rgba(100, 100, 100, 0.1));
}
</style>