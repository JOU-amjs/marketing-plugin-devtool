<!--
 * @Date: 2020-05-11 10:24:47
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 09:42:56
 -->
<template>
  <div class="component">
    <tab-wrap editable @edit="tabEdit">
      <list-view v-for="(item, i) in groupDishes" :key="item.key" :label="`推荐项${i + 1}`" :name="item.key">
        <view-item label="推荐的菜品" type="dish" @tap="selectDish(i)" :value="item.dishId" placeholder="请选择"></view-item>
        <view-item label="推荐描述" type="input" v-model="item.describe" placeholder="菜品推荐描述"></view-item>
      </list-view>
    </tab-wrap>
    <list-view class="recommend-title">
      <view-item label="推荐标题" type="input" v-model="recommendTitle" placeholder="默认为`商家推荐`"></view-item>
    </list-view>
  </div>
</template>

<script>
const recommendItem = {
  dishId: '',
  describe: '',
};

export default {
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      recommendTitle: this.value.recommendTitle || '',
      groupDishes: this.setRandomKey(this.value.list || [{ ...recommendItem }]),
    };
  },
  methods: {
    tabEdit(action, { index }) {
      this.manageTabs(this.groupDishes, recommendItem, action, index, true);
    },
    async selectDish(index) {
      const dish = await this.selectDishes();
      this.groupDishes[index].dishId = dish.dishId;
    }
  },
  mounted() {
    this.onSubmit(() => {
      const groupDishes = this.removeKey(this.groupDishes);
      const res = this.superInspector.inspect(
        groupDishes, 
        this.superInspector.ArrayInspector(({ value, throwError }) => {
          if (!value.dishId || !value.describe) {
            throwError('object_can_not_empty', '菜品和推荐描述为必填');
          }
        }
      ));
      if (res.code === 'ok') {
        return {
          recommendTitle: this.recommendTitle,
          list: groupDishes,
        };
      }
      else {
        alert('菜品和推荐描述为必填');
      }
    });
  }
};
</script>

<style scoped>
.component {
  margin-top: 20px;
}
.recommend-title {
  margin-top: 20px;
}
</style>