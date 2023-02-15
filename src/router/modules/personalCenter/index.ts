/*
 * @Description: 路由配置-个人中心路由配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'personalCenter',
    path: '/personal',
    redirect: '/personal/myapply',
    component: () => import('@views/portal/personal/PersonalCenter.vue'),
    props: {
      permission: ''
    },
    meta: {},
    children: [
      {
        name: 'personalCenterMyApply',
        path: '/personal/myapply',
        component: () => import('@views/portal/personal/PersonalMyApply.vue'),
        meta: {},
        permission: ''
      }
    ]
  }
]
