import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import base from "@/modules/base";
import menu from "@/modules/menu";
import home from "@/modules/home";
import ambience from "@/modules/ambience";
//  import {journal} from "@/modules/journal";

//  import loopback from "@/services/loopback";
import logger from "@/services/logger";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "nav",
  storage: window.localStorage,
  reducer: state => ({
    base: state.base
  }),
  asyncStorage: false
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

export default new Vuex.Store({
  state: {
    env: `${process.env.NODE_ENV}`,
    serverUrl: `${process.env.VUE_APP_SERVER_URL}`,
    resApiRoot: `${process.env.VUE_APP_ROOT_API}`,
    clientUrl: `${process.env.VUE_APP_CLIENT_URL}`,
    fileUploadUrl: `${process.env.VUE_APP_SERVER_URL}${
      process.env.VUE_APP_ROOT_API
    }/files`,
    gitLink:
      process.env.VUE_APP_GIT_LINK || "https://framagit.org/getlarge/frontin/",
    ComponentsPath:
      process.env.VUE_APP_GIT_COMPONENTS_PATH || "tree/master/src/components",
    tel: process.env.VUE_APP_PHONE || "+33624297761",
    domain: process.env.VUE_APP_DOMAIN || "getlarge.eu",
    repoUrl: "https://framagit.org/aloes",
    style: {
      color: {
        primary: "#000000",
        secondary: "#ededed",
        success: "#2bb673",
        yogaClass: "#7ebcaf",
        pilateClass: "#528fa2",
        rentRoom: "#ffc85f"
      },
      palette: {
        black: "#000000",
        grey: "#ededed",
        green: "#2bb673",
        blue: "#7ebcaf",
        yellow: "#ffc85f"
      },
      pictures: {
        logo: `${process.env.VUE_APP_CLIENT_URL}/icons/aloesicon2.png`,
        logoFont: `${process.env.VUE_APP_CLIENT_URL}/icons/aloesfont1.png`,
        logoPart1: `${process.env.VUE_APP_CLIENT_URL}/icons/braille-E.png`,
        logoPart2: `${process.env.VUE_APP_CLIENT_URL}/icons/braille-M.png`,
        background: `${process.env.VUE_APP_CLIENT_URL}/images/bg1.png`,
        notFound: `${process.env.VUE_APP_CLIENT_URL}/images/404.jpg`,
        iconInfo: `${process.env.VUE_APP_CLIENT_URL}/icons/info.png`,
        iconInfo2: `${process.env.VUE_APP_CLIENT_URL}/icons/info2.png`,
        iconLetter: `${process.env.VUE_APP_CLIENT_URL}/icons/letter.png`,
        iconLetter2: `${process.env.VUE_APP_CLIENT_URL}/icons/letter2.png`,
        rectangle: `${process.env.VUE_APP_CLIENT_URL}/icons/rectangle.png`,
        rectangleFlipped: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/rectangle-flipped.png`,
        mapMarker: `${process.env.VUE_APP_CLIENT_URL}/icons/map-marker.png`,
        mapMarkerAlt: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/map-marker-alt.png`,
        mapMarkerWhite: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/map-marker-white.png`,
        imgPlaceholder: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/image-placeholder.png`,
        pencilSquare: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/icon-modifier.png`,
        device: `${process.env.VUE_APP_CLIENT_URL}/icons/aloes/iot.png`,
        deviceOff: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/aloes/iot-white.png`,
        node: `${process.env.VUE_APP_CLIENT_URL}/icons/aloes/node.png`,
        nodeOff: `${process.env.VUE_APP_CLIENT_URL}/icons/aloes/node-white.png`,
        virtualObject: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/aloes/virtual-object.png`,
        virtualObjectOff: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/aloes/virtual-object-white.png`,
        virtualObjectAlt: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/aloes/virtual-object-alt.png`,
        virtualObjectAltOff: `${
          process.env.VUE_APP_CLIENT_URL
        }/icons/aloes/virtual-object-alt-white.png`
      },
      videos: {
        bg1Webm: `${process.env.VUE_APP_CLIENT_URL}/videos/bg.webm`,
        bg1Mp4: `${process.env.VUE_APP_CLIENT_URL}/videos/bg.mp4`,
        bg1Ogv: `${process.env.VUE_APP_CLIENT_URL}/videos/bg.ogv`,
        createDeviceWebm: `${
          process.env.VUE_APP_CLIENT_URL
        }/videos/create-device.webm`,
        createDeviceMp4: `${
          process.env.VUE_APP_CLIENT_URL
        }/videos/create-device.mp4`,
        createDeviceOgv: `${
          process.env.VUE_APP_CLIENT_URL
        }/videos/create-device.ogg`
      }
    },
    deviceTypes: [
      { text: "type", value: null, disabled: true },
      { text: "Gateway", value: "gateway" },
      { text: "Node", value: "node" },
      { text: "Phone", value: "phone" },
      { text: "Camera", value: "camera" }
      // {text: "Bot", value: "bot"},
    ],
    protocolNames: [
      { text: "name", value: null, disabled: true },
      { text: "NodeWebcam", value: "nodeWebcam" },
      { text: "Aloes", value: "aloes" },
      { text: "AloesClient", value: "aloesClient" },
      { text: "MySensors", value: "mySensors" }
    ],
    windowWidth: 0,
    windowHeight: 0,
    contactForm: {
      firstName: null,
      lastName: null,
      email: null,
      subject: null,
      content: null
    }
  },
  mutations: {
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
        content: null
      };
    }
  },
  actions: {
    async sendContactForm({ state }) {
      try {
        logger.publish(
          4,
          "App",
          "dispatch:sendContactForm:req",
          state.contactForm
        );
        // const response = await loopback.post("Accounts/send-contact-form", {
        //   form: state.contactForm
        // });
        // logger.publish(3, "App", "dispatch:sendContactForm:res", response);
        // return response;
        return null;
      } catch (error) {
        logger.publish(3, "App", "dispatch:sendContactForm:err", error);
        throw error;
      }
    }
  },
  plugins: [vuexLocal.plugin],
  modules: {
    base,
    menu,
    home,
    ambience
    //  journal,
  }
});
