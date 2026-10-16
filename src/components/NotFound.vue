<!--
  NotFound.vue：404 页面组件
  职责：展示页面不存在的提示，提供返回按钮
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 倒计时秒数
const seconds = ref(10)
let timer = null

// 返回上一页（编程式导航）
const goBack = () => router.back()

// 回到主页（命名路由跳转）
const goHome = () => router.push({ name: 'home' })

onMounted(() => {
  timer = setInterval(() => {
    seconds.value--
    if (seconds.value <= 0) {
      goBack()
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="notfound">
    <div class="code">404</div>
    <p class="msg">页面不存在</p>
    <p class="tip">请检查地址是否正确</p>

    <div class="actions">
      <button class="btn" @click="goBack">返回上一页</button>
      <button class="btn ghost" @click="goHome">回到主页</button>
    </div>

    <p class="countdown"><b>{{ seconds }}</b> 秒后自动返回</p>
  </div>
</template>

<style scoped>
.notfound {
  text-align: center;
  padding: 60px 20px;
}
.code {
  font-size: 140px;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
}
.msg { font-size: 20px; color: var(--text); margin: 20px 0 8px; }
.tip { font-size: 14px; color: var(--sub); margin-bottom: 32px; }

.actions { display: flex; gap: 12px; justify-content: center; }
.btn {
  padding: 12px 36px;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover { opacity: 0.9; }
.btn.ghost {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}

.countdown { margin-top: 26px; font-size: 13px; color: var(--sub); }
.countdown b { color: var(--accent); }
</style>
