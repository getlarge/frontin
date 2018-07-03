<template>

<div id="audio-slider">

        <svg ref="icons" pointer-events="all" viewBox="0 0 200 160" preserveAspectRatio="xMinYMin meet">

          <g :id="icon"></g>

        </svg>
         <vue-slider
         id="slider1"
          ref="slider1"
          v-model="value"
          v-bind="options"
        ></vue-slider>

</div>

</template>

<script>
  import { min, max, range, sum } from "d3-array"
  import { hsl, rgb } from "d3-color"
  import { drag } from "d3-drag"

  import { easeLinear } from "d3-ease"
  import { format } from "d3-format"

  import { interpolateHcl } from "d3-interpolate"
  import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
  import { append, attr, event, select, selectAll, style } from "d3-selection"
  import { timer } from "d3-timer"
  import { active, transition } from "d3-transition"
  import { sliderHorizontal } from "d3-simple-slider"
  import { EventBus } from "@/main"
  import vueSlider from "vue-slider-component"


  export default {
    props: ['state'], 

    data() {
      return {
        defaultState: [
        ],
        layout : [],
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
          realTime: true,
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
      this.color = interpolateHcl(rgb("#01c669"),rgb('#48725e'));

      select(this.$el)
        //.attr("id", "id-"+this.defaultState[0].id)
        .style("background-color", this.color(this.value))
        .style("opacity",0.4)
      this.svg = select("#audio-slider > svg");

        // this.defaultState = [
        //   {
        //     id: 1,
        //     name: 'Rain',
        //     audioFile: new Audio('static/sounds/rain.mp3'),
        //     volume: 0.5,
        //     iconFile: './static/icons/rain-white.svg',
        //     isPlaying: false,
        //     width: 200,
        //     height: 200,
        //     margin: { right: 50, left: 50 },
        //   }
        // ];
          this.defaultState = [this.$props.state];
           console.log("eleme", select(this.$el.children[0]));
           console.log("svg", select(this.svg));
           console.log("svgtrue", select("#audio-slider > svg"));
           // console.log("props", this.$props.state);
           // console.log("state", this.defaultState);
      console.log(select("#id-"+(this.defaultState[0].id).toString()+" > svg"))

      
    },

    updated() {
      console.log("props", this.$props.state);
      console.log("state", this.defaultState);
      var self = this;
      var state = this.defaultState[0];
      //var state = this.$props.state || this.defaultState[0];

      console.log(self.value)     
      state.audioFile.volume = self.value;

      select(self.$el)
        .style("background-color", self.color(state.audioFile.volume))
        //.style("opacity", state.isPlaying ? 0.4 : 0.8)

    },


    beforeDestroy() {
      this.defaultState[0].audioFile.pause()

    },

    watch: {

    },

    computed: {
      icon() {
        var self = this;
        //var state = this.$props.state;
        var state = this.defaultState;
        if (state ) {
            return  select("#audio-slider > svg") /// pattern d'ajout à la volée du svg ?
            //select("#id-"+(this.defaultState[0].id).toString()+" > svg")
              .attr("class", "images")
              .selectAll("image")
              .data(state)
              .enter().append("image")
              .attr("xlink:href", (d) => d.iconFile)
              .attr("crossOrigin", "anonymous")
              .attr("x", (d) => d.width/6)
              .attr("y", (d) => d.height/10)
              .attr("width", (d) => d.width/1.5)
              .attr("height", (d) => d.height/1.5)
              .on("click", (d) => d.isPlaying ? this.pause(d) : this.play(d))
          }
      },

    },

    methods: {

      play (d) {
        d.isPlaying = true;
        select("#audio-slider").style("background-color", this.color(this.defaultState[0].audioFile.volume))
        .style("opacity", 1)
        d.audioFile.volume = d.volume;
        d.audioFile.play();
      },
    
      pause (d) {
        d.isPlaying = false;
        select("#audio-slider").style("opacity", 0.4)
        d.audioFile.pause();
      },

    },
  }
</script>

<style sass>
 
  .slider-wrapper {
/*    display: inline-block;
*/    padding: 0;
  }
  .vue-slider-component .vue-slider {
    margin-bottom: 5%;
  }
  .vue-slider-component .vue-slider {
    background-color: #FFF;
  }
  .vue-slider-component .vue-slider-process {
    background-color: #FFF;
  }
  #icon:hover {
    filter: url(#pictureFilter);
  }



</style>