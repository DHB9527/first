<!--
  ProjectList.vue：项目列表（嵌套子路由之一，路径 ''）
  复用 ProjectCard，通过插槽定制；每个项目提供 RouterLink 跳详情
-->
<script setup>
import ProjectCard from '../components/ProjectCard.vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/store'

const tasks = useTasksStore()
const { projects } = storeToRefs(tasks)
</script>

<template>
  <div class="projects">
    <!-- 第一个项目：自定义 title 插槽（加⭐）和 footer 插槽（加"推荐"标签 + 详情链接） -->
    <ProjectCard v-if="projects[0]" :project="projects[0]">
      <template #title>
        <h4>⭐ {{ projects[0].name }}</h4>
      </template>
      <template #footer>
        <RouterLink class="detail-link" :to="{ name: 'project-detail', params: { id: projects[0].id } }">
          查看详情 →
        </RouterLink>
        <span class="recommend">推荐项目</span>
      </template>
    </ProjectCard>

    <!-- 其余项目：footer 插槽放详情链接 -->
    <ProjectCard v-for="project in projects.slice(1)" :key="project.id" :project="project">
      <template #footer>
        <RouterLink class="detail-link" :to="{ name: 'project-detail', params: { id: project.id } }">
          查看详情 →
        </RouterLink>
      </template>
    </ProjectCard>
  </div>
</template>

<style scoped>
.projects { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.detail-link { color: var(--accent); text-decoration: none; font-size: 14px; }
.detail-link:hover { text-decoration: underline; }
.recommend { color: var(--accent); font-weight: 600; font-size: 13px; }
@media (max-width: 520px) { .projects { grid-template-columns: 1fr; } }
</style>
