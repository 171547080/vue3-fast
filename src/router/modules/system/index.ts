/*
 * @Description: 路由-系统管理路由配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

const system = [
  {
    name: 'System',
    path: '/system',
    redirect: { name: 'SystemUser' },
    component: () => import('@views/system/System.vue'),
    meta: {},
    children: [
      {
        name: 'SystemUser',
        path: '/system/user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@views/system/user/SystemUser.vue')
      },
      {
        name: 'SystemRole',
        path: '/system/role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@views/system/role/SystemRole.vue')
      },
      {
        name: 'SystemPermission',
        path: '/system/permission',
        meta: {
          title: '权限管理'
        },
        component: () => import('@views/system/permission/SystemPermission.vue')
      }
    ]
  }
]
export default system
