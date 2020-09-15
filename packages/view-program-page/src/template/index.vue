<!--
 * @Date: 2019-12-04 11:45:38
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 12:50:12
 -->
<template>
  <div>
    <union-shop-collection />
    <coupon-expression :list-data="couponData"
      @item-press="itemPressHandler"
      @item-btn-press="itemBtnPressHandler"
    >
      <template #default="aa">
        <span>123, {{ aa }}</span>
      </template>
    </coupon-expression>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: '',
      couponData: [{
        id: 1,
        price: 0.2
      }, {
        id: 2,
        price: 0.2
      }, {
        id: 3,
        price: 0
      }, {
        id: 4,
        price: 0.2
      }, {
        id: 5,
        price: 0
      }, {
        id: 16,
        price: 40
      }, {
        id: 7,
        price: 0.2
      }, {
        id: 11,
        price: 0.2
      }]
    };
  },
  methods: {
    itemPressHandler({ name }, { price }) {
      console.log('item press', name, price);
    },
    itemBtnPressHandler({ name }, { price }) {
      console.log('item btn press', name, price);
    }
  }
};
</script>