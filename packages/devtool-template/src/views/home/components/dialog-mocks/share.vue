<!--
 * @Date: 2020-07-06 21:28:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-23 09:22:46
--> 
<template>
  <div class="share-container" v-if="shareMessage">
    <span>title：{{ shareMessage.title }}</span>
    <span>
      <span>image：</span>
      <el-image v-if="shareMessage.imageUrl" 
        :src="shareMessage.imageUrl" 
        class="share-img" 
        fit="cover"
      />
      <span v-else>当前界面截图</span>
    </span>
    <span>path：{{ shareMessage.path }}</span>
    <span>routePath：{{ shareMessage.routePath }}</span>
    <span>query：{{ shareMessage.query }}</span>
  </div>
  <div v-else>
    <span>没有分享内容</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Image } from 'element-ui';
import { State } from 'vuex-class';
import { TShareMessage } from '../../../../store';

@Component({
  components: {
    [Image.name]: Image,
  }
})
export default class ConfigFrame extends Vue {
  @State('shareMessage') private shareMessage!: TShareMessage;
}
</script>

<style lang="scss" scoped>
.share-container {
  display: flex;
  flex-direction: column;
  .share-img {
    width: 150px;
    height: 150px;
  }
}
</style>