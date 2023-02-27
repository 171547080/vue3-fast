/*
 * @Description: 消息列表-消息API
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { post, put, del, get } from '../axios'

const RESOURCE_URL = '/message'

export default {
  /**
   * 分页
   * @param data
   * @returns
   */
  page(data) {
    return get({
      baseURL: '/mock',
      url: RESOURCE_URL,
      apiMode: 'mock',
      data
    })
  },
  /**
   * 新增
   * @param data
   * @returns
   */
  add(data) {
    return put({
      baseURL: '/mock',
      url: RESOURCE_URL,
      apiMode: 'mock',
      data
    })
  },
  /**
   * 更新
   * @param data
   * @returns
   */
  update(data) {
    return post({
      baseURL: '/mock',
      url: RESOURCE_URL,
      apiMode: 'mock',
      data
    })
  },
  /**
   * 删除
   * @param data
   * @returns
   */
  del(id:string | number) {
    return del({
      baseURL: '/mock',
      url: `${RESOURCE_URL}/${id}`,
      apiMode: 'mock'
    })
  }
}
