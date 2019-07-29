<template>
  <div id="project-timeline">
    <mq-layout class="selector-mobile" mq="mobile">
      <button title="change display" class="selector" @click="changePage">
        <font-awesome-icon
          v-if="interactive"
          icon="toggle-on"
          size="2x"
          alt="switch"
        />
        <font-awesome-icon
          v-else-if="!interactive"
          icon="toggle-off"
          size="2x"
          alt="switch"
        />
        {{ title }}
      </button>
    </mq-layout>
    <mq-layout class="selector-tablet" mq="tablet">
      <button title="change display" class="selector" @click="changePage">
        <font-awesome-icon
          v-if="interactive"
          icon="toggle-on"
          size="2x"
          alt="switch"
        />
        <font-awesome-icon
          v-else-if="!interactive"
          icon="toggle-off"
          size="2x"
          alt="switch"
        />
        {{ title }}
      </button>
    </mq-layout>
    <mq-layout class="selector-laptop" mq="laptop">
      <button title="change display" class="selector" @click="changePage">
        <font-awesome-icon
          v-if="interactive"
          icon="toggle-on"
          size="2x"
          alt="switch"
        />
        <font-awesome-icon
          v-else-if="!interactive"
          icon="toggle-off"
          size="2x"
          alt="switch"
        />
        {{ title }}
      </button>
    </mq-layout>
    <mq-layout class="selector-desktop" mq="desktop">
      <button title="change display" class="selector" @click="changePage">
        <font-awesome-icon
          v-if="interactive"
          icon="toggle-on"
          size="2x"
          alt="switch"
        />
        <font-awesome-icon
          v-else-if="!interactive"
          icon="toggle-off"
          size="2x"
          alt="switch"
        />
        {{ title }}
      </button>
    </mq-layout>
    <mq-layout class="selector-xxl" mq="xxl">
      <button title="change display" class="selector" @click="changePage">
        <font-awesome-icon
          v-if="interactive"
          icon="toggle-on"
          size="3x"
          alt="switch"
        />
        <font-awesome-icon
          v-else-if="!interactive"
          icon="toggle-off"
          size="3x"
          alt="switch"
        />
        {{ title }}
      </button>
    </mq-layout>
    <div v-if="interactive">
      <timeline />
    </div>
    <div v-else-if="!interactive">
      <cv />
    </div>
  </div>
</template>

<script>
// import CV from "./CV";
// import Timeline from "./Timeline";
import { EventBus } from "@/services/PubSub";

export default {
  data() {
    return {
      pageTopic: "getlarge" + this.$route.path,
      interactive: false
    };
  },

  components: {
    cv: () => import("@/components/Experience/CV"),
    timeline: () => import("@/components/Experience/Timeline")
    // cv: CV,
    // timeline: Timeline
  },

  created() {},

  mounted() {
    EventBus.$on("update:interactive", state => {
      if (state || !state) {
        return this.interactive === state;
      }
    });
  },

  updated() {
    //console.log("this", this)
  },

  beforeDestroy() {},

  watch: {},

  computed: {
    btnStates() {
      return this.buttons.map(btn => btn.state);
    },
    title() {
      if (this.interactive) {
        return "CV";
      }
      return "Timeline";
    }
  },

  methods: {
    changePage() {
      if (this.interactive) {
        return (this.interactive = false);
      } else if (!this.interactive) {
        return (this.interactive = true);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/experience.scss";
</style>
