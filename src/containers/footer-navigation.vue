<template>
    <div id="bottom-nav">
        <hr class="my-4">
        <router-link class="prev" v-if="prev" :to="prev.path" >< {{ prev.title }}  -  </router-link>
        <a class="source" :href="sourceHref" target="_blank"><font-awesome-icon :icon="['fab', 'gitlab']" /> {{ $route.name }}</a>
        <router-link class="next" v-if="next" :to="next.path" >  -  {{ next.title }} > </router-link>
    </div>
</template>

<script>

    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import config from '@/config.json'
    import { routes } from '@/router/menu'
    import { EventBus } from '@/main';

    export default {
        props: {
        }, 

        components: { 
            FontAwesomeIcon
        },

        data() {
            return {
                items: routes,
                pageTopic: "getlarge" + this.$route.path + "main",
            }
        },

        created() {

        },

        updated() {

        },

        beforeDestroy() {
        },

        watch: {
        },

        computed: {
            prev: function() {
                var index = this.findIndex();
                if(index == -1) {
                    return undefined;
                }
                return index > 0 ? routes[index - 1] : undefined;
            },

            next: function() {
                var index = this.findIndex();
                if(index == -1) {
                    return undefined;
                }
                return index + 1 < routes.length ? routes[index + 1] : undefined;
            },

            sourceHref: function() {
                var index = this.findIndex();
                if(index == -1) {
                    return config.gitLink;
                }
                return routes[index].source;
            },

            routePath: () => {
                return "/" + this.$route.name
            },

        },

        methods: {
            findIndex: function() {
            var me = this.$route.name;
            return routes.findIndex(r => r.name === me);
            }
        },
    }
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
