/*
 * @Description: 菜单-工单列表菜单配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'environment',
    title: '环境保护',
    icon: 'folder-outlined',
    routerName: '',
    routerUrl: '/personal/myapply',
    permission: ''
  },
  {
    name: 'livelihood',
    title: '民生服务',
    icon: 'file-outlined',
    routerName: '',
    routerUrl: '/personal/myapply',
    permission: ''
  },
  {
    name: 'workOrder',
    title: '工单列表',
    icon: 'audit-outlined',
    routerName: '',
    permission: '',
    children: [
      {
        name: 'workOrderAllPage',
        title: '全部工单',
        icon: '',
        routerName: 'workOrderAllPage',
        permission: ''
      },
      {
        name: 'pendingOrder',
        title: '待处理工单',
        icon: '',
        routerName: '',
        permission: ''
      }
    ]
  },
  {
    name: 'data',
    title: '数据资源',
    icon: 'container-outlined',
    routerName: '',
    permission: ''
  },
  {
    name: 'enterprise',
    title: '企业服务',
    icon: 'sync-outlined',
    routerName: '',
    permission: ''
  },
  {
    name: 'security',
    title: '安全管理',
    icon: 'carry-out-outlined',
    routerName: '',
    permission: ''
  }
]
