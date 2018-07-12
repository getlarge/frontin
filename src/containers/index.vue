<template>
    <div class="hello">
      <b-jumbotron  text-variant="white" >
        <h5>work by</h5>
        <h2>Edouard Maleix</h2>
        <hr class="my-4">
        
        <b-container fluid class="bv-example-row">
          
          <b-row align-h="center">
            <b-col xs="12" sm="12" md="12" lg="12" >
              <p >
                Retrospective of previous and present projects. For more information visit the website or contact me.
              </p>
            </b-col>
            <b-col xs="3" sm="3" md="3" lg="3" >
              <b-btn class="doors" href="#/portfolio"  >
                <b-img class="signs" :src="icon1" fluid />
              </b-btn>
            </b-col>
            <b-col xs="3" sm="3" md="3" lg="3" >
              <b-btn class="doors"  @click="chat._initClient()"  >
                <b-img class="signs" :src="icon2" fluid />
              </b-btn>
            </b-col>

          </b-row>
        </b-container>
      </b-jumbotron>
    </div>
</template>

<script>

  import { routes } from '@/router/menu'
  import liveRocketChat  from '@/services/live-rocketchat'
  import { rgb } from "d3-color"
  import { easeLinear } from "d3-ease"
  import { interpolateHcl, interpolateHclLong } from "d3-interpolate"
  import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
  import { append, attr, event, select, selectAll, style } from "d3-selection"
  import { active, transition } from "d3-transition"

  export default {
    data() {
      return {
        items: routes,
        icon1: "static/icons/enter-white.png",
        icon2: "static/icons/send-white.png",
        chat: new(liveRocketChat),
        colorSet: [
          {
            color1: "#01c669",
            color2: "#ff830f", //"#48725e"
          },
        ],
        duration : 10000,

      }
    },

    mounted() {
        this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
        this.initialize();
        console.log("this", this);
    },

    methods: {
      initialize() {
        select(".jumbotron")
          .style("background-color", this.color("0.1"))
          .style("opacity", "0.4" )
        this.transitionBG();
      },
      transitionBG() {
        var self = this;
        select(".jumbotron")
        .transition()
          .style("background-color", this.color("0.1"))       
          .duration(this.duration)
          .ease(easeLinear) 
          .style("background-color", this.color("0.3"))
          .transition()        
          .duration(this.duration)
          .ease(easeLinear)       
          .style("background-color", this.color("0.5"))
          .transition()       
          .duration(this.duration)
          .ease(easeLinear)  
          .style("background-color", this.color("0.7"))
          .transition()       
          .duration(this.duration)
          .ease(easeLinear)  
          .style("background-color", this.color("0.9"))
          .on("end", self.transitionBG);  
      },
    }
      
  }
  
</script>

<style scoped>

  h1, h2 {
    font-family: Aloes-Bd;
    font-size: 20px;
  }

  h5 {
    font-size: 18px;
/*      color: #dbdbdb;
*/    }

  ul {
    /*list-style-type: none;*/
    padding: 0;
    margin: auto;
    width: 300px;
  }

  li {
    /*display: inline-block;*/
    margin: 0 0px;
    list-style: decimal
  }

/*    a {
    color: blue;
    display: block;
    text-decoration: none;
    text-align: left;
  }*/

  a:hover {
    text-decoration: underline;
    background-color: #33b277;
  }

  .hello {
    position: relative;
    width: 80%;
    height: 60%;
    text-align: center;
    overflow: hidden;
    margin-top: 10%;
    margin-left: 10%;
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
    color: #686868;
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
