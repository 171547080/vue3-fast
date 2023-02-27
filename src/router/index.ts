/*
 * @Description: 路由配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import CONFIG from '@/config'
import main from './main'
import system from './modules/system'
import portal from './modules/portal'
import workOrder from './modules/workOrder'
import personalCenter from './modules/personalCenter'
import messageCenter from './modules/messageCenter'

const IS_HISTORY = CONFIG.ROUTER_MODE === 'history'

const router = createRouter({
  history: IS_HISTORY ? createWebHistory() : createWebHashHistory(),
  routes: [...main, ...system, ...portal, ...workOrder, ...messageCenter, ...personalCenter]
})

/**
 * 全局守卫
 * 1.添加页面切换的过渡动画效果，配合rout/routerUtil.routerPush使用
 * 2.路由权限控制
 * 3.登陆校验
 */

router.beforeEach(() => {
  // const userStore = useUserStore()

  // userStore.checkLogin()
})
export default router
