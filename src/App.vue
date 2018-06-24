<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view/>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>

  import config from '@/config.json'
  import mqttClient  from '@/services/mqtt-client'
  import liveRocketChat  from '@/services/live-rocketchat'
  import topNav from '@/components/menu-navigation'
  import bottomNav from '@/components/footer-navigation'
  import { EventBus } from '@/main';

  export default {
    // props: [
    //   client,
    //   'server'
    // ], 
    name: "App",
    components: { 
      topNav,
      bottomNav
    },

    data() {
      return {
        client: new(mqttClient),
        chat: new(liveRocketChat),
        pageTopic: "getlarge" + this.$route.path + "main",
      }
    },
    
    created() {
      //console.log("APP", this)
      this.chat._initClient();
      this.client.openStream();
      this.client.addSubscribe(this.$route.path, "getlarge/#")
      this.client.sendMessage("logs", "Getlarge : frontin connected")
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


<style>
  @font-face { /* Aloes Regular - latin */
    font-family: 'Aloes-Rg';
    font-weight: normal;
    font-style: normal;
    src: url('./assets/fonts/Aloes/Aloes-Rg.woff2') format('woff2'),
         url('./assets/fonts/Aloes/Aloes-Rg.woff') format('woff'),
         url('./assets/fonts/Aloes/Aloes-Rg.eot') format('embedded-opentype'),
         url('./assets/fonts/Aloes/Aloes-Rg.ttf') format('truetype');
  }

  @font-face { /* Aloes Bold - latin */
    font-family: 'Aloes-Bd';
    font-weight: normal;
    font-style: normal;
    src: url('./assets/fonts/Aloes/Aloes-Bd.woff2') format('woff2'),
         url('./assets/fonts/Aloes/Aloes-Bd.woff') format('woff'),
         url('./assets/fonts/Aloes/Aloes-Bd.eot') format('embedded-opentype'),
         url('./assets/fonts/Aloes/Aloes-Bd.ttf') format('truetype');
  }

  @font-face { /* SourceCode Regular - latin */
    font-family: 'SourceCode-Rg';
    font-style: normal;
    font-weight: normal;
    src: url("./assets/fonts/SourceCodePro/SourceCodePro-Regular.eot");
    src: url('./assets/fonts/SourceCodePro/SourceCodePro-Regular.eot?#iefix') format('embedded-opentype'), 
      url('./assets/fonts/SourceCodePro/SourceCodePro-Regular.woff2') format('woff2'), 
      url('./assets/fonts/SourceCodePro/SourceCodePro-Regular.woff') format('woff'), 
      url('./assets/fonts/SourceCodePro/SourceCodePro-Regular.ttf') format('truetype');
  }

  @font-face { /* SourceCode Bold - latin */
    font-family: 'SourceCode-Bd';
    font-style: normal;
    font-weight: 500;
    src: url("./assets/fonts/SourceCodePro/SourceCodePro-Bold.eot");
    src: url('./assets/fonts/SourceCodePro/SourceCodePro-Bold.eot?#iefix') format('embedded-opentype'), 
      url('./assets/fonts/SourceCodePro/SourceCodePro-Bold.woff2') format('woff2'), 
      url('./assets/fonts/SourceCodePro/SourceCodePro-Bold.woff') format('woff'), 
      url('./assets/fonts/SourceCodePro/SourceCodePro-Bold.ttf') format('truetype');
  }
  @import 'font-awesome/css/font-awesome.css'
  @import url("@/assets/css/main.css")

  h1 { 
    font-family: 'Aloes-Bd'; 
    font-size: 20px; 
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
    font-family: 'Aloes-Rg'; 
    font-size: 16px;  
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
