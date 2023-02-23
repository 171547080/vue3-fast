/*
 * @Description:   全局指令-判断当前用户是否有相应权限
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { usePermissionStore } from '@store/index'

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mounted(el, binding, vnode, prevVnode) {
    const usePermission = usePermissionStore()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe = usePermission.$subscribe((mutation, state) => {
      console.error('subscribe')
      updateEl()
    })
    el.unsubscribe = unsubscribe

    const { value } = binding
    const all_permission = '*:*:*'
    const permissions = usePermission.permissions

    const updateEl = () => {
      if (value && value instanceof Array && value.length > 0) {
        const permissionFlag = value

        const hasPermissions = permissions.some(permission => {
          return all_permission === permission || permissionFlag.includes(permission)
        })

        if (!hasPermissions) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error('请设置操作权限标签值')
      }
    }
    updateEl()
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unmounted(el, binding, vnode, prevVnode) {
    if (el && el.unsubscribe) {
      console.error('unsubscribe')
      el.unsubscribe()
    }
  }
}
