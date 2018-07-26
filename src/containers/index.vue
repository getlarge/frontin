<template>
    <div id="hello">
        <b-container fluid >
            <b-row align-h="center">
                <b-col xs="6" sm="8" md="7" lg="6" xl="5" >
                    <svg id="svg" pointer-events="all" viewBox="0 0 550 100" preserveAspectRatio="xMinYMin meet">
                    </svg>
                </b-col>
            </b-row>
            <hr class="my-4">
            <b-row align-h="center">
                <b-col xs="10" sm="10" md="8" lg="7" xl="6">
                    <p class="desc">
                    Retrospective of previous and present crafts, from UI/UX design to frontend/backend development, until embedded system prototyping. For more information visit, the website or contact me.
                    </p>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col xs="4" sm="4" lg="3">
                    <a class="doors"  href="#/projects-timeline" title="Enter" >
                        <img  class="signs" @mouseover="icon1='static/icons/info2.png'" @mouseout="icon1='static/icons/info.png'" :src="serverURL+icon1" alt="info icon" />
                    </a>
                </b-col>
                <b-col xs="4" sm="4" lg="3" >
                    <a class="doors" @click="$emit('start:chat')" title="Contact" >
                        <img @mouseover="icon2='static/icons/letter2.png'" @mouseout="icon2='static/icons/letter.png'" class="signs" :src="serverURL+icon2" alt="hi icon" />
                    </a>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

    import config from '@/config.json'
    import { routes } from '@/router/menu'
    import liveRocketChat  from '@/services/live-rocketchat'
    import { shuffle } from "d3-array"
    import { rgb } from "d3-color"
    import { easeLinear } from "d3-ease"
    import { interpolateHcl, interpolateHclLong } from "d3-interpolate"
    import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
    import { append, attr, event, select, selectAll, style } from "d3-selection"
    import { interval, now, timeout, timer } from "d3-timer"
    import { active, transition } from "d3-transition"
    import { EventBus } from '@/main'

    export default {
        data() {
          return {
            items: routes,
            serverURL: config.httpServerURL,
            icon1: "static/icons/info.png",
            icon2: "static/icons/letter.png",
            settings: {
                width: 500,
                height: 100,
                duration : 10000,
            },
            colorSet: [
                {
                color1: "#01c669",
                color2: "#ff830f", //"#48725e"
                },
            ],
            letters: "edouard maleix".split(""),
            updateCounter: 0,
          }
        },

        mounted() {
            var self = this;
            this.g = select("#svg").append("g");
            this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
            this.initialize();
            this.update(this.letters);
            //this.transitionBG();
            this.interv = interval(function() {
                /// Once the counter hit a multiple of 3, show "normal" title
                self.updateCounter % 3 === 0 ? self.update("edouard maleix".split("")) : self.update(shuffle(self.letters))
            }, self.settings.duration/2);

        },

        updated() {

        },

        beforeDestroy() {
            this.interv.stop();
        },

        computed: {
       
        },

        methods: {
            initialize() {
                var self = this;
                select(this.$el)
                    //.style("background-color", this.color("0.1"))
                    .style("background-color", "#FFF")
                    //.style("opacity", "0.1" ); 
            },

            update(data) {
                //console.log("data", data);
                var self = this;
                self.updateCounter++;

                var t = transition()
                    .duration(self.settings.duration/10);

                var text = this.g.selectAll("text")
                    .data(data, function(d) { return d; });

                // EXIT
                text.exit()
                  .transition(t)
                    .attr("y", self.settings.height/1.5)
                    .style("fill", "#33b277")
                    .style("fill-opacity", 1e-6)
                    .remove();

                //UPDATE 
                text.attr("y", self.settings.height/1.5)
                    .style("fill", "#686868")
                    .style("fill-opacity", 1)
                  .transition(t)
                    .attr("x", function(d, i) { return i * 35; });

                //ENTER 
                text.enter().append("text")
                    .attr("dy", ".5em")
                    .attr("y", 0)
                    .attr("x", function(d, i) { return i * 35; })
                    .style("fill-opacity", 1e-6)
                    .style("fill", "#686868")
                    //.style("font-size", "30px")
                    .style("font-size", self.settings.height/3+"px")
                    .text(function(d) { return d; })
                  .transition(t)
                    .attr("y", self.settings.height/1.5)
                    .style("fill-opacity", 1);

            },

            transitionBG() {
                var self = this;
                select(this.$el)
                    .transition()
                    .style("background-color", self.color("0.1"))       
                    .duration(self.settings.duration)
                    .ease(easeLinear) 
                    .style("background-color", self.color("0.3"))
                    .transition()        
                    .duration(self.settings.duration)
                    .ease(easeLinear)       
                    .style("background-color", self.color("0.5"))
                    .transition()       
                    .duration(self.settings.duration)
                    .ease(easeLinear)  
                    .style("background-color", self.color("0.7"))
                    .transition()       
                    .duration(self.settings.duration)
                    .ease(easeLinear)  
                    .style("background-color", self.color("0.9"))
                    .on("end", self.transitionBG);  
            },
        }
          
    }
      
</script>

<style lang="scss" >

    #hello {
        position: relative;
        color: #686868;
        background-color: white;
        width: 100%;
        text-align: center;
        overflow: hidden;
    }

    #svg {
        margin-top: 0%;
        margin-left: 12%;
    }

    .desc {
        margin-top: 2%;
        margin-bottom: 1%;
        font-size: 1.2rem;
        text-align: justify;
    }

    .signs {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 80%;
        opacity: 1 !important;
        background-color: white;

    }
    .signs:hover {
    }    

    .doors {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: white;
        opacity: 1;
    }

    .doors:hover {
        opacity: 1;
        background-color: white;
        cursor: pointer; 
    }

    .doors:active {
        opacity: 1;
        background-color: white;
        border: none;
        cursor: pointer; 
    }

    .doors:focus {
        opacity: 1;
        background-color: white;
        border: none;
        cursor: pointer; 
    }

    /*img:hover {
    content:url(@/../static/icons/send.png); 
    }*/

</style>
