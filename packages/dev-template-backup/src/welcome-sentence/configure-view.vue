<!--
 * @Date: 2019-08-27 16:11:43
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-06 13:05:01
 -->
<template>
  <div class="component">
    <tab-wrap editable @edit="tabEdit">
      <list-view v-for="(item, i) in groupGreetingList" :key="item.key" :label="`阶段${i + 1}`" :name="item.key">
      <view-item label="起始等级" type="input-number" v-model="item.levelStart" placeholder="等级起始范围"></view-item>
      <view-item label="末尾等级" type="input-number" v-model="item.levelEnd" placeholder="等级结束范围"></view-item>
      <view-item label="欢迎主语" type="input" v-model="item.greetingWords" placeholder="欢迎标题"></view-item>
      <view-item label="欢迎副语" type="input" v-model="item.greetingAdverbs" placeholder="解释欢迎主语，字体比主语小"></view-item>
    </list-view>
    </tab-wrap>
  </div>
</template>

<script>
const greetingItem = {
  levelStart: '',
  levelEnd: '',
  greetingWords: '',
  greetingAdverbs: '',
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
      groupGreetingList: this.setRandomKey(this.value.groupGreetingList || [Object.assign({}, greetingItem)]),
    };
  },
  methods: {
    tabEdit(action, { index }) {
      this.manageTabs(this.groupGreetingList, greetingItem, action, index, true);
    },
  },
  mounted() {
    this.onSubmit(() => {
      const groupGreetingList = this.removeKey(this.groupGreetingList);
      const res = this.superInspector.inspect(
        groupGreetingList, 
        this.superInspector.ArrayInspector(({ value, throwError }) => {
          if (value.levelStart <= 0 || value.levelEnd <= 0 || !value.greetingWords || !value.greetingAdverbs) {
            throwError('object_can_not_empty', '每一项的四个参数必填');
          }
          else if (value.levelStart >= value.levelEnd) {
            throwError('start_not_gt_end', '结束等级不能小于起始等级');
          }
        }
      ));
      if (res.code === 'ok') {
        return { groupGreetingList };
      }
      else {
        alert('参数不能为空');
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