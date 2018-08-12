import { config } from "@/configFile";

export const base = {
	state: {
		serverURL: config.httpClient.url,
		domain : config.domain,
		tel: config.tel,
		gitLink: config.gitLink,
		files: []
	},
	mutations: {
		updateFiles(state, files) {
			base.state.files = files;
		}
	}
};
