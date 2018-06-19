<template>
  <div id="bottom-nav">
    <hr class="my-4">
    <b-container class="bv-example-row">
      <b-row align-h="center">
          <b-col sm="4" style="text-align: left"><router-link v-if="prev" :to="prev.path" > < {{ prev.title }} </router-link></b-col>
          <b-col sm="4" style="text-align: center"><a :href="sourceHref" target="_blank">{{ $route.name }}</a></b-col>
          <b-col sm="4" style="text-align: right"><router-link v-if="next" :to="next.path" > {{ next.title }} > </router-link></b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>

  import config from '@/config.json'
  import { routes } from '@/router/menu'
  import { EventBus } from '@/main';

  export default {
    props: {
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
    left: 0px;
    text-align: left;
  }

  .source {
    left:100px;
    text-align: center;
  }

  .next {
    right: 0px;
    text-align: right;
  }

</style>
