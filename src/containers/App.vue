<template>
    <div id="app">
        <top-nav></top-nav>
        <router-view/>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
import mqttClient from "@/services/mqtt-client";
import topNav from "@/containers/menu-navigation";
import bottomNav from "@/containers/footer-navigation";
import { EventBus } from "@/main";
import { localStore } from "@/services/localStore";

export default {
    name: "App",
    components: {
        topNav,
        bottomNav
    },

    data() {
        return {
            appName: "getlarge",
            path: this.$route.name,
            agent: "",
            sessionId: 0,
            client: new mqttClient(),
            showLocale: false,
            showNav: false
        };
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
        console.log(
            "%c getlarge.eu - 2018 ",
            "background: #33b277; color: white; display: block; width: 140px; border-radius: 5px; font-size: 12px;"
        );
        //console.log(this)
        this.client.openStream();
        const id = localStore.getRandomInt(1000, 5000);
        this.checkNavigator();
        localStore.initStorage(this.agent, id);
        this.sessionId = localStore.getStorage("sessionId");
        // console.log(this.agent);
        // console.log("session #" + this.sessionId);
    },

    mounted() {
        this.client.sub(this.appName + "/#");
        this.client.sendMessage(
            this.appName +
                "/sessions/" +
                this.agent +
                "_" +
                this.sessionId +
                "/" +
                this.$route.name,
            "opened"
        );
        this.client.sendMessage(this.appName + "/stat", "connected");
        //this.rightClickPrevent();
    },

    updated() {
        this.client.sendMessage(
            this.appName +
                "/sessions/" +
                this.agent +
                "_" +
                this.sessionId +
                "/" +
                this.$route.name,
            "opened"
        );
        this.client.sendMessage(this.appName + "/stat", "connected");
    },

    beforeDestroy() {
        this.client.sendMessage(this.appName + "/stat", "disconnected");
        this.client.close();
        EventBus.$off();
        this.$localStorage.remove("sessionId");
    },

    watch: {},

    computed: {
        // locale() {
        //   let i18n = this.$i18n
        //   return i18n.messages[i18n.locale].locale
        // },
    },

    methods: {
        // login() {
        //     const { username, password } = this;
        //     this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        //         this.$router.push('/')
        //     })
        // },

        checkNavigator() {
            var sBrowser,
                sUsrAg = navigator.userAgent;
            if (sUsrAg.indexOf("Firefox") > -1) {
                sBrowser = "Firefox";
                //"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
            } else if (sUsrAg.indexOf("Opera") > -1) {
                sBrowser = "Opera";
            } else if (sUsrAg.indexOf("Trident") > -1) {
                sBrowser = "Internet Explorer";
                //"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
            } else if (sUsrAg.indexOf("Edge") > -1) {
                sBrowser = "Edge";
                //"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
            } else if (sUsrAg.indexOf("Chrome") > -1) {
                sBrowser = "Chrome";
                //"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
            } else if (sUsrAg.indexOf("Safari") > -1) {
                sBrowser = "Safari";
                //"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
            } else {
                sBrowser = "unknown";
            }
            this.agent = sBrowser;
        }

        // rightClickPrevent() {
        //     selectAll("img").on("contextmenu", function() {
        //         event.preventDefault();
        //     });
        // }
    }
};
</script>

<style lang="scss" >
@font-face {
    /* Aloes Regular - latin */
    font-family: "Aloes-Rg";
    font-weight: normal;
    font-style: normal;
    src: url("../assets/fonts/Aloes/Aloes-Rg.woff2") format("woff2"),
        url("../assets/fonts/Aloes/Aloes-Rg.woff") format("woff"),
        url("../assets/fonts/Aloes/Aloes-Rg.eot") format("embedded-opentype"),
        url("../assets/fonts/Aloes/Aloes-Rg.ttf") format("truetype");
}

@font-face {
    /* Aloes Bold - latin */
    font-family: "Aloes-Bd";
    font-weight: normal;
    font-style: normal;
    src: url("../assets/fonts/Aloes/Aloes-Bd.woff2") format("woff2"),
        url("../assets/fonts/Aloes/Aloes-Bd.woff") format("woff"),
        url("../assets/fonts/Aloes/Aloes-Bd.eot") format("embedded-opentype"),
        url("../assets/fonts/Aloes/Aloes-Bd.ttf") format("truetype");
}

@font-face {
    /* Market Deco - latin */
    font-family: "MarketDeco";
    font-weight: normal;
    font-style: normal;
    src: url("../assets/fonts/MarketDeco/MarketDeco.woff2") format("woff2"),
        url("../assets/fonts/MarketDeco/MarketDeco.woff") format("woff"),
        url("../assets/fonts/MarketDeco/MarketDeco.eot") format("embedded-opentype"),
        url("../assets/fonts/MarketDeco/MarketDeco.ttf") format("truetype");
}

@font-face {
    /* Garamond Regular - latin */
    font-family: "GaramondNo8-Regular";
    font-weight: normal;
    font-style: normal;
    src: url("../assets/fonts/Garamond/GaramondNo8-Regular.woff2") format("woff2"),
        url("../assets/fonts/Garamond/GaramondNo8-Regular.woff") format("woff"),
        url("../assets/fonts/Garamond/GaramondNo8-Regular.eot") format("embedded-opentype"),
        url("../assets/fonts/Garamond/GaramondNo8-Regular.ttf") format("truetype");
}

#app {
    font-family: "Aloes-Rg";
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.livechat-room {
    font-family: "Aloes-Rg";
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
