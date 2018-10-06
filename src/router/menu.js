import { config } from "@/configFile";

function loadView(view) {
    return () => import(/* webpackChunkName: "components-[request]" */ `@/components/${view}.vue`);
}

export const routes = [
    {
        name: "Experiences",
        title: "Experiences",
        path: "/experience",
        folder: true,
        alias: "/experience/*",
        component: loadView("experience/index")
    },
    {
        name: "Gallery",
        title: "Gallery",
        path: "/gallery",
        component: loadView("gallery")
    },
    {
        name: "Ambience",
        title: "Ambience",
        path: "/ambience",
        folder: true,
        alias: "/ambience/*",
        component: loadView("ambience/index")
    },
    {
        name: "Coded journal",
        title: "Coded journal",
        path: "/journal",
        folder: true,
        alias: "/journal/*",
        component: loadView("journal/index")
    },
    {
        name: "Plants Print",
        title: "Plants Print",
        path: "/plants-print",
        folder: true,
        alias: "/plants-print/*",
        component: loadView("plants-print/index")
    },
    {
        name: "Dichotomy",
        title: "Dichotomy",
        path: "/dichotomy",
        alias: "/dichotomy/*",
        component: loadView("dichotomy")
    },
    {
        name: "Network Topology",
        title: "Realtime Network Mapping",
        path: "/network-tree",
        alias: "/network-tree/*",
        component: loadView("network-tree")
    },
    {
        name: "IPSO protocol",
        title: "IPSO protocol",
        path: "/aloes-protocol",
        alias: "/aloes-protocol/*",
        component: loadView("aloes-protocol")
    },
    {
        name: "Cam stream",
        title: "Cam stream",
        path: "/utils/stream-viewer",
        component: loadView("utils/stream-viewer")
    }
].map(r => {
    var res = r;
    res.source =
        config.gitLink + config.ComponentsPath + r.path + (r.folder ? "/index.vue" : ".vue");
    return res;
});
