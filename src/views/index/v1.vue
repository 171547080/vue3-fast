<template>
  <div>
    <div class="ad-box">
      <status-bar></status-bar>
    </div>
    <div class="warp">
      <view-index></view-index>
    </div>
  </div>
  <bottom-bar />
</template>

<script name="indexV1" setup lang="ts">
import viewIndex from "@/views/door/index.vue";
import StatusBar from "../door/components/status-bar/index.vue"
import BottomBar from "../door/components/bottom-bar/index.vue"

</script>

<style lang="less" scoped>
.warp {
  padding: 0 20%;
}

.ad-box {
  width: 100%;
  padding: 20px 0;
  background: url('../../../img/inside/bg.png');
}
</style>
