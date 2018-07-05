<template>
  <div id="audio-slider" ref="audioSlider">
    <button class="player" @click="togglePlayback"  >
      <b-img class="iconic" :src="icon" fluid />
    </button>
    <vue-slider ref="slider1" v-model="value" v-bind="options"></vue-slider>
  </div>
</template>

<script>
  import { select, selectAll } from "d3-selection"
  import vueSlider from "vue-slider-component"
  import VueHowler from 'vue-howler'
  import { EventBus } from "@/main"

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
      vueSlider,
    },

    created() {
     
    },

    mounted() {
      if ( this.icon != null ) {
          this.initialize();

          this.$on('play', function (msg) {
            this.isPlaying = true;
            this.toggleBG();
          })
          this.$on('pause', function (msg) {
            this.isPlaying = false;
            this.toggleBG();
          })

        EventBus.$on('file-uploader', function (event, msg) {
          if ( event == "add") {
            return console.log(this)
            //this.$props.icon = "http://localhost:3000/images/3"
          }
        })
        return;
      }
      else {
        select(this.$el)
          .style("opacity", "0" )
        console.log("this", this)
        return ;

      }

    },

    updated() {
      //console.log("props", this.$props);
      this.setVolume(this.value);
      EventBus.$emit("audio-slider-value",this.$props.key, this.value);
    },


    beforeDestroy() {
      //this.stop()
    },

    watch: {

    },

    computed: {

    },

    methods: {
      initialize() {
        this.setVolume(this.value);
        select(this.$el)
          .attr("ref", "audio-slider-"+this.$props.id)
          .style("opacity", "0.4" )
        //console.log(this)
      },

      toggleBG() {
        select(this.$el)
          .style("opacity", this.isPlaying ? "0.8" : "0.4");
      },


    },
  }
</script>

<style lang="scss">
 
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

  .player :hover {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer; 
  }

</style>