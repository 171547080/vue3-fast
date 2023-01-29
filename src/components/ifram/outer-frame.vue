<template>
    <a-config-provider :locale="locale === 'cn' ? zhCN : enUS">
        <a-spin :spinning="appStore.spinning">
            <Topic></Topic>
            <div class="main-content">
                <slot></slot>
            </div>
        </a-spin>
    </a-config-provider>
</template>

<script setup lang="ts">
// ant-design-vue 全局配置为中文显示
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US';

import Topic from '@components/ifram/i-topic.vue'
import { defineComponent, ref } from 'vue';
import { useAppStore } from "@store/index";
defineComponent({
  Topic
})

const locale = ref("cn")
const appStore = useAppStore()
</script>
<style lang="less" scoped>
.main-content{
    min-height: 90vh;
    min-width: 100%;
    position: relative;
}
</style>
