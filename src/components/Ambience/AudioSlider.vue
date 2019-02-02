<template>
  <div class="audio-slider" :ref="`audioSlider-${id}`">
    <img
      class="player iconic"
      :src="icon"
      fluid
      @click.prevent.stop="togglePlayback"
    />
    <vue-slider :ref="`slider-${id}`" v-model="value" v-bind="options" />
  </div>
</template>

<script>
import { rgb } from "d3-color";
import { interpolateHclLong } from "d3-interpolate";
import vueSlider from "vue-slider-component";
import VueHowler from "vue-howler";
import { EventBus } from "@/services/PubSub";

export default {
  name: "AudioSlider",

  components: {
    vueSlider
  },

  mixins: [VueHowler],

  props: {
    width: {
      type: Number,
      required: false,
      default: 150
    },
    height: {
      type: Number,
      required: false,
      default: 150
    },
    icon: {
      type: String,
      required: false,
      default: "http://localhost:8080"
    },
    id: {
      type: [Number, String],
      required: false,
      default: 0
    },
    colors: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      isPlaying: false,
      value: 0.5,
      options: {
        eventType: "auto",
        width: "auto",
        height: 10,
        dotSize: 25,
        dotHeight: null,
        dotWidth: null,
        min: 0,
        max: 1,
        interval: 0.05,
        show: true,
        speed: 0.5,
        disabled: false,
        tooltip: false,
        tooltipDir: "top",
        reverse: false,
        data: null,
        clickable: false,
        realTime: false,
        lazy: true,
        formatter: null,
        bgStyle: {
          backgroundColor: "#e8e8e8",
          opacity: "0.5"
        },
        sliderStyle: null,
        processStyle: {
          backgroundColor: "#aaf7d3",
          opacity: "0.5"
        }
      },
      colorSet: [
        {
          color1: "#01c669",
          color2: "#ff830f" //"#48725e"
        }
      ]
    };
  },

  mounted() {
    this.color = interpolateHclLong(
      rgb(this.colorSet[0].color1),
      rgb(this.colorSet[0].color2)
    );
    if (this.$props.icon !== null) {
      this.initialize();
      this.setListeners();
    } else {
      this.audioSlider.style.opacity = 0;
    }
  },

  updated() {
    //console.log("props", this.$props);
    this.setVolume(this.value);
    EventBus.$emit("start:audio-slider", this.$props.key, this.value);
  },

  beforeDestroy() {
    //this.stop()
  },

  methods: {
    initialize() {
      this.audioSlider = this.$refs[`audioSlider-${this.$props.id}`];
      this.slider = this.$refs[`slider-${this.$props.id}`];
      this.setVolume(this.value);
      this.audioSlider.style.opacity = 0.6;
    },

    toggleBG() {
      this.audioSlider.style.opacity = this.isPlaying ? "1" : "0.6";
    },

    setListeners() {
      this.$on("play", () => {
        this.isPlaying = true;
        this.toggleBG();
      });

      this.$on("pause", () => {
        this.isPlaying = false;
        this.toggleBG();
      });

      EventBus.$on("file-uploader", event => {
        if (event === "add") {
          //  return console.log(this);
          //this.$props.icon = "http://localhost:3000/images/3"
        }
      });
      EventBus.$on("update:audio-slider", value => {
        if (this.slider.processStyle !== null) {
          return (this.slider.processStyle.backgroundColor = this.color(value));
        }
        //console.log("value", value);
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/ambienz.scss";
</style>
