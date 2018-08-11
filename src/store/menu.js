import { routes } from "@/router/menu";

export const menu = {
  	state: { 
  		items: routes,
  		mqttStatus: "Disconnected",
  		icon1: "static/icons/braille-E.png",
		icon2: "static/icons/braille-M.png",
		currentPage: null,
		chat: false,
		tutorial: false, 
	},
  	mutations: {
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
		}, 
	},
  	//actions: { ... },
}