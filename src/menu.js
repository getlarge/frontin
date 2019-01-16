const routes = [
  {
    name: "Experiences",
    title: "Experiences",
    path: "/experience",
    folder: true,
    alias: "/experience/*",
    component: () =>
      import(/* webpackChunkName: "experience" */ "@/components/Experience/index.vue")
  },
  {
    name: "Gallery",
    title: "Gallery",
    path: "/gallery",
    component: () =>
      import(/* webpackChunkName: "gallery" */ "@/components/Gallery.vue")
  },
  {
    name: "Ambience",
    title: "Ambience",
    path: "/ambience",
    folder: true,
    alias: "/ambience/*",
    component: () =>
      import(/* webpackChunkName: "ambience" */ "@/components/Ambience/index.vue")
  },
  {
    name: "Aloes",
    title: "Aloes",
    folder: true,
    path: "/aloes",
    component: () =>
      import(/* webpackChunkName: "aloes" */ "@/components/Aloes/index.vue")
  },
  {
    name: "IPSO",
    title: "Ipso",
    path: "/ipso",
    folder: true,
    alias: "/ipso/*",
    component: () =>
      import(/* webpackChunkName: "ipso" */ "@/components/Ipso/index.vue")
  },
  {
    name: "Network",
    title: "Realtime Network Mapping",
    path: "/network-tree",
    folder: true,
    alias: "/network-tree/*",
    component: () =>
      import(/* webpackChunkName: "network" */ "@/components/NetworkTree/index.vue")
  }
  // {
  //     name: "Coded journal",
  //     title: "Coded journal",
  //     path: "/journal",
  //     folder: true,
  //     alias: "/journal/*",
  //     component: loadView("journal/index")
  // },
  // {
  //     name: "Dichotomy",
  //     title: "Dichotomy",
  //     path: "/dichotomy",
  //     alias: "/dichotomy/*",
  //     component: loadView("dichotomy")
  // },
].map(r => {
  var res = r;
  res.source = `${process.env.VUE_APP_GIT_LINK}
    ${process.env.VUE_APP_GIT_COMPONENTS_PATH}
    ${r.path}
    ${r.folder ? "/index.vue" : ".vue"}`;
  return res;
});

export { routes };
