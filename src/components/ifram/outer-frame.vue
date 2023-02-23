<!--
 * @Description: 框架-外部框架（包括头部导航、底部权限说明）
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
    <a-config-provider :locale="locale === 'cn' ? zhCN : enUS" :prefix-cls="darkThemes?'dark':'ant'">
        <a-spin :spinning="appStore.spinning">
            <topic></topic>
            <main class="main-content">
                <slot></slot>
            </main>
            <i-foot></i-foot>
        </a-spin>
    </a-config-provider>
</template>

<script setup lang="ts">

// ant-design-vue 全局配置为中文显示
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

import Topic from '@components/ifram/i-topic.vue'
import IFoot from '@components/ifram/i-foot.vue'

import { defineComponent, ref } from 'vue'
import { useAppStore } from '@store/index'
defineComponent({
  Topic
})
const darkThemes = ref(false)

const locale = ref('cn')
const appStore = useAppStore()
</script>
<style lang="less" scoped>
/**
* 指定topic组件固定高度
*/
@topic-height: 125px;
.main-content {
    min-height: calc(100vh - @topic-height);
    min-width: 100%;
    position: relative;
}
</style>
