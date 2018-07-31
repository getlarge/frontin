<!--
  
Data:
  http://worldpopulationreview.com/states/

-->
<template>

    <div id="holder">
        <div class="mapHolder">
          <us-map
            v-on:stateSelected="onStateSelected"
            v-on:stateDeselected="onStateDeselected"
          />
        </div>
        <tooltip
          v-if="currentState"
          :title="currentState.Name"
          :description="currentStateDescription"
        />
    </div>

</template>

<script>

      import * as _ from "lodash"
      import map from "./map"
      import tooltip from "./tooltip"
      import * as d3 from "d3-dsv"
      import config from "@/config.json"
  
    const STATES_DATA_PATH = "static/data/states-data.csv";

    export default {

        data() {
            return {
                serverURL: config.httpServerURL,
                statesData: undefined,
                currentState: undefined,
                settings: {
                    width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                    height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                },
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }
        },

        components: {
            usMap: map,
            tooltip: tooltip
        },

        created() {
            var self = this;
            this.$http.get(this.serverURL+STATES_DATA_PATH).then(function(res) {
                this.statesData = {};
                d3.dsvFormat(';')
                .parse(res.data, d => {
                    var population = d["2017 Population"].split(',').join('');
                    d.value = +population;
                    self.statesData[d.STATE_ABBR] = d;
                    delete d["2017 Population"];
                    delete d["STATE_ABBR"];
                    return d;
                });
            })
        },

        computed: {
            currentStateDescription() {
                return "Population: " + this.currentState.value;
            }
        },

        methods: {
            onStateSelected(stateCode) {
                this.currentState = this.statesData[stateCode];
            },

            onStateDeselected(stateCode) {
                this.currentState = undefined;
            },
        }
}

</script>

<style scoped>

  #holder {
    position: relative;
    height: 500px;
    width: 100%;
    margin-top: 10%;
  }
  .mapHolder {
    position: relative;
    margin: auto;
  }
</style>
