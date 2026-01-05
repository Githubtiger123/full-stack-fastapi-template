import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  generateUsers,
  generateUser,
  generateCurrentUser,
  generateItems,
  generateItem,
  generateToken,
  generateMessage,
} from './data'

// Mock 配置：是否启用 Mock
export const MOCK_ENABLED = import.meta.env.VITE_MOCK === 'true' || import.meta.env.DEV

// Mock 延迟（模拟网络延迟）
const MOCK_DELAY = 300

// 延迟函数
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 创建 mock 响应
const createMockResponse = <T>(data: T, status: number = 200): AxiosResponse<T> => {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {} as AxiosRequestConfig,
  } as AxiosResponse<T>
}

// Mock 处理器
export const mockHandlers = {
  // 登录接口
  'POST /api/v1/login/access-token': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const formData = config.data as any
    const username = formData?.username || formData?.get?.('username')

    if (username === 'admin@example.com') {
      return createMockResponse(generateToken())
    } else {
      return createMockResponse(
        { detail: '用户名或密码错误' },
        400
      )
    }
  },

  // 获取当前用户
  'GET /api/v1/users/me': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateCurrentUser())
  },

  // 获取用户列表
  'GET /api/v1/users/': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const params = (config.params || {}) as { skip?: number; limit?: number }
    const limit = params.limit || 100
    return createMockResponse(generateUsers(limit))
  },

  // 获取单个用户
  'GET /api/v1/users/:userId': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateUser())
  },

  // 创建用户
  'POST /api/v1/users/': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const body = config.data as any
    return createMockResponse({
      ...generateUser(),
      email: body?.email || generateUser().email,
      full_name: body?.full_name || generateUser().full_name,
    })
  },

  // 更新用户
  'PUT /api/v1/users/:userId': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const body = config.data as any
    return createMockResponse({
      ...generateUser(),
      ...body,
    })
  },

  // 删除用户
  'DELETE /api/v1/users/:userId': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateMessage('用户删除成功'))
  },

  // 注册用户
  'POST /api/v1/users/register': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const body = config.data as any
    return createMockResponse({
      ...generateUser(),
      email: body?.email || generateUser().email,
      full_name: body?.full_name || generateUser().full_name,
    })
  },

  // 更新当前用户信息
  'PUT /api/v1/users/me': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const body = config.data as any
    return createMockResponse({
      ...generateCurrentUser(),
      ...body,
    })
  },

  // 更新当前用户密码
  'PUT /api/v1/users/me/password': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateMessage('密码更新成功'))
  },

  // 删除当前用户
  'DELETE /api/v1/users/me': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateMessage('账户删除成功'))
  },

  // 获取项目列表
  'GET /api/v1/items/': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const params = (config.params || {}) as { skip?: number; limit?: number }
    const limit = params.limit || 100
    return createMockResponse(generateItems(limit))
  },

  // 获取单个项目
  'GET /api/v1/items/:id': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateItem())
  },

  // 创建项目
  'POST /api/v1/items/': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const body = config.data as any
    return createMockResponse({
      ...generateItem(),
      title: body?.title || generateItem().title,
      description: body?.description || generateItem().description,
    })
  },

  // 更新项目
  'PUT /api/v1/items/:id': async (config: AxiosRequestConfig) => {
    await delay(MOCK_DELAY)
    const body = config.data as any
    return createMockResponse({
      ...generateItem(),
      ...body,
    })
  },

  // 删除项目
  'DELETE /api/v1/items/:id': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateMessage('项目删除成功'))
  },

  // 测试 Token
  'POST /api/v1/login/test-token': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateCurrentUser())
  },

  // 恢复密码
  'POST /api/v1/password-recovery/:email': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateMessage('密码恢复邮件已发送'))
  },

  // 重置密码
  'POST /api/v1/reset-password': async () => {
    await delay(MOCK_DELAY)
    return createMockResponse(generateMessage('密码重置成功'))
  },
}

// 匹配 URL 和方法的辅助函数
const matchUrl = (pattern: string, url: string): { matched: boolean; params: Record<string, string> } => {
  // 将 {id} 格式转换为 :id 格式，支持两种格式
  const normalizedPattern = pattern.replace(/{(\w+)}/g, ':$1')
  const patternParts = normalizedPattern.split('/')
  const urlParts = url.split('?')[0].split('/')
  const params: Record<string, string> = {}

  if (patternParts.length !== urlParts.length) {
    return { matched: false, params }
  }

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i]
    // 支持 :param 和 {param} 两种格式
    if (patternPart.startsWith(':') || (patternPart.startsWith('{') && patternPart.endsWith('}'))) {
      const key = patternPart.startsWith(':') 
        ? patternPart.slice(1) 
        : patternPart.slice(1, -1)
      params[key] = urlParts[i]
    } else if (patternPart !== urlParts[i]) {
      return { matched: false, params }
    }
  }

  return { matched: true, params }
}

// 获取 Mock Handler
export const getMockHandler = (method: string, url: string) => {
  const key = `${method.toUpperCase()} ${url}`
  
  // 精确匹配
  if (mockHandlers[key as keyof typeof mockHandlers]) {
    return mockHandlers[key as keyof typeof mockHandlers]
  }

  // 参数匹配
  for (const [pattern, handler] of Object.entries(mockHandlers)) {
    const [patternMethod, patternUrl] = pattern.split(' ', 2)
    if (patternMethod.toUpperCase() === method.toUpperCase()) {
      const { matched } = matchUrl(patternUrl, url)
      if (matched) {
        return handler
      }
    }
  }

  return null
}

