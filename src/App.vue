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
    import topNav from '@/containers/menu-navigation'
    import bottomNav from '@/containers/footer-navigation'
    import { EventBus } from '@/main'


    export default {
        name: "App",
        components: { 
            topNav,
            bottomNav
        },

        data() {
            return {
                appName: config.inTopic,
                client: new(mqttClient),
                chat: new(liveRocketChat),
                showLocale: false,
                showNav: false,
            }
        },
        // beforeCreate() {
        //   if (this.$route.params.locale && this.$route.params.locale !== this.$i18n.locale) {
        //     this.$i18n.locale = this.$route.params.locale
        //   }
        // },

        // beforeUpdate() {
        //   if (this.$route.params.locale && this.$route.params.locale !== this.$i18n.locale) {
        //     this.$i18n.locale = this.$route.params.locale
        //   }
        // },

        created() {
            console.log('%c Getlarge - 2018 ', 'background: #33b277; color: white; display: block; border-radius: 5px; font-size: 16px;');
            this.client.openStream();
            this.client.sub(this.appName + "/#")
            //this.client.sendMessage( this.appName + "/logs", "Getlarge : frontin connected")
            this.client.sendMessage( this.appName + "/stat", "connected");
        },
         
        mounted() {

        },

        beforeDestroy() {
            this.client.sendMessage( this.appName + "/stat", "disconnected");
            this.client.close();
            EventBus.$off();
        },

        watch: {

        },

        computed: {
          // locale() {
          //   let i18n = this.$i18n
          //   return i18n.messages[i18n.locale].locale
          // },
        },

        methods: {

        },
    }

</script>

<style lang="scss" >
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

    @font-face { /* Market Deco - latin */
        font-family: 'MarketDeco';
        font-weight: normal;
        font-style: normal;
        src: url('./assets/fonts/MarketDeco/MarketDeco.woff2') format('woff2'),
             url('./assets/fonts/MarketDeco/MarketDeco.woff') format('woff'),
             url('./assets/fonts/MarketDeco/MarketDeco.eot') format('embedded-opentype'),
             url('./assets/fonts/MarketDeco/MarketDeco.ttf') format('truetype');
    }

/*  @import 'font-awesome/css/font-awesome.css'
*//*  @import url("@/assets/css/main.css")
*/

    #app {
        font-family: 'Aloes-Rg'; 
        font-size: 16px;  
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .livechat-room {
        font-family: 'Aloes-Rg'; 
        font-size: 16px;  
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>
