<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1 class="title">毕业快乐</h1>
      <p class="subtitle">
        把这一页，留给我们一起走过的时光。<br />
        写下你的信息，留下你的祝福，让这本同学录替我们记住彼此。
      </p>
      <a-space size="middle">
        <a-button type="primary" size="large" @click="router.push({ name: 'classmates' })">
          翻开同学录
        </a-button>
        <a-button size="large" @click="router.push({ name: 'profile' })">填写我的页面</a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.hero {
  text-align: center;
  max-width: 640px;
}

.title {
  font-size: 44px;
  margin-bottom: 16px;
}

.subtitle {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 32px;
}
</style>
