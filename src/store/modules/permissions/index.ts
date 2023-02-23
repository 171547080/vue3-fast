/*
 * @Description: 全局状态管理-登陆用户权限
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { defineStore } from 'pinia'
import permissionApi from '@api/permissions/permissionApi'

export interface PermissionsState {
  permissions:Array<string>;
  roles:Array<string>;
  user:object
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionsState => ({
    permissions: [],
    roles: [],
    user: {}
  }),

  actions: {
    async loadPermissions() {
      permissionApi.getInfo().then((res) => {
        this.permissions = res.permissions
        this.roles = res.roles
        this.user = res.user
      })
    }
  }
})
