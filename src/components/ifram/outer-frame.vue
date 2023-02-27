<!--
 * @Description: 框架-外部框架（包括头部导航、底部权限说明）
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
  <a-config-provider
    :locale="locale === 'cn' ? zhCN : enUS"
    :prefix-cls="darkThemes ? 'dark' : 'ant'"
  >
    <a-spin :spinning="appStore.spinning">
      <topic></topic>
      <i-navs v-if="navMode === 'top'" :menus="mainMenus"></i-navs>
      <a-layout>
        <a-layout-sider
          v-if="navMode === 'side'"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <left-menu
            :menus="mainMenus"
            :collapsed="collapsed"
            :trigger="null"
            class="side-menu"
            @toggleCollapsed="
              (menuCollapsed) => {
                handleToggleCollapsed(menuCollapsed);
              }
            "
          ></left-menu>
        </a-layout-sider>
        <a-layout-content :class="{ 'sider-model': navMode === 'side' }">
          <main class="main-content">
            <slot></slot>
          </main>
        </a-layout-content>
      </a-layout>
      <i-foot></i-foot>
    </a-spin>
  </a-config-provider>
</template>

<script setup lang="ts">
// ant-design-vue 全局配置为中文显示
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

import topic from '@components/ifram/i-topic.vue'
import iNavs from '@/components/ifram/i-navs.vue'
import iFoot from '@components/ifram/i-foot.vue'

import leftMenu from '@components/ifram/left-menu.vue'
import mainMenus from '@/meuns/main'

import { ref, onUnmounted } from 'vue'
import { useAppStore } from '@store/index'

const darkThemes = ref(false)

const collapsed = ref(false)

const handleToggleCollapsed = (menuCollapsed: boolean) => {
  collapsed.value = menuCollapsed
}

const locale = ref('cn')
const appStore = useAppStore()

const navMode = ref(appStore.navMode)

const unsubscribe = appStore.$subscribe((mutation, state) => {
  if (navMode.value !== state.navMode) {
    navMode.value = state.navMode
  }
})

onUnmounted(() => {
  unsubscribe()
})
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

.sider-model {
  margin-left: 1px;
}

.side-menu {
  height: 100%;
}
</style>
