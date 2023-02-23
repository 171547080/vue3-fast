/*
 * @Description: 全局状态管理-登陆用户个人状态数据
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { defineStore } from 'pinia'
import { setToken, isLogin, clearToken } from '../../../utils/auth'
import { useAppStore, usePermissionStore } from '@store/index'
import userApi from '@api/user'
import { UserState } from './types'
import router from '@/router'

const IS_LOGIN = false
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    id: undefined,
    userId: undefined,
    loginName: undefined,
    password: undefined,
    gender: undefined,
    email: undefined,
    mobile: undefined,
    department: undefined,
    departmentId: undefined,
    role: undefined,
    realName: undefined,
    disabled: undefined,
    accessKey: undefined,
    secretKey: undefined,
    superAdmin: undefined,
    tokenId: undefined
  }),

  actions: {
    /**
    * 用户退出登录
    */
    async logout() {
      this.setInfo({})
      clearToken()
    },

    /**
     * async用户登录
     * @param {string} user
     * @param {string} password
     */
    async login(username, password) {
      // 是否调用登录接口
      if (IS_LOGIN) {
        const res = await userApi.login({ username, password })
        if (res.token || res.data) {
          setToken(res.token || res.data)
        }
      } else {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
        setToken(token)
      }
    },

    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    /**
     * 检查登录状态  showSpinning可选项： true-显示加载中遮罩
     */
    async checkLogin(showSpinning?: boolean) {
      if (!isLogin()) {
        // 路由跳转到登录页面
        console.error('用户未登录')
        router.push({ name: 'login' })
      } else {
        // 是否展示加载中遮罩
        if (showSpinning) useAppStore().startSpinning()

        // 加载当前用户的权限信息
        usePermissionStore().loadPermissions()

        // 是否调用登录接口
        if (IS_LOGIN) {
          userApi.myself().then((res) => {
            this.setInfo(res.data)
          }).catch(() => {
            // do nothing.
          }).finally(() => {
            if (showSpinning) useAppStore().stopSpinning()
          })
        } else {
          if (showSpinning) useAppStore().stopSpinning()
          const userData:UserState = { id: '1', userId: '29fd7212dcb04247b533850d6ce9b5fc', loginName: 'admin', password: 'ae9aef9fa2839235db9b974ae3fc031', email: 'c.iiigy@qq.com', mobile: '18154417173', departmentId: '3a5d495d009049f297464d44f647ddf8', realName: '超级管理员', disabled: false, accessKey: '""', secretKey: '""', department: '总公司', superAdmin: true, tokenId: 'a6246c1r706d4e943oga58bfd338e869' }
          this.setInfo(userData)
        }
      }
    }
  }
})
