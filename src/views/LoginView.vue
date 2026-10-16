<!--
  LoginView.vue：身份认证页
  模拟登录：输入用户名密码（演示用 admin / 123456），成功后回跳来源页
-->
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../stores/store'

const route = useRoute()
const router = useRouter()

const settings = useSettingsStore()
const { user } = storeToRefs(settings)

const username = ref('')
const password = ref('')
const error = ref('')

const submit = () => {
  if (username.value === 'admin' && password.value === '123456') {
    settings.login(username.value)
    console.log('[登录成功]', user.value)
    // 登录成功后回跳来源页（守卫记录的 redirect），没有则回首页
    const redirect = route.query.redirect
    router.replace(redirect ? String(redirect) : { name: 'home' })
  } else {
    error.value = '用户名或密码错误（提示：admin / 123456）'
  }
}
</script>

<template>
  <div class="login-card">
    <!-- 已登录状态 -->
    <template v-if="user">
      <h3>已登录</h3>
      <p class="welcome">当前用户：<b>{{ user }}</b></p>
      <button class="btn" @click="router.push({ name: 'admin' })">进入后台管理</button>
    </template>

    <!-- 登录表单 -->
    <template v-else>
      <h3>用户登录</h3>
      <p class="tip">后台管理页面需要登录后访问（admin / 123456）</p>

      <form @submit.prevent="submit">
        <input v-model="username" placeholder="用户名" />
        <input v-model="password" type="password" placeholder="密码" />
        <p v-if="error" class="error">{{ error }}</p>
        <button class="btn" type="submit">登 录</button>
      </form>
    </template>
  </div>
</template>

<style scoped>
.login-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 32px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
h3 { font-size: 20px; margin-bottom: 10px; }
.tip { font-size: 13px; color: var(--sub); margin-bottom: 20px; }
.welcome { color: var(--sub); margin-bottom: 20px; }
.welcome b { color: var(--accent); }

form { display: flex; flex-direction: column; gap: 12px; }
input {
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  outline: none;
}
input:focus { border-color: var(--accent); }

.error { color: #e5484d; font-size: 13px; }

.btn {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: opacity .2s;
}
.btn:hover { opacity: .9; }
</style>
