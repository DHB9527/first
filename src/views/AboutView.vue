<!--
  AboutView.vue：关于页
  展示本实验用到的路由知识点
-->
<script setup>
const points = [
  { name: 'Vue Router 安装与注册', desc: 'npm 安装 vue-router@4，main.js 中 app.use(router)' },
  { name: '路由表与命名路由', desc: '用 name 字段命名路由，导航处 :to="{ name: \'xxx\' }" 引用' },
  { name: 'RouterView / RouterLink', desc: 'RouterView 渲染路由组件，RouterLink 声明式跳转' },
  { name: '导航高亮', desc: 'router-link-active 与 router-link-exact-active 样式' },
  { name: '动态路由参数', desc: '/projects/:id，useRoute().params.id 获取' },
  { name: '嵌套子路由', desc: '项目页 children：列表（空路径）+ 详情（:id）' },
  { name: '编程式导航', desc: 'useRouter()：push / back / replace' },
  { name: '路由元信息与守卫', desc: 'meta.title 动态标题，meta.requiresAuth + beforeEach 拦截' },
  { name: '404 兜底', desc: '/:pathMatch(.*)* 匹配所有未定义地址' }
]
</script>

<template>
  <div class="about-card">
    <h3>关于本实验</h3>
    <p class="intro">
      本页面在实验二组件化的基础上引入 Vue Router，实现多页面单页应用（SPA）。
      以下是本实验覆盖的路由知识点：
    </p>
    <ul class="list">
      <li v-for="p in points" :key="p.name">
        <b>{{ p.name }}</b>
        <span>{{ p.desc }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.about-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 28px 32px;
}
h3 { font-size: 20px; margin-bottom: 12px; }
.intro { color: var(--sub); line-height: 1.7; margin-bottom: 18px; }

.list { list-style: none; }
.list li {
  padding: 10px 0;
  border-bottom: 1px dashed var(--border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.list li:last-child { border-bottom: none; }
.list b { color: var(--accent); }
.list span { font-size: 14px; color: var(--sub); }
</style>
