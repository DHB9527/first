<!--
  BottomBar.vue：底部栏
  defineProps(['author','email'])
-->
<script setup>
defineProps({
  author: { type: String, default: '' },
  email: { type: String, default: '' }
})
</script>

<template>
  <div class="bottombar">
    <p>© 2026 {{ author }} · 个人主页</p>
    <p>联系邮箱：<a :href="'mailto:' + email">{{ email }}</a></p>
    <p class="powered">Powered by Vue 3 组合式 API · 组件化 + 插槽</p>
  </div>
</template>

<style scoped>
.bottombar {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 20px 28px;
  text-align: center;
  color: var(--sub);
  font-size: 14px;
}
.bottombar a { color: var(--accent); text-decoration: none; }
.powered { margin-top: 6px; }
</style>
