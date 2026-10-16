<!--
  ProjectsLayout.vue：项目页布局（嵌套路由父组件）
  只负责外壳与标题，子内容由 <RouterView> 渲染（列表 / 详情）
-->
<script setup>
import BaseCard from '../components/BaseCard.vue'
</script>

<template>
  <BaseCard>
    <template #header>
      <h3>
        项目展示
        <RouterLink
          v-if="$route.name === 'project-detail'"
          class="back-list"
          :to="{ name: 'projects' }"
        >← 返回列表</RouterLink>
      </h3>
    </template>

    <!-- 嵌套子路由出口：ProjectList 或 ProjectDetail -->
    <RouterView />
  </BaseCard>
</template>

<style scoped>
.back-list {
  float: right;
  font-size: 14px;
  font-weight: normal;
  color: var(--accent);
  text-decoration: none;
}
.back-list:hover { text-decoration: underline; }
</style>
