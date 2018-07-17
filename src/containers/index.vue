<template>
    <div id="hello">
        <b-container fluid class="bv-example-row">
          <b-row align-h="center">
            <b-col xs="5" sm="5" md="5" lg="5" >
              <svg id="svg" pointer-events="all" viewBox="0 0 500 100" preserveAspectRatio="xMinYMin meet">
              </svg>
            </b-col>
          </b-row>
          <hr class="my-4">
          <b-row align-h="center">
            <b-col xs="12" sm="12" md="12" lg="12" >
              <p class="desc">
                Retrospective of previous and present crafts. For more information visit the website or contact me.
              </p>
            </b-col>
            <b-col xs="3" sm="3" md="3" lg="3" >
              <b-btn class="doors" href="#/portfolio"  >
                <b-img class="signs" :src="serverURL+icon1" fluid />
              </b-btn>
            </b-col>
            <b-col xs="3" sm="3" md="3" lg="3" >
              <b-btn class="doors"  @click="chat._initClient()"  >
                <b-img class="signs" :src="serverURL+icon2" fluid />
              </b-btn>
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
        icon1: "static/icons/enter-white.png",
        icon2: "static/icons/send-white.png",
        chat: new(liveRocketChat),
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
       letters: null,
      }
    },

    mounted() {
      var self = this;
      this.letters = "edouard maleix".split("");
      this.g = select("#svg").append("g");

      this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
      this.initialize();
      this.update(this.letters);
      this.transitionBG();

      this.interv = interval(function() {
        self.update(shuffle(self.letters)
          );
      }, self.settings.duration);

      EventBus.$on('chat-started', ( message) => {
        console.log("message");
      });
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
          .style("background-color", this.color("0.1"))
          .style("opacity", "0.4" ); 
      },

      update(data) {
        //console.log("data", data);
        var self = this;
        var t = transition()
            .duration(self.settings.duration/10);

        var text = this.g.selectAll("text")
            .data(data, function(d) { return d; });

        // EXIT
        text.exit()
          .transition(t)
            .attr("y", self.settings.height/2)
            .style("fill", "#33b277")
            .style("fill-opacity", 1e-6)
            .remove();

        //UPDATE 
        text.attr("y", self.settings.height/2)
            .style("fill", "#FFF")
            .style("fill-opacity", 1)
          .transition(t)
            .attr("x", function(d, i) { return i * 35; });

        //ENTER 
        text.enter().append("text")
            .attr("dy", ".5em")
            .attr("y", 0)
            .attr("x", function(d, i) { return i * 35; })
            .style("fill-opacity", 1e-6)
            .style("fill", "#FFF")
            .style("font-size", "28px")
            .text(function(d) { return d; })
          .transition(t)
            .attr("y", self.settings.height/2)
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

<style scoped>

 
  a:hover {
    text-decoration: underline;
    background-color: #33b277;
  }

  #hello {
    position: relative;
    color: #FFF;
    width: 100%;
    height: 700px;
    text-align: center;
    overflow: hidden;
  }


  .desc {
    margin-top: 3%;
    margin-bottom: 3%;
    font-size: 1.2rem;
    text-align: center;
  }
  
  .signs {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    opacity: 0.8 !important;
  }

  .signs:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    opacity: 1 !important;
  }

  .doors {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    opacity: 0.8;
    padding-top: 2%;
    padding-bottom: 5%;
  }

  .doors:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    background-color: transparent;
    border: 5px;
    border-radius: 1px;
    cursor: pointer; 
  }

  /*img:hover {
    content:url(@/../static/icons/send.png); 
  }*/

</style>
