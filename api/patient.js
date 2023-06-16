import request from '~/utils/request'

export default {

  save(patient) {
    return request({
      url: `/front/user/patient/auth/save`,
      method: 'post',
      data: patient
    })
  },

  updateById(patient) {
    return request({
      url: `/front/user/patient/auth/update`,
      method: 'put',
      data: patient
    })
  },

  getById(id) {
    return request({
      url: `/front/user/patient/auth/get/${id}`,
      method: 'get'
    })
  },

  findList() {
    return request({
      url: `/front/user/patient/auth/findAll`,
      method: `get`
    })
  },

  removeById(id) {
    return request({
      url: `/front/user/patient/auth/remove/${id}`,
      method: 'delete'
    })
  }
}