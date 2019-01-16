export default {
  namespaced: true,
  state: {
    serverURL: process.env.VUE_APP_HTTP_SERVER_URL,
    domain: process.env.VUE_APP_DOMAIN,
    tel: process.env.VUE_APP_PHONE,
    gitLink: process.env.VUE_APP_GIT_LINK,
    files: []
  },
  mutations: {
    updateFiles(state, files) {
      state.files = files;
    }
  }
};
