// main.js：创建 Vue 应用并挂载到 #app
// 职责：引入根组件 App.vue、全局样式，注册 Vue Router，创建应用实例
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)    // 注册 Pinia 状态管理
  .use(router)   // 注册路由插件
  .mount('#app')
