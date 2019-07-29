<template>
  <div id="top-nav">
    <b-navbar toggleable="sm" type="light" variant="light" sticky>
      <b-navbar-brand href="/">
        <b-img
          class="logo"
          :src="$store.state.style.pictures.logoPart1"
          fluid
        />
        <b-img
          class="logo"
          :src="$store.state.style.pictures.logoPart2"
          fluid
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse is-nav id="nav_collapse">
        <b-nav class="h-10">
          <b-navbar-nav>
            <b-nav-item-dropdown
              class="nav-link my-menu"
              text="Latest works"
              left
            >
              <b-dropdown-item
                v-for="item in items"
                :key="item.path"
                :to="item.path"
              >
                {{ item.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-nav>
        <b-nav class="ml-auto">
          <b-navbar-nav>
            <!--  <b-nav-item-dropdown :class="{'nav-link': true, show: showLocale}" @click.prevent="onLocale(true)" @focus="onLocale(true)" @blur="onLocale(false)" :text="{{$t('header.locale')}}" right>
                  <b-dropdown-item class="dropdown-menu"  v-for="(value, name) in locale" :key="name">
                    <router-link class="dropdown-item" :to="'/' + name + ($route.params.locale ? $route.fullPath.substr($route.params.locale.length + 1) : $route.fullPath)">{{value}}</router-link>
                  </b-dropdown-item>
                </b-nav-item-dropdown> -->
            <b-nav-item
              href="https://www.linkedin.com/in/edouard-maleix"
              target="_blank"
              title="Linkedin"
            >
              <font-awesome-icon
                :icon="['fab', 'linkedin-in']"
                size="lg"
                alt="linkedin icon"
              />
            </b-nav-item>
            <b-nav-item
              href="https://framagit.org/getlarge"
              target="_blank"
              title="Gitlab"
            >
              <font-awesome-icon
                :icon="['fab', 'gitlab']"
                size="lg"
                alt="git icon"
              />
            </b-nav-item>
            <b-nav-item title="Tutorial" @click="help">
              <font-awesome-icon
                v-if="tutorial"
                class="on"
                icon="question-circle"
                size="lg"
                alt="tuto-on"
              />
              <font-awesome-icon
                v-else-if="!tutorial"
                class="off"
                icon="question-circle"
                size="lg"
                alt="tuto-off"
              />
            </b-nav-item>
            <b-nav-item title="MQTT status" disabled>
              <font-awesome-icon
                v-if="mqttStatus === 'Connected'"
                class="on"
                icon="circle"
                size="lg"
                alt="mqtt-on icon"
              />
              <font-awesome-icon
                v-else-if="mqttStatus === 'Disconnected'"
                class="off"
                icon="circle"
                size="lg"
                alt="mqtt-off icon"
              />
            </b-nav-item>
          </b-navbar-nav>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <!-- <cards
      v-if="currentPage !== null"
      :title="currentPage.name"
      :description="currentPage.tutorial"
      :tags="currentPage.tags"
      :img="currentPage.img"
    /> -->
  </div>
</template>

<script>
import bCollapse from "bootstrap-vue/es/components/collapse/collapse";
import bImg from "bootstrap-vue/es/components/image/img";
import bNav from "bootstrap-vue/es/components/nav/nav";
import bNavbar from "bootstrap-vue/es/components/navbar/navbar";
import bNavbarNav from "bootstrap-vue/es/components/navbar/navbar-nav";
import bNavbarBrand from "bootstrap-vue/es/components/navbar/navbar-brand";
import bNavbarToggle from "bootstrap-vue/es/components/navbar/navbar-toggle";
import bNavItem from "bootstrap-vue/es/components/nav/nav-item";
import bNavItemDropdown from "bootstrap-vue/es/components/nav/nav-item-dropdown";
import bDropdownItem from "bootstrap-vue/es/components/dropdown/dropdown-item";
//  import Cards from "@/components/Utils/Cards";
import { EventBus } from "@/services/PubSub";

export default {
  name: "MenuNavigation",

  components: {
    "b-collapse": bCollapse,
    "b-img": bImg,
    "b-nav": bNav,
    "b-navbar": bNavbar,
    "b-navbar-nav": bNavbarNav,
    "b-navbar-brand": bNavbarBrand,
    "b-navbar-toggle": bNavbarToggle,
    "b-nav-item": bNavItem,
    "b-dropdown-item": bDropdownItem,
    "b-nav-item-dropdown": bNavItemDropdown
    //  cards: () => import("@/components/Utils/Cards"),
  },

  props: {},

  data() {
    return {
      //  chat: new liveRocketChat(),
    };
  },

  computed: {
    items() {
      return this.$store.state.menu.items;
    },
    mqttStatus() {
      return this.$store.state.menu.mqttStatus;
    },
    currentPage() {
      return this.$store.state.menu.currentPage;
    },
    tutorial() {
      return this.$store.state.menu.tutorial;
    }
  },

  mounted() {
    this.setListeners();
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

    // subs: (event) => {
    //     if (event) {
    //         alert(event.target.tagName);
    //     }
    // },

    setListeners() {
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
