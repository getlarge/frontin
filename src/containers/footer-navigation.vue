<template>

    <div id="bottom-nav">
        <hr class="my-4">
        <router-link class="prev" v-if="prev" :to="prev.path" >< {{ prev.title }}  -  </router-link>
        <a class="source" :href="sourceHref" target="_blank"><font-awesome-icon :icon="['fab', 'gitlab']" /> {{ $route.name }}</a>
        <router-link class="next" v-if="next" :to="next.path" >  -  {{ next.title }} > </router-link>
    </div>
    
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import { mapState } from "vuex";
import { EventBus } from "@/main";

export default {
    components: {
        FontAwesomeIcon
    },

    data() {
        return {
            pageTopic: "getlarge" + this.$route.path + "main"
        };
    },

    created() {},

    updated() {},

    beforeDestroy() {},

    watch: {},

    computed: {
        ...mapState({
            routes: state => state.menu.items,
            gitLink: state => state.base.gitLink
        }),

        prev() {
            var index = this.findIndex();
            if (index == -1) {
                return undefined;
            }
            return index > 0 ? this.routes[index - 1] : undefined;
        },

        next() {
            var index = this.findIndex();
            if (index == -1) {
                return undefined;
            }
            return index + 1 < this.routes.length
                ? this.routes[index + 1]
                : undefined;
        },

        sourceHref() {
            var index = this.findIndex();
            if (index == -1) {
                return this.gitLink;
            }
            return this.routes[index].source;
        },

        routePath() {
            return "/" + this.$route.name;
        }
    },

    methods: {
        findIndex() {
            var me = this.$route.name;
            return this.routes.findIndex(r => r.name === me);
        }
    }
};
</script>

<style scoped>
#bottom-nav {
    font-size: 12px;
    text-align: center;
    /*border-top: 1px dashed gray;*/
    margin-top: 0%;
    margin-bottom: 5%;
}

a {
    color: #686868;
}

a:hover {
    color: #33b277;
    text-decoration: none;
}

.prev {
    text-align: right;
}

.source {
    text-align: center;
}

.next {
    text-align: left;
}
</style>
