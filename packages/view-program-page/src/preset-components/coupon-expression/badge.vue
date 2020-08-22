<template>
	<view :class="wrapCls" :style="wrapStyle">
		<text class="badge-text" :style="textStyle">{{ text }}</text>
	</view>
</template>

<script>
export default {
  
  // text: 角标文本内容
  // inverted: 是否无需背景颜色，为true时，背景颜色将变为文字的字体颜色
  // color: 角标颜色，
  // 1. 当color值为字符串时表示文本和边框颜色，背景为白色(inverted为true时背景为该颜色，文本为白色)
  // 2. 当color值为字符串数组时，第一个值表示文本和边框颜色，第二个表示背景颜色(inverted为true时第一个值表示背景颜色，第二个值表示文本颜色)
  // shape: 角标形状，有ellipse(椭圆)和triangle(方角)两种
  // hasPadding: 左右两边是否有10px的padding，默认为true
  props: {
    text: {
      type: [String, Number],
      required: true,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
    color: {
      type: [String, Array],
      default: '#ff0047',
    },
    shape: {
      type: String,
      default: 'ellipse',
    },
    hasPadding: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    wrapCls() {
      const cls = ['badge-wrap'];
      if (this.hasPadding) {
        cls.push('badge-padding');
      }
      
      if (this.shape === 'triangle') {
        cls.push('badge-triangle');
      }
      else {
        cls.push('badge-ellipse');
      }
      return cls.concat(this.inverted ? [] : ['badge-wrap-border']).join(' ');
    },
    wrapStyle() {
      const 
        color1 = Array.isArray(this.color) ? this.color[0] : this.color,
        color2 = Array.isArray(this.color) ? this.color[1] : 'white',
        styleObj = {};
      if (this.inverted) {
        styleObj.background = color1;
      }
      else {
        styleObj.background = color2;
        styleObj.borderColor = color1;
      }

      return styleObj;
    },
    textStyle() {
      const 
        color1 = Array.isArray(this.color) ? this.color[0] : this.color,
        color2 = Array.isArray(this.color) ? this.color[1] : 'white';
      return {
        color: this.inverted ? color2 : color1,
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.badge-wrap {
  display: flex;
  min-width: 32upx;
  height: 32upx;
  justify-content: center;
  align-items: center;
}
.badge-padding {
  padding: 0 8upx;
}
.badge-ellipse {
  border-radius: 32upx;
}
.badge-triangle {
  border-radius: 8upx;
  border-bottom-right-radius: 32upx;
}
.badge-wrap-border {
  border-style: solid;
  border-width: 0.5upx;
}
.badge-text {
  font-size: 18upx;
  line-height: 18upx;
}
</style>
