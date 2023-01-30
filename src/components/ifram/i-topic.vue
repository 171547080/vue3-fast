<template>
    <div class="topic-warp">
        <div class="topic">
            <div class="topic-left">
                <logo></logo>
                <span class="title">{{ CONFIG.appName }}</span>
            </div>
            <div class="topic-middle">
                <div class="server-info">
                    <div class="server-text" :class="{ active: activeServerName === 'index' }"
                        @click="serverClickHandle('indexV1')">
                        {{ "首页" }}
                        <CaretDownOutlined v-show="false" style="color: #fff; margin: 6px 5px" />
                    </div>
                </div>

                <div class="server-info">
                    <a-dropdown>
                        <div class="server-text" :class="{ active: activeServerName === 'server' }"
                            @click="serverClickHandle('AI')">
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
                                <dot-chart-outlined class="margin-right-10"/>
                                服务3
                            </a-menu-item>
                        </a-menu>
                    </template>
                    </a-dropdown>
                </div>

                <div class="server-info">
                    <div class="server-text" :class="{ active: activeServerName === 'system' }"
                        @click="serverClickHandle('System')">
                        {{ "系统管理" }}
                        <caret-down-outlined v-show="false" style="color: #fff; margin: 6px 5px" />
                    </div>
                </div>
            </div>
            <div class="topic-right">
                <a-dropdown>
                    <div class="user-info">
                        <div class="user-text">
                            {{ userStore.realName || userStore.loginName || "加载中" }}
                            <caret-down-outlined style="color: #fff; margin: 6px 5px" />
                        </div>
                    </div>

                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" v-if="false">
                                <user-outlined class="margin-right-10" />
                                个人信息
                            </a-menu-item>
                            <a-menu-item key="2" v-if="false">
                                <form-outlined class="margin-right-10" />
                                忘记密码
                            </a-menu-item>
                            <a-menu-item key="3" @click="logoutClickHandle">
                                <logout-outlined class="margin-right-10" />
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
  CaretDownOutlined,
  UserOutlined,
  LogoutOutlined,
  FormOutlined,
  DotChartOutlined 
} from "@ant-design/icons-vue";
import Logo from "@/components/ifram/i-logo.vue";
import { defineComponent, ref, onMounted } from "vue";
import { useUserStore } from "@store/index";
import router from "@/router";
import CONFIG from "@/config";
defineComponent({
  Logo
});
const userStore = useUserStore();
const activeServerName = ref("index");

// 激活当前菜单
const checkCurrentServer = (newUrl?: string) => {
  const url = newUrl || router.currentRoute.value.fullPath;
  // 路由固定配置  /ai/ 地址 为 AI服务    /system/ 地址为 系统管理
  activeServerName.value = url.indexOf("/ai/") > -1 ? "ai" : "";
  activeServerName.value = url.indexOf("/system/") > -1 ? "system" : "";
  activeServerName.value = url.indexOf("/index/") > -1 ? "index" : "";
};

onMounted(() => {
  checkCurrentServer(window.location.href);
});

const logoutClickHandle = () => {
  userStore.logout().then(() => {
    userStore.checkLogin();
  });
};

const serverClickHandle = (routerName) => {
  router.push({ name: routerName }).then(() => {
    checkCurrentServer();
  });
};
</script>
<style lang="less" scoped>
.margin-right-10{
    margin-right: 10px
}
.topic-warp {
    // background: #000;
    background: linear-gradient(90deg, #000, #555, #000);
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
    text-overflow: ellipsis //使得超出部分用“ … ”代替
    ;
}

.topic {
    background: #000;
    background: rgba(0, 0, 0, 0) url(/img/topic/top-bg-black.jpg) no-repeat scroll 100% 0px;
    display: flex;
    flex-direction: row;
    padding-right: 20px;
    min-width: 800px;

    .topic-left {
        margin: 10px 40px 10px 60px;
        display: flex;
        width: 30%;
        max-width: 400px;
    }

    .topic-middle {
        display: flex;

        .server-info {
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
        .user-text {
            display: flex;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            padding: 15px 15px 15px 25px;
            transition: background 0.3;
            height: 100%;
            cursor: pointer;

            &:hover {
                background: #393e48;
            }
        }
    }
}
</style>
