import { request, post } from '../axios'

export default {
  page(data) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/page',
      data
    })
  },
  add(data) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/add',
      data
    })
  },
  update(data) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/modify',
      data
    })
  },
  delete(data) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/delete',
      data
    })
  },
  detail(id) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/detail',
      data: {
        id
      }
    })
  },
  startAi(id: string) {
    return request({
      baseURL: '/api',
      url: '/startAi',
      data: { aiType: 'jamDetect', id }
    })
  },
  stopAi(id: string) {
    return post({
      baseURL: '/api',
      url: '/stopAi',
      data: {id }
    })
  },
  statistics(id, num?: number) {
    return request({
      baseURL: '/api',
      url: '/jamDetect/statistics',
      data: {
        id: id,
        num: num
      }
    })
  },
  videoUrlGet(data) {
    return post({
      baseURL: '/api',
      url: '/jamDetect/get/rtsp',
      data
    })
  }
}
