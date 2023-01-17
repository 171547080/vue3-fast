import { createRouter, createWebHashHistory } from "vue-router";
import main from "./main";
import ai from "./modules/ai";
import system from "./modules/system";

// import { useUserStore } from "@/store";

const router = createRouter({
  // hash模式
  history: createWebHashHistory(),
  routes: [...main, ...ai, ...system]
});


/**
 * 全局守卫
 * 1.添加页面切换的过渡动画效果，配合rout/routerUtil.routerPush使用
 * 2.路由权限控制
 * 3.登陆校验
 */

router.beforeEach(() => {
  // const userStore = useUserStore() 
  
  // userStore.checkLogin()
});
export default router;
