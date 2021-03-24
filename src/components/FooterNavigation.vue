<template>
  <div id="bottom-nav">
    <hr class="my-4" />
    <router-link v-if="prev && prev.title" :to="prev.path" class="prev">
      {{ ` ${prev.title} -` }}
    </router-link>

    <a :href="sourceHref" class="source" target="_blank">
      <font-awesome-icon :icon="['fab', 'github']" />
      {{ $route.name }}
    </a>

    <router-link v-if="next && next.title" :to="next.path" class="next">
      {{ `- ${next.title} ` }}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTopic: `getlarge${this.$route.path}main`,
    };
  },

  computed: {
    routes() {
      return this.$store.state.menu.items;
    },
    gitLink() {
      return this.$store.state.gitLink;
    },
    prev() {
      const index = this.findIndex();
      if (index == -1) {
        return undefined;
      }
      return index > 0 ? this.routes[index - 1] : undefined;
    },
    next() {
      const index = this.findIndex();
      if (index == -1) {
        return undefined;
      }
      return index + 1 < this.routes.length ? this.routes[index + 1] : undefined;
    },
    sourceHref() {
      const index = this.findIndex();
      if (index == -1) {
        return this.gitLink;
      }
      return this.routes[index].source;
    },
    routePath() {
      return `/${this.$route.name}`;
    },
  },

  methods: {
    findIndex() {
      const me = this.$route.name;
      return this.routes.findIndex((r) => r.name === me);
    },
  },
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
