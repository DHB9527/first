<!--
  AdminView.vue：后台管理页面
  meta.requiresAuth 保护，未登录会被 beforeEach 守卫拦截到登录页
  功能：修改个人简介、修改项目信息（名称/日期/stars）—— 真正的"管理"功能
-->
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSettingsStore, useTasksStore, useArticleStore } from '../stores/store'

const router = useRouter()

// 使用 Pinia Store
const settings = useSettingsStore()
const tasks = useTasksStore()
const articles = useArticleStore()

// storeToRefs 解构响应式状态
const { user } = storeToRefs(settings)
const { profile, projects } = storeToRefs(tasks)
const { articles: articleList } = storeToRefs(articles)

const quit = () => {
  settings.logout()
  router.push({ name: 'login' })
}

// ===== 个人简介编辑 =====
const profileDraft = reactive({ ...profile.value })
const saveProfile = () => {
  tasks.updateProfile(profileDraft)
  console.log('[后台] 个人简介已更新：', profile.value.intro)
}
const resetProfile = () => Object.assign(profileDraft, profile.value)

// ===== 项目信息编辑 =====
const editingId = ref(-1)
const draft = reactive({ name: '', date: '', stars: 0 })

const startEdit = (p) => {
  editingId.value = p.id
  draft.name = p.name
  draft.date = p.date
  draft.stars = p.stars
}
const saveProject = (p) => {
  tasks.updateProject(p.id, { name: draft.name, date: draft.date, stars: Number(draft.stars) })
  editingId.value = -1
  console.log('[后台] 项目已更新：', p.id, draft.name)
}
const cancelEdit = () => { editingId.value = -1 }

// ===== 文章管理 =====
const newArticle = reactive({ title: '', content: '', status: 'draft' })
const editingArticleId = ref(-1)
const articleDraft = reactive({ title: '', content: '', status: 'draft' })

const addArticle = () => {
  if (!newArticle.title.trim()) return
  articles.addArticle({
    title: newArticle.title,
    content: newArticle.content,
    date: new Date().toISOString().split('T')[0],
    status: newArticle.status
  })
  newArticle.title = ''
  newArticle.content = ''
  newArticle.status = 'draft'
}

const startEditArticle = (a) => {
  editingArticleId.value = a.id
  articleDraft.title = a.title
  articleDraft.content = a.content
  articleDraft.status = a.status
}

const saveArticle = (a) => {
  articles.updateArticle(a.id, {
    title: articleDraft.title,
    content: articleDraft.content,
    status: articleDraft.status
  })
  editingArticleId.value = -1
}

const removeArticle = (id) => {
  if (confirm('确定删除这篇文章吗？')) {
    articles.removeArticle(id)
  }
}
</script>

<template>
  <div class="admin-card">
    <div class="head">
      <h3>后台管理</h3>
      <span class="user">👤 {{ user }}</span>
      <button class="quit" @click="quit">退出登录</button>
    </div>

    <p class="tip">此页面通过 meta.requiresAuth + beforeEach 路由守卫保护，未登录无法访问。修改的内容会实时同步到首页和项目页。</p>

    <!-- 个人简介编辑 -->
    <h4>个人简介</h4>
    <form class="profile-form" @submit.prevent="saveProfile">
      <label>
        <span>姓名</span>
        <input v-model="profileDraft.name" />
      </label>
      <label>
        <span>学号</span>
        <input v-model="profileDraft.studentId" />
      </label>
      <label>
        <span>专业</span>
        <input v-model="profileDraft.major" />
      </label>
      <label>
        <span>班级</span>
        <input v-model="profileDraft.className" />
      </label>
      <label>
        <span>邮箱</span>
        <input v-model="profileDraft.email" />
      </label>
      <label class="full">
        <span>简介</span>
        <textarea v-model="profileDraft.intro" rows="3"></textarea>
      </label>
      <div class="form-actions">
        <button class="btn" type="submit">保存简介</button>
        <button class="btn ghost" type="button" @click="resetProfile">重置</button>
      </div>
    </form>

    <!-- 项目信息编辑（行内） -->
    <h4>项目管理（{{ projects.length }}）</h4>
    <table>
      <thead>
        <tr><th>ID</th><th>项目名</th><th>日期</th><th>Stars</th><th>操作</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in projects" :key="p.id">
          <td>{{ p.id }}</td>
          <td v-if="editingId !== p.id">{{ p.name }}</td>
          <td v-else><input class="inline" v-model="draft.name" /></td>

          <td v-if="editingId !== p.id">{{ p.date }}</td>
          <td v-else><input class="inline" v-model="draft.date" /></td>

          <td v-if="editingId !== p.id">{{ p.stars }}</td>
          <td v-else><input class="inline" type="number" v-model="draft.stars" /></td>

          <td>
            <template v-if="editingId !== p.id">
              <button class="edit-btn" @click="startEdit(p)">编辑</button>
              <RouterLink class="view-link" :to="{ name: 'project-detail', params: { id: p.id } }">查看</RouterLink>
            </template>
            <template v-else>
              <button class="edit-btn" @click="saveProject(p)">保存</button>
              <button class="edit-btn ghost" @click="cancelEdit">取消</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 文章管理 -->
    <h4>文章管理（{{ articleList.length }}）</h4>

    <!-- 新增文章 -->
    <div class="article-add">
      <input v-model="newArticle.title" placeholder="文章标题" />
      <textarea v-model="newArticle.content" placeholder="文章内容" rows="2"></textarea>
      <select v-model="newArticle.status">
        <option value="draft">草稿</option>
        <option value="published">发布</option>
      </select>
      <button class="btn" @click="addArticle">添加文章</button>
    </div>

    <!-- 文章列表 -->
    <table>
      <thead>
        <tr><th>ID</th><th>标题</th><th>状态</th><th>日期</th><th>操作</th></tr>
      </thead>
      <tbody>
        <tr v-for="a in articleList" :key="a.id">
          <td>{{ a.id }}</td>
          <td v-if="editingArticleId !== a.id">{{ a.title }}</td>
          <td v-else><input class="inline" v-model="articleDraft.title" /></td>

          <td v-if="editingArticleId !== a.id">{{ a.status === 'published' ? '已发布' : '草稿' }}</td>
          <td v-else>
            <select class="inline" v-model="articleDraft.status">
              <option value="draft">草稿</option>
              <option value="published">发布</option>
            </select>
          </td>

          <td>{{ a.date }}</td>

          <td>
            <template v-if="editingArticleId !== a.id">
              <button class="edit-btn" @click="startEditArticle(a)">编辑</button>
              <button class="edit-btn" @click="removeArticle(a.id)">删除</button>
            </template>
            <template v-else>
              <button class="edit-btn" @click="saveArticle(a)">保存</button>
              <button class="edit-btn ghost" @click="editingArticleId = -1">取消</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 28px 32px;
}
.head { display: flex; align-items: center; gap: 14px; }
h3 { font-size: 20px; }
.user { font-size: 14px; color: var(--sub); }
.quit {
  margin-left: auto;
  padding: 8px 18px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--sub);
  font-size: 13px;
  cursor: pointer;
}
.quit:hover { color: #e5484d; border-color: #e5484d; }

.tip { font-size: 13px; color: var(--sub); margin: 12px 0 20px; }

h4 { font-size: 16px; margin: 22px 0 12px; }

/* 个人简介表单 */
.profile-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.profile-form label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--sub); }
.profile-form label.full { grid-column: 1 / -1; }
.profile-form input,
.profile-form textarea {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
  outline: none;
}
.profile-form input:focus,
.profile-form textarea:focus { border-color: var(--accent); }
.form-actions { grid-column: 1 / -1; display: flex; gap: 10px; }

.btn {
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.btn:hover { opacity: .9; }
.btn.ghost {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}

/* 项目表格 */
table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 8px; }
th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); }
th { color: var(--sub); font-weight: 600; }

.inline {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--accent);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 13px;
  outline: none;
}

.edit-btn, .view-link {
  margin-right: 8px;
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--accent);
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
}
.edit-btn:hover, .view-link:hover { border-color: var(--accent); }
.edit-btn.ghost { color: var(--sub); }

/* 文章新增 */
.article-add {
  display: grid;
  grid-template-columns: 1fr 2fr auto auto;
  gap: 10px;
  margin-bottom: 16px;
  padding: 16px;
  background: var(--bg);
  border-radius: 8px;
}
.article-add input,
.article-add textarea,
.article-add select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
}
.article-add textarea {
  resize: vertical;
}
</style>
