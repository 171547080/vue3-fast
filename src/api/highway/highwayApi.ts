import { request, post } from '../axios'

export default {
  page(data) {
    return request({
      url: '/highwayDiseases/page',
      data
    })
  },
  add(data) {
    return request({
      url: '/highwayDiseases/add',
      data
    })
  },
  update(data) {
    return request({
      url: '/highwayDiseases/modify',
      data
    })
  },
  delete(data) {
    return request({
      url: '/highwayDiseases/delete',
      data
    })
  },
  startAi(id: string) {
    return post({
      baseURL: '/api',
      url: '/startAi',
      data: { aiType: 'highwayDiseases', id }
    })
  },
  detail(id) {
    return request({
      url: '/highwayDiseases/detail',
      data: { id }
    })
  },
  statistics(id) {
    return request({
      baseURL: '/api',
      url: '/highwayDiseases/statistics',
      data: { id }
    })
  },
  videoUrlGet(id: string) {
    return post({
      baseURL: '/api',
      url: '/highwayDiseases/rtsp/get',
      data: {
        id
      }
    })
  },
  stopAi(id: string) {
    return post({
      baseURL: '/api',
      url: '/stopAi',
      data: {id }
    })
  }
}
