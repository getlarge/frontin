<template>

  <div id="audio-slider" ref="audioSlider">
    <button class="player" @click="togglePlayback"  >
      <b-img class="iconic" :src="icon" fluid /></button>
    <vue-slider ref="slider1" v-model="value" v-bind="options"></vue-slider>
  </div>

</template>

<script>
  import { min, max, range, sum } from "d3-array"
  import { hsl, rgb } from "d3-color"
  import { easeLinear } from "d3-ease"
  import { format } from "d3-format"
  import { interpolateHcl } from "d3-interpolate"
  import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
  import { append, attr, event, select, selectAll, style } from "d3-selection"
  import { timer } from "d3-timer"
  import { active, transition } from "d3-transition"
  import { EventBus } from "@/main"
  import vueSlider from "vue-slider-component"
  import VueHowler from 'vue-howler'

  //import image from "@/../static/icons/rain.png"


  export default {
    props: ["icon", "id", "colors"], 
    mixins: [VueHowler],

    data() {
      return {
        //image: image,
        isPlaying : false,
        //id : 0,
        value: 0.5,
        colorSet: {
          color1: "#01c669",
          color2: "#48725e",
        },
        options: {
          eventType: 'auto',
          width: 'auto',
          height: 12,
          dotSize: 20,
          dotHeight: null,
          dotWidth: null,
          min: 0,
          max: 1,
          interval: 0.05,
          show: true,
          speed: 0.5,
          disabled: false,
          tooltip: false,
          tooltipDir: 'top',
          reverse: false,
          data: null,
          clickable: true,
          realTime: false,
          lazy: true,
          formatter: null,
          bgStyle: null,
          sliderStyle: null,
          processStyle: null,
        }
      }
    },
    components: {
      vueSlider
    },

    created() {

    },

    mounted() {
      
      this.initialize();

      this.$on('play', function (msg) {
        this.isPlaying = true;
        this.toggleBG();
      })
      this.$on('pause', function (msg) {
        this.isPlaying = false;
        this.toggleBG();
      })
    },

    updated() {
      //console.log("props", this.$props);
      this.setVolume(this.value);
      EventBus.$emit("audio-slider-value",this.$props.key, this.value);
      //this.color = interpolateHcl(rgb(this.$props.colorSet.color1),rgb(this.$props.colorSet.color2));

      // select(this.$el)
      //   .style("background-color", this.color(this.value))
    },


    beforeDestroy() {
      //this.stop()
    },

    watch: {

      icon(icon) {
        this._reinitialize()
      }
    },

    computed: {

    },

    methods: {
      initialize() {
        //this.color = interpolateHcl(rgb(this.colorSet.color1),rgb(this.colorSet.color1));
        //this.color = interpolateHcl(rgb(this.$props.colorSet.color1),rgb(this.$props.colorSet.color2));
        this.setVolume(this.value);

        select(this.$el)
          //.attr("id", "id-"+this.defaultState[0].id)
          .attr("ref", "audio-slider-"+this.$props.id)
          //.style("background-color", this.color(this.value))
          .style("opacity", "0.4" )
        //console.log(this)
      },

      toggleBG() {
        select(this.$el)
        //.style("background-color", this.color(this.value))
        .style("opacity", this.isPlaying ? "0.8" : "0.4");
      },


    },
  }
</script>

<style sass>
 

  .vue-slider-component .vue-slider {
    background-color: #FFF;
  }
  .vue-slider-component .vue-slider-process {
    background-color: #FFF;
  }

  #icon:hover {
    filter: url(#pictureFilter);
  }

  .iconic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    opacity: 1 !important;
  }

  .player {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    padding-top: 10%;
    padding-bottom: 10%;
  }

  .player :after {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    padding-top: 10%;
    padding-bottom: 10%;
  }


</style>