import { routes as menuRoutes } from "@/menu";

export default {
  namespaced: true,
  state: {
    items: menuRoutes,
    mqttStatus: "Disconnected",
    currentPage: null,
    chat: false,
    tutorial: false
  },
  mutations: {
    updateMqttStatus(state, status) {
      state.mqttStatus = status;
    },

    updateTutorialStatus(state, status) {
      state.tutorial = status;
    },

    updateCurrentPage(state, payload) {
      //console.log("currentPage", payload);
      state.currentPage = payload;
    }
  }
};
