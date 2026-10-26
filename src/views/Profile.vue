<script setup>
import { message } from 'ant-design-vue'
import { reactive, ref } from 'vue'

import BackgroundMusic from '@/components/BackgroundMusic.vue'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const formRef = ref()

const formState = reactive({
  name: '',
  nickname: '',
  birthday: null,
  contact: '',
  message: '',
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  message: [{ required: true, message: '写点什么留给同学们吧', trigger: 'blur' }],
}

// 背景图：仅本地预览（FileReader 转 base64），不真正上传
const backgroundUrl = ref('')
const musicUrl = ref('')

function beforeUpload(file) {
  if (!file.type.startsWith('image/')) {
    message.error('只能选择图片文件')
    return false
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
  return false // 阻止 antd 自动上传
}

function removeBackground() {
  backgroundUrl.value = ''
}

function handleSave() {
  formRef.value
    .validate()
    .then(() => {
      store.setProfile({
        ...formState,
        backgroundUrl: backgroundUrl.value,
        musicUrl: musicUrl.value,
      })
      message.success('已保存（当前仅存于本地，后端就绪后接入持久化）')
    })
    .catch(() => {})
}
</script>

<template>
  <div class="profile">
    <a-row :gutter="24">
      <!-- 左侧：编辑表单 -->
      <a-col :xs="24" :lg="14">
        <a-card title="填写我的页面" class="form-card">
          <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="姓名" name="name">
                  <a-input v-model:value="formState.name" placeholder="你的姓名" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="昵称" name="nickname">
                  <a-input v-model:value="formState.nickname" placeholder="同学们怎么称呼你" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="生日" name="birthday">
                  <a-date-picker v-model:value="formState.birthday" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="联系方式" name="contact">
                  <a-input v-model:value="formState.contact" placeholder="QQ / 微信 / 邮箱" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="毕业寄语" name="message">
              <a-textarea
                v-model:value="formState.message"
                :rows="4"
                placeholder="写下想对同学们说的话……"
              />
            </a-form-item>
            <a-form-item label="页面背景图">
              <a-upload
                :before-upload="beforeUpload"
                :show-upload-list="false"
                accept="image/*"
              >
                <a-button>选择图片</a-button>
              </a-upload>
              <a-button v-if="backgroundUrl" danger type="link" @click="removeBackground">
                移除背景
              </a-button>
              <div class="tip">仅本地预览，不会上传到服务器</div>
            </a-form-item>
            <a-form-item label="背景音乐">
              <BackgroundMusic v-model:url="musicUrl" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleSave">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>

      <!-- 右侧：实时预览 -->
      <a-col :xs="24" :lg="10">
        <a-card title="页面预览" class="preview-card">
          <div class="preview" :style="{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none' }">
            <div class="preview-mask">
              <div class="preview-name">
                {{ formState.name || '你的名字' }}
                <span v-if="formState.nickname" class="preview-nickname">（{{ formState.nickname }}）</span>
              </div>
              <p class="preview-message">
                {{ formState.message || '你的毕业寄语会显示在这里……' }}
              </p>
              <audio v-if="musicUrl" :src="musicUrl" controls class="preview-audio" />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.form-card {
  max-width: 720px;
}

.tip {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  margin-top: 4px;
}

.preview {
  height: 420px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-color: #f0f2f5;
  overflow: hidden;
}

.preview-mask {
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.55);
}

.preview-name {
  font-size: 26px;
  font-weight: 600;
}

.preview-nickname {
  font-size: 15px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.55);
}

.preview-message {
  margin-top: 16px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.8;
  white-space: pre-wrap;
}

.preview-audio {
  width: 90%;
  margin-top: 24px;
}
</style>
