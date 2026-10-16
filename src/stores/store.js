// 实验四：Pinia 状态管理
// 三个 Store：useSettingsStore（设置）、useTasksStore（项目/任务）、useArticleStore（文章）
// 要求：state / getters / actions / storeToRefs / localStorage 持久化

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// 组合式函数：useLocalStorage —— 状态持久化到 localStorage
function useLocalStorage(key, defaultValue) {
  const data = ref(JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue)))
  watch(data, (val) => localStorage.setItem(key, JSON.stringify(val)), { deep: true })
  return data
}

// ========== Store 1：useSettingsStore（全局设置 + 用户认证） ==========
export const useSettingsStore = defineStore('settings', () => {
  // state
  const isDark = useLocalStorage('settings_dark', false)
  const user = useLocalStorage('settings_user', null)

  // actions
  function toggleDark() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function login(username) {
    user.value = username
  }

  function logout() {
    user.value = null
  }

  function isLogin() {
    return !!user.value
  }

  return { isDark, user, toggleDark, login, logout, isLogin }
})

// ========== Store 2：useTasksStore（项目/任务管理） ==========
export const useTasksStore = defineStore('tasks', () => {
  // state
  const projects = useLocalStorage('tasks_projects', [
    { id: 1, name: '校园活动平台', desc: '基于 Vue 3 的校园活动发布与报名系统。', tags: ['Vue 3', 'Vite', 'Pinia'], date: '2025-03', stars: 48, forks: 12 },
    { id: 2, name: '在线笔记应用', desc: '支持 Markdown 编辑、实时预览的笔记工具。', tags: ['Vue 3', 'TypeScript'], date: '2025-06', stars: 32, forks: 8 },
    { id: 3, name: '像素接金币游戏', desc: '原生 HTML5 Canvas 开发的像素风小游戏。', tags: ['Canvas', 'JavaScript'], date: '2025-09', stars: 20, forks: 5 }
  ])

  const defaultProfile = {
    name: '窦海波',
    studentId: '249980349',
    major: '计算机科学与技术',
    className: '24计科1班',
    email: '249980349@qq.com',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avatar%20icon%20cute%20student%20face%20flat%20illustration&image_size=square_hd',
    intro: '热爱前端开发与设计，喜欢用代码实现创意，正在学习 Vue 3 与 TypeScript。',
    school: '重庆工程学院',
    grade: '大三',
    motto: '保持热爱，奔赴山海。',
    projects: '参与校园活动平台、在线笔记应用等多个 Web 项目开发。'
  }

  const profile = useLocalStorage('tasks_profile', defaultProfile)
  // 兼容旧 localStorage 缓存：补齐后新增的学号字段
  if (!profile.value.studentId) profile.value.studentId = defaultProfile.studentId

  // getters
  const totalProjects = computed(() => projects.value.length)
  const totalStars = computed(() => projects.value.reduce((sum, p) => sum + (p.stars || 0), 0))

  // actions
  function updateProfile(newProfile) {
    Object.assign(profile.value, newProfile)
  }

  function updateProject(id, newData) {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) Object.assign(projects.value[index], newData)
  }

  return { projects, profile, totalProjects, totalStars, updateProfile, updateProject }
})

// ========== Store 3：useArticleStore（文章管理） ==========
export const useArticleStore = defineStore('articles', () => {
  // state
  const articles = useLocalStorage('articles_data', [
    { id: 1, title: 'Vue 3 组合式 API 入门', content: '组合式 API 让逻辑复用更灵活，setup 语法糖简化代码。', date: '2025-09-01', status: 'published' },
    { id: 2, title: 'Pinia 状态管理实战', content: 'Pinia 是 Vue 官方推荐的状态管理库，比 Vuex 更轻量。', date: '2025-09-15', status: 'published' },
    { id: 3, title: 'Vue Router 4 路由守卫详解', content: 'beforeEach 可以统一处理权限验证和页面标题更新。', date: '2025-10-01', status: 'draft' }
  ])

  // getters
  const published = computed(() => articles.value.filter(a => a.status === 'published'))
  const drafts = computed(() => articles.value.filter(a => a.status === 'draft'))
  const totalArticles = computed(() => articles.value.length)

  // actions
  function addArticle(article) {
    const newId = Math.max(...articles.value.map(a => a.id), 0) + 1
    articles.value.push({ id: newId, ...article })
  }

  function updateArticle(id, newData) {
    const index = articles.value.findIndex(a => a.id === id)
    if (index !== -1) Object.assign(articles.value[index], newData)
  }

  function removeArticle(id) {
    const index = articles.value.findIndex(a => a.id === id)
    if (index !== -1) articles.value.splice(index, 1)
  }

  return { articles, published, drafts, totalArticles, addArticle, updateArticle, removeArticle }
})
