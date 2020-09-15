<!--
 * @Date: 2020-08-13 21:07:22
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 16:22:05
-->
<template>
  <div class="container flex-column">
    <h3 class="title">活动联合餐厅</h3>
    <div class="shop-container" @scroll="containerScrollHandler">
      <div class="flex-row" :style="containerStyle">
        <div class="shop-wrap flex-column">
          <div class="wrap flex-row align-center" ref="shopItem" v-for="shopItem in list" :key="shopItem.id" :style="itemStyle">
            <div class="avatar avatar-wrap" @click="nav2Homepage(shopItem.id)">
              <img class="avatar" :src="shopItem.avatar" />
            </div>
            <div class="content-wrap flex-row align-center justify-between" @click="toggleShop(shopItem.id)">
              <div class="content flex-column">
                <span class="title-4 color-gray-4 name">{{ shopItem.shopName }}</span>
                <span class="text-auxiliary color-gray-2">{{ shopItem.shortIntro }}</span>
              </div>
              <div class="btn-access clickable">
                <span class="iconfont iconjinru" />
              </div>
            </div>
          </div>
        </div>
        <div class="loading flex-row align-center" v-if="showLoading">
          <van-loading type="spinner" :size="20" :text-size="13" vertical>加<br>载<br>中</van-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EL from 'view-program-lib';
import Loading from 'vant/lib/loading';
import 'vant/lib/loading/style';

const { javaRequest, config } = EL.Page();
export default {
  props: {
    row: {
      type: Number,
      default: 3,
      validator: val => val >= 1 && val <= 3,
    }
  },
  components: {
    [Loading.name]: Loading,
  },
  data() {
    return {
      itemWidth: document.body.offsetWidth * 0.84,
      itemHeight: 70,
      page: 1,
      hasMore: true,
      loading: false,
      // list: [{
      //   id: '11',
      //   avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
      //   shopName: '咔哧咔哧',
      //   shortIntro: '独一无二的卡吃烹饪餐厅',
      // }, {
      //   id: '12',
      //   avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
      //   shopName: '咔哧咔哧',
      //   shortIntro: '独一无二的卡吃烹饪餐厅',
      // }, {
      //   id: '13',
      //   avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
      //   shopName: '咔哧咔哧',
      //   shortIntro: '独一无二的卡吃烹饪餐厅',
      // }, {
      //   id: '14',
      //   avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
      //   shopName: '咔哧咔哧',
      //   shortIntro: '独一无二的卡吃烹饪餐厅',
      // }, {
      //   id: '15',
      //   avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319452976,1715840207&fm=26&gp=0.jpg',
      //   shopName: '咔哧咔哧',
      //   shortIntro: '独一无二的卡吃烹饪餐厅',
      // }],
      list: [],
    }
  },
  computed: {
    containerStyle() {
      let column = Math.ceil(this.list.length / this.row);
      let row = Math.min(this.list.length, this.row);
      let loadingWidth = this.showLoading ? 30 : 0;
      return {
        // 32px为每个项左右两边的内边距，30px位加载组件的宽度
        width: column * (this.itemWidth + 32) + loadingWidth + 'px',
        height: row * (this.itemHeight + 12) + 'px',
      };
    },
    itemStyle() {
      return {
        width: this.itemWidth + 'px',
        height: this.itemHeight + 'px',
      };
    },
    showLoading() {
      return this.loading || this.hasMore;
    }
  },
  methods: {
    nav2Homepage(id) {
      EL.navigateELPage('shopHomepage', { shopId: id });
    },
    toggleShop(id) {
      EL.changeShop(id);
    },
    async requestList() {
      if (this.hasMore && !this.loading) {
        this.loading = true;
        let pageSize = this.row === 3 ? 9 : 10;
        let { data } = await javaRequest.get(`/shops/activities/${config.activityId}/shops`, {
          params: {
            status: '1,3',
            pageNum: this.page,
            pageSize,
          },
        });
        this.loading = false;
        this.page++;
        let shopList = data.data.list;
        this.list.push(...shopList);
        if (shopList.length < pageSize) {
          this.hasMore = false;
        }
      }
    },
    containerScrollHandler({ target }) {
      if (target.scrollWidth - target.scrollLeft - 20 <= target.offsetWidth && this.hasMore && !this.loading) {
        this.requestList();
      }
    }
  },
  async mounted() {
    await this.requestList();
    this.$nextTick(() => {
      let shopItems = this.$refs.shopItem;
      if (shopItems.length > 0) {
        this.itemWidth = shopItems[0].offsetWidth;
        this.itemHeight = shopItems[0].offsetHeight;
      }
    });
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
    .loading {
      width: 30px;
    }
  }
  .shop-wrap {
    width: 100%;
    flex-wrap: wrap;
  }
  .wrap {
    margin: 0 16px;
    margin-bottom: 10px;
  }
  .avatar-wrap {
    height: 60px;
    border-radius: $b-rds-10;
    overflow: hidden;
    margin-right: 10px;
  }
  .avatar {
    width: 60px;
  }
  .content-wrap {
    flex: 1;
  }
  .content {
    .name {
      font-weight: bolder;
    }
  }
  $iconSize: 24px;
  .btn-access {
    width: $iconSize;
    height: $iconSize;
    border-radius: $iconSize;
    background: #fff;
    span {
      font-size: 23px;
      color: $color-gray-4;
    }
  }
}
</style>