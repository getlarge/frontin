import { config } from "@/configFile";

const serverURL = config.httpClient.url;

const state = {
    as0: [],
    as1: [
        {
            id: 1,
            name: "vent",
            audioSource: [serverURL + "static/sounds/wind.mp3"],
            iconFile: serverURL + "static/icons/blaetter.png"
        },
        {
            id: 2,
            name: "feu",
            audioSource: [serverURL + "static/sounds/fire.mp3"],
            iconFile: serverURL + "static/icons/feuer.png"
        },
        {
            id: 3,
            name: "eau",
            audioSource: [serverURL + "static/sounds/water-stream.mp3"],
            iconFile: serverURL + "static/icons/meer.png"
        }
    ],
    as2: [
        {
            id: 4,
            name: "pluie",
            audioSource: [serverURL + "/static/sounds/rain.mp3"],
            iconFile: serverURL + "static/icons/wolke.png"
        },
        {
            id: 5,
            name: "foret",
            audioSource: [serverURL + "static/sounds/forrest.mp3"],
            iconFile: serverURL + "static/icons/wald.png"
        },
        {
            id: 6,
            name: "tempête",
            audioSource: [serverURL + "static/sounds/storm.mp3"],
            iconFile: serverURL + "static/icons/sturm.png"
        }
    ],
    as3: [
        {
            id: 7,
            name: "café",
            audioSource: [serverURL + "static/sounds/cafe.mp3"],
            iconFile: serverURL + "static/icons/koffee.png"
        },
        {
            id: 8,
            name: "livre",
            audioSource: [serverURL + "static/sounds/book.mp3"],
            iconFile: serverURL + "static/icons/buch.png"
        },
        {
            id: 9,
            name: "trophée",
            audioSource: [serverURL + "static/sounds/champion.mp3"],
            iconFile: serverURL + "static/icons/trophae.png"
        }
    ],
    counter: 0,
    tutorial: {
        text:
            "Create your own sound ambiance.\nEach icons can play a sound and the slider updates the volume, you can create your own widget too, just add audio and image files.\n Icons hand drawn by Isabella Kohout.",
        tags: "",
        img: "static/img/tuto-ambience.gif"
    }
};

const mutations = {
    updateASCounter(state, i) {
        state.counter += i;
    },

    updateAS0(state, obj) {
        state.as0.push(obj);
        //ambience.state.as0 = { ...ambience.state.as0, obj }
    }
};

const ambience = {
    state: state,
    mutations: mutations
};

export { state, mutations, ambience };
