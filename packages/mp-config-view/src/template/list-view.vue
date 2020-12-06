<!--
 * @Date: 2019-08-27 16:11:43
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-30 12:40:40
 -->
<template>
  <div class="component">
    <div class="list-item">
      <tab-wrap editable @edit="tabEdit">
        <list-view v-for="(item, i) in groupGreetingList" :key="item.key" :label="`阶段${i + 1}`" :name="item.key">
          <view-item label="起始等级" type="input-number" disabled v-model="item.levelStart" placeholder="等级起始范围"></view-item>
          <view-item label="末尾等级" type="input-number" v-model="item.levelEnd" placeholder="等级结束范围"></view-item>
          <view-item label="欢迎主语" type="input" v-model="item.greetingWords" placeholder="欢迎标题"></view-item>
          <view-item label="欢迎副语" type="input" v-model="item.greetingAdverbs" placeholder="解释欢迎主语，字体比主语小"></view-item>
        </list-view>
      </tab-wrap>
    </div>
    <button @click="getTabsData">查看tab页数据</button>
    <div class="list-item">
      <list-view name="abc" label="带箭头链接" show-label>
        <view-item label="选项1" sub-label="解释语1" disabled placeholder="请选择" type="dish" :value="dishIds" @tap="selectOption"></view-item>
        <view-item label="选项2" sub-label="解释语2解释语2解释语2解释语2解释语2" placeholder="请选择" value="选项值2"></view-item>
        <view-item label="选项3" type="category" placeholder="请选择" :value="catIds" @tap="selectCats"></view-item>
        <view-item label="选项4" placeholder="请选择" :value="dateVal" @tap="selectNativeDate"></view-item>
        <view-item label="选项5" placeholder="请选择优惠券" type="coupon" :value="couponId" @tap="selectCoupon"></view-item>
      </list-view>
    </div>
    <tab-wrap editable @edit="tabEdit">
      <list-view
        v-for="(item, i) in multipleRowColumnData" 
        :key="i"
        :multiple-list="item" 
        editable
        @edit="listViewEdit"
        :label="`阶段${i + 1}`"
        :sub-label="index => `时限设置${index + 1}`"
        :name="i"
      >
        <template #header>
          <view-item label="时间段" type="input" :max-length="4" v-model="dateVal" placeholder="请选择" @tap="selectTimeMethod" />
        </template>
        <template #default="{ dataItem }">
          <view-item label="欢迎" type="input-number" v-model="dataItem.a" :max="10" :min="2" />
          <view-item label="欢迎" placeholder="请选择" :value="dataItem.a" @tap="selectTimeMethod" />
        </template>
        <template #footer>
          <view-item label="时间段2" placeholder="请选择" @tap="selectTimeMethod" />
          <view-item label="时间选择" placeholder="请选择" @change="selectChangeHandler" type="select" :options="[{value: 1, text:'是'}, {value: 0, text:'否'}]" v-model="timeSelect" />
        </template>
      </list-view>
    </tab-wrap>
    <button @click="print">打印</button>
  </div>
</template>

<script>
const groupGreeting = {
  levelStart: '',
  levelEnd: '',
  greetingWords: '',
  greetingAdverbs: '',
};
export default {
  data() {
    return {
      groupGreetingList: this.setRandomKey([groupGreeting]),
      dishIds: [6,7],
      catIds: [3],
      dateVal: '1233',
      couponId: '1',
      multipleRowColumnData: [[{a: 1}, {a: 2}]],
      timeSelect: '',
    };
  },
  methods: {
    print() {
      console.log(this.multipleRowColumnData);
    },
    tabEdit(action, { index }) {
      this.manageTabs(this.groupGreetingList, groupGreeting, action, index, true);
    },
    listViewEdit(action, { list, index }) {
      this.manageTabs(list, {a: ''}, action, index, true);
    },
    getTabsData() {
      console.log(this.removeKey(this.groupGreetingList));
    },

    // 点击事件
    async selectOption() {
      const dishesData = await this.selectDishes({
        multiple: true,
        selectedIds: this.dishIds,
      });
      this.dishIds = dishesData.map(dishItem => dishItem.dishId);
    },
    async selectCats() {
      const catsData = await this.selectCategories({
        multiple: true,
        selectedIds: this.catIds,
      });
      this.catIds = catsData.map(catItem => catItem.categoryId);
    },
    async selectNativeDate() {
      const dates = await this.selectDate({ mode: 'range', selectedDates: {
        startDate: '2019-12-10',
        endDate: '2019-12-20'
      } });
      this.dateVal = dates;
    },
    async selectCoupon() {
      const couponData = await this.selectCouponGroup();
      this.couponId = couponData.groupId;
    },
    async selectTimeMethod() {
      let time = await this.selectTime();
      console.log(time);
    },
    createLabel(index) {
      console.log(index);
      return '限时设置' + index;
    },
    selectChangeHandler(value, aa) {
      console.log(value, aa);
    }
  },
  mounted() {
    this.onSubmit(async () => {
      return {
        groupGreetingList: this.removeKey(this.groupGreetingList, item => {
          item.levelStart = parseInt(item.levelStart);
          item.levelEnd = parseInt(item.levelEnd);
        }),
      };
    });
  }
};
</script>

<style scoped>
.component {
  margin-top: 20px;
}
.list-item {
  margin-bottom: 20px;
}
</style>