<template>
    <a-config-provider :locale="locale === 'cn' ? zhCN : enUS">
        <a-spin :spinning="appStore.spinning">
            <Topic></Topic>
            <slot></slot>
        </a-spin>
    </a-config-provider>
</template>

<script setup lang="ts">
// ant-design-vue 全局配置为中文显示
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US';

import Topic from '@components/ifram/i-topic.vue'
import { defineComponent, ref } from 'vue';
import { useAppStore } from "@/store";
defineComponent({
  Topic
})

const locale = ref("cn")
const appStore = useAppStore()
</script>
