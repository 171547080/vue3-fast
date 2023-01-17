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
  }
]
export default main;
