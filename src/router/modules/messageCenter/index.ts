/*
 * @Description: 路由配置-消息中心路由
 * @Author: laigt
 * @Date: 2023-02-27
*/

export default [
  {
    name: 'messageCenter',
    path: '/message',
    redirect: '/message/all',
    component: () => import('@views/portal/message/MessageCenter.vue'),
    props: {
      permission: ''
    },
    meta: {},
    children: [
      {
        name: 'messageCenterAll',
        path: '/message/all',
        component: () => import('@views/portal/message/MessageAllPage.vue'),
        meta: {},
        permission: ''
      }
    ]
  }
]
