import Vue from "vue";
import Router from "vue-router";
import Home from "@/containers/home";
import { routes as menuRoutes } from "@/router/menu";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        ...menuRoutes
    ]
});
