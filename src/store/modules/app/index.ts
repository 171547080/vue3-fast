/*
 * @Description: 全局状态管理-APP内容定义状态
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { defineStore } from 'pinia'
import { get } from '@api/axios'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'
interface PropertiesState {
    WS_SERVER_URL: string
}

const USER_THEME_COLOR_KEY = 'USER_THEME_COLOR_KEY'
export interface AppState {
    spinning: boolean,
    themeColor: string,
    properties: PropertiesState,
    inverseColorMode: boolean,
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    spinning: false,
    themeColor: '#1890ff',
    inverseColorMode: false,
    properties: {
      WS_SERVER_URL: '127.0.0.1'
    }
  }),

  actions: {
    async startSpinning() {
      this.spinning = true
    },
    async stopSpinning() {
      this.spinning = false
    },

    async loadProperties() {
      get({
        baseURL: '/',
        url: '/properties.json'
      }).then((res) => {
        const props = res
        if (props) {
          for (const key in props) {
            this.properties[key] = props[key]
          }
        }
      })
    },
    async getUserThemeColor() {
      this.themeColor = getLocalStorage(USER_THEME_COLOR_KEY) || '#1890ff'
    },
    async themeColorChange(color:string) {
      this.themeColor = color
      setLocalStorage(USER_THEME_COLOR_KEY, this.themeColor)
    }
  }
})
