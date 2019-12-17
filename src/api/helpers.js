// const Loading = require('../components/Loading.vue')
import axiosReq from 'axios'
const urlMap = {
  development: '/',
  production: ''
  // production: 'http://ustbhuangyi.com/sell/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0
export default {
  get(parm, flag) {
    // if (!flag) this.show()
    return axiosReq.get(baseUrl + parm.url, {
      params: parm.data
    }).then((res) => {
      // if (!flag) this.hide()
      console.dir(res)
      if (res.data.code === ERR_OK) {
        return Promise.resolve(res.data)
      }
    }).catch((e) => {
      // if (!flag) this.hide()
    })
  }
  // show(text) {
  //   this.LoadingCom = this.LoadingCom || Loading.$create({
  //     $props: {
  //       text: text
  //     }
  //   })
  //   this.LoadingCom.show()
  // },
  // hide(text) {
  //   this.LoadingCom = this.LoadingCom || Loading.$create({
  //     $props: {
  //       text: text
  //     }
  //   })
  //   this.LoadingCom.hide()
  // }
}
