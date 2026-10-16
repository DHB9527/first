<!--
  DetailSection.vue：个人详情
  defineProps(['detail'])
  defineModel('visible')  → v-model:visible 双向同步
-->
<script setup>
defineProps({
  detail: { type: Object, required: true }
})

// defineModel：v-model:visible
const visible = defineModel('visible', { type: Boolean, default: false })
</script>

<template>
  <div>
    <button class="toggle-btn" @click="visible = !visible">
      {{ visible ? '收起' : '展开' }}
    </button>
    <transition name="fade">
      <div v-show="visible" class="detail-content">
        <p><strong>学校：</strong>{{ detail.school }}</p>
        <p><strong>年级：</strong>{{ detail.grade }}</p>
        <p><strong>座右铭：</strong>{{ detail.motto }}</p>
        <p><strong>项目经验：</strong>{{ detail.projects }}</p>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.toggle-btn {
  background: var(--accent-soft); color: var(--accent);
  border: none; padding: 6px 16px; border-radius: 14px; cursor: pointer; font-size: 14px;
}
.detail-content {
  color: var(--sub); font-size: 16px; line-height: 1.8;
  padding: 18px 22px; background: var(--bg); border-radius: 12px; margin-top: 12px;
}
.detail-content p { margin-bottom: 6px; }
</style>
