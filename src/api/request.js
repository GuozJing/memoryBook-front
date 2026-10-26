import axios from 'axios'

// 统一请求实例：开发环境由 vite 将 /api 代理转发到 Spring Boot 后端
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('[api] 请求失败:', error.message)
    return Promise.reject(error)
  },
)

export default request
