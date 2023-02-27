/*
 * @Description: 菜单-工单列表菜单配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'environmentMessage',
    title: '环境保护',
    icon: 'folder-outlined',
    routerName: '',
    routerUrl: '/personal/myapply',
    permission: ''
  },
  {
    name: 'livelihoodMessage',
    title: '民生服务',
    icon: 'file-outlined',
    routerName: '',
    routerUrl: '/personal/myapply',
    permission: ''
  },
  {
    name: 'messageCenter',
    title: '工单列消息',
    icon: 'audit-outlined',
    routerName: '',
    permission: '',
    children: [
      {
        name: 'messageCenterAll',
        title: '全部消息',
        icon: '',
        routerName: 'messageCenterAll',
        permission: ''
      },
      {
        name: 'pendingMessageCenterAll',
        title: '待处理消息',
        icon: '',
        routerName: '',
        permission: ''
      }
    ]
  },
  {
    name: 'dataMessage',
    title: '数据资源',
    icon: 'container-outlined',
    routerName: '',
    permission: ''
  },
  {
    name: 'enterpriseMessage',
    title: '企业服务',
    icon: 'sync-outlined',
    routerName: '',
    permission: ''
  },
  {
    name: 'securityMessage',
    title: '安全管理',
    icon: 'carry-out-outlined',
    routerName: '',
    permission: ''
  }
]
