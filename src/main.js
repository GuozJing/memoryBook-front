import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'
import './style.css'

const app = createApp(App)

// pinia 需先于 router 注册，便于后续路由守卫中使用 store
app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
