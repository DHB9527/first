<!--
  HomeView.vue：首页视图
  从 App.vue 抽出的个人信息区块，作为路由 '/' 的渲染组件
-->
<script setup>
import { ref, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/store'
import BaseCard from '../components/BaseCard.vue'
import ProfileCard from '../components/ProfileCard.vue'
import SkillsList from '../components/SkillsList.vue'
import DetailSection from '../components/DetailSection.vue'

const tasks = useTasksStore()
const { profile } = storeToRefs(tasks)

const skills = ref(['HTML5', 'CSS3', 'JavaScript', 'Vue 3', 'TypeScript', 'Node.js', 'Python', 'Photoshop', 'UI设计', 'Figma'])
const keyword = ref('')
const detailVisible = ref(false)
const editing = ref(false)
const editForm = ref({ name: '', major: '', className: '', email: '', avatar: '', intro: '' })

const detail = reactive({
  school: '重庆工程学院',
  grade: '大三',
  motto: '保持热爱，奔赴山海。',
  projects: '参与校园活动平台、在线笔记应用等多个 Web 项目开发。'
})

const toggleDetail = () => { detailVisible.value = !detailVisible.value }

// 编辑关闭时把 editForm 同步回 profile（单向数据流）
watch(editing, (newVal) => {
  if (!newVal && editForm.value.name) {
    tasks.updateProfile(editForm.value)
    console.log('[watch editing] profile 已同步：', profile.value.name)
  }
})
</script>

<template>
  <BaseCard>
    <template #header><h3>个人信息</h3></template>
    <ProfileCard
      :profile="profile"
      :detail-visible="detailVisible"
      @toggle-detail="toggleDetail"
      v-model:editing="editing"
      v-model:edit-form="editForm"
    />
  </BaseCard>

  <BaseCard>
    <template #header><h3>技能与兴趣</h3></template>
    <SkillsList :skills="skills" v-model:keyword="keyword" />
  </BaseCard>

  <BaseCard>
    <template #header><h3>个人详情</h3></template>
    <DetailSection :detail="detail" v-model:visible="detailVisible" />
  </BaseCard>
</template>
