// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/services/store.js'
import router from './router'
//import i18n from './i18n'

import VueResource from 'vue-resource'
import VueMq from 'vue-mq'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'

// Vue.config.silent = false
// Vue.config.devtools = true

Vue.use(VueResource);
Vue.use(VueMq, {
	breakpoints: {
	    mobile: 600,
	    tablet: 900,
	    laptop: 1250,
	    desktop: Infinity,
	  }
});
Vue.use(BootstrapVue);

Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})

// Vue.filter('toLocale', function (to) {
//   return '/' + i18n.locale + to
// })

Vue.config.productionTip = false

fontawesome.library.add(brands, solid)

export const EventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  //i18n,
  render: h => h(App)
})
