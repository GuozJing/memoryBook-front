import { defineStore } from 'pinia'

// 个人页面信息：表单填写后保存在此，后端就绪后改为调接口持久化
export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      name: '',
      nickname: '',
      birthday: null,
      contact: '',
      message: '',
      backgroundUrl: '',
      musicUrl: '',
    },
  }),
  actions: {
    setProfile(patch) {
      Object.assign(this.profile, patch)
    },
  },
})
