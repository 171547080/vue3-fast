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
      data: data
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
