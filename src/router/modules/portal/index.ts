/*
 * @Description: 路由配置-门户路由配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'appCenter',
    path: '/appCenter',
    component: () => import('@views/portal/appCenter/AppCenter.vue'),
    permission: '',
    meta: {},
    children: []
  },
  {
    name: 'message',
    path: '/message',
    permission: '',
    component: () => import('@views/portal/message/Message.vue'),
    meta: {},
    children: []
  },
  {
    name: 'assetsCenter',
    path: '/assetsCenter',
    component: () => import('@views/portal/assetsCenter/AssetsCenter.vue'),
    meta: {},
    permission: '',
    children: []
  },
  {
    name: 'workOrder',
    path: '/workOrder',
    component: () => import('@views/portal/workorder/WorkOrder.vue'),
    meta: {},
    permission: '',
    children: []
  },
  {
    name: 'serverMarket',
    path: '/serverMarket',
    component: () => import('@views/portal/serverMarket/ServerMarket.vue'),
    meta: {},
    permission: '',
    children: []
  }
]
