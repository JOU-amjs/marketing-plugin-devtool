<!--
 * @Date: 2020-08-13 21:07:22
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-13 23:01:26
-->
<template>
  <div class="container flex-column">
    <h3 class="title">活动联合餐厅</h3>
    <div class="shop-container">
      <div class="shop-wrap flex-column" :style="containerStyle">
        <div class="wrap flex-row align-center" ref="shopItem" v-for="shopItem in list" :key="shopItem.id" :style="itemStyle">
          <div class="avatar avatar-wrap">
            <img class="avatar" :src="shopItem.avatar" />
          </div>
          <div class="content-wrap flex-row align-center justify-between">
            <div class="content flex-column">
              <span class="name">{{ shopItem.name }}</span>
              <span class="intro">{{ shopItem.intro }}</span>
            </div>
            <button>进入</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { request } = EL.page();
export default {
  props: {
    row: {
      type: Number,
      default: 3,
      validator: val => val >= 1 && val <= 3,
    }
  },
  data() {
    return {
      itemWidth: document.body.offsetWidth * 0.84,
      itemHeight: 80,
      list: [{
        id: '1',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
        name: '咔哧咔哧',
        intro: '独一无二的卡吃烹饪餐厅',
      }, {
        id: '2',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
        name: '咔哧咔哧',
        intro: '独一无二的卡吃烹饪餐厅',
      }, {
        id: '3',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
        name: '咔哧咔哧',
        intro: '独一无二的卡吃烹饪餐厅',
      }, {
        id: '4',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
        name: '咔哧咔哧',
        intro: '独一无二的卡吃烹饪餐厅',
      }, {
        id: '5',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
        name: '咔哧咔哧',
        intro: '独一无二的卡吃烹饪餐厅',
      }],
    }
  },
  computed: {
    containerStyle() {
      let column = Math.ceil(this.list.length / this.row);
      return {
        width: column * this.itemWidth + 'px',
        height: this.row * (this.itemHeight + 12) + 'px',
      };
    },
    itemStyle() {
      return {
        width: this.itemWidth + 'px',
        height: this.itemHeight + 'px',
      };
    }
  },
  mounted() {
    let shopItems = this.$refs.shopItem;
    if (shopItems.length > 0) {
      console.log(shopItems[0]);
      this.itemWidth = shopItems[0].offsetWidth;
      this.itemHeight = shopItems[0].offsetHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .title {
    margin-left: 16px;
    color: #333;
  }
  background: #f5f5f5;
  .shop-container {
    overflow: scroll;
  }
  .shop-wrap {
    flex-wrap: wrap;
  }
  .wrap {
    margin: 0 16px;
    margin-bottom: 10px;
  }
  .avatar-wrap {
    height: 70px;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 10px;
  }
  .avatar {
    width: 70px;
  }
  .content-wrap {
    flex: 1;
  }
  .content {
    .name {
      font-size: 18px;
      color: 333;
      font-weight: bolder;
    }
    .intro {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>