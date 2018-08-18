import { config } from "@/configFile";

const serverURL = config.httpClient.url;

const state = {
    qrPosts: [
        [],
        [{
            id: 1,
            name: "expression",
            text:
                "Le langage est-il l'expression adéquate de toutes les réalités ? - Friedrich Nietzsche",
            iconFile: serverURL + "static/icons/blaetter.png"
        },
        {
            id: 2,
            name: "détermination",
            text:
                "Tout obstacle renforce la détermination. Celui qui s'est fixé un but n'en change pas. - Leonard de Vinci",
            iconFile: serverURL + "static/icons/feuer.png"
        }],
        [{
            id: 3,
            name: "expérience",
            text: "L’expérience est une bougie qui n’éclaire que celui qui la porte. - Confucius",
            iconFile: serverURL + "static/icons/meer.png"
        },
        {
            id: 4,
            name: "discipline",
            text: "La discipline est mère du succès. - Eschyle",
            iconFile: serverURL + "static/icons/meer.png"
        }]
    ],
    arrowRight: "static/icons/arrow-right.png",
    arrowLeft: "static/icons/arrow-left.png",
    journalEvent: "closed",
    journalFrame: "static/icons/eundI1.png",
    digicode: ["", "", "", ""],
    solution: "1433",
    tutorial: {
        text:
            "Create your own sound ambiance.\nEach icons can play a sound and the slider updates the volume, you can create your own widget too, just add audio and image files.\n Icons hand drawn by Isabella Kohout.",
        tags: "",
        img: "static/img/tuto-ambience.gif"
    }
};

const mutations = {
    updateQRPosts(state, obj) {
        state.qrPosts.push(obj);
    },
    updateJournalStatus(state, status) {
        state.journalEvent = status;
    },
    updateJournalFrame(state, url) {
        state.journalFrame = url;
    }
};

const getters = {
    checkAuth: state => {
        console.log(state.digicode.reduce(getters.getDigicode));
        if (state.digicode.reduceRight(getters.getDigicode) === state.solution) {
            return true;
        } else {
            return false;
        }
    },
    getDigicode(total, value, index, array) {
        return total + value;
    }
};

const posts = {
    state: state,
    mutations: mutations,
    getters: getters
};

export { state, mutations, posts };
