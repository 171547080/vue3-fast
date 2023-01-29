const main = [
  {
    path: "/",
    redirect: { name: "AI" },
    meta: {}
  },
  {
    name: "home",
    path: "/home",
    meta: {
      title: "首页",
      // 取消进入动画flag  true-路由切换关闭进入、退出动画
      cancelTransition: true
    },
    component: () => import("@views/Home.vue")
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录"
    },
    component: () => import("@views/login/Login.vue")
  },
  // 首页demo
  {
    name: "indexV1",
    path: "/index/v1",
    meta: {
      title: "首页"
    },
    component: () => import("@views/index/v1.vue")
  },
  // 404页面匹配未配置的路径
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true
  }
]
export default main;
