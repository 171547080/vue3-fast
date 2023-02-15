/*
 * @Description: 全局状态管理-APP内容定义状态
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { defineStore } from 'pinia'
import { get } from '@api/axios'

interface PropertiesState {
    WS_SERVER_URL: string
}
export interface AppState {
    spinning: boolean,
    properties: PropertiesState,
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    spinning: false,
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
    }
  }
})
