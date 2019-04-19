import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import Router from './router'
import './main.less'

Vue.use(ElementUI)

const router = Router.router(Vue)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
