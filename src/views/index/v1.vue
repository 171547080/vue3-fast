<template>
  <div>
    <div class="ad-box" :style="'background: ' + bgImgUrl">
      <status-bar></status-bar>
    </div>
    <div class="warp">
      <view-index></view-index>
    </div>
  </div>
  <bottom-bar/>
</template>

<script setup lang="ts">
import viewIndex from "@/views/door/index.vue";
import StatusBar from "../door/components/status-bar/index.vue"
import BottomBar from "../door/components/bottom-bar/index.vue"
const getAssetsFile = (url) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}

const bgImgUrl = getAssetsFile("../../assets/cutimg/bg.png")
</script>

<style lang="less" scoped>
.warp {
  padding: 0 20%;
}
.ad-box{
  width: 100%;
  background: #094ad9;
}
</style>
