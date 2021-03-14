import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    name: 'Experience',
    title: 'Experiences',
    path: '/experience',
    folder: true,
    alias: '/experience/*',
    component: () => import(/* webpackChunkName: "experience" */ '@/components/Experience/index.vue'),
  },
  {
    name: 'Gallery',
    title: 'Gallery',
    path: '/gallery',
    folder: true,
    alias: '/gallery/*',
    component: () => import(/* webpackChunkName: "gallery" */ '@/components/Gallery/index.vue'),
  },
  {
    name: 'Ambience',
    title: 'Ambience',
    path: '/ambience',
    folder: true,
    alias: '/ambience/*',
    component: () => import(/* webpackChunkName: "ambience" */ '@/components/Ambience/index.vue'),
  },
  {
    name: 'Aloes',
    title: 'Aloes',
    folder: true,
    path: '/aloes',
    component: () => import(/* webpackChunkName: "aloes" */ '@/components/Aloes/index.vue'),
  },
  // {
  //   name: 'NetworkTree',
  //   title: 'Realtime Network Mapping',
  //   path: '/network-tree',
  //   folder: true,
  //   alias: '/network-tree/*',
  //   component: () => import(/* webpackChunkName: "network" */ '@/components/NetworkTree/index.vue'),
  // },
].map((r) => {
  r.source = `${process.env.VUE_APP_GIT_LINK}${process.env.VUE_APP_GIT_COMPONENTS_PATH}/${r.name}${
    r.folder ? '/index.vue' : '.vue'
  }`;
  return r;
});

export default new Router({
  routes,
});
