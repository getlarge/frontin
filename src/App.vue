<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view/>
  </div>
</template>

<script>

import config from '@/config.json'
import mqttClient  from '@/services/mqtt-client'
import topNav from '@/components/menu-navigation'
import { EventBus } from '@/main';

export default {
  // props: [
  //   client,
  //   'server'
  // ], 
  name: "App",
  components: { 
    topNav 
  },

  data() {
    return {
      client: new(mqttClient),
      buffer: [],
      pageTopic: "getlarge" + this.$route.path + "main",
    }
  },
  
  created() {
    //console.log("APP", this)
    this.client.openStream();
    this.client.addSubscribe(this.$route.path, "mysensors/GW4-out/99/#");
  },
   
  beforeDestroy() {
    this.client.close();
    EventBus.$off();
  },

  watch: {

  },

  computed: {

  },

  methods: {

  },
}

</script>

<style scoped>

  @import url("@/assets/css/fonts.css")

  body {
    min-height: 100%;
    margin: 0; 
  }

  h1 { 
    font-size: 36px; 
    margin: 10px 0; 
    text-transform: uppercase; 
  }
  h2, h3 { 
    font-size: 18px; 
    margin: 5px 0; 
  }
  h4 {
    font: 400 120px/500px ;
    text-align: center;
    width: 960px;
    height: 500px;
    margin: 0;
    position: absolute;
  }
  h6 {
    margin-top: 20px;
  }

  #app {
    font-family: 'SourceCode', sans-serif; 
    font-size: 16px;  
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }



</style>
