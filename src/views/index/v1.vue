<template>
  <div>
    <div class="ad-box" :style="{'background':bgImgUrl}">
      <status-bar></status-bar>
    </div>
    <div class="warp">
      <view-index></view-index>
    </div>
  </div>
  <bottom-bar />
</template>

<script name="indexV1" setup lang="ts">
import bg from '@assets/cutimg/bg.png'
import viewIndex from "@/views/door/index.vue";
import StatusBar from "../door/components/status-bar/index.vue"
import BottomBar from "../door/components/bottom-bar/index.vue"

// vite 热更新模式  会出现图片资源路径拼接上[http://127.0.0.1:8080//src/]
const bgImgUrl = `url(${bg})`
</script>

<style lang="less" scoped>
.warp {
  padding: 0 20%;
}

.ad-box {
  width: 100%;
  padding: 20px 0;
  background: url('../../assets/cutimg/bg.png');
}
</style>
