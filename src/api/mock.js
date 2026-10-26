// mock 数据模块：字段形状与将来后端接口保持一致，
// 后端就绪后将本文件中的实现替换为 request 调用即可，页面代码无需改动
const classmates = [
  { id: 1, name: '林晓', nickname: '晓晓', avatar: '', message: '愿我们都能奔赴各自的热爱！' },
  { id: 2, name: '陈默', nickname: '阿默', avatar: '', message: '江湖再见，后会有期。' },
  { id: 3, name: '苏晴', nickname: '晴子', avatar: '', message: '记得常联系，别把我忘了呀。' },
  { id: 4, name: '周远', nickname: '远哥', avatar: '', message: '毕业快乐，前程似锦！' },
  { id: 5, name: '何雨桐', nickname: '桐桐', avatar: '', message: '下一次见面，要变得更好才行。' },
  { id: 6, name: '赵一鸣', nickname: '一鸣', avatar: '', message: '此去繁花似锦，归来仍是少年。' },
]

export function fetchClassmates() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...classmates]), 300)
  })
}
