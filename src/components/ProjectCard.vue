<!--
  ProjectCard.vue：项目卡片（可复用组件）
  defineProps(['project'])
  综合应用插槽：title / description / tags / footer 四个具名插槽
  每个插槽都有默认内容，父组件可选择性覆盖
-->
<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>

<template>
  <div class="project-card">
    <div class="project-header">
      <slot name="title">
        <h4>{{ project.name }}</h4>
      </slot>
      <span class="project-date">{{ project.date }}</span>
    </div>

    <slot name="description">
      <p class="project-desc">{{ project.desc }}</p>
    </slot>

    <slot name="tags">
      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag tech">{{ tag }}</span>
      </div>
    </slot>

    <div class="project-footer">
      <slot name="footer">
        <a class="project-link" :href="project.link" target="_blank">查看详情 →</a>
        <div class="project-stats">
          <span>⭐ {{ project.stars || 0 }}</span>
          <span>🍴 {{ project.forks || 0 }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: var(--bg); border: 1px solid var(--border); border-radius: 14px;
  padding: 20px; transition: all 0.2s; display: flex; flex-direction: column;
}
.project-card:hover { border-color: var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.project-header h4 { font-size: 18px; color: var(--text); }
.project-date { font-size: 12px; color: var(--sub); background: var(--tag-bg); padding: 4px 10px; border-radius: 10px; }
.project-desc { color: var(--sub); font-size: 14px; line-height: 1.7; margin-bottom: 14px; flex: 1; }
.project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.project-tags .tag { padding: 4px 12px; font-size: 13px; }
.tag { background: var(--tag-bg); color: var(--text); border-radius: 22px; }
.tag.tech { background: var(--accent-soft); color: var(--accent); }
.project-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border); }
.project-link { color: var(--accent); text-decoration: none; font-size: 14px; }
.project-link:hover { text-decoration: underline; }
.project-stats { display: flex; gap: 12px; font-size: 13px; color: var(--sub); }
</style>
