<!--
  ProjectDetail.vue：项目详情页（嵌套子路由之二，动态路由 /projects/:id）
  useRouter() 编程式跳转：返回上一页、返回列表、无效 id 跳 404
-->
<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/store'

const route = useRoute()
const router = useRouter()

const tasks = useTasksStore()
const { projects } = storeToRefs(tasks)

// 从动态路由参数 :id 找对应项目
const project = computed(() => projects.value.find(p => p.id === Number(route.params.id)))

// 无效详情地址处理：id 不存在时重定向到 404
watchEffect(() => {
  if (!project.value) {
    router.replace({ name: 'not-found' })
  }
})

// ===== 编程式导航 =====
const goBack = () => router.back()                              // 返回上一页
const goList = () => router.push({ name: 'projects' })          // 返回列表
</script>

<template>
  <div v-if="project" class="detail">
    <div class="detail-head">
      <h4>{{ project.name }}</h4>
      <span class="date">{{ project.date }}</span>
    </div>

    <p class="desc">{{ project.desc }}</p>

    <div class="tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div class="stats">
      <span>⭐ {{ project.stars }} stars</span>
      <span>🍴 {{ project.forks }} forks</span>
    </div>

    <div class="actions">
      <button class="btn" @click="goBack">返回上一页</button>
      <button class="btn ghost" @click="goList">返回列表</button>
    </div>
  </div>
</template>

<style scoped>
.detail-head { display: flex; align-items: baseline; gap: 12px; }
.detail-head h4 { font-size: 20px; }
.date { font-size: 13px; color: var(--sub); }
.desc { margin: 14px 0; line-height: 1.7; color: var(--text); }

.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.tag {
  background: var(--tag-bg);
  color: var(--sub);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
}

.stats { display: flex; gap: 18px; font-size: 14px; color: var(--sub); margin-bottom: 24px; }

.actions { display: flex; gap: 12px; }
.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: opacity .2s;
}
.btn:hover { opacity: .9; }
.btn.ghost {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}
</style>
