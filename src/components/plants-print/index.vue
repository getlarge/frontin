<template>

  <b-container id="plant-life" fluid class="bv-example-row">
    <h1 class="head-title" >Plants digital print </h1>
    <b-row align-h="center">
      <b-col sm="4" md="4" lg="4" >
        <b-img class="specimen" :src="icon" fluid />
        <p> Measuring conductivity signals from 2 specimens living in my  garden ( represented as X & Y ), compared in real time. 
        </br> The aim of this experiment is to map plant's sensitivity and finally create an id card based on its vital print. 
        </p>
        <small># In Progress</small>
      </b-col>
      <b-col id="chart" sm="8" md="8" lg="8" >

      </b-col>
    </b-row>
  </b-container>

</template>

<script>
  import config from '@/config.json'
  import { min, max } from "d3-array"
  import { append, attr, event, select, selectAll, style } from "d3-selection"
  import { active, transition } from "d3-transition"
  import { EventBus } from '@/main'
  import { realTimeLineChart } from "./real-timeline-chart"

  export default {

    data() {
        return {
          pageTopic: "getlarge" + this.$route.path,
          subscribeList: [],
          icon: "static/img/asplen.jpg",
          lineArr: [],
          MAX_LENGTH: 100,
          duration: 1000,
          chart : realTimeLineChart(),
          lineData: {
            time: "0",
            x: 0,
            y: 0
          },
          x: 0,
          y: 0,
      }
    },

    mounted() {
        EventBus.$emit("mqtt-sub", "mysensors/Gateway16149114-out/99/#");
        EventBus.$emit("mqtt-sub", "mysensors//Gateway1456278-out/27/#");
        EventBus.$on("mqtt-rx", (topic, payload) => {
          return this.selectMessage(topic, payload);
          //return console.log(this);
        }),
         EventBus.$on("got-x", x => {
           return this.x = Number(x);
         });
         EventBus.$on("got-y", y => {
          //console.log("y", y)
           return this.y = Number(y);
         });

        this.seedData();
        window.setInterval(this.updateData, this.duration);
        select("#chart").datum(this.lineArr).call(this.chart);
        select(window).on('resize', this.resize);
    },

    updated() {
      //this.updateData;
      console.log(this)
    },

    beforeDestroy() {
      EventBus.$emit("mqtt-unsub", "mysensors/GW4-out/99");
      EventBus.$emit("mqtt-unsub", "mysensors/GW3-out/27");
      EventBus.$off("mqtt-rx");
      EventBus.$off("got-x");
      EventBus.$off("got-y");
    },

    watch: {

      // lineArr() {
      //    console.log("updated")
      //     this.updateData;
      // }
    },

    methods: {
      randomNumberBounds(min, max) {
        return Math.floor(Math.random() * max) + min;
      },

      seedData() {
        var now = new Date();
        for (var i = 0; i < this.MAX_LENGTH; ++i) {
          this.lineArr.push({
            time: new Date(now.getTime() - ((this.MAX_LENGTH - i) * this.duration)),
            // x: this.randomNumberBounds(0, 5),
            // y: this.randomNumberBounds(0, 2.5),
            x: 0,
            y: 0,
            // z: this.randomNumberBounds(0, 10)
          });
        }
      },

      updateData(data) {
        var now = new Date();

        var lineData = {
          time: now,
          x: this.x,
          y: this.y,
          //z: this.randomNumberBounds(0, 10)
        };
        this.lineArr.push(lineData);

        if (this.lineArr.length > 30) {
          this.lineArr.shift();
        }
        select("#chart").datum(this.lineArr).call(this.chart);
      },

      selectMessage(topic, payload) {
        //var newPayload = topic + ">" + payload.toString();       
        var topicSplit = topic.split("/");
        if (topicSplit[3] == "99" ) {
          var obj = JSON.parse(payload.toString());
          if ( obj.subType == "37") {
            //this.formatIncomingMessage("json", obj, "got-sound-frame");
          };
          if ( obj.subType == "48") {
            this.formatIncomingMessage("json", obj, "got-x");
          }
        }
        if (topicSplit[3] == "27" ) {
          var obj = JSON.parse(payload.toString());
          if ( obj.subType == "48") {
            this.formatIncomingMessage("json", obj, "got-y");
          }
        }
      },

      formatIncomingMessage(type, message, event) {
          //console.log(type, message, event)
          if (type = "json") {
          /// formater le timestamp en format prêt à afficher sur D3
          // var day = moment(Number(payloadSplit[1]));
          // console.log("date", day)
          var x = Number(message.time);
          var y = Number(message.data);
          var formatedPayload = {
            x: x,
            y: y,
            type: message.subType
          }; 
          EventBus.$emit(event.toString(), y);
          //this.buffer.push(formatedPayload);
          }
      },

      resize() {
        if (select("#chart svg").empty()) {
          return;
        }
        this.chart.width(+select("#chart").style("width").replace(/(px)/g, ""));
        this.chart.height(+select("#chart").style("height").replace(/(px)/g, ""));
        select("#chart").call(this.chart);
      },

    },
  }
  


</script>
<style lang="scss">

  #plant-life {
    margin-top: 3%;
  }

  .specimen {
    margin-top: 3%;
    margin-bottom: 3%;
    max-height: 60%;
  }
  
  .domain {
    stroke: #cecece; 
    stroke-width: 1.5px;
  }

  .axis {
    stroke: #cecece; 
    font-size: 11px;
  }

  .tick {
    stroke: #cecece !important; 
    stroke-width: 1px;
  }

  p {
    font-size: 14px; 
    text-align: justify;
  }

  .head-title {
    font-family: 'Aloes-Bd';
    font-size: 22px; 
    text-transform: uppercase; 
    text-align: left;
    margin-left: 2%; 
    color: #686868; 

  }


</style>