<!--
  SkillsList.vue：技能列表
  defineProps(['skills'])
  defineModel('keyword')  → v-model:keyword 双向同步
  computed: filteredSkills（子组件内部计算）
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  skills: { type: Array, required: true }
})

// defineModel：v-model:keyword
const keyword = defineModel('keyword', { type: String, default: '' })

// 组合式 API 的 computed
const filteredSkills = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return props.skills
  return props.skills.filter(s => s.toLowerCase().includes(kw))
})
</script>

<template>
  <div>
    <div class="search-box">
      <input
        class="search-input"
        v-model="keyword"
        placeholder="搜索技能或兴趣..."
      >
      <button class="clear-btn" @click="keyword = ''">清空</button>
    </div>
    <div class="skills">
      <span v-for="(skill, index) in filteredSkills" :key="skill" class="tag">{{ skill }}</span>
      <p v-if="filteredSkills.length === 0" class="empty">未找到匹配的技能</p>
    </div>
  </div>
</template>

<style scoped>
.search-box { display: flex; gap: 10px; margin-bottom: 18px; }
.search-input {
  flex: 1; padding: 12px 16px; background: var(--bg); color: var(--text);
  border: 1px solid var(--border); border-radius: 10px; font-size: 15px; outline: none;
}
.search-input:focus { border-color: var(--accent); }
.clear-btn {
  background: var(--tag-bg); color: var(--sub);
  border: none; padding: 12px 18px; border-radius: 10px; cursor: pointer; font-size: 15px;
}
.skills { display: flex; flex-wrap: wrap; gap: 10px; }
.tag {
  background: var(--tag-bg); color: var(--text);
  padding: 8px 18px; border-radius: 22px; font-size: 15px; transition: all 0.2s;
}
.tag:hover { background: var(--accent-soft); color: var(--accent); }
.empty { color: var(--sub); font-size: 16px; padding: 16px 0; text-align: center; }
</style>
