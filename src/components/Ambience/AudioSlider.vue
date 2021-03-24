<template>
  <div class="audio-slider" :ref="`audioSlider-${id}`">
    <img class="player iconic" :src="icon" fluid @click.prevent.stop="togglePlayback" />
    <vue-slider :ref="`slider-${id}`" v-model="value" @change="onSliderUpdate" v-bind="options" />
  </div>
</template>

<script>
import { rgb } from 'd3-color';
import { interpolateHclLong } from 'd3-interpolate';
import 'vue-slider-component/theme/default.css';
import VueHowler from 'vue-howler';

export default {
  name: 'AudioSlider',

  components: {
    vueSlider: () => import('vue-slider-component'),
  },

  mixins: [VueHowler],

  props: {
    width: {
      type: Number,
      required: false,
      default: 150,
    },
    height: {
      type: Number,
      required: false,
      default: 150,
    },
    icon: {
      type: String,
      required: true,
      default: 'http://localhost:8080',
    },
    id: {
      type: [Number, String],
      required: true,
      default: 0,
    },
    colors: {
      type: Array,
      default: null,
    },
    colorSet: {
      type: Array,
      required: false,
      default: () => [
        {
          color1: '#528fa2',
          color2: '#2bb673',
        },
      ],
    },
  },

  data() {
    return {
      isPlaying: false,
      value: 0.5,
      options: {
        eventType: 'auto',
        width: 'auto',
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
        // tooltip: '',
        // tooltipDir: 'top',
        reverse: false,
        data: null,
        clickable: false,
        realTime: false,
        lazy: true,
        formatter: null,
        bgStyle: {
          backgroundColor: '#444b4e',
          opacity: '0.5',
        },
        sliderStyle: null,
        processStyle: {
          backgroundColor: '#aaf7d3',
          opacity: '0.5',
        },
      },
    };
  },

  mounted() {
    this.colorInterpolate = interpolateHclLong(rgb(this.colorSet[0].color1), rgb(this.colorSet[0].color2));
    this.initialize();
  },

  beforeDestroy() {
    // this.stop()
    this.$off('play', this.togglePlay(true));
    this.$off('pause', this.togglePlay(false));
  },

  methods: {
    initialize() {
      this.audioSlider = this.$refs[`audioSlider-${this.$props.id}`];
      this.slider = this.$refs[`slider-${this.$props.id}`];
      this.setVolume(this.value);
      this.audioSlider.style.opacity = 0.6;
      this.$on('play', this.togglePlay(true));
      this.$on('pause', this.togglePlay(false));
    },

    onSliderUpdate(value, index) {
      this.setVolume(value);
      this.slider.processStyle.backgroundColor = this.colorInterpolate(value);
      this.$emit('update:slider', value, index);
    },

    togglePlay(isPlaying) {
      return () => {
        this.isPlaying = isPlaying;
        this.audioSlider.style.opacity = isPlaying ? '1' : '0.6';
      };
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/ambienz.scss';
</style>
