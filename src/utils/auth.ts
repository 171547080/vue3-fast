/**
 * 使用本地存储保持用户登陆状态
 */
const TokenKey = 'app-token'
// 是否使用本地存储  true-localStorage   false-sessionStorage
const useLocalStorage = false;

const isLogin = () => {
  const result = useLocalStorage ? !!localStorage.getItem(TokenKey)  :  !!sessionStorage.getItem(TokenKey)
  return result
}
const getToken = () => {
  const result = useLocalStorage ? localStorage.getItem(TokenKey)  :  sessionStorage.getItem(TokenKey) 
  return result
}
const setToken = (token: string) => {
  useLocalStorage ? localStorage.setItem(TokenKey, token) : sessionStorage.setItem(TokenKey, token)
}
const clearToken = () => {
  localStorage.removeItem(TokenKey)
  sessionStorage.removeItem(TokenKey)
}

const getStorageMode = () => {
  return useLocalStorage ? 'localStorage' : 'sessionStorage'
}

export { isLogin, getToken, setToken, clearToken, getStorageMode}
export default { isLogin, getToken, setToken, clearToken, getStorageMode}
