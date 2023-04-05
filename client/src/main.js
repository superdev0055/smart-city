import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueAlert from '@vuejs-pt/vue-alert'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueSweetalert2)
Vue.use(VueAlert)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
