<!--
 * @Description: 消息列表
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
  <div class="content">
    <page-view v-if="USE_FRAME"></page-view>
    <img v-else src="/img/inside/demo/messagge-center.png">
  </div>
</template>

<script name="Message" setup lang="ts">
import pageView from './MessageAllPage.vue'
import CONFIG from '@/config'

// demo模式使用静态图片，不使用内部框架
const USE_FRAME = CONFIG.APP_IS_DEMO === false

</script>
<style lang="less" scoped>
.content {
  min-height: 100vh;

  img {
    width: 100%
  }
}
</style>
