<template>
  <div id="top-nav">
      <b-navbar toggleable="sm" type="light" variant="light" fixed="top">
        <b-navbar-brand href="/"><b-img id="logo" src="@/assets/logo.png" fluid alt="Logo"/></img> Getlarge</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-nav class="w-50">
          <b-navbar-nav  col >
            <b-nav-item-dropdown class="nav-link" text="Menu" left>
              <b-dropdown-item v-for="item in items" :key="item.path">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          </b-nav>
          <b-navbar-nav class="ml-auto">
            <b-button id="playButton" @click="getBuffer" class="btn btn-outline-success my-1 my-sm-0" type="button">Subs</b-button>
            <b-nav-text class="nav-link" disabled>{{connStatus}}</b-nav-text>
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
    position: relative;
    width: 100%;
    vertical-align: middle;
    margin-top: 8%;
    margin-bottom: -5%;
    text-align: center;
  }

  

</style>
