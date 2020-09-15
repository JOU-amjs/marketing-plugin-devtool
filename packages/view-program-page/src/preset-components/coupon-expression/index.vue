<!--
 * @Date: 2020-08-14 11:47:53
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 12:55:08
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
    <div class="dish-item-wrap" v-for="couponInfo in couponInfos" :key="couponInfo.id">
      <dish-hori-rack v-if="couponInfo.couponData.dishes_id && couponDishInfos[couponInfo.couponData.dishes_id]" 
        :couponData="couponInfo"
        :data="couponDishInfos[couponInfo.couponData.dishes_id]"
        :couponPrice="couponInfo.price"
        @box-press="boxPressHandler(couponInfo, couponDishInfos[couponInfo.couponData.dishes_id])"
        @btn-press="btnPressHandler(couponInfo, couponDishInfos[couponInfo.couponData.dishes_id])"
      />
      <amount-sales v-else 
        :couponData="couponInfo" 
        :couponPrice="couponInfo.price"
        @box-press="boxPressHandler(couponInfo, {})"
        @btn-press="btnPressHandler(couponInfo, {})"
      />
    </div>
  </div>
</template>
<script>
import EL from 'view-program-lib';
import Loading from 'vant/lib/loading';
import 'vant/lib/loading/style';
import dishHoriRack from './dish-hori-rack.vue';
import AmountSales from './amount-sales.vue';

// const { request } = EL.Page();
export default {
  props: {
    listData: {
      type: Array,
      required: true,
    },
    showPrepurchaseCoupon: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    dishHoriRack,
    AmountSales,
    [Loading.name]: Loading,
  },
  data() {
    return {
      loading: false,
      page: 1,
      row: 10,
      couponInfos: [],
      couponDishInfos: {},
    };
  },
  watch: {
    listData(newVal) {
      this.page = 1;
      this.couponInfos = [];
      this.getPageCouponInfo();
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
        let couponInfos = await EL.getCouponInfo(this.requestCoupon.map(({ id }) => id));
        this.requestCoupon.forEach(({ id, price }) => couponInfos[id].price = price);
        this.couponInfos.push(...Object.values(couponInfos).filter(item => item && !item.disabled));
        this.page++;
        
        // 如果有菜品相关优惠券则去获取菜品数据
        let couponDishIds = this.couponInfos.map(({ couponData }) => couponData.dishes_id).filter(item => item);
        this.couponDishInfos = await EL.getDishInfo(couponDishIds);
        Object.values(this.couponDishInfos).forEach(dishInfo => dishInfo.tag = dishInfo.suitsDishes ? '优惠组合' : dishInfo.tag);
      }
    },
    boxPressHandler(couponInfo, couponRefInfo) {
      this.$emit('item-press', couponInfo, couponRefInfo);
    },
    btnPressHandler(couponInfo, couponRefInfo) {
      this.$emit('item-btn-press', couponInfo, couponRefInfo);
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
  padding: 10px;
  @include box-shadow(rgba(100, 100, 100, 0.1));
}
</style>