import { config } from "@/configFile";

const state = {
    letters: "edouard maleix".split(""),
    updatedLetters: "edouard maleix".split(""),
    tutorial: {
        text: "Don't forget to flip the card to get my contact ;)",
        tags: "",
        img: "static/img/tuto-home.gif"
    },
    icons: [
        {
            id: 1,
            path: "static/icons/info.png"
        },
        {
            id: 2,
            path: "static/icons/letter.png"
        },
        {
            id: 3,
            path: "static/img/ed2.jpg"
        },
        {
            id: 4,
            path: "static/icons/available.png"
        },
        {
            id: 5,
            path: "static/icons/notavailable.png"
        }
    ],
    updateCounter: 0,
    contactCard: false,
    available: true
};

const mutations = {
    updateHomeIcons(state, payload) {
        //console.log(state.homeIcons[payload.id].path);
        state.icons[payload.id].path = payload.path;
    },

    updateHomeCounter(state, i) {
        state.updateCounter += i;
    },

    updateContactCard(state, status) {
        //console.log(state.homeIcons[payload.id].path);
        state.contactCard = status;
    }
};

const getters = {
    getHomeIconsById: state => id => {
        return state.icons.find(icons => icons.id === id);
    },

    frontCard: state => {
        return {
            title: "Hey, i'm ...",
            text1:
                "<img class='square' src=" +
                config.httpClient.url +
                "static/icons/rectangle.png /><div><img class='trombi' src=" +
                config.httpClient.url +
                state.icons[4].path +
                "></img><p class='text'></br>...on a mission, but you can send me your request anyway!</p></div>",
            text2:
                "<img class='square' src=" +
                config.httpClient.url +
                "static/icons/rectangle.png /><div><img class='trombi' src=" +
                config.httpClient.url +
                state.icons[3].path +
                "></img><p class='text'>Your project requires UI/UX design, frontend / backend development, or embedded system prototyping ?</br>Why not talking about it now.</p></div>"
        };
    },

    backCard: state => {
        return {
            title: "contact",
            text:
                "<img class='square' src=" +
                config.httpClient.url +
                "static/icons/rectangle-flipped.png /><div><img class='trombi' style='opacity:0.8;' src=" +
                config.httpClient.url +
                state.icons[2].path +
                "></img><p class='text'>Edouard Maleix</br><a href=mailto:ed@" +
                config.domain +
                ">ed@" +
                config.domain +
                "</a></br><a href=tel:" +
                config.tel +
                ">" +
                config.tel +
                "</a></br>Nantes</br>References on request</p></div>"
        };
    }
};

const home = {
    state: state,
    mutations: mutations,
    getters: getters
};

export { state, mutations, getters, home };