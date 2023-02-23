/*
 * @Description: 路由配置-个人中心路由配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'workOrder',
    path: '/work',
    redirect: '/work/order/all',
    component: () => import('@views/portal/workOrder/WorkOrder.vue'),
    props: {
      permission: ''
    },
    meta: {},
    children: [
      {
        name: 'workOrderAllPage',
        path: '/work/order/all',
        component: () => import('@views/portal/workOrder/WorkOrderAllPage.vue'),
        meta: {},
        permission: ''
      }
    ]
  }
]
