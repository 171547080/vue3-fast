/*
 * @Description: 权限API
 * @Author: laigt
 * @Date: 2023-02-2
*/
import { get } from '../axios'

export default {
  getInfo() {
    return get({
      baseURL: '/mock',
      url: '/user/getInfo'
    })
  }
}
