<!--
 * @Date: 2019-08-25 15:15:48
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-06 13:00:37
 -->
<template>
  <div class="component">
    <tab-wrap editable @edit="tabEdit">
      <list-view v-for="(item, i) in groupDiscount" :key="item.key" :label="`阶段${i + 1}`" :name="item.key">
      <view-item label="满减金额门槛" type="input-number" v-model="item.canAmount" placeholder="满多少钱可减金额"></view-item>
      <view-item label="优惠金额" type="input-number" v-model="item.discountOrder" placeholder="满当前的金额门槛可优惠的金额"></view-item>
    </list-view>
    </tab-wrap>
  </div>
</template>

<script>
const itemObj = { canAmount: '', discountOrder: '' };
export default {
  props: {
    value: Object,
  },
  data() {
    const discountObj = Object.assign({}, itemObj);
    return {
      groupDiscount: this.setRandomKey(this.value ? this.value.groupDiscount : [discountObj]),
    };
  },
  methods: {
    tabEdit(action, { index }) {
      this.manageTabs(this.groupDiscount, itemObj, action, index, true);
    },
  },
  mounted() {
    this.onSubmit(() => {
      const groupDiscount = this.removeKey(this.groupDiscount);
      const res = this.superInspector.inspect(groupDiscount, this.superInspector.ArrayInspector(({ value, throwError }) => {
        if (value.canAmount <= 0 || value.discountOrder <= 0) {
          throwError('object_can_not_empty', 'canAmount和discountOrder必填');
        }
      }));
      if (res.code === 'ok') {
        return { groupDiscount };
      }
      else {
        alert('满减金额门槛和优惠金额不能为空');
      }
    });
  }
};
</script>

<style scoped>
.component {
  margin-top: 20px;
}
</style>