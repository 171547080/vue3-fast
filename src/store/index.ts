import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permissions'
import { useUserStore } from './modules/user'
const pinia = createPinia()

export { useUserStore, useAppStore, usePermissionStore }
export default pinia
