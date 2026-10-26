<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const menus = [
  { key: 'home', label: '首页' },
  { key: 'classmates', label: '同学录' },
  { key: 'profile', label: '我的页面' },
]

const selectedKeys = ref([route.name])

watch(
  () => route.name,
  (name) => {
    selectedKeys.value = [name]
  },
)

function onMenuClick({ key }) {
  router.push({ name: key })
}
</script>

<template>
  <a-layout class="basic-layout">
    <a-layout-header class="header">
      <div class="logo" @click="router.push({ name: 'home' })">毕业同学录</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :items="menus"
        class="menu"
        @click="onMenuClick"
      />
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">毕业同学录 · 记录我们一起走过的时光 © 2026</a-layout-footer>
  </a-layout>
</template>

<style scoped>
.basic-layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
}

.logo {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-right: 32px;
  cursor: pointer;
  white-space: nowrap;
}

.menu {
  flex: 1;
  min-width: 0;
}

.content {
  padding: 24px;
}

.footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
}
</style>
