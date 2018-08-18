import { routes } from "@/router/menu";

const state = {
    items: routes,
    mqttStatus: "Disconnected",
    icon1: "static/icons/braille-E.png",
    icon2: "static/icons/braille-M.png",
    currentPage: null,
    chat: false,
    tutorial: false
};

const mutations = {
    updateMqttStatus(state, status) {
        menu.state.mqttStatus = status;
    },

    updateChatStatus(state, status) {
        menu.state.chat = status;
    },

    updateTutorialStatus(state, status) {
        menu.state.tutorial = status;
    },

    updateCurrentPage(state, payload) {
        //console.log("currentPage", payload);
        menu.state.currentPage = payload;
    }
};

const menu = {
    state: state,
    mutations: mutations
    //actions: { ... },
};

export { state, mutations, menu };
