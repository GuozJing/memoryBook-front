<script setup>
import { onMounted, ref } from 'vue'

import { fetchClassmates } from '@/api/mock'

const list = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    list.value = await fetchClassmates()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="classmates">
    <a-spin :spinning="loading">
      <a-row :gutter="[16, 16]">
        <a-col v-for="item in list" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6">
          <a-card hoverable class="mate-card">
            <div class="mate">
              <a-avatar :size="56" class="mate-avatar">{{ item.name.charAt(0) }}</a-avatar>
              <div class="mate-name">
                {{ item.name }}
                <span v-if="item.nickname" class="mate-nickname">（{{ item.nickname }}）</span>
              </div>
              <p class="mate-message">“{{ item.message }}”</p>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<style scoped>
.mate-card {
  text-align: center;
}

.mate-avatar {
  background: #1677ff;
  font-size: 22px;
  margin-bottom: 12px;
}

.mate-name {
  font-size: 16px;
  font-weight: 600;
}

.mate-nickname {
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}

.mate-message {
  margin: 12px 0 0;
  color: rgba(0, 0, 0, 0.65);
  min-height: 44px;
}
</style>
