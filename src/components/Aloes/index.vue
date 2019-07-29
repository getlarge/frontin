<template lang="html">
  <iframe
    src="https://aloes.io"
    :width="innerWidth"
    :height="innerHeight"
  ></iframe>
</template>

<script type="text/javascript">
export default {
  name: "Aloes",

  components: {},

  data() {
    return {};
  },

  computed: {
    colors() {
      return this.$store.state.style.palette;
    },
    innerHeight() {
      return window.innerHeight;
    },
    innerWidth() {
      return window.innerWidth;
    }
  },

  methods: {}
};
</script>

<style lang="scss">
@import "../../styles/aloes-presentation.scss";
</style>
