export default {
  namespaced: true,
  state: {
    letters: "edouard maleix".split(""),
    updatedLetters: "edouard maleix".split(""),
    tutorial: {
      text: "Don't forget to flip the card to get my contact ;)",
      tags: "",
      img: "/img/tuto-home.gif"
    },
    icons: [
      {
        id: 1,
        path: "/icons/info.png"
      },
      {
        id: 2,
        path: "/icons/letter.png"
      },
      {
        id: 3,
        path: "/img/ed2.jpg"
      },
      {
        id: 4,
        path: "/icons/available.png"
      },
      {
        id: 5,
        path: "/icons/notavailable.png"
      }
    ],
    updateCounter: 0,
    contactCard: false,
    available: true
  },
  mutations: {
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
  },
  actions: {
    getHomeIconsById: state => id => {
      return state.icons.find(icons => icons.id === id);
    }
  }
};
