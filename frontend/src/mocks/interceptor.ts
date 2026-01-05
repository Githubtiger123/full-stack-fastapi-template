import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { OpenAPIConfig } from '@/client/core/OpenAPI'
import { MOCK_ENABLED, getMockHandler } from './handlers'
import axios, { AxiosError } from 'axios'

// 存储原始的 axios.request 方法
let originalAxiosRequest: typeof axios.request

/**
 * Mock 适配器：替换 axios 的请求方法
 */
function createMockAdapter() {
  if (!originalAxiosRequest) {
    originalAxiosRequest = axios.request.bind(axios)
  }

  // 替换 axios.request 方法
  axios.request = async function <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (!MOCK_ENABLED) {
      return originalAxiosRequest<T>(config)
    }

    const method = config.method?.toUpperCase() || 'GET'
    const url = config.url || ''
    
    // 提取路径部分（去除查询参数）
    let path = url.split('?')[0]
    
    // 如果 URL 包含完整的域名，提取路径部分
    if (path.startsWith('http://') || path.startsWith('https://')) {
      try {
        const urlObj = new URL(path)
        path = urlObj.pathname
      } catch {
        // 如果解析失败，直接使用原始路径
      }
    }
    
    // 获取 Mock Handler
    const handler = getMockHandler(method, path)
    
    if (handler) {
      try {
        console.log(`[Mock] ${method} ${path}`)
        const mockResponse = await handler(config)
        return mockResponse as AxiosResponse<T>
      } catch (error) {
        console.error('[Mock] Handler error:', error)
        // Mock 失败时，回退到真实请求
        return originalAxiosRequest<T>(config)
      }
    }

    // 没有对应的 Mock Handler，使用真实请求
    return originalAxiosRequest<T>(config)
  } as typeof axios.request
}

/**
 * 设置 Mock 拦截器
 * 如果启用 Mock，拦截请求并返回 Mock 数据
 */
export function setupMockInterceptor(openAPI: OpenAPIConfig) {
  if (!MOCK_ENABLED) {
    console.log('[Mock] Mock 未启用，使用真实 API')
    return
  }

  console.log('[Mock] Mock 已启用，所有请求将返回 Mock 数据')
  
  // 安装 Mock 适配器
  createMockAdapter()
}

