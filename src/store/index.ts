import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useUserStore } from './modules/user'
const pinia = createPinia()

export { useUserStore, useAppStore }
export default pinia
