<template>
  <div id="top-nav">
    <b-navbar toggleable="sm" type="light" variant="light" sticky>
      <b-navbar-brand href="/">
        <b-img 
          class="logo" 
          :src="$store.state.style.pictures.logoPart1" 
          fluid/>
        <b-img 
          class="logo" 
          :src="$store.state.style.pictures.logoPart2" 
          fluid /> 
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"/>
      <b-collapse is-nav id="nav_collapse">
        <b-nav class="h-10">
          <b-navbar-nav >
            <b-nav-item-dropdown 
              class="nav-link my-menu" 
              text="Latest works" 
              left>
              <b-dropdown-item 
                v-for="item in items" 
                :key="item.path" 
                :to="item.path">
              {{ item.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-nav>
          <b-nav class="ml-auto">
            <b-navbar-nav >
               <!--  <b-nav-item-dropdown :class="{'nav-link': true, show: showLocale}" @click.prevent="onLocale(true)" @focus="onLocale(true)" @blur="onLocale(false)" :text="{{$t('header.locale')}}" right>
                  <b-dropdown-item class="dropdown-menu"  v-for="(value, name) in locale" :key="name">
                    <router-link class="dropdown-item" :to="'/' + name + ($route.params.locale ? $route.fullPath.substr($route.params.locale.length + 1) : $route.fullPath)">{{value}}</router-link>
                  </b-dropdown-item>
                </b-nav-item-dropdown> --> 
              <b-nav-item 
                href="https://www.linkedin.com/in/edouard-maleix" 
                target="_blank" 
                title="Linkedin">
                <font-awesome-icon  
                  :icon="['fab', 'linkedin-in']" 
                  size="lg" 
                  alt="linkedin icon"/>
              </b-nav-item>
              <b-nav-item 
                href="https://framagit.org/getlarge" 
                target="_blank" 
                title="Gitlab">
                <font-awesome-icon 
                  :icon="['fab', 'gitlab']" 
                  size="lg" 
                  alt="git icon"/>
              </b-nav-item>
              <!-- <b-nav-item 
                title="Chat"
                @click="chatHandler" >
                  <font-awesome-icon 
                    v-if="chatInit" 
                    class="on" :icon="['fab', 'rocketchat']" size="lg" alt="rocketchat-on icon"/>
                  <font-awesome-icon 
                    v-else-if="!chatInit" 
                    class="off"  
                    :icon="['fab', 'rocketchat']" 
                    size="lg" 
                    alt="rocketchat-off icon"/>
              </b-nav-item> -->
              <b-nav-item
                title="Tutorial"
                @click="help">
                <font-awesome-icon 
                  v-if="tutorial" 
                  class="on" 
                  icon="question-circle" 
                  size="lg" 
                  alt="tuto-on"/>
                <font-awesome-icon
                  v-else-if="!tutorial" 
                  class="off" 
                  icon="question-circle" 
                  size="lg" 
                  alt="tuto-off"/>
              </b-nav-item>
              <b-nav-item 
                title="MQTT status" 
                disabled>
                <font-awesome-icon 
                  v-if="connStatus === 'Connected'" 
                  class="on" 
                  icon="circle" 
                  size="lg" 
                  alt="mqtt-on icon"/>
                <font-awesome-icon 
                  v-else-if="connStatus === 'Disconnected'" 
                  class="off" 
                  icon="circle" 
                  size="lg" 
                  alt="mqtt-off icon"/>
              </b-nav-item>
            </b-navbar-nav>
          </b-nav>
      </b-collapse>
    </b-navbar>
    <cards
      v-if="currentPage !== null"
      :title="currentPage.name"
      :description="currentPage.tutorial"
      :tags="currentPage.tags"
      :img="currentPage.img"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
//  import liveRocketChat from "@/services/live-rocketchat";
import cards from "@/components/Utils/Cards";
import { EventBus } from "@/main";

export default {
  props: {},

  data() {
    return {
      //  chat: new liveRocketChat(),
    };
  },

  components: {
    cards: cards
  },

  created() {
    EventBus.$on("status:mqtt", status => {
      //console.log(`mqtt status : ${status}`)
      return this.$store.commit("menu/updateMqttStatus", status);
    });
    EventBus.$on("update:tutorial", (name, text, tags, img) => {
      //console.log(`ready : ${name}, ${text}, ${tags}, ${img}`)
      const payload = {
        name: name,
        tutorial: text,
        tags: tags,
        img: img
      };
      return this.$store.commit("menu/updateCurrentPage", payload);
    });
    EventBus.$on("stop:cards", () => {
      this.$store.commit("menu/updateTutorialStatus", false);
      return this.$store.commit("menu/updateCurrentPage", null);
    });
    EventBus.$on("stop:tutorial", () => {
      this.$store.commit("menu/updateTutorialStatus", false);
      return this.$store.commit("menu/updateCurrentPage", null);
    });
  },

  updated() {},

  beforeDestroy() {},

  watch: {},

  computed: {
    ...mapState({
      items: state => state.menu.items,
      serverURL: state => state.base.serverURL,
      connStatus: state => state.menu.mqttStatus,
      currentPage: state => state.menu.currentPage,
      icon1: state => state.menu.icon1,
      icon2: state => state.menu.icon2,
      chatInit: state => state.menu.chat,
      tutorial: state => state.menu.tutorial
    })
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

    // chatHandler() {
    //     if (this.chatInit === false) {
    //         this.$store.commit("updateChatStatus", true);
    //         return EventBus.$emit("start:chat");
    //     } else if (this.chatInit === true) {
    //         this.$store.commit("updateChatStatus", false);
    //         return EventBus.$emit("stop:chat");
    //     }
    // },

    // subs: (event) => {
    //     if (event) {
    //         alert(event.target.tagName);
    //     }
    // },

    help() {
      if (this.tutorial === true) {
        //console.log("help-off")
        this.$store.commit("menu/updateTutorialStatus", false);
        return this.$store.commit("menu/updateCurrentPage", null);
      } else if (this.tutorial === false) {
        //console.log("help-on")
        this.$store.commit("menu/updateTutorialStatus", true);
        return EventBus.$emit("start:tutorial");
      }
    },

    findIndex() {
      let me = this.$route.name;
      return this.items.findIndex(r => r.name === me);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/menu-navigation.scss";
</style>
