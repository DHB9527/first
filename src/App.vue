<!--
  App.vue：根组件
  Vue Router 版：不再手动 v-if 切换页面，改为 RouterView 渲染当前路由组件
  组件树：
    App
    ├── TopBar            (RouterLink 声明式导航)
    ├── <RouterView>      (路由出口)
    │   ├── /             → HomeView
    │   ├── /projects     → ProjectsLayout
    │   │   ├── ''        → ProjectList        (嵌套子路由)
    │   │   └── :id       → ProjectDetail      (动态路由参数)
    │   ├── /about        → AboutView
    │   ├── /login        → LoginView
    │   ├── /admin        → AdminView          (meta.requiresAuth 守卫)
    │   └── /:pathMatch(.*)* → NotFound        (404 兜底)
    └── BottomBar
-->
<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from './stores/store'
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'

// 使用 Pinia Store
const settings = useSettingsStore()
const { isDark } = storeToRefs(settings)

// 主题切换（调用 store action）
const toggleTheme = () => settings.toggleDark()

onMounted(() => {
  console.log('%c[ mounted ] Vue Router + Pinia 版页面加载完成 ✅', 'color:#4c89f7;font-weight:bold;')
  // 初始化主题（从 localStorage 恢复）
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <div class="wrap">
    <!-- 顶部栏：RouterLink 导航；主题按钮通过插槽传入 -->
    <TopBar>
      <button class="theme-btn" @click="toggleTheme">
        {{ isDark ? '🌙 暗色' : '☀️ 亮色' }}
      </button>
    </TopBar>

    <!-- 路由出口：当前路由对应的页面组件渲染在这里 -->
    <RouterView />

    <!-- 底部栏 -->
    <BottomBar author="窦海波" email="3390892142@qq.com" />
  </div>
</template>

<style scoped>
.theme-btn {
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid var(--border);
  padding: 10px 20px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.2s;
}
.theme-btn:hover { border-color: var(--accent); }
</style>
