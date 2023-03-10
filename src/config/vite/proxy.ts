/*
 * @Description: vite配置-代理配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

import {
  API_BASE_URL,
  API_TARGET_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL
} from '../../config/constant'
import { ProxyOptions } from 'vite'
type ProxyTargetList = Record<string, ProxyOptions>;

const init: ProxyTargetList = {
  // api
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), '')
  },
  // mock
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '')
  }
}

export default init
