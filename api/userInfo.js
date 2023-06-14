import request from '@/utils/request'

//引入js-cookie
import cookie from 'js-cookie'

export default {

  saveUserAuth(userAuth) {
    return request({
      url: `/front/user/userInfo/auth/userAuth`,
      method: 'post',
      data: userAuth,
      headers:{token: cookie.get('token')}
    })
  },

  getUserInfo() {
    return request({
      url: `/front/user/userInfo/auth/getUserInfo`,
      method: `get`,
      headers:{token: cookie.get('token')}
    })
  }
}