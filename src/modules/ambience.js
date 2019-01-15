const clientUrl = process.env.VUE_APP_CLIENT_URL;

export default {
  namespaced: true,
  state: {
    collectionName: "Ambience",
    resources: "Ambiences",
    as0: [],
    as1: [
      {
        id: 1,
        name: "vent",
        audioSource: [`${clientUrl}/sounds/wind.mp3`],
        iconFile: `${clientUrl}/icons/blaetter.png`
      },
      {
        id: 2,
        name: "feu",
        audioSource: [`${clientUrl}/sounds/fire.mp3`],
        iconFile: `${clientUrl}/icons/feuer.png`
      },
      {
        id: 3,
        name: "eau",
        audioSource: [`${clientUrl}/sounds/water-stream.mp3`],
        iconFile: `${clientUrl}/icons/meer.png`
      }
    ],
    as2: [
      {
        id: 4,
        name: "pluie",
        audioSource: [`${clientUrl}/sounds/rain.mp3`],
        iconFile: `${clientUrl}/icons/wolke.png`
      },
      {
        id: 5,
        name: "foret",
        audioSource: [`${clientUrl}/sounds/forrest.mp3`],
        iconFile: `${clientUrl}/icons/wald.png`
      },
      {
        id: 6,
        name: "tempête",
        audioSource: [`${clientUrl}/sounds/storm.mp3`],
        iconFile: `${clientUrl}/icons/sturm.png`
      }
    ],
    as3: [
      {
        id: 7,
        name: "café",
        audioSource: [`${clientUrl}/sounds/cafe.mp3`],
        iconFile: `${clientUrl}/icons/koffee.png`
      },
      {
        id: 8,
        name: "livre",
        audioSource: [`${clientUrl}/sounds/book.mp3`],
        iconFile: `${clientUrl}/icons/buch.png`
      },
      {
        id: 9,
        name: "trophée",
        audioSource: [`${clientUrl}/sounds/champion.mp3`],
        iconFile: `${clientUrl}/icons/trophae.png`
      }
    ],
    counter: 0,
    tutorial: {
      text:
        "Create your own sound ambiance.\nEach icons can play a sound and the slider updates the volume, you can create your own widget too, just add audio and image files.\n Icons hand drawn by Isabella Kohout.",
      tags: "",
      img: "/img/tuto-ambience.gif"
    }
  },
  mutations: {
    updateASCounter(state, i) {
      state.counter += i;
    },

    updateAS0(state, obj) {
      state.as0.push(obj);
      //ambience.state.as0 = { ...ambience.state.as0, obj }
    }
  }
};
