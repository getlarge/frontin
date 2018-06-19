<template>
  <div id="bottom-nav">
    <hr class="my-4">
    <b-container class="bv-example-row">
      <b-row align-h="center">
          <b-col sm="3" md="4" lg="4" lg-offset="1" class="prev"><router-link v-if="prev" :to="prev.path" > < {{ prev.title }} </router-link></b-col>
          <b-col sm="4" md="4" lg="4" class="source"><a :href="sourceHref" target="_blank"><font-awesome-icon :icon="['fab', 'gitlab']" /> {{ $route.name }}</a></b-col>
          <b-col sm="3" md="4" lg="4" class="next"><router-link v-if="next" :to="next.path" > {{ next.title }} > </router-link></b-col>
      </b-row>
      <b-row align-h="center">
          <b-col sm="1" lg="1"><b-button id="playButton" @click="getBuffer" class="btn btn-outline-success my-1 my-sm-0" type="button">Subs</b-button></b-col>
      </b-row>

    </b-container>

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
        // `this` points to the vm instance
        return "/" + this.$route.name
      },
    },

    methods: {
      
      getBuffer: function() {
        EventBus.$emit('get-buffer');
      },

      findIndex: function() {
        var me = this.$route.name;
        return routes.findIndex(r => r.name === me);
      }
    },
  }
</script>

<style scoped>

/*  a {
    display: block;
    position: absolute;
    width: 100px;
    text-decoration: none;
    font-weight: bold;
    color: blue;
  }

  a:hover {
    text-decoration: underline;
  }*/

  #bottom-nav {
    font-size: 14px; 
    margin: auto;
    position: relative;
    /*border-top: 1px dashed gray;*/
    padding-top: 0px;
    margin-top: 2%;
  }

  #links {
    display: block;
    width: 300px;
    height: 40px;
    position: relative;
  }

  .prev {
    text-align: left;
  }

  .source {
    text-align: center;
  }

  .next {
    text-align: right;
  }

</style>
