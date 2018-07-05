import config from '@/config.json'

function loadView(view) {
  return () => import(/* webpackChunkName: "components-[request]" */ `@/components/${view}.vue`)
}


export const routes = [
  {
    name: 'Line Charts',
    title: 'Line Charts',
    path: '/line-chart',
    alias: '/line-chart/*',
    component: loadView('line-chart')
  },
  {
    name: 'Projects Timeline',
    title: 'Projects Timeline',
    path: '/projects-timeline',
    alias: '/projects-timeline/*',
    component: loadView('projects-timeline')
  },
  {
    name: 'Portfolio',
    title: 'Portfolio',
    path: '/portfolio',
    component: loadView('portfolio')
  },
  {
    name: 'MQTT Tree',
    title: 'MQTT tree',
    path: '/tidy-tree',
    alias: '/tidy-tree/*',
    component: loadView('tidy-tree')
  },
  {
    name: 'Tree',
    title: 'Tree',
    path: '/tree',
    alias: '/tree/*',
    component: loadView('tree')
  },
  {
    name: 'Hipster ambience',
    title: 'Hipster ambience',
    path: '/hipster-ambience',
    alias: '/hipster-ambience/*',
    component: loadView('hipster-ambience/index')
  },  
  {
    name: 'Cam viewer',
    title: 'Cam viewer',
    path: '/cam-viewer',
    alias: '/cam-viewer/*',
    component: loadView('utils/cam-viewer')
  },
].map(r => {
  var res = r;
  res.source = config.gitLink +
               config.ComponentsPath +
               r.path +
               (r.folder ? '' : '.vue')
  return res;
})
