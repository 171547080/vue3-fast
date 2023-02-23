import type { Rule } from 'ant-design-vue/es/form'
export default {
  async mobilePhone(_rule: Rule, value: string) {
    if (value !== undefined && value !== null && value !== '') {
      const reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (!reg.test(value)) {
        return Promise.reject('请输入正确的手机号码')
      }
    }
    return Promise.resolve()
  },

  async email (_rule: Rule, value: string) {
    if (value !== undefined && value !== null && value !== '') {
      const reg = /^[a-z0-9_+\\.-]+\\@([a-z0-9-]+\\.)+[a-z0-9]{2,4}$/
      if (!reg.test(value)) {
        return Promise.reject('请输入正确的邮箱地址')
      }
    }
    return Promise.resolve()
  }
}
