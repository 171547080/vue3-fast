import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { IResponse } from './responseType'
import CONFIG from '../config'
import { API_MOCK, MOCK_API_BASE_URL } from '../config/constant'
import { getToken } from '../utils/auth'
import { message } from 'ant-design-vue'

interface IAxiosRequestConfig extends AxiosRequestConfig{
  apiMode?: 'mock' | 'api' | 'auto' | undefined
}

interface ErrorStatus {
  code?: string
  message: string
}

const DEFAULT_REQUEST_TYPE = 'POST'
const DEFAULT_RESPONSE_ERROR_MESSAGE = '接口异常,请联系管理员'
const DEFAULT_RESPONSE_TIMEOUT_MESSAGE = '网络连接超时,请联系管理员'

// 排除mock服务的URL列表
const MOCK_EXCULE_URL = ['/properties.json']

const showMessage = (status: ErrorStatus) => {
  // 展示消息
  message.error(status.message)
}

// 如果请求话费了超过 `timeout` 的时间，请求将被中断 30s
axios.defaults.timeout = 30000
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: CONFIG.baseApi + '',
  transformRequest: [
    // 格式化data
    function (data, headers) {
      // 如果上传文件则 不进行formData格式化
      if (headers && headers['Content-Type'] && (headers['Content-Type'] as string).indexOf('multipart/form-data') > -1) {
        return data
      }

      data = qs.stringify(data)
      return data
    }
  ]
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.data.code === 500) {
        if (response && response.data) {
          // response.status !== 200
          // 请求已响应，但是不在2xx的范围
          const formatRes = formatResponseErrorData(response.data)
          showMessage(formatRes)
          return Promise.reject(formatRes)
        }
      }

      return response
    }
    // 其他状态
    showMessage(response.data)
    return response
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response && response.data) {
      // response.status !== 200
      // 请求已响应，但是不在2xx的范围
      const formatRes = formatResponseErrorData(response.data)
      showMessage(formatRes)
      return Promise.reject(formatRes)
    }

    // response为空，则网络连接超时
    const defaultMessage = { message: DEFAULT_RESPONSE_TIMEOUT_MESSAGE }
    showMessage(defaultMessage)
    return Promise.reject(defaultMessage)
  }
)
const formatResponseErrorData = (data) => {
  const result: ErrorStatus = {
    code: '',
    message: ''
  }
  // apifoxError 模式系统异常
  if (data.apifoxError) {
    result.code = data.apifoxError.code
    data.message = data.apifoxError.message
  }

  result.message = data.message || data.code || DEFAULT_RESPONSE_ERROR_MESSAGE

  return result
}

// 处理config，对开启mock模式api进行处理
function handleMockApi(config) {
  // 排除指定URL
  if (MOCK_EXCULE_URL.includes(config.url)) {
    return config
  }

  // api配置mock时转发到mock服务中
  if (config && config.apiMode === 'mock') {
    config.baseURL = config.baseURL + MOCK_API_BASE_URL
  }

  // 如果开启的mock模式，强制将请求转发到mock服务中
  if (API_MOCK === 'true') {
    config.baseURL = MOCK_API_BASE_URL
  }

  return config
}

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: IAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      if (config.headers) { config.headers.Authorization = `${token}` }
    }

    config = handleMockApi(config)

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export function request<T = any>(config: IAxiosRequestConfig): Promise<T> {
  const conf = config
  // 不存在method的时候，默认使用【DEFAULT_REQUEST_TYPE】方法
  if (conf && !conf.method) {
    conf.method = DEFAULT_REQUEST_TYPE
  }

  // get方法通过data传参时，默认转换为params传参
  if (conf && conf.method) {
    if (conf.method.toUpperCase() === 'GET' && conf.data && (!conf.params || JSON.stringify(conf.params) === '{}')) {
      conf.params = conf.data
      delete conf.data
    }
  }

  return new Promise((resolve, reject) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        if (!res.data) {
          resolve('系统异常' as any)
        }
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
  })
}

export function get<T = any>(config: IAxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' })
}

export function post<T = any>(config: IAxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' })
}

export function del<T = any>(config: IAxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'DELETE' })
}

export function put<T = any>(config: IAxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'PUT' })
}
export default request
export type { AxiosInstance, AxiosResponse }
/**
 * @description: 用户登录案例
 * @params {ILogin} params
 * @return {Promise}
 */
// export const login = (params: ILogin): Promise<IResponse> => {
//     return axiosInstance.post('user/login', params).then(res => res.data);
// };
