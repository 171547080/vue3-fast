<template>
    <div class="logo" :style="{ height: height + 'px' }">
        <img :src="url" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const url = ref('/img/logo.png')

defineProps({
  height: {
    type: Number, // 参数类型
    default: 40, // 默认值
    required: false // 是否必传
  }
})
</script>

<style lang="less">
.logo {
    display: inline-block;

    img {
        height: 100%;
    }
}
</style>
