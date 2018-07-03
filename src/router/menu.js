import config from '@/config.json'

function loadView(view) {
  return () => import(/* webpackChunkName: "d3-components-[request]" */ `@/d3-components/${view}.vue`)
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
    name: 'Audio Slider',
    title: 'Audio Slider',
    path: '/audio-slider',
    alias: '/audio-slider/*',
    component: loadView('audio-slider')
  },
  {
    name: 'hierarchical edge bundling',
    title: 'hierarchical edge bundling',
    path: '/hierarchical-edge-bundling',
    alias: '/hierarchical-edge-bundling/*',
    component: loadView('hierarchical-edge-bundling/index')
  }
].map(r => {
  var res = r;
  res.source = config.gitLink +
               config.d3ComponentsPath +
               r.path +
               (r.folder ? '' : '.vue')
  return res;
})
