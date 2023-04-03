<!--
 * @Description: 个人中心-我的申请记录
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
    <div class="content">
        <page-view v-if="USE_FRAME"></page-view>
        <img v-else src="/img/inside/demo/personal-center-my-task.png">

    </div>
</template>
<script name="PersonalMyApply" setup lang="ts">
import pageView from './PersonalPage.vue'

import CONFIG from '@/config'

// demo模式使用静态图片，不使用内部框架
const USE_FRAME = CONFIG.APP_IS_DEMO === false
</script>
<style lang="less" scoped>
.content {
    // min-height: 100vh;

    img {
        width: 100%
    }
}
</style>
