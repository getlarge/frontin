import config from '@/config.json'

function loadView(view) {
  return () => import(/* webpackChunkName: "d3-components-[request]" */ `@/d3-components/${view}.vue`)
}

export const routes = [
  {
    name: 'Pie chart: local component & props',
    title: 'Pie Chart',
    path: '/pie-chart-local-component',
    folder: true,
    component: loadView('pie-chart-local-component/index')
  },
  {
    name: 'Basic map: html tooltip & events',
    title: 'Basic Map',
    path: '/basic-map-tooltip',
    folder: true,
    component: loadView('basic-map-tooltip/index')
  },
  {
    name: 'Bubbles: nested routes',
    title: 'Bubbles',
    path: '/bubbles-nested-routes',
    alias: '/bubbles-nested-routes/*',
    folder: true,
    component: loadView('bubbles-nested-routes/index')
  },
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
    name: 'Portfolios',
    title: 'Portfolio',
    path: '/portfolios',
    alias: '/portfolios/*',
    folder: true,
    component: loadView('portfolios/index')
  },
  {
    name: 'Circle Frames',
    title: 'Circle frames',
    path: '/circle-frames',
    alias: '/circle-frames/*',
    component: loadView('circle-frames')
  }
].map(r => {
  var res = r;
  res.source = config.gitLink +
               config.d3ComponentsPath +
               r.path +
               (r.folder ? '' : '.vue')
  return res;
})
