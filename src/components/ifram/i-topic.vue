
<!--
 * @Description: 框架-头部导航
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
  <header class="topic-warp">
    <div class="topic">
      <section class="topic-left">
        <logo></logo>
        <span class="title">{{ CONFIG.appName }}</span>
      </section>
      <section v-if="false" class="topic-middle">
        <div class="server-info">
          <div
            class="server-text"
            :class="{ active: activeServerName === 'index' }"
            @click="serverClickHandle('indexV1')"
          >
            {{ "首页" }}
            <caret-down-outlined
              v-show="false"
              style="color: #fff; margin: 6px 5px"
            />
          </div>
        </div>

        <div class="server-info">
          <a-dropdown>
            <div
              class="server-text"
              :class="{ active: activeServerName === 'server' }"
              @click="serverClickHandle('AI')"
            >
              {{ "服务" }}
              <caret-down-outlined style="color: #fff; margin: 6px 5px" />
            </div>

            <template #overlay>
              <a-menu>
                <a-menu-item key="1">
                  <user-outlined class="margin-right-10" />
                  服务1
                </a-menu-item>
                <a-menu-item key="2">
                  <form-outlined class="margin-right-10" />
                  服务2
                </a-menu-item>
                <a-menu-item key="3">
                  <dot-chart-outlined class="margin-right-10" />
                  服务3
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <div class="server-info">
          <div
            class="server-text"
            :class="{ active: activeServerName === 'system' }"
            @click="serverClickHandle('System')"
          >
            {{ "系统管理" }}
            <caret-down-outlined
              v-show="false"
              style="color: #fff; margin: 6px 5px"
            />
          </div>
        </div>
      </section>
      <section class="topic-right">
        <a-dropdown>
          <div class="user-info">
            <div class="user-text">
              <heart-outlined class="user-icon" />
              <span class="text">{{ userStore.realName || userStore.loginName || userInfo.realName || userInfo.username||"加载中" }}</span>
              <caret-down-outlined style="color: #fff; margin: 6px 5px" />
            </div>
          </div>
        <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <user-outlined class="margin-right-10" />
                个人信息
              </a-menu-item>
              <a-menu-item  key="2">
                <form-outlined class="margin-right-10" />
                忘记密码
              </a-menu-item>
              <a-menu-item v-if="false" key="3" @click="logoutClickHandle">
                <logout-outlined class="margin-right-10" />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <div class="user-info">
          <div class="user-text">
            <a-badge :count="55" :overflow-count="20">
              <bell-outlined class="user-icon" />
            </a-badge>
            <span class="text-message">通知</span>
          </div>
        </div>

        <div class="user-info" @click="logoutClickHandle">
          <div class="user-text">
              <logout-outlined class="user-icon" />
            <span class="text">退出</span>
          </div>
        </div>
      </section>
    </div>
  </header>
</template>
<script setup lang="ts">
import {
  CaretDownOutlined,
  UserOutlined,
  LogoutOutlined,
  FormOutlined,
  DotChartOutlined,
  BellOutlined,
  HeartOutlined
} from '@ant-design/icons-vue'
import logo from '@/components/ifram/i-logo.vue'

import { ref, onMounted, inject, onUnmounted } from 'vue'
import { useUserStore, useAppStore } from '@store/index'
import router from '@/router'
import CONFIG from '@/config'

const userStore = useUserStore()
const activeServerName = ref('index')

// 添加对useAppStore.state.themeColor 的状态监听
const currentThemeColor = ref(useAppStore().themeColor)
const unsubscribe = useAppStore().$subscribe((mutation, state) => {
  if (currentThemeColor.value !== state.themeColor) {
    currentThemeColor.value = state.themeColor
  }
}
)
onUnmounted(() => {
  unsubscribe()
})

const userInfo = inject('userInfo') as {realName:string, username:string, userId:string | number}

// 激活当前菜单
const checkCurrentServer = (newUrl?: string) => {
  const url = newUrl || router.currentRoute.value.fullPath
  // 路由固定配置  /ai/ 地址 为 AI服务    /system/ 地址为 系统管理
  activeServerName.value = url.indexOf('/ai/') > -1 ? 'ai' : ''
  activeServerName.value = url.indexOf('/system/') > -1 ? 'system' : ''
  activeServerName.value = url.indexOf('/index/') > -1 ? 'index' : ''
}

onMounted(() => {
  checkCurrentServer(window.location.href)
})

const logoutClickHandle = () => {
  userStore.logout().then(() => {
    userStore.checkLogin()
  })
}

const serverClickHandle = (routerName) => {
  console.error(routerName)
  /** 暂不跳转
  router.push({ name: routerName }).then(() => {
    checkCurrentServer()
  })
   */
}
</script>
<style lang="less" scoped>
@item-height:60px;
.margin-right-10 {
  margin-right: 10px;
}

.topic-warp {
  // background: #000;
  background: linear-gradient(90deg, #262626, #555, #262626);
}

.title {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  padding-left: 30px;
  display: block; //成为“块级”元素(block-level)；span元素的默认display属性值为“inline”，
  max-width: 15em; //限制字数
  overflow: hidden; //对溢出内容的隐藏
  white-space: nowrap; //只保留一个空白，文本不会换行，会在在同一行上继续，直到遇到br标签为止。
  text-overflow: ellipsis; //使得超出部分用“ … ”代替
}

:deep(.server-info .anticon-caret-down){
  line-height: 22px;
}

:deep(.user-info .anticon-caret-down){
  line-height: 20px;
}

.topic {
  background: #262626;
  // background: url(/img/banner-bg.png);
  // background: url(/img/inside/bg.png) no-repeat 100% 100%;
  background-image: linear-gradient(to right bottom, #7d31d9, #2b63ba);
  // background-size: 50% 100%;
  // background-size:cover;
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  min-width: 800px;

  .topic-left {
    margin: 10px 40px 10px 30px;
    display: flex;
    width: 30%;
    max-width: 400px;
  }

  .topic-middle {
    display: flex;

    .server-info {
      height: @item-height;
      line-height: 30px;
      .server-text {
        display: flex;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        padding: 15px 15px 15px 25px;
        transition: background 0.3;
        height: 100%;
        cursor: pointer;

        &.active {
          background: #2d3139;
        }

        &:hover {
          background: #393e48;
        }
      }
    }
  }

  .topic-right {
    display: flex;
    flex: 1;
    justify-content: end;

    .right-content {
      display: block;
      height: 100%;
      width: 500px;
      padding-right: 10px;
    }
  }

  .user-info {
    font-size: 18px;
    height: @item-height;
    color: #fff;
    .user-text {
      display: flex;
      padding: 15px;
      transition: background 0.3;
      height: 100%;
      cursor: pointer;
      .text {
        margin-left: 10px;
      }
      .text-message{
        margin-left: 18px;
      }
      &:hover {
        background: #393e48;
      }
    }
    .user-icon{
      margin-top: 3px;
      color: #fff;
      font-size: 22px;
    }
  }
}

:deep(.ant-scroll-number){
  right: -15px;
  top: 0px;
  transform: scale(0.7);
}
</style>
