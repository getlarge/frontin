<template>
  <div class="audio-slider" :ref="`audioSlider-${id}`">
    <img class="player iconic" :src="icon" fluid @click.prevent.stop="togglePlayback" />
    <vue-slider :ref="`slider-${id}`" v-model="value" @change="onSliderUpdate" v-bind="options" />
  </div>
</template>

<script>
import { rgb } from 'd3-color';
import { interpolateHclLong } from 'd3-interpolate';
import vueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import VueHowler from 'vue-howler';

export default {
  name: 'AudioSlider',

  components: {
    vueSlider,
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
      required: false,
      default: 'http://localhost:8080',
    },
    id: {
      type: [Number, String],
      required: false,
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
    this.color = interpolateHclLong(rgb(this.colorSet[0].color1), rgb(this.colorSet[0].color2));
    if (this.$props.icon !== null) {
      this.initialize();
      this.setListeners();
    } else {
      this.audioSlider.style.opacity = 0;
    }
  },

  // beforeDestroy() {
  //   this.stop()
  // },

  methods: {
    initialize() {
      this.audioSlider = this.$refs[`audioSlider-${this.$props.id}`];
      this.slider = this.$refs[`slider-${this.$props.id}`];
      this.setVolume(this.value);
      this.audioSlider.style.opacity = 0.6;
    },

    toggleBG() {
      this.audioSlider.style.opacity = this.isPlaying ? '1' : '0.6';
    },

    onSliderUpdate(value, index) {
      this.setVolume(value);
      this.slider.processStyle.backgroundColor = this.color(value);
      this.$emit('update:slider', value, index);
    },

    setListeners() {
      this.$on('play', () => {
        this.isPlaying = true;
        this.toggleBG();
      });

      this.$on('pause', () => {
        this.isPlaying = false;
        this.toggleBG();
      });

      // EventBus.$on('file-uploader', (event) => {
      //   if (event === 'add') {
      //     //  return console.log(this);
      //     //this.$props.icon = "http://localhost:3000/images/3"
      //   }
      // });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/ambienz.scss';
</style>
