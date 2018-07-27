<template>
    <div id="top-nav">
        <b-navbar toggleable="sm" type="light" variant="light" sticky>
            <b-navbar-brand href="/"><b-img class="logo" :src="serverURL+icon1" fluid/><b-img class="logo" :src="serverURL+icon2" fluid /> </b-navbar-brand>
  
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-nav class="w-50">
                    <b-navbar-nav >
                        <b-nav-item-dropdown class="nav-link" text="Latest works" left>
                            <b-dropdown-item v-for="item in items" :key="item.path">
                            <router-link :to="item.path">{{ item.name }}</router-link>
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-nav>
                <b-navbar-nav class="ml-auto">
           <!--  <b-nav-item-dropdown :class="{'nav-link': true, show: showLocale}" @click.prevent="onLocale(true)" @focus="onLocale(true)" @blur="onLocale(false)" :text="{{$t('header.locale')}}" right>
              <b-dropdown-item class="dropdown-menu"  v-for="(value, name) in locale" :key="name">
                <router-link class="dropdown-item" :to="'/' + name + ($route.params.locale ? $route.fullPath.substr($route.params.locale.length + 1) : $route.fullPath)">{{value}}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown> --> 
                    <b-nav-item href="https://fr.linkedin.com/in/edouard-maleix-a0a390b1" target="_blank" title="Linkedin"><font-awesome-icon :icon="['fab', 'linkedin-in']" size="lg" alt="linkedin icon"/></b-nav-item>
                    <b-nav-item href="https://framagit.org/getlarge" target="_blank" title="Gitlab"><font-awesome-icon :icon="['fab', 'gitlab']" size="lg" alt="git icon"/></b-nav-item>
                    <b-nav-item @click="chatHandler()" title="Chat" >
                        <font-awesome-icon v-if="chat === true" class="on" :icon="['fab', 'rocketchat']" size="lg" alt="rocketchat-on icon"/>
                        <font-awesome-icon v-else class="off" :icon="['fab', 'rocketchat']" size="lg" alt="rocketchat-off icon"/>
                    </b-nav-item>
                    <b-nav-item  @click="help()" title="Tutorial">
                        <font-awesome-icon v-if="tutorial === true" class="on" :icon="['fas', 'question-circle']" size="lg" alt="tuto-on"/>
                        <font-awesome-icon v-else class="off" :icon="['fas', 'question-circle']" size="lg" alt="tuto-off"/>
                    </b-nav-item>
                    <b-nav-item title="MQTT status" disabled>
                        <font-awesome-icon v-if="connStatus === 'Connected'" class="on" :icon="['fas', 'circle']" size="lg" alt="mqtt-on icon"/>
                        <font-awesome-icon v-else class="off" :icon="['fas', 'circle']" size="lg" alt="mqtt-off icon"/>
                    </b-nav-item>
                    </b-navbar-nav>
            </b-collapse>
        </b-navbar>
                <cards
            v-if="currentPage"
            :title="currentPage.name"
            :description="currentPage.tutorial"
            :tags="currentPage.tags"
            :img="currentPage.img"
            />
    </div>
</template>

<script>

    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import config from '@/config.json'
    import { routes } from '@/router/menu'
    import cards from "@/components/utils/cards"
    import { EventBus } from '@/main'

    export default {
        props: { }, 

        data() {
            return {
                items: routes,
                serverURL: config.httpServerURL,
                icon1: "static/icons/braille-E.png",
                icon2: "static/icons/braille-M.png",
                connStatus: "Disconnected",
                pageTopic: "getlarge" + this.$route.path + "main",
                currentPage: null, 
                tutorial : false,
                chat : false,
            }
        },
        
        components: {
            cards: cards,
            FontAwesomeIcon
        },

        created() {
            EventBus.$on("status:mqtt", status => {
                //console.log(`mqtt status : ${status}`)
                return this.connStatus = status
            });
            EventBus.$on("update:tutorial", (name, text, tags, img) => {
                //console.log(`ready : ${name}, ${text}, ${tags}, ${img}`)
                return this.currentPage = { name: name, tutorial: text, tags: tags, img: img };
            });
            EventBus.$on("stop:tutorial", () => {
                this.tutorial = false;
                return this.currentPage = null;
            });
            EventBus.$on("stop:cards", i => {
                this.tutorial = false;
                return this.currentPage = null;
            }); 

        },

        updated() {

        },

        beforeDestroy() {
        },

        watch: {
        },

        computed: {
          
        },

        methods: {
            // onLocale(show) {
            //   if (show) {
            //     this.showLocale = show
            //   } else {
            //     setTimeout(() => {
            //       this.showLocale = show
            //     }, 128)
            //   }
            // },

            chatHandler() {
                if ( this.chat === false ) {
                    this.chat = true;
                    return EventBus.$emit('start:chat');
                }
                else if ( this.chat === true ) {
                    this.chat = false;
                    return EventBus.$emit('stop:chat');
                }
            },

            subs : event => {
                if (event) {
                    alert(event.target.tagName)
                }      
            },

            help() {
                if ( this.tutorial === true ) {
                    //console.log("help-off")
                    this.tutorial = false;
                    EventBus.$emit('stop:tutorial');     
                    return this.currentPage = null;
                }
                else if ( this.tutorial === false ) {
                    //console.log("help-on")
                    this.tutorial = true;
                    return EventBus.$emit('start:tutorial');
                }

            },

            findIndex() {
                var me = this.$route.name;
                return routes.findIndex(r => r.name === me);
            },
        },
    } 

</script>

<style scoped>

    #holder {
        position: relative;
        /*border-top: 1px dashed gray;*/
        padding-top: 0px;
        margin-top: 10%;
    }

    #links {
        display: block;
        width: 300px;
        height: 40px;
        position: relative;
    }

    .dropdown-item:active {
        background-color: transparent;
        border: 1px;
        border-color: #f9b23e;
    }

    .dropdown-item:focus {
        background-color: transparent;
        border: 1px;
        border-color: #f9b23e;
    }

    a {
        color: #686868;
    }

    a:hover{
        color: #33b277;
        text-decoration: none;
    }

    .logo {
        height: 45px;
        opacity: 0.8;
    }


    .page-title {
        position: relative;
        width: 100%;
        vertical-align: middle;
        margin-top: 8%;
        margin-bottom: -5%;
        text-align: center;
    }

    .on path {
        fill : #01c669 !important;
        opacity: 0.7;
    }

    .off path{
        fill : #ff830f !important;
        opacity: 0.6;
    }

</style>
