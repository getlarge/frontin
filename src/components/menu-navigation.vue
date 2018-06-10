<template>
  <div id="top-nav">

      <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/"><b-img id="logo" src="@/assets/logo.png" fluid alt="Logo"/></img>Getlarge</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-nav vertical pills class="w-25">
          <b-navbar-nav  col lg="8">
            <b-nav-item-dropdown class="nav-link" text="Menu" left>
              <b-dropdown-item v-for="item in items" :key="item.path">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#">
              <router-link v-if="prev" :to="prev.path" class="nav-link prev"> < {{ prev.title }} </router-link>
            </b-nav-item>
            <b-nav-item active><a :href="sourceHref" target="_blank" class="nav-link">{{ $route.name }}</a></b-nav-item>
            <b-nav-item >
              <router-link v-if="next" :to="next.path" class="nav-link next"> {{ next.title }} > </router-link>
            </b-nav-item>
          </b-navbar-nav>
          </b-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button id="playButton" v-on:click="getBuffer" class="btn btn-outline-success my-2 my-sm-0" type="button">Subs</b-button>
            </b-nav-form>
            <b-nav-item class="nav-link" disabled>Status: {{connStatus}}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

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
      connStatus: null,
      pageTopic: "getlarge" + this.$route.path + "main",
    }
  },
  
  created() {
  // console.log("parent", this.$parent)
    EventBus.$on('got-status', status => {
      console.log(`mqtt status : ${status}`)
      return this.connStatus = status
    });

    EventBus.$on('got-buffer', buffer => {
      console.log('mqtt buffer :', buffer)
    });
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
    subs : event => {
      //this.getBuffer();
      //return client.send("yolo", "yolo");
      if (event) {
        alert(event.target.tagName)
      }      
    },

    getBuffer: function() {
      EventBus.$emit('get-buffer');
    },

    // getStatus: function() {
    //   this.currentStatus = this.mqttStatus;
    // },

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

  #holder {
    margin: auto;
    position: relative;
    /*border-top: 1px dashed gray;*/
    border-bottom: 1px dashed gray;
    padding-top: 0px;
    margin-top: 0px;
    margin-bottom: 10px;
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

  #logo {
    height: 45px;
    width: 45px;
  }

  .page-title {
    text-align: center;
  }

</style>
