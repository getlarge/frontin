import Vue from "vue";
import Vuex from "vuex";
import { base } from "./base";
import { menu } from "./menu";
import { home } from "./home";
import { ambience } from "./ambience";
import { posts } from "./posts";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        base: base,
        menu: menu,
        home: home,
        ambience: ambience,
        posts: posts
    }
});
