import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'babel-polyfill'
import fastclick from 'fastclick'
fastclick.attach(document.body)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
Vue.use(VueAwesomeSwiper)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: '/static/img/logo.png',
  loading: '/static/img/logo.png'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
