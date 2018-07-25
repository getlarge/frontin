<template>
    <div id="audio-slider" ref="audioSlider">
        <button class="player" @click="togglePlayback"  >
            <b-img class="iconic" :src="icon" fluid />
        </button>
        <vue-slider ref="slider1" v-model="value" v-bind="options"></vue-slider>
    </div>
</template>

<script>
    import { rgb } from "d3-color"
    import { interpolateHclLong } from "d3-interpolate"
    import { select, selectAll } from "d3-selection"
    import vueSlider from "vue-slider-component"
    import VueHowler from 'vue-howler'
    import { EventBus } from "@/main"

    export default {
        props: ["icon", "id", "colors"], 

        mixins: [VueHowler],

        data() {
            return {
                isPlaying : false,
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
                    tooltip: false,
                    tooltipDir: 'top',
                    reverse: false,
                    data: null,
                    clickable: true,
                    realTime: false,
                    lazy: true,
                    formatter: null,
                    bgStyle: {
                        "backgroundColor": "#e8e8e8",
                        "opacity": "0.7"
                    },
                    sliderStyle: null,
                    processStyle: {
                        "backgroundColor": "#aaf7d3",
                        "opacity": "0.7"
                    },
                },
                colorSet: [
                    {
                      color1: "#01c669",
                      color2: "#ff830f", //"#48725e"
                    },
                ],
            }
        },

        components: {
            vueSlider,
        },

        created() {
         
        },

        mounted() {
            //console.log(this.$refs.slider1)
            this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
            var self = this;
            if ( this.icon !== null ) {
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
                    if ( event === "add") {
                        return console.log(this)
                    //this.$props.icon = "http://localhost:3000/images/3"
                    }
                })
                EventBus.$on('audio-slider-color', function (value) {
                    if ( self.$refs.slider1 !== null ) {
                        return self.$refs.slider1.processStyle.backgroundColor = self.color(value);
                    }
                    //console.log("value", value);
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
                  .style("opacity", "0.6" )
                //console.log(this)
            },

            toggleBG() {
                select(this.$el)
                  .style("opacity", this.isPlaying ? "1" : "0.6");
            },
        },
    }
  
</script>

<style lang="scss">

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