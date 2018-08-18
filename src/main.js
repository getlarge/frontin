"use strict";
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { config } from "@/configFile";
import devtools from "@vue/devtools";
import Vue from "vue";
import App from "@/containers/App";
import store from "@/store";
import router from "@/router";
//import i18n from "./i18n"
//import * as axios from "axios";
import VueResource from "vue-resource";
//import VueAuthImage from "vue-auth-image";
import VueMq from "vue-mq";
import VueTouch from "vue-touch";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";
require("froala-editor/js/froala_editor.pkgd.min");
// Require Froala Editor css files.
require("froala-editor/css/froala_editor.pkgd.min.css");
require("font-awesome/css/font-awesome.css");
require("froala-editor/css/froala_style.min.css");
import VueFroala from "vue-froala-wysiwyg";

Vue.config.silent = false;
Vue.config.devtools = true;
Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development" && Vue.config.devtools === true) {
    devtools.connect(
        config.localhost,
        config.vueDevtoolsPort
    );
}
//var authHeader = 'Bearer ' + localStorage.getItem('id_token');
//var authHeader = "Basic "+btoa(config.options.username + ":" + config.options.password);
//var authHeader = "Basic qmzf";
//Vue.http.headers.common['Authorization'] = authHeader;
//axios.defaults.headers.common['Authorization'] = authHeader;

Vue.use(VueResource);
//Vue.use(VueAuthImage);
Vue.use(VueTouch, { name: "v-touch" });
Vue.use(VueMq, {
    breakpoints: {
        mobile: 600,
        tablet: 900,
        laptop: 1250,
        desktop: 1600,
        xxl: Infinity
    }
});
Vue.use(BootstrapVue);
Vue.use(VueFroala);

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

// Vue.filter('toLocale', function (to) {
//   return '/' + i18n.locale + to
// })

fontawesome.library.add(brands, solid);

export const EventBus = new Vue();

/* eslint-disable no-new */
new Vue({
    el: "#app",
    store,
    router,
    //i18n,
    render: h => h(App)
});
