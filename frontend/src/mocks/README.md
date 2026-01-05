# Mock 数据使用说明

本项目使用 MockJS 来模拟后端 API 数据，方便前端开发时不需要依赖后端服务。

## 启用 Mock

### 方式 1：环境变量（推荐）

在 `.env` 或 `.env.local` 文件中设置：

```env
VITE_MOCK=true
```

### 方式 2：开发环境自动启用

如果不设置 `VITE_MOCK`，在开发环境下（`npm run dev`）会自动启用 Mock。

## 文件说明

- `data.ts` - Mock 数据生成函数，使用 MockJS 生成随机数据
- `handlers.ts` - API 请求处理器，定义各个接口的 Mock 响应
- `interceptor.ts` - Mock 拦截器，拦截请求并返回 Mock 数据
- `index.ts` - 导出文件

## 自定义 Mock 数据

### 修改数据模板

在 `data.ts` 中修改数据生成函数，例如：

```typescript
export const generateUser = (): UserPublic => {
  return Mock.mock({
    id: '@guid',
    email: 'admin@example.com',  // 固定邮箱
    full_name: '@cname',
    is_active: true,
    is_superuser: true,
  })
}
```

### 添加新的 API Mock

在 `handlers.ts` 的 `mockHandlers` 对象中添加新的处理器：

```typescript
'GET /api/v1/new-endpoint': async (config: AxiosRequestConfig) => {
  await delay(MOCK_DELAY)
  return createMockResponse({
    // 返回的数据
  })
}
```

### MockJS 语法

MockJS 支持丰富的数据生成语法：

- `@guid` - 生成 GUID
- `@email` - 生成邮箱
- `@cname` - 生成中文姓名
- `@ctitle(5, 10)` - 生成 5-10 个字的标题
- `@cparagraph(1, 3)` - 生成 1-3 段中文段落
- `@integer(1, 100)` - 生成 1-100 的整数
- `@date` - 生成日期

更多语法请参考 [MockJS 文档](http://mockjs.com/)

## 调试

启用 Mock 后，浏览器控制台会显示：

- `🔧 Mock 已启用` - Mock 系统已启动
- `[Mock] GET /api/v1/users/me` - 显示被 Mock 拦截的请求

## 注意事项

1. Mock 数据只在开发环境生效，生产环境不会启用
2. 如果某个 API 没有对应的 Mock Handler，会发送真实请求
3. Mock 响应有 300ms 的延迟，模拟真实网络请求

