import { request } from '../axios'

export default {
  page(data) {
    return request({
      baseURL: '/api',
      url: '/jamForecast/jamLvSettings/get',
      data
    })
  },
  add(data) {
    return request({
      baseURL: '/mock',
      url: '/jam/config/add',
      data
    })
  },
  update(data) {
    return request({
      baseURL: '/api',
      url: '/jamForecast/jamLvSettings/set',
      data
    })
  },
  delete(data) {
    return request({
      baseURL: '/mock',
      url: '/jam/config/delete',
      data
    })
  }
}
