<template>
  <div class="door-index">
    <inform />
    <transition name="fade" enter-active-class="animated animate__backInLeft"
      leave-active-class="animated  animate__backOutLeft">
      <div class="data" v-show="animateStatus.dataShow">
        <collect />
        <histogram />
      </div>
    </transition>
    <transition name="fade" enter-active-class="animated animate__backInRight "
      leave-active-class="animated animate__backOutRight">
      <div class="news" v-show="animateStatus.newsShow">
        <news />
      </div>
    </transition>
    <transition name="fade" enter-active-class="animated animate__backInLeft"
      leave-active-class="animated animate__backOutLeft">
      <div class="policy" v-show="animateStatus.policyShow">
        <policy />
      </div>
    </transition>
    <transition name="fade" enter-active-class="animated animate__backInRight"
      leave-active-class="animated animate__backOutRight">
      <div class="bulletin" v-show="animateStatus.bulletinShow">
        <bulletin />
      </div>
    </transition>
  </div>
</template>

<script name="doorIndex" setup lang="ts">
import {
  inform,
  collect,
  news,
  policy,
  bulletin,
  histogram
} from "./components";

import { ref } from 'vue'

const animateStatus = ref({
  dataShow: false,
  newsShow: false,
  policyShow: false,
  bulletinShow: false
})

setTimeout(() => {
  animateStatus.value.dataShow = true
  animateStatus.value.newsShow = true
  animateStatus.value.policyShow = true
  animateStatus.value.bulletinShow = true
}, 300)
</script>



<style lang="less" scoped>
.door-index {
  min-height: 80vh;
}

.data {
  display: flex;
  background-color: #f7f7f6;
}
</style>
