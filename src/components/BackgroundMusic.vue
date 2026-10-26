<script setup>
import { ref } from 'vue'

// 背景音乐设置（占位）：预置曲目 + 自定义链接，后端就绪后可改为音乐库/上传
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:url'])

const presets = [
  { label: '不设置背景音乐', value: '' },
  { label: '示例音乐 · 钢琴曲（占位）', value: 'https://example.com/audio/piano.mp3' },
  { label: '示例音乐 · 吉他曲（占位）', value: 'https://example.com/audio/guitar.mp3' },
]

const customUrl = ref('')

function onSelect(value) {
  customUrl.value = ''
  emit('update:url', value)
}

function applyCustom() {
  const url = customUrl.value.trim()
  if (url) {
    emit('update:url', url)
  }
}
</script>

<template>
  <div class="bg-music">
    <a-select
      :value="url"
      :options="presets"
      placeholder="选择背景音乐"
      style="width: 100%"
      allow-clear
      @change="onSelect"
    />
    <div class="custom-row">
      <a-input v-model:value="customUrl" placeholder="或粘贴音乐链接" allow-clear />
      <a-button type="primary" @click="applyCustom">使用</a-button>
    </div>
    <audio v-if="url" :src="url" controls class="player" />
  </div>
</template>

<style scoped>
.custom-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.player {
  width: 100%;
  margin-top: 8px;
}
</style>
