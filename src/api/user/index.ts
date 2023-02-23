/*
 * @Description: 用户API
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { get, post } from '../axios'

interface LoginResquest {
    username: string
    password: string
}

export default {
  login(data: LoginResquest) {
    return post({
      baseURL: '/mock',
      url: '/user/login',
      data
    })
  },
  logout() {
    return get({
      baseURL: '/mock',
      url: '/user/login'
    })
  },
  myself() {
    return get({
      baseURL: '/mock',
      url: '/user/myself'
    })
  }
}
