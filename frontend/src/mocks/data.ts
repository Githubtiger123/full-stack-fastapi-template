import Mock from 'mockjs'
import type { UserPublic, ItemPublic, UsersPublic, ItemsPublic, Token, Message } from '@/client/types.gen'

// Mock 数据模板
const mockUser: UserPublic = {
  id: '@guid',
  email: '@email',
  full_name: '@cname',
  is_active: true,
  is_superuser: false,
} as any

const mockItem: ItemPublic = {
  id: '@guid',
  owner_id: '@guid',
  title: '@ctitle(5, 10)',
  description: '@cparagraph(1, 3)',
} as any

// 生成用户列表
export const generateUsers = (count: number = 10): UsersPublic => {
  const users = Array.from({ length: count }, () => Mock.mock(mockUser))
  return {
    data: users,
    count: users.length,
  }
}

// 生成单个用户
export const generateUser = (): UserPublic => {
  return Mock.mock(mockUser)
}

// 生成当前用户（已登录）
export const generateCurrentUser = (): UserPublic => {
  return Mock.mock({
    id: '@guid',
    email: 'admin@example.com',
    full_name: '管理员',
    is_active: true,
    is_superuser: true,
  })
}

// 生成项目列表
export const generateItems = (count: number = 10): ItemsPublic => {
  const items = Array.from({ length: count }, () => Mock.mock(mockItem))
  return {
    data: items,
    count: items.length,
  }
}

// 生成单个项目
export const generateItem = (ownerId?: string): ItemPublic => {
  return Mock.mock({
    ...mockItem,
    owner_id: ownerId || '@guid',
  })
}

// 生成 Token
export const generateToken = (): Token => {
  return {
    access_token: Mock.mock('@guid') + '.' + Mock.mock('@guid') + '.' + Mock.mock('@guid'),
    token_type: 'bearer',
  }
}

// 生成消息
export const generateMessage = (msg: string = '操作成功'): Message => {
  return {
    message: msg,
  }
}

