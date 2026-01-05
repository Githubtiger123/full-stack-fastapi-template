/**
 * Mock 配置入口文件
 * 
 * 使用方式：
 * 1. 在 .env 文件中设置 VITE_MOCK=true 启用 Mock
 * 2. 或者在开发环境下默认启用（如果 VITE_MOCK 未设置）
 */

export { MOCK_ENABLED, getMockHandler } from './handlers'
export * from './data'

// 打印 Mock 状态
if (import.meta.env.DEV) {
  const mockEnabled = import.meta.env.VITE_MOCK === 'true' || import.meta.env.DEV
  if (mockEnabled) {
    console.log('%c🔧 Mock 已启用', 'color: #4CAF50; font-weight: bold; font-size: 14px;')
    console.log('所有 API 请求将返回 Mock 数据')
  }
}

