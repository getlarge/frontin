import Vue from "vue";
import VueMq from "vue-mq";
//  import { VueHammer } from "vue2-hammer";
//  import BootstrapVue from "bootstrap-vue";
// require("bootstrap/dist/css/bootstrap.css");
// require("bootstrap-vue/dist/bootstrap-vue.css");
import { Layout } from "bootstrap-vue/es/components";
import VueCroppie from "vue-croppie";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faQuestionCircle,
  faCircle,
  faSpinner,
  faExpand,
  faCompress,
  faSearchPlus,
  faBinoculars,
  faArrowsAlt,
  faArrowUp,
  faStop,
  faPlay,
  faTimes,
  faSmile,
  faPlus,
  faFrown,
  faToggleOn,
  faToggleOff,
  faDownload,
  faPhone,
  faEnvelopeOpen,
  faLink,
  faHome,
  faLanguage,
  faStar,
  faPlusCircle,
  faInfoCircle,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGitlab,
  faLinkedinIn,
  faRocketchat
} from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import store from "@/store";
import router from "@/router";

Vue.config.productionTip = false;
Vue.config.silent = false;
Vue.config.devtools = true;

//  Vue.use(VueHammer);

Vue.use(VueMq, {
  breakpoints: {
    mobile: 600,
    tablet: 900,
    laptop: 1250,
    desktop: 1600,
    xxl: Infinity
  }
});

Vue.use(Layout);
Vue.use(VueCroppie);

library.add(
  faTwitter,
  faGitlab,
  faLinkedinIn,
  faRocketchat,
  faCoffee,
  faCircle,
  faQuestionCircle,
  faSpinner,
  faExpand,
  faCompress,
  faSearchPlus,
  faBinoculars,
  faArrowsAlt,
  faArrowUp,
  faStop,
  faPlay,
  faTimes,
  faSmile,
  faPlus,
  faFrown,
  faToggleOn,
  faToggleOff,
  faDownload,
  faPhone,
  faEnvelopeOpen,
  faLink,
  faHome,
  faLanguage,
  faStar,
  faPlusCircle,
  faInfoCircle,
  faSearch
);
dom.watch();
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.filter("formatSize", function(size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + " TB";
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + " GB";
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + " MB";
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + " KB";
  }
  return size.toString() + " B";
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
