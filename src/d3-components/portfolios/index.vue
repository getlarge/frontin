<!--

Explanation:
  It is not really nester routes.
  It is magic of aliases and $watch route.
  See /src/router/demos.js (Bubbles: nested routes part)
  and /src/router/index.js

Links:
  Dynamic-matching: https://router.vuejs.org/en/essentials/dynamic-matching.html
  Nested Routes: https://router.vuejs.org/en/essentials/nested-routes.html

-->

<template>
  <div class="holder">
    <!-- <h4>Earthquakes in september 2012</h4> -->
    <groupMenu :links="links" :activeLink="activeLink" />
    <nodes :groupBy="activeLink.layout" />

  </div>
</template>

<script>

import * as _ from 'lodash'
import menu from '@/d3-components/portfolios/menu'
import nodes from '@/d3-components/portfolios/nodes'


const MY_URL_PREFIX = 'portfolios';

const LINKS = [
    {
      name: 'None',
      path: '',
      layout: 'total'
    },
    {
      name: 'By id',
      path: '/id',
      layout: 'id'
    },
    {
      name: 'By group',
      path: '/group',
      layout: 'group'
    }
  ].map(d => {
    d.path = '#/' + MY_URL_PREFIX + d.path;
    d.active = false;
    return d;
  });


export default {
  components: {
    groupMenu: menu,
    nodes: nodes
  },
  data() {
    return {
      activeLink: this.findActiveLink()
    }
  },
  computed: {
    links: function() {
      return LINKS;
    }
  },
  methods: {
    findActiveLink: function() {
      _.each(LINKS, l => {
        l.active = false;
      })
      var link = _.find(LINKS, l => l.path == '#' + this.$route.path);
      if(!link) {
        link = LINKS[0];
      }
      return link;
    }
  },
  watch: {
    '$route' (to, from) {
      this.activeLink = this.findActiveLink();
    }
  }
}
</script>

<style scoped>
  .holder {
    width: 500px;
    margin: auto;
  }
  .menu ul {
    padding: 0;
    margin: 0;
  }
  .menu li {
    text-align: left;
  }
</style>
