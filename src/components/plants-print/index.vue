<template>
    <b-container id="plant-life" fluid >
        <b-row align-h="center">
            <b-col  xs="4" sm="4" md="4" lg="4" >
                <b-img class="specimen" :src="serverURL+icon" fluid />
                <div class="description" > Measuring conductivity signals from 2 specimens living in my  garden ( represented as X & Y ), compared in real time. 
                    </br> The aim of this experiment is to map plant's sensitivity and finally create an id card based on its vital print. 
                    </br><small># In Progress</small>
                </div>
            </b-col>
            <b-col xs="8" sm="8" md="8" lg="8" >
                <h1 class="title">Asplenium nidus</h1>
                <p class="subtitle"> welcoming you with her long curvy bordered leaves, from the ground to the sky. </p>
                <div id="chart"></div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

    import config from '@/config.json'
    import { min, max } from "d3-array"
    import { event, select, selectAll } from "d3-selection"
    import { interval } from "d3-timer"
    import { active, transition } from "d3-transition"
    import { EventBus } from '@/main'
    import { realTimeLineChart } from "./real-timeline-chart"

    export default {

        data() {
            return {
              pageTopic: "getlarge" + this.$route.path,
              serverURL: config.httpServerURL,
              icon: "static/img/asplenium-nidus.jpeg",
              lineArr: [],
              MAX_LENGTH: 100,
              duration: 2000,
              chart : new realTimeLineChart(),
              protocol: ["mysensors", "octoprint"],
              endpoints: ["GW100-1456278-out", "GW101-16149114-out"],
              nodes: ["99", "95"],
              x: 0,
              y: 0,
          }
        },

        mounted() {
            this.seedData();
            this.interv = interval(this.updateData, this.duration);
            select("#chart").datum(this.lineArr).call(this.chart);
            select(window).on('resize', this.resize);
            EventBus.$emit("mqtt-sub", this.protocol[0] +"/"+ this.endpoints[1] +"/"+ this.nodes[0] +"/#");
            EventBus.$emit("mqtt-sub", this.protocol[0] +"/"+ this.endpoints[1] +"/"+ this.nodes[1] +"/#");
            EventBus.$on("mqtt-rx", (topic, payload) => {
                return this.selectMessage(topic, payload);
            }),
            EventBus.$on("got-x", x => {
              //console.log("x", x)
                return this.x = x;
            });
            EventBus.$on("got-y", y => {
              //console.log("y", y)
                return this.y = y;
            });
        },

        updated() {
          //this.updateData;
          //console.log(this)
        },

        beforeUnmount() {

        },

        beforeDestroy() {
            this.chart = null;
            this.interv.stop();
            //EventBus.$off("mqtt-rx");
            EventBus.$off("got-x");
            EventBus.$off("got-y");
        },

        watch: {

        },

        methods: {
            seedData() {
                var now = new Date();
                for (var i = 0; i < this.MAX_LENGTH; ++i) {
                    this.lineArr.push({
                        time: new Date(now.getTime() - ((this.MAX_LENGTH - i) * this.duration)),
                        x: 0,
                        y: 0,
                    });
                }
            },

            updateData(data) {
                var now = new Date();
                var lineData = {
                    time: now,
                    x: this.x,
                    y: this.y,
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
                if (topicSplit[3] == this.nodes[0] ) {
                    var obj = JSON.parse(payload.toString());
                    if ( obj.subType === "48" && topicSplit[4] === "1") {
                        this.formatIncomingMessage("json", obj, "got-x");
                    }
                }
                if (topicSplit[3] == this.nodes[1]) {
                    var obj = JSON.parse(payload.toString());
                    if ( obj.subType === "48" && topicSplit[4] === "1" ) {
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
                //this.chart.height(+select("#chart").style("height").replace(/(px)/g, ""));
                select("#chart").call(this.chart);
            },

        },
    }
  
</script>

<style lang="scss">

  #plant-life {
    margin-top: 3%;
    margin-bottom: 2%;
    color: #a0a0a0; 
    font-family: "MarketDeco";
  }

  .specimen {
    opacity: 0.8;
    margin-top: 0%;
    margin-bottom: 6%;
    max-height: 60%;
  }
  
  path.domain {
    stroke: #a0a0a0; 
    stroke-width: 1.5px;
  }

  h1.title {
    font-family: "MarketDeco";
        opacity: 0.8;

    font-size: 2.5rem;
    text-align: left;
    color: #449425;
    margin-left: 5%;
    margin-top: 2%;
    margin-bottom: 2%;
  }

  .subtitle {
    font-size: 1rem;
    margin-left: 5%;
    margin-top: 2%;
    margin-bottom: 4%;
  }

  g.tick {
    opacity: 0.8;
    stroke: #a0a0a0 ; 
    stroke-width: 0.5px;
  }

  .description {
    font-size: 0.9rem; 
    text-align: justify;
    padding-right: 2%;
    padding-left: 2%;
  }

</style>