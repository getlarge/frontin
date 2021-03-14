<template>
  <div id="app">
    <top-nav />
    <router-view />
    <bottom-nav />
  </div>
</template>

<script>
import topNav from '@/components/MenuNavigation';
import bottomNav from '@/components/FooterNavigation';
import { EventBus } from '@/services/PubSub';
// import { localStore } from '@/services/LocalStore';

export default {
  name: 'App',

  components: {
    topNav,
    bottomNav,
  },

  data() {
    return {
      appName: 'getlarge',
      path: this.$route.name,
      agent: '',
      sessionId: 0,
      //  client: new Mqtt(),
      showLocale: false,
      showNav: false,
      customElement: null,
    };
  },

  computed: {
    windowWidth: {
      get() {
        return this.$store.state.windowWidth;
      },
      set(value) {
        this.$store.commit('setModelKV', { key: 'windowWidth', value });
      },
    },
    windowHeight: {
      get() {
        return this.$store.state.windowHeight;
      },
      set(value) {
        this.$store.commit('setModelKV', { key: 'windowHeight', value });
      },
    },

    documentWidth: {
      get() {
        return this.$store.state.documentWidth;
      },
      set(value) {
        this.$store.commit('setModelKV', { key: 'documentWidth', value });
      },
    },
    documentHeight: {
      get() {
        return this.$store.state.documentHeight;
      },
      set(value) {
        this.$store.commit('setModelKV', { key: 'documentHeight', value });
      },
    },
  },

  created() {
    // eslint-disable-next-line no-console
    console.log(
      '%c getlarge.eu - 2021 ',
      'background: #33b277; color: white; display: block; width: 140px; border-radius: 5px; font-size: 12px;',
    );
    // const id = localStore.getRandomInt(1000, 5000);
    // this.checkNavigator();
    // localStore.initStorage(this.agent, id);
    // this.sessionId = localStore.getStorage('sessionId');
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.updateSize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateSize);
    EventBus.$off();
    this.$localStorage.remove('sessionId');
  },

  methods: {
    updateSize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.documentWidth = document.documentElement.clientWidth;
      this.documentHeight = document.documentElement.clientHeight;
    },

    checkNavigator() {
      let sBrowser;
      const sUsrAg = navigator.userAgent;
      if (sUsrAg.indexOf('Firefox') > -1) {
        sBrowser = 'Firefox';
        //"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
      } else if (sUsrAg.indexOf('Opera') > -1) {
        sBrowser = 'Opera';
      } else if (sUsrAg.indexOf('Trident') > -1) {
        sBrowser = 'Internet Explorer';
        //"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
      } else if (sUsrAg.indexOf('Edge') > -1) {
        sBrowser = 'Edge';
        //"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
      } else if (sUsrAg.indexOf('Chrome') > -1) {
        sBrowser = 'Chrome';
        //"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
      } else if (sUsrAg.indexOf('Safari') > -1) {
        sBrowser = 'Safari';
        //"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
      } else {
        sBrowser = 'unknown';
      }
      this.agent = sBrowser;
    },
  },
};
</script>

<style lang="scss">
@import './styles/app.scss';
</style>
