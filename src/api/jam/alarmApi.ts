import { request } from '../axios'

export default {
  page(data) {
    return request({
      baseURL: '/api',
      url: '/alarm/jamDetect',
      data
    })
  },
  update(data) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/set/alarmLv',
      data
    })
  },
  detail(id: string) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/get/alarmLv',
      data: { id }
    })
  }
}
