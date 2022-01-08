import request from '@/utils/request'

export default {
  // 登录
  async login(data) {
    return await request('/api/teacher/teacher_index/login', data, 'POST')
  },

}
