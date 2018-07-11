import config from '@/config.json'

function loadView(view) {
  return () => import(/* webpackChunkName: "components-[request]" */ `@/components/${view}.vue`)
}


export const routes = [
  {
    name: 'Plants Print',
    title: 'Plants Print',
    path: '/plants-print',
    alias: '/plants-print/*',
    component: loadView('plants-print/index')
  },
  {
    name: 'Projects Timeline',
    title: 'Projects Timeline',
    path: '/projects-timeline',
    alias: '/projects-timeline/*',
    component: loadView('projects-timeline/index')
  },
  {
    name: 'Portfolio',
    title: 'Portfolio',
    path: '/portfolio',
    component: loadView('portfolio')
  },
  {
    name: 'Network Topology',
    title: 'Realtime Network Mapping',
    path: '/tidy-tree',
    alias: '/tidy-tree/*',
    component: loadView('tidy-tree')
  },
  {
    name: 'Dichotomy',
    title: 'Regular dichotomy',
    path: '/dichotomy',
    alias: '/dichotomy/*',
    component: loadView('dichotomy')
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
