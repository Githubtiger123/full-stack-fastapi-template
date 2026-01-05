import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
// import { ApiError, OpenAPI } from "./client"
import { OpenAPI } from "./client"
import ErrorComponent from "./components/Common/ErrorComponent"
import NotFound from "./components/Common/NotFound"
// import { RequireAuth, RequireGuest } from "./components/Common/RouteGuards"
import { RequireGuest } from "./components/Common/RouteGuards"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/sonner"
import "./index.css"
import MainLayout from "./routes/_layout"
import Admin from "./routes/_layout/admin"
import Dashboard from "./routes/_layout/index/index"
import Items from "./routes/_layout/items"
import UserSettings from "./routes/_layout/settings"
import Login from "./routes/login"
import RecoverPassword from "./routes/recover-password"
import ResetPassword from "./routes/reset-password"
import SignUp from "./routes/signup"
import { setupMockInterceptor } from "./mocks/interceptor"

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

// 设置 Mock 拦截器
setupMockInterceptor(OpenAPI)

const handleApiError = (_error: Error) => {
  // 注释掉未登录跳转，允许直接访问
  // if (error instanceof ApiError && [401, 403].includes(error.status)) {
  //   localStorage.removeItem("access_token")
  //   window.location.href = "/login"
  // }
}
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleApiError,
  }),
  mutationCache: new MutationCache({
    onError: handleApiError,
  }),
})

const router = createBrowserRouter([
  {
    path: "/",
    // 注释掉 RequireAuth，允许未登录直接访问
    // element: (
    //   <RequireAuth>
    //     <Layout />
    //   </RequireAuth>
    // ),
    element: <MainLayout />,
    errorElement: <ErrorComponent />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "items", element: <Items /> },
      { path: "admin", element: <Admin /> },
      { path: "settings", element: <UserSettings /> },
    ],
  },
  {
    path: "/login",
    element: (
      <RequireGuest>
        <Login />
      </RequireGuest>
    ),
  },
  {
    path: "/signup",
    element: (
      <RequireGuest>
        <SignUp />
      </RequireGuest>
    ),
  },
  {
    path: "/recover-password",
    element: (
      <RequireGuest>
        <RecoverPassword />
      </RequireGuest>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <RequireGuest>
        <ResetPassword />
      </RequireGuest>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
