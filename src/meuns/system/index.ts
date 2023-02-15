/*
 * @Description: 菜单-系统菜单配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'SystemUser',
    title: '用户管理',
    icon: 'user-outlined',
    routerName: 'SystemUser',
    permission: ''
  },
  {
    name: 'SystemRole',
    title: '角色管理',
    icon: 'audit-outlined',
    routerName: 'SystemRole',
    permission: ''
  },
  {
    name: 'SystemPermission',
    title: '权限管理',
    icon: 'flag-outlined',
    routerName: 'SystemPermission',
    permission: ''
  }
]
