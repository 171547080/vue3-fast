/*
 * @Description: 定义用户数据类型
 * @Author: laigt
 * @Date: 2023-02-2
*/

export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserState {
  id?: string
  userId?: string
  loginName?: string
  password?: string
  gender?: string
  email?: string
  mobile?: string
  department?: string
  departmentId?: string
  role?: RoleType,
  realName?: string,
  disabled?: boolean,
  accessKey?: string,
  secretKey?: string,
  superAdmin?: boolean,
  tokenId?: string,
}
