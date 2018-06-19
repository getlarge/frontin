// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

Vue.use(VueResource)
Vue.use(BootstrapVue);

Vue.config.productionTip = false

fontawesome.library.add(brands, faSpinner)

export const EventBus = new Vue();

/* eslint-disable no-new */
var vm = new Vue({
	  el: '#app',
	  router,
	  render: h => h(App)
	  // components: { App },
	  // template: '<App/>'
	})
