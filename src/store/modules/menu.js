import { routes as items } from '../../router';

export default {
  namespaced: true,
  state: {
    items,
    mqttStatus: 'Disconnected',
    currentPage: null,
    chat: false,
    tutorial: false,
  },
  mutations: {
    updateMqttStatus(state, status) {
      state.mqttStatus = status;
    },

    updateTutorialStatus(state, status) {
      state.tutorial = status;
    },

    updateCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
};
