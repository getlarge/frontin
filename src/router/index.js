import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/containers/index'
import {routes as menuRoutes} from '@/router/menu'

Vue.use(Router)

export default new Router({
    routes: [
	    {
	      path: '/',
	      name: 'Home',
	      component: Index
	    }, ... menuRoutes
	]
})

