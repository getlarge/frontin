import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import menu from './modules/menu';
import ambience from './modules/ambience';
import logger from '@/services/logger';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'nav',
  storage: window.localStorage,
  reducer: (state) => ({
    base: state.base,
  }),
  asyncStorage: false,
});

// const vuexSession = new VuexPersistence({
//   key: "nav",
//   storage: window.sessionStorage,
//   reducer: (state) => ({
//     files: state.files,
//     search: state.search,
//   }),
//   asyncStorage: false,
// });

const clientUrl = process.env.VUE_APP_CLIENT_URL;

export default new Vuex.Store({
  state: {
    env: process.env.NODE_ENV,
    serverUrl: process.env.VUE_APP_SERVER_URL,
    resApiRoot: process.env.VUE_APP_ROOT_API,
    clientUrl,
    fileUploadUrl: `${process.env.VUE_APP_SERVER_URL}${process.env.VUE_APP_ROOT_API}/files`,
    gitLink: process.env.VUE_APP_GIT_LINK || 'https://framagit.org/getlarge/frontin/',
    ComponentsPath: process.env.VUE_APP_GIT_COMPONENTS_PATH || 'tree/master/src/components',
    tel: process.env.VUE_APP_PHONE || '+33624297761',
    domain: process.env.VUE_APP_DOMAIN || 'getlarge.eu',
    repoUrl: 'https://framagit.org/aloes',
    letters: 'edouard maleix'.split(''),
    updatedLetters: 'edouard maleix'.split(''),
    tutorial: {
      text: "Don't forget to flip the card to get my contact ;)",
      tags: '',
      img: '/img/tuto-home.gif',
    },
    updateCounter: 0,
    contactCard: false,
    available: false,
    files: [],
    style: {
      color: {
        primary: '#000000',
        secondary: '#ededed',
        success: '#2bb673',
        yogaClass: '#7ebcaf',
        pilateClass: '#528fa2',
        rentRoom: '#ffc85f',
      },
      palette: {
        black: '#000000',
        grey: '#ededed',
        green: '#77d1bf',
        blue: '#29abe2',
        yellow: '#ffc85f',
      },
      pictures: {
        logo: `${clientUrl}/icons/aloesicon2.png`,
        logoFont: `${clientUrl}/icons/aloesfont1.png`,
        logoPart1: `${clientUrl}/icons/braille-E.png`,
        logoPart2: `${clientUrl}/icons/braille-M.png`,
        background: `${clientUrl}/images/bg1.png`,
        notFound: `${clientUrl}/images/404.jpg`,
        iconInfo: `${clientUrl}/icons/info.png`,
        iconInfo2: `${clientUrl}/icons/info2.png`,
        iconLetter: `${clientUrl}/icons/letter.png`,
        iconLetter2: `${clientUrl}/icons/letter2.png`,
        guy: `${clientUrl}/img/ed2.jpg`,
        available: `${clientUrl}/icons/available.png`,
        notAvailable: `${clientUrl}/icons/notavailable.png`,
        rectangle: `${clientUrl}/icons/rectangle.png`,
        rectangleFlipped: `${clientUrl}/icons/rectangle-flipped.png`,
        mapMarker: `${clientUrl}/icons/map-marker.png`,
        mapMarkerAlt: `${clientUrl}/icons/map-marker-alt.png`,
        mapMarkerWhite: `${clientUrl}/icons/map-marker-white.png`,
        imgPlaceholder: `${clientUrl}/icons/image-placeholder.png`,
        pencilSquare: `${clientUrl}/icons/icon-modifier.png`,
        device: `${clientUrl}/icons/aloes/iot.png`,
        deviceOff: `${clientUrl}/icons/aloes/iot-white.png`,
        node: `${clientUrl}/icons/aloes/node.png`,
        nodeOff: `${clientUrl}/icons/aloes/node-white.png`,
        virtualObject: `${clientUrl}/icons/aloes/virtual-object.png`,
        virtualObjectOff: `${clientUrl}/icons/aloes/virtual-object-white.png`,
        virtualObjectAlt: `${clientUrl}/icons/aloes/virtual-object-alt.png`,
        virtualObjectAltOff: `${clientUrl}/icons/aloes/virtual-object-alt-white.png`,
      },
      videos: {
        bg1Webm: `${clientUrl}/videos/bg.webm`,
        bg1Mp4: `${clientUrl}/videos/bg.mp4`,
        bg1Ogv: `${clientUrl}/videos/bg.ogv`,
        createDeviceWebm: `${clientUrl}/videos/create-device.webm`,
        createDeviceMp4: `${clientUrl}/videos/create-device.mp4`,
        createDeviceOgv: `${clientUrl}/videos/create-device.ogg`,
      },
    },
    deviceTypes: [
      { text: 'type', value: null, disabled: true },
      { text: 'Gateway', value: 'gateway' },
      { text: 'Node', value: 'node' },
      { text: 'Phone', value: 'phone' },
      { text: 'Camera', value: 'camera' },
      // {text: "Bot", value: "bot"},
    ],
    protocolNames: [
      { text: 'name', value: null, disabled: true },
      { text: 'NodeWebcam', value: 'nodeWebcam' },
      { text: 'Aloes', value: 'aloes' },
      { text: 'AloesClient', value: 'aloesClient' },
      { text: 'MySensors', value: 'mySensors' },
    ],
    windowWidth: 0,
    windowHeight: 0,
    documentWidth: 0,
    documentHeight: 0,
    contactForm: {
      firstName: null,
      lastName: null,
      email: null,
      subject: null,
      content: null,
    },
  },
  mutations: {
    updateIcons(state, payload) {
      state.icons[payload.id].path = payload.path;
    },
    updateCounter(state, i) {
      state.updateCounter += i;
    },
    updateContactCard(state, status) {
      state.contactCard = status;
    },
    setModelKV(state, { key, value }) {
      state[key] = value;
    },
    setContactFormKV(state, { key, value }) {
      state.contactForm[key] = value;
    },
    cleanContactForm(state) {
      state.contactForm = {
        firstName: null,
        lastName: null,
        email: null,
        subject: null,
        content: null,
      };
    },
    updateFiles(state, files) {
      state.files = files;
    },
  },
  actions: {
    async sendContactForm({ state }) {
      try {
        logger.publish(4, 'App', 'dispatch:sendContactForm:req', state.contactForm);
        // const response = await loopback.post("Accounts/send-contact-form", {
        //   form: state.contactForm
        // });
        // logger.publish(3, "App", "dispatch:sendContactForm:res", response);
        // return response;
        return null;
      } catch (error) {
        logger.publish(3, 'App', 'dispatch:sendContactForm:err', error);
        throw error;
      }
    },
  },
  plugins: [vuexLocal.plugin],
  modules: {
    menu,
    ambience,
  },
});
