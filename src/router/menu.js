import config from '@/config.json'

function loadView(view) {
    return () => import(/* webpackChunkName: "components-[request]" */ `@/components/${view}.vue`)
}

export const routes = [
    {
        name: 'Projects Timeline',
        title: 'Projects Timeline',
        path: '/projects-timeline',
        folder: true,
        alias: '/projects-timeline/*',
        component: loadView('projects-timeline/index')
    },{
        name: 'Portfolio',
        title: 'Portfolio',
        path: '/portfolio',
        component: loadView('portfolio')
    },{
        name: 'Ambience',
        title: 'Ambience',
        path: '/ambience',
        folder: true,
        alias: '/ambience/*',
        component: loadView('ambience/index')
    },{
        name: 'Plants Print',
        title: 'Plants Print',
        path: '/plants-print',
        folder: true,
        alias: '/plants-print/*',
        component: loadView('plants-print/index')
    },{
        name: 'Dichotomy',
        title: 'Dichotomy',
        path: '/dichotomy',
        alias: '/dichotomy/*',
        component: loadView('dichotomy')
    },{
        name: 'Network Topology',
        title: 'Realtime Network Mapping',
        path: '/tidy-tree',
        alias: '/tidy-tree/*',
        component: loadView('tidy-tree')
    },{
        name: 'IPSO protocol',
        title: 'IPSO protocol',
        path: '/aloes-protocol',
        alias: '/aloes-protocol/*',
        component: loadView('aloes-protocol')
    }
].map(r => {
    var res = r;
    res.source = config.gitLink +
                config.ComponentsPath +
                r.path +
                (r.folder ? '/index.vue' : '.vue')
    return res;
})
