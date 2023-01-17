/**
 * @name Config
 * @description 项目配置
 */

// const ENV = JSON.parse(process.env.ENV as string)
export const ENV = {
  VITE_API_MOCK: process.env.VITE_API_MOCK,
  VITE_ENV_MODE: process.env.VITE_ENV_MODE,
  VITE_APP_NAME: process.env.VITE_APP_NAME
}

// 本地服务端口
export const SERVER_PORT = 3000;

// 404页面资源地址
export const ERROR_404_IMG_URL = '/img/404.png'
export const DEFAULT_IMG_URL = '/img/default.png'

// prefix
export const API_PREFIX = '/api';

// serve
export const API_BASE_URL = '/api';
export const API_TARGET_URL = 'http://192.168.215.7:8002/ai-backend';

// mock
export const MOCK_API_BASE_URL = '/mock';
export const MOCK_API_TARGET_URL = 'http://192.168.215.100:7300/mock/62b41a92baaffd002bc6119f';

// 环境变量中配置的运行模式 development | prod   开发 | 生产
export const ENV_MODE = ENV.VITE_ENV_MODE   

// 开启mock模式 - 需要配置MOCK_API_TARGET_URL mock服务地址
export const API_MOCK = ENV.VITE_API_MOCK   

// 应用名称
export const APP_NAME = ENV.VITE_APP_NAME || '应用名称'   
