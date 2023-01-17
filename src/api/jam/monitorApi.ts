import { request } from '../axios'

export default {
  page(data) {
    return request({
      baseURL: '/api',
      url: '/monitor/page',
      data
    })
  },
  list(data?: any) {
    return request({
      baseURL: '/api',
      url: '/monitor/list',
      data
    })
  },
  add(data) {
    return request({
      baseURL: '/api',
      url: '/monitor/add',
      data
    })
  },
  update(data) {
    return request({
      baseURL: '/api',
      url: '/monitor/modify',
      data
    })
  },
  delete(data) {
    return request({
      baseURL: '/api',
      url: '/monitor/delete',
      data
    })
  },
  detail(id) {
    return request({
      baseURL: '/api',
      url: '/monitor/detail',
      data: {
        id
      }
    })
  }
}
