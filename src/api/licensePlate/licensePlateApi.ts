import { request, post } from '../axios'

export default {
  page(data) {
    return request({
      url: '/licensePlate/pic/page',
      data
    })
  },
  add(data) {
    return request({
      url: '/licensePlate/pic/add',
      headers: { "Content-Type": "multipart/form-data" },
      data
    })
  },
  update(data) {
    return request({
      url: '/licensePlate/pic/modify',
      data
    })
  },
  delete(data) {
    return request({
      url: '/licensePlate/pic/delete',
      data
    })
  },
  detail(id: string) {
    return request({
      url: '/licensePlate/pic/detail',
      data: {
        id
      }
    })
  },
  reasoning(id: string) {
    return request({
      baseURL: '/mock',
      url: '/licensePlate/reasoning/list',
      data: {
        id
      }
    })
  },
  imageUrl(id) {
    const baseURL = '/api'
    return baseURL + '/licensePlate/pic/orgin/image/' + id
  },
  decideImageUrl(id) {
    const baseURL = '/api'
    return baseURL + '/licensePlate/pic/dst/image/' + id
  },
  checkDecideImage(id) {
    return post({
      baseURL: '/api',
      url: '/licensePlate/pic/dst/image/' + id
    })
  },
  startAi(id: string) {
    return post({
      baseURL: '/api',
      url: '/startAi',
      data: { aiType: 'licensePlate', id }
    })
  },
  picStatistics(data) {
    return post({
      baseURL: '/api',
      url: '/licensePlate/pic/statistics',
      data
    })
  },
  uploadImageUrl() {
    const baseURL = '/mock'
    return baseURL + '/user/login'
  }
}
