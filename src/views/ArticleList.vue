<!-- ArticleList.vue：公开文章列表页（无需登录） -->
<script setup>
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/store'
import BaseCard from '../components/BaseCard.vue'

const articleStore = useArticleStore()
const { published } = storeToRefs(articleStore)
</script>

<template>
  <BaseCard>
    <template #header><h3>文章列表</h3></template>
    <div class="article-list">
      <div v-for="article in published" :key="article.id" class="article-item">
        <h4>{{ article.title }}</h4>
        <p class="article-meta">{{ article.date }}</p>
        <p class="article-content">{{ article.content }}</p>
      </div>
      <p v-if="published.length === 0" class="empty">暂无已发布文章</p>
    </div>
  </BaseCard>
</template>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.article-item {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card);
  transition: transform 0.2s, box-shadow 0.2s;
}
.article-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.article-item h4 {
  margin: 0 0 8px 0;
  color: var(--accent);
  font-size: 18px;
}
.article-meta {
  margin: 0 0 12px 0;
  color: var(--text-secondary);
  font-size: 14px;
}
.article-content {
  margin: 0;
  color: var(--text);
  line-height: 1.6;
}
.empty {
  text-align: center;
  color: var(--text-secondary);
  padding: 40px 0;
}
</style>
