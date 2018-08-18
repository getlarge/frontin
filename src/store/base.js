import { config } from "@/configFile";

const state = {
    serverURL: config.httpClient.url,
    domain: config.domain,
    tel: config.tel,
    gitLink: config.gitLink,
    files: []
};

const mutations = {
    updateFiles(state, files) {
        base.state.files = files;
    }
};

const base = {
    state: state,
    mutations: mutations
};

export { state, mutations, base };
