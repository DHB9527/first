import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite 配置：启用 Vue SFC 编译
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  }
})
