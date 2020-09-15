<!--
 * @Date: 2019-10-18 14:43:30
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 16:19:37
 -->
<template>
  <div class="price-text">
    <span v-if="reduce" :class="reduceCls">-</span>
    <span :class="moneyFlagCls">￥</span>
    <span :class="amountCls">{{ amountDecimal }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      amount: {
        type: Number,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      reduce: {
        type: Boolean,
        default: false,
      },
      size: {
        validator: val => /^default|large$/.test(val),
        default: 'default',
      },
    },
    data() {
      return {
        
      };
    },
    computed: {
      moneyFlagCls() {
        const clsAry = [];
        switch(this.size) {
          case 'default':
            clsAry.push('money-flag-default');
            break;
          case 'large':
            clsAry.push('money-flag-large');
            break;
        }
        
        // 支付宝小程序特殊性：不支持数组式的class写法
        return clsAry.concat([this.disabled ? 'disabled' : 'enabled']).join(' ');
      },
      amountCls() {
        const clsAry = [];
        switch(this.size) {
          case 'default':
            clsAry.push('amount-default');
            break;
          case 'large':
            clsAry.push('amount-large');
            break;
        }
        
        // 支付宝小程序特殊性：不支持数组式的class写法
        return clsAry.concat([this.disabled ? 'disabled' : 'enabled']).join(' ');
      },
      reduceCls() {
        return [this.disabled ? 'disabled' : 'enabled'].join(' ');
      },
      
      // 保留两位小数
      amountDecimal() {
        return this.amount.toFixed(2);
      },
    }
  };
</script>

<style lang="scss" scoped>
.price-text {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.money-flag-default {
  font-size: $font-explain;
}
.amount-default {
  font-size: $font-text;
}
.money-flag-large {
  font-size: $font-text-secondary;
}
.amount-large {
  font-size: $font-title-2;
}
.enabled {
  color: $color-main;
}
.disabled {
  color: $color-gray-2;
  text-decoration: line-through;
  font-size: $font-auxiliary;
}
</style>