<!--
  BaseCard.vue：可复用卡片容器
  综合应用插槽：header / default / footer
  使用场景：个人信息、技能、详情都用它包裹，统一卡片样式
-->
<script setup>
// 纯结构容器，无 props/emits，仅提供插槽
</script>

<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 32px;
  margin-bottom: 24px;
  transition: all 0.3s;
}
.card-header { margin-bottom: 20px; }
.card-header h3 {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.card-header h3::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 20px;
  background: var(--accent);
  border-radius: 3px;
}
.card-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
</style>
