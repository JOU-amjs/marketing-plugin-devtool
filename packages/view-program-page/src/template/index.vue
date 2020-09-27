<!--
 * @Date: 2019-12-04 11:45:38
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-21 16:39:15
 -->
<template>
  <div>
    <union-shop-collection />
    <coupon-expression :list-data="couponData"
      ref="ce"
      btn-text="马上抢"
      item-style="abc"
      @item-press="itemPressHandler"
      @item-btn-press="itemBtnPressHandler"
    >
      <template #default="aa">
        <span>123, {{ aa }}</span>
      </template>
    </coupon-expression>
    <button @click="loadMore">adfasf</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: '',
      couponData: [],
    };
  },
  methods: {
    itemPressHandler(originalData, couponInfo, refInfo) {
      console.log('item press', originalData, couponInfo, refInfo);
    },
    itemBtnPressHandler(originalData, { name }, { price }) {
      console.log('item btn press', name, price);
    },
    async loadMore() {
      let aa = await this.$refs.ce.loadMore();
      console.log(aa);
    }
  },
  mounted() {
    setTimeout(() => {
      this.couponData = [{
        id: 1,
        price: 0.2,
        num: 123,
      }, {
        id: 3,
        price: 0.2,
      }, {
        id: 4,
        price: 0.2,
      }, {
        id: 5,
        price: 0.2,
        btnDisabled: true,
        btnLoading: true,
        progress: 0.9
      }, {
        id: 6,
        price: 0.2,
        num: 123,
      }, {
        id: 7,
        price: 0.2,
      }, {
        id: 8,
        price: 0.2,
      }, {
        id: 9,
        price: 0.2,
        btnDisabled: true,
        btnLoading: true,
        progress: 0.9
      }, {
        id: 10,
        price: 0.2,
        num: 123,
      }, {
        id: 11,
        price: 0.2,
      }, {
        id: 12,
        price: 0.2,
      }, {
        id: 13,
        price: 0.2,
        btnDisabled: true,
        btnLoading: true,
        progress: 0.9
      }, {
        id: 14,
        price: 0.2,
        num: 123,
      }, {
        id: 15,
        price: 0.2,
      }, {
        id: 16,
        price: 0.2,
      }, {
        id: 17,
        price: 0.2,
        btnDisabled: true,
        btnLoading: true,
        progress: 0.9
      }, {
        id: 18,
        price: 0.2,
        num: 123,
      }, {
        id: 19,
        price: 0.2,
      }, {
        id: 20,
        price: 0.2,
      }, {
        id: 21,
        price: 0.2,
        btnDisabled: true,
        btnLoading: true,
        progress: 0.9
      }, {
        id: 22,
        price: 0.2,
        num: 123,
      }, {
        id: 23,
        price: 0.2,
      }, {
        id: 24,
        price: 0.2,
      }, {
        id: 25,
        price: 0.2,
        btnDisabled: true,
        btnLoading: true,
        progress: 0.9
      }, {
        id: 26,
        price: 0.2,
        num: 123,
      }, {
        id: 27,
        price: 0.2,
      }, {
        id: 28,
        price: 0.2,
      }, {
        id: 29,
        price: 0.2,
        btnDisabled: true,
        btnLoading: true,
        progress: 0.9
      }];
    }, 1000);
  }
};
</script>

<style scoped>
.abc {
  background: green;
}
</style>