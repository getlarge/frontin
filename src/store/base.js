import config from "@/config.json";

export const base = {
	state: {
		config: {
			serverURL: config.httpServerURL,
			domain : config.domain,
			tel: config.tel,
			gitLink: config.gitLink
		},
		files: []
	},
	mutations: {
		updateFiles(state, files) {
			base.state.files = files;
		}
	}
};
