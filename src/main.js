import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/style/index.sass'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

const VConsole = require('vconsole')
const vConsole = new VConsole()
vConsole.setOption('maxLogNumber', 5000)
Vue.config.productionTip = false
fastclick.attach(document.body)

const errorimage = require('./assets/logo.png')
const loadimage = require('./assets/logo.png')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
