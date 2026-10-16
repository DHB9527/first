<!--
  TopBar.vue：顶部栏
  RouterLink 声明式跳转 + 命名路由 + router-link-active 高亮
-->
<script setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../stores/store'

const settings = useSettingsStore()
const { user, isDark } = storeToRefs(settings)
</script>

<template>
  <div class="topbar">
    <div class="topbar-left">
      <h1>个人主页系统</h1>
      <div class="sub">Vue Router · 组合式 API · 组件化开发实验</div>
    </div>
    <div class="topbar-right">
      <!-- RouterLink：声明式导航，to 用命名路由对象 -->
      <nav class="nav">
        <RouterLink class="nav-btn" :to="{ name: 'home' }">首页</RouterLink>
        <RouterLink class="nav-btn" :to="{ name: 'projects' }">项目展示</RouterLink>
        <RouterLink class="nav-btn" :to="{ name: 'articles' }">文章</RouterLink>
        <RouterLink class="nav-btn" :to="{ name: 'about' }">关于</RouterLink>
        <RouterLink v-if="user" class="nav-btn" :to="{ name: 'admin' }">后台管理</RouterLink>
        <RouterLink v-else class="nav-btn" :to="{ name: 'login' }">登录</RouterLink>
      </nav>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 18px 28px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
.topbar-left h1 { font-size: 24px; font-weight: 700; }
.topbar-left .sub { font-size: 13px; color: var(--sub); margin-top: 4px; }
.topbar-right { display: flex; gap: 10px; align-items: center; }
.nav { display: flex; gap: 8px; }

/* RouterLink 渲染为 <a>，vue-router 自动添加两个高亮类：
   router-link-active（包含式：子路由也亮）
   router-link-exact-active（精确匹配才亮） */
.nav-btn {
  color: var(--sub);
  text-decoration: none;
  border: 1px solid var(--border);
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.nav-btn:hover { border-color: var(--accent); color: var(--accent); }

/* 包含式高亮：如 /projects/1 详情页时"项目展示"仍亮 */
.nav-btn.router-link-active { color: var(--accent); border-color: var(--accent); }

/* 精确高亮：只有当前地址完全匹配时背景填充 */
.nav-btn.router-link-exact-active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

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
