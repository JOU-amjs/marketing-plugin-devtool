<!--
 * @Date: 2019-08-29 17:36:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-22 21:02:21
 -->
<template>
  <div class="view-item-wrap tap-highlight flex-row border-top" 
    :style="{ height: subLabel ? '60px' : '48px' }" 
    @click="textClickHandler"
  >
    <div class="label-wrap flex-column">
      <span class="label">{{ label }}</span>
      <span class="sub-label" v-if="subLabel">{{ subLabel }}</span>
    </div>
    <div class="flex-row align-center" v-if="arrowType || type === 'select'">
      <select class="hidden-select" v-model="inputVal" v-if="type === 'select'">
        <option v-for="(optItem, i) in (options || [])" :key="i" :value="optItem.value">{{ optItem.text }}</option>
      </select>
      <div class="clip-icon-wrap" v-if="imageUrl">
        <img class="clip-icon" :src="imageUrl" />
      </div>
      <span class="text" :style="{ color: value !== undefined ? '#333' : '#999' }">{{ valueText }}</span>
      <span class="iconfont">&#xe8c3;</span>
    </div>
    <input class="val-input" :type="inputType" 
      v-else 
      :placeholder="placeholder || '请输入内容'" 
      v-model="inputVal"
    />
  </div>
</template>

<script>
import { proxyRequestData } from './request-proxy';
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    subLabel: String,
    type: {
      validator: val => /^text|input|input-number|select|dish|category|coupon$/.test(val),
      type: String,
      default: 'text',
    },
    placeholder: String,
    value: [String, Number, Array],
    options: Array,
  },
  data() {
    return {
      inputVal: this.value,
      aliasName: '',
      imageUrl: '',
    };
  },
  watch: {
    inputVal(newVal) {
      if (this.type === 'input-number') {
        newVal = parseFloat(newVal);
      }
      this.$emit('input', newVal);
    },
    value() {
      this.requestDescData();
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  computed: {
    inputType() {
      return ({
        input: 'text',
        'input-number': 'number',
      })[this.type];
    },
    arrowType() {
      let type = this.type;
      return type === 'text' || type === 'dish' || type === 'category' || type === 'coupon';
    },
    valueText() {
      let type = this.type;
      if (type === 'dish' || type === 'category' || type === 'coupon') {
        return this.aliasName;
      }
      else if (this.value !== undefined) {
        if (type === 'select') {
          let option = (this.options || []).find(({ value }) => value === this.value);
          return option ? option.text : this.value;
        }
        return this.value;
      }
      return this.placeholder;
    }
  },
  created() {
    this.requestDescData();
  },
  methods: {
    textClickHandler(e) {
      if (this.arrowType) {
        this.$emit('tap', e);
      }
    },
    requestDescData() {
      // 通过代理统一请求数据，再分发到各个view-item对象中
      if (/^dish|category|coupon$/.test(this.type) && this.value) {
        proxyRequestData(this.type, this.value, resData => {
          if (resData.length > 0) {
            if (this.type === 'dish') {
              this.aliasName = resData[0].name + (resData.length > 1 ? `等${resData.length}个` : '');
              this.imageUrl = resData[0].media[0];
            }
            else if (this.type === 'category') {
              this.aliasName = resData[0].name + (resData.length > 1 ? `等${resData.length}个` : '');
              this.imageUrl = resData[0].icon;
            }
            else if (this.type === 'coupon') {
              this.aliasName = resData[0].name + (resData.length > 1 ? `等${resData.length}个` : '');
            }
          }
          else {
            this.aliasName = '未知项';
          }
        });
      }
    }
  },
}
</script>

<style scoped>
.view-item-wrap {
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}
.view-item-wrap:first-child {
  border: none;
}
.view-item-wrap .label {
  font-size: 16px;
  color: #333;
}
.label-wrap {
  width: 50%;
}
.text {
  margin-right: 4px;
  font-size: 16px;
}
.sub-label {
  width: 100%;
  font-size: 12px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.val-input {
  padding: 10px 0;
  text-align: right;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  width: 65%;
}
.clip-icon-wrap, .clip-icon {
  width: 24px;
}
.clip-icon-wrap {
  height: 24px;
  overflow: hidden;
  border-radius: 4px;
  margin-right: 6px;
}
.hidden-select {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
}
</style>