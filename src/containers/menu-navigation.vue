<template>
  <div id="top-nav">
      <b-navbar toggleable="sm" type="light" variant="light" sticky>
        <b-navbar-brand href="/"><b-img id="logo" src="static/img/logo.png" fluid alt="Logo"/> Getlarge</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-nav class="w-50">
          <b-navbar-nav >
            <b-nav-item-dropdown class="nav-link" text="Menu" left>
              <b-dropdown-item v-for="item in items" :key="item.path">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          </b-nav>
          <b-navbar-nav class="ml-auto">
           <!--  <b-nav-item-dropdown :class="{'nav-link': true, show: showLocale}" @click.prevent="onLocale(true)" @focus="onLocale(true)" @blur="onLocale(false)" :text="{{$t('header.locale')}}" right>
              <b-dropdown-item class="dropdown-menu"  v-for="(value, name) in locale" :key="name">
                <router-link class="dropdown-item" :to="'/' + name + ($route.params.locale ? $route.fullPath.substr($route.params.locale.length + 1) : $route.fullPath)">{{value}}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown> --> 
            <b-nav-item href="https://fr.linkedin.com/in/edouard-maleix-a0a390b1" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin-in']" size="lg" /></b-nav-item>
            <b-nav-item href="https://framagit.org/getlarge" target="_blank"><font-awesome-icon :icon="['fab', 'gitlab']" size="lg"/></b-nav-item>
            <b-nav-text class="nav-link" disabled>{{connStatus}}</b-nav-text>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
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
        connStatus: null,
        pageTopic: "getlarge" + this.$route.path + "main",
      }
    },
    
    created() {
    // console.log("parent", this.$parent)
      EventBus.$on('got-status', status => {
        //console.log(`mqtt status : ${status}`)
        return this.connStatus = status
      });

      EventBus.$on('got-store', buffer => {
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
      // onLocale(show) {
      //   if (show) {
      //     this.showLocale = show
      //   } else {
      //     setTimeout(() => {
      //       this.showLocale = show
      //     }, 128)
      //   }
      // },

      subs : event => {
        if (event) {
          alert(event.target.tagName)
        }      
      },

      getBuffer: function() {
        EventBus.$emit('get-store');
      },

      findIndex: function() {
        var me = this.$route.name;
        return routes.findIndex(r => r.name === me);
      }
    },
  }
</script>

<style scoped>

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

  .dropdown-item:active {
    background-color: transparent;
    border: 1px;
    border-color: #f9b23e;
  }

  .dropdown-item:focus {
    background-color: transparent;
    border: 1px;
    border-color: #f9b23e;
  }

  a {
    color: #686868;
  }

  a:hover{
    color: #33b277;
    text-decoration: none;
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
