<template>
  <div id="top-nav">
    <b-navbar toggleable="sm" type="light" variant="light" sticky>
      <b-navbar-brand href="/">
        <b-img class="logo" height="45px" :src="$store.state.style.pictures.logoPart1" fluid />
        <b-img class="logo" height="45px" :src="$store.state.style.pictures.logoPart2" fluid />
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse is-nav id="nav_collapse">
        <b-nav class="h-10">
          <b-navbar-nav>
            <b-nav-item-dropdown class="nav-link my-menu" text="Latest works" left>
              <b-dropdown-item v-for="item in items" :key="item.path" :to="item.path">
                {{ item.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-nav>
        <b-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item href="https://www.linkedin.com/in/edouard-maleix" target="_blank" title="Linkedin">
              <font-awesome-icon :icon="['fab', 'linkedin-in']" size="lg" alt="linkedin icon" />
            </b-nav-item>
            <b-nav-item href="https://github.com/getlarge" target="_blank" title="Github">
              <font-awesome-icon :icon="['fab', 'github']" size="lg" alt="git icon" />
            </b-nav-item>
            <b-nav-item title="Tutorial" @click="help">
              <font-awesome-icon v-if="tutorial" class="on" icon="question-circle" size="lg" alt="tuto-on" />
              <font-awesome-icon v-else-if="!tutorial" class="off" icon="question-circle" size="lg" alt="tuto-off" />
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
  </div>
</template>

<script>
import EventBus from '@/services/EventBus';

export default {
  name: 'MenuNavigation',

  props: {},

  data() {
    return {};
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
    },
  },

  mounted() {
    this.setListeners();
  },

  methods: {
    setListeners() {
      EventBus.$on('status:mqtt', (status) => {
        return this.$store.commit('menu/updateMqttStatus', status);
      });

      EventBus.$on('update:tutorial', (name, text, tags, img) => {
        const payload = {
          name: name,
          tutorial: text,
          tags: tags,
          img: img,
        };
        return this.$store.commit('menu/updateCurrentPage', payload);
      });

      EventBus.$on('stop:cards', () => {
        this.$store.commit('menu/updateTutorialStatus', false);
        return this.$store.commit('menu/updateCurrentPage', null);
      });

      EventBus.$on('stop:tutorial', () => {
        this.$store.commit('menu/updateTutorialStatus', false);
        return this.$store.commit('menu/updateCurrentPage', null);
      });
    },

    help() {
      if (this.tutorial === true) {
        this.$store.commit('menu/updateTutorialStatus', false);
        this.$store.commit('menu/updateCurrentPage', null);
      } else if (this.tutorial === false) {
        this.$store.commit('menu/updateTutorialStatus', true);
        EventBus.$emit('start:tutorial');
      }
    },

    findIndex() {
      const me = this.$route.name;
      return this.items.findIndex((r) => r.name === me);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/menu-navigation.scss';
</style>
