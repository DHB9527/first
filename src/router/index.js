// router/index.js：路由实例与路由表
// 1. 命名路由组织导航  2. meta 标记标题/权限  3. beforeEach 守卫  4. 404 兜底
import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProjectsLayout from '../views/ProjectsLayout.vue'
import ProjectList from '../views/ProjectList.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import NotFound from '../components/NotFound.vue'
import { useSettingsStore } from '../stores/store'
import ArticleList from '../views/ArticleList.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: '首页' } },

  // 显式重定向：访问 /home、/index 自动跳首页（演示 redirect 字段）
  { path: '/home', redirect: { name: 'home' } },
  { path: '/index', redirect: '/' },

  // 单数别名重定向到复数：/project → /projects
  { path: '/project', redirect: '/projects' },

  // 项目页：嵌套子路由（列表 + 动态详情）
  {
    path: '/projects',
    component: ProjectsLayout,
    children: [
      { path: '', name: 'projects', component: ProjectList, meta: { title: '项目展示' } },
      { path: ':id', name: 'project-detail', component: ProjectDetail, meta: { title: '项目详情' } }
    ]
  },

  { path: '/about', name: 'about', component: AboutView, meta: { title: '关于' } },

  { path: '/articles', name: 'articles', component: ArticleList, meta: { title: '文章列表' } },

  { path: '/login', name: 'login', component: LoginView, meta: { title: '登录' } },

  // 后台管理：meta.requiresAuth 标记需要登录
  { path: '/admin', name: 'admin', component: AdminView, meta: { title: '后台管理', requiresAuth: true } },

  // 404：兜底路由，匹配所有未定义地址
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { title: '404' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫：更新页面标题 + 权限拦截
router.beforeEach((to) => {
  // 1. 更新标题
  document.title = to.meta.title ? `${to.meta.title} · 个人主页系统` : '个人主页系统'

  // 2. 需要认证的页面：未登录跳登录页，并记录来源以便登录后回跳
  const settings = useSettingsStore()
  if (to.meta.requiresAuth && !settings.isLogin()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
