import { post, request } from '../axios'

export default {
  page(data) {
    return request({
      baseURL: '/api',
      url: '/carType/stream/page',
      data
    })
  },
  detail(id: string) {
    return request({
      baseURL: '/api',
      url: '/carType/stream/detail',
      data: { id }
    })
  },
  add(data) {
    return post({
      baseURL: '/api',
      url: '/carType/stream/add',
      data
    })
  },
  addAndUpload(data) {
    return post({
      baseURL: '/api',
      headers: { "Content-Type": "multipart/form-data" },
      url: '/carType/stream/add',
      data
    })
  },
  update(data) {
    return post({
      baseURL: '/api',
      url: '/carType/stream/modify',
      data
    })
  },
  delete(id: string) {
    return post({
      baseURL: '/api',
      url: '/carType/stream/delete',
      data: { id }
    })
  },
  statistics(id: string, num?: number) {
    return post({
      baseURL: '/api',
      url: '/carType/stream/data/statistics',
      data: {
        id,
        num
      }
    })
  },
  current(id: string, num?: number) {
    return post({
      baseURL: '/api',
      url: '/carType/stream/data/statistics/current',
      data: {
        id,
        num
      }
    })
  },
  startAi(id: string) {
    return post({
      baseURL: '/api',
      url: '/startAi',
      data: { aiType: 'carType', id }
    })
  },
  stopAi(id: string) {
    return post({
      baseURL: '/api',
      url: '/stopAi',
      data: {id }
    })
  },
  videoUrlGet(data) {
    return post({
      baseURL: '/api',
      url: '/carType/stream/rtsp/get',
      data
    })
  },
  imageUrl(id) {
    const baseURL = '/api'
    return baseURL + '/carType/pic/orgin/image/' + id
  },
  decideImageUrl(id) {
    const baseURL = '/api'
    return baseURL + '/carType/pic/dst/image/' + id
  },
  checkDecideImage(id) {
    return post({
      baseURL: '/api',
      url: '/carType/pic/dst/image/' + id
    })
  },
  uploadImageUrl() {
    const baseURL = '/mock'
    return baseURL + '/user/login'
  },
  picStatistics(id: string) {
    return post({
      baseURL: '/api',
      url: '/carType/pic/statistics',
      data: {
        id
      }
    })
  }

}
