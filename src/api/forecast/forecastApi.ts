import { request } from '../axios'

export default {
  sourceList(data) {
    return request({
      baseURL: 'api',
      url: '/jamForecast/datasource/list',
      data
    })
  },
  page(data) {
    return request({
      baseURL: 'api',
      url: '/jamForecast/datasource/roadList',
      data
    })
  },
  list(data) {
    return request({
      baseURL: 'api',
      url: '/jamForecast/datasource/roadList',
      data
    })
  },
  detail(data) {
    return request({
      baseURL: 'api',
      url: '/jamForecast/datasource/roadDetail',
      data
    })
  },
  add(data) {
    return request({
      baseURL: '/mock',
      url: '/forecast/add',
      data
    })
  },
  update(data) {
    return request({
      baseURL: '/mock',
      url: '/forecast/update',
      data
    })
  },
  delete(data) {
    return request({
      baseURL: '/mock',
      url: '/forecast/delete',
      data
    })
  },
  historyPage(data) {
    return request({
      baseURL: '/api',
      url: '/jamForecast/forecastAndReal/history/page',
      data
    })
  },
  historyList(data) {
    return request({
      baseURL: '/api',
      url: '/jamForecast/forecastAndReal/history/list',
      data
    })
  },
  // allDayStatistics(data) {
  //     return request({
  //         baseURL: '/api',
  //         url: '/jamForecast/accuracy/statistics',
  //         data
  //     })
  // },
  allDayStatistics(data) {
    return request({
      baseURL: '/api',
      url: '/jamForecast/jamLv/accuracy/statistics',
      data
    })
  },
  todayStatistics(data) {
    return request({
      baseURL: '/api',
      url: '/jamForecast/jamLv/allDay/statistics',
      data
    })
  },
  jamLevelStatistics(data) {
    return request({
      baseURL: '/api',
      url: '/jamForecast/forecastAndReal/jamLv/statistics',
      data
    })
  }
}
