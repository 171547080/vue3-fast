<template>
    <div class="topic-warp">
        <div class="topic">
            <div class="topic-left">
                <Logo></Logo>
                <span class="title">人工智能交通应用平台</span>
            </div>
            <div class="topic-middle">
                <div class="server-info ">
                    <div class="server-text" :class="{ active: isAiServer }" @click="serverClickHandle">{{ "AI服务" }}
                        <CaretDownOutlined style="color:#fff;margin: 6px 5px;" />
                    </div>
                </div>
                <div class="server-info" v-if="false">
                    <div class="server-text" :class="{ active: isSystemServer }" @click="systemClickHandle">{{ "系统管理" }}
                        <CaretDownOutlined v-show="false" style="color:#fff;margin: 6px 5px;" />
                    </div>
                </div>
            </div>
            <div class="topic-right">
                <a-dropdown>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" v-if="false">
                                <UserOutlined style="margin-right: 10px;" />
                                个人信息
                            </a-menu-item>
                            <a-menu-item key="2" v-if="false">
                                <FormOutlined style="margin-right: 10px;" />
                                忘记密码
                            </a-menu-item>
                            <a-menu-item key="3" @click="logoutClickHandle">
                                <LogoutOutlined style="margin-right: 10px;" />
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <div class="user-info">
                        <div class="user-text">{{ userStore.realName || userStore.loginName || '加载中' }}
                            <CaretDownOutlined style="color:#fff;margin: 6px 5px;" />
                        </div>
                    </div>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CaretDownOutlined, UserOutlined, LogoutOutlined, FormOutlined } from '@ant-design/icons-vue';
import Logo from '@/components/ifram/i-logo.vue'
import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from "@/store"
import router from "@/router"
defineComponent({
  Logo
})
const userStore = useUserStore()
const isAiServer = ref(false)
const isSystemServer = ref(false)

// 激活当前菜单
const checkCurrentServer = (newUrl?:string) => {
  const url = newUrl || router.currentRoute.value.fullPath
  // 路由固定配置  /ai/ 地址 为 AI服务    /system/ 地址为 系统管理
  isAiServer.value = url.indexOf('/ai/') > -1
  isSystemServer.value = url.indexOf('/system/') > -1
}


onMounted(() => {
  checkCurrentServer(window.location.href)
})

const logoutClickHandle = () => {
  userStore.logout().then(() => {
    userStore.checkLogin()
  });
}

const serverClickHandle = () => {
  router.push({ name: 'AI' }).then(() => {
    checkCurrentServer()
  })
}
const systemClickHandle = () => {
  router.push({ name: 'System' }).then(() => {
    checkCurrentServer()
  })
}
</script>
<style lang="less" scoped>
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
                transition: background .3;
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
            transition: background .3;
            height: 100%;
            cursor: pointer;

            &:hover {
                background: #393e48;
            }
        }
    }
}
</style>
