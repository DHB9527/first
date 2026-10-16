<!--
  ProfileCard.vue：个人信息卡
  defineProps(['profile','detailVisible'])
  defineEmits(['toggle-detail','update:editing','update:editForm'])
  defineModel('editing')   → props.editing + emit('update:editing')
  defineModel('editForm')  → props.editForm + emit('update:editForm')
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: { type: Object, required: true },
  detailVisible: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-detail', 'update:editing', 'update:editForm'])

// defineModel 等价：v-model:editing
const editing = defineModel('editing', { type: Boolean, default: false })
// defineModel 等价：v-model:editForm
const editForm = defineModel('editForm', { type: Object, default: () => ({}) })

// 切换编辑状态
const toggleEdit = () => {
  if (!editing.value) {
    // 进入编辑前把 profile 复制到 editForm（单向数据流）
    emit('update:editForm', { ...props.profile })
  }
  editing.value = !editing.value
}

// 更新编辑表单某个字段
const updateField = (field, value) => {
  emit('update:editForm', { ...editForm.value, [field]: value })
}
</script>

<template>
  <div>
    <div class="profile">
      <img class="avatar" :src="profile.avatar" :alt="profile.name">
      <div class="profile-info">
        <h2>{{ profile.name }}</h2>
        <p>学号：{{ profile.studentId }}</p>
        <p>{{ profile.major }} · {{ profile.className }}</p>
        <p>{{ profile.email }}</p>
        <p class="intro">{{ profile.intro }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="btn outline" @click="toggleEdit">{{ editing ? '取消编辑' : '编辑信息' }}</button>
      <button class="btn outline" @click="$emit('toggle-detail')">{{ detailVisible ? '收起详情' : '展开详情' }}</button>
    </div>

    <div v-if="editing" class="edit-form">
      <div class="form-row">
        <label>姓名</label>
        <input class="form-input" :value="editForm.name" @input="updateField('name', $event.target.value)">
      </div>
      <div class="form-row">
        <label>学号</label>
        <input class="form-input" :value="editForm.studentId" @input="updateField('studentId', $event.target.value)">
      </div>
      <div class="form-row">
        <label>专业</label>
        <input class="form-input" :value="editForm.major" @input="updateField('major', $event.target.value)">
      </div>
      <div class="form-row">
        <label>班级</label>
        <input class="form-input" :value="editForm.className" @input="updateField('className', $event.target.value)">
      </div>
      <div class="form-row">
        <label>邮箱</label>
        <input class="form-input" :value="editForm.email" @input="updateField('email', $event.target.value)">
      </div>
      <div class="form-row">
        <label>个人简介</label>
        <textarea class="form-input" :value="editForm.intro" @input="updateField('intro', $event.target.value)"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn outline small" @click="editing = false">取消</button>
        <button class="btn small" @click="editing = false">保存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile { display: flex; gap: 28px; align-items: center; flex-wrap: wrap; }
.avatar {
  width: 128px; height: 128px; border-radius: 50%;
  border: 4px solid var(--accent); object-fit: cover; flex-shrink: 0;
}
.profile-info { flex: 1; min-width: 240px; }
.profile-info h2 { font-size: 26px; margin-bottom: 8px; }
.profile-info p { color: var(--sub); font-size: 16px; margin-bottom: 6px; }
.intro { color: var(--sub); font-size: 16px; line-height: 1.7; margin-top: 10px; }
.actions { margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; }
.btn {
  background: var(--accent); color: #fff; border: none;
  padding: 10px 20px; border-radius: 10px; cursor: pointer; font-size: 15px;
  transition: all 0.2s;
}
.btn:hover { opacity: 0.9; }
.btn.outline { background: transparent; color: var(--accent); border: 1px solid var(--accent); }
.btn.small { padding: 6px 14px; font-size: 14px; }
.edit-form { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); }
.form-row { margin-bottom: 16px; }
.form-row label { display: block; font-size: 15px; color: var(--sub); margin-bottom: 8px; }
.form-input {
  width: 100%; padding: 12px 16px; background: var(--bg); color: var(--text);
  border: 1px solid var(--border); border-radius: 10px; font-size: 14px; outline: none;
}
.form-input:focus { border-color: var(--accent); }
textarea.form-input { resize: vertical; min-height: 80px; font-size: 15px; }
.form-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
</style>
