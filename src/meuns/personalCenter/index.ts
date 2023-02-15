/*
 * @Description: 菜单-个人中心菜单配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'myApply',
    title: '我的申请记录',
    icon: 'user-outlined',
    routerName: 'personalCenterMyApply',
    routerUrl: '/personal/myapply',
    permission: ''
  },
  {
    name: 'myResources',
    title: '我的资源',
    icon: 'audit-outlined',
    routerName: '',
    permission: '',
    children: [
      {
        name: 'myDataDir',
        title: '我的数据目录',
        icon: 'pie-chart-outlined',
        routerName: '',
        permission: ''
      },
      {
        name: 'myApi',
        title: '我的接口服务',
        icon: 'pie-chart-outlined',
        routerName: '',
        permission: ''
      }
    ]
  },
  {
    name: 'myApp',
    title: '我的应用',
    icon: 'flag-outlined',
    routerName: '',
    permission: ''
  },
  {
    name: 'myTask',
    title: '我的任务',
    icon: 'flag-outlined',
    routerName: '',
    permission: ''
  },
  {
    name: 'editPwd',
    title: '修改密码',
    icon: 'flag-outlined',
    routerName: '',
    permission: ''
  }
]
