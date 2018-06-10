
<template>
	<div>
		<svg id="line-chart"></svg>

		 <div class="container-fluid">
            <div class="row text-center">

                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
				        <div class="panel-footer">
				            <p v-if="displayedValues.length > 0">
				                <small>
				                    <span v-bind:style="{ color: dvColors.v1}">{{displayedValues[0]}} </span>
				                   
				                </small>
				            </p>
				        </div>
					</div>
					<div class="col-xs-6 col-xs-offset-3 col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
					    <input v-model="renderEveryNth" type="range" min="1" max="9" value="5">
					    <p>Render after <strong>{{renderEveryNth}}</strong> message(s)</p>
					</div>
		  		</div>

		 		<div  ref="panel"></div>

            </div>
		</div>
	</div>
</template>

<script>

import config from '@/config.json'
import { axisBottom } from "d3-axis"
import { easeLinear } from "d3-ease"
import { scaleLinear, scaleTime } from "d3-scale"
import { append, attr, event, select, selectAll, style } from "d3-selection"
import { line, curveCardinal, curveNatural } from "d3-shape"
import { active, transition } from "d3-transition"
import { EventBus } from '@/main'

var globalX = 0;
var duration = 500;
var max = 500;
var step = 20;

export default {

	data() {
	    return {
	    	pageTopic: "getlarge" + this.$route.path,
	    	subscribeList: [],
			renderEveryNth: 5,
			updateInterval: 20,
			streamFrequency: 50,
			messageIndex: 0,
			displayedValues: [],
			width : 1500,
			height : 800,
			dvColors: {
					v1: "#cb503a",
					v2: "#72c039",
					v3: "#65b9ac"
			},
			line1: [],
			smoothLine: [] ,
			xAxis: [] ,
			axisX: [] ,
			path: [] ,
			x: scaleLinear().domain([0, 1000]).range([0, 1000]),
			//x: scaleTime().domain([0, 1000]).range([0, 1000]),
			y: scaleLinear().domain([0, 500]).range([500, 0])
		}
  	},

  	created() {
  		EventBus.$on("got-sound-frame", soundFrame => {
	      //console.log("soundFrame", soundFrame)
	      return this.tick(soundFrame);

    	});
  		EventBus.$on("got-volt-frame", voltFrame => {
	      //console.log("voltFrame", voltFrame)
	      //return this.tick(voltFrame);
    	});
  	},

  	mounted() {
	    this.initLine();
		// asyncClient.subscribe("mysensors/GW3-out/18/#").then(function(){
		// 	console.log("subscribed");
		// });
		// asyncClient.publish("foo/bar", "baz").then(function(){
		// 	console.log("We async now");
		// 	return asyncClient.end();
		// });
		//console.log("props", this.$props)
	},

	updated() {
		//console.log("dataset2:", this.soundFrame)
	},

	beforeDestroy() {
		EventBus.$off("got-sound-frame");
		EventBus.$off("got-volt-frame");
	},

	watch: { 
      	
	},

	computed: {
		filter: function() {

		}
	},

	methods: {
	    initLine() {
		    var lineChart = select("#line-chart")
			    .attr("width", this.width + 50)
			    .attr("height", this.height + 50)
		    // this.line1 = line()
						//     .x( d => this.x(d.x))
						//     .y( d => this.y(d.y));
		    this.smoothLine = line().curve(curveNatural)
							    .x( d => this.x(d.x))
							    .y( d => this.y(d.y));
		    this.xAxis = axisBottom().scale(this.x);
		    this.axisX = lineChart.append('g').attr("class", "x axis")
		    			 .attr('transform', `translate(${this.width/10}, ${this.height*0.9})`)
					     .call(this.xAxis);						    
	    	this.path = lineChart.append("path");
		},

		tick(dataSet) {
		    var point = {
			    x: globalX,
			    y: dataSet.y 
		    };
		    this.displayedValues.push(point);
		    //console.log("dataSet reworked", this.displayedValues);
		    globalX += step;
		    this.path.datum(this.displayedValues)
			    .attr("class", "smoothline")
			    .attr("d", this.smoothLine);

		    // Shift the chart left
		    this.x.domain([globalX - (max - step), globalX]);
		    this.axisX.transition()
			     .duration(duration)
			     .ease(easeLinear,2)
			     .call(this.xAxis);
		    this.path.attr('transform', null)
			    .transition()
			    .duration(duration)
			    .ease(easeLinear,2)
			    .attr("transform", "translate(" + this.x(globalX - max) + ")")
			    //.on("end", this.tick)
		    if (this.displayedValues.length > 50) this.displayedValues.shift();
	    },

		insertDatapoints(messages, chart) {
		    for (let i = 0; i < messages.length; i++) {
		        let voltageData = {
		        	//value1: this.$mqtt.frame[i]
		            Magnitude1: messages[i].v1,
		            Magnitude2: messages[i].v2,
		            Magnitude3: messages[i].v3
		        };
		        chart.series.addData(voltageData);
		    }
		    chart.render();
		},

		updateDisplayedValues() {
		    if (this.messageIndex == this.streamFrequency) {
		        this.messageIndex = 0;
		        this.displayedValues = this.messageSeries;
		    } else if (this.messageIndex == 0) {
		        this.displayedValues = this.messageSeries;
		        this.messageIndex++;
		    } else {
		        this.messageIndex++;
		    }
		},
    },
}
</script>


<style scoped>
	.axis {
		font-family: sans-serif;
		fill: #d35400;
		font-size: 12px;
	}
	.line {
		fill: none;
		stroke: #f1c40f;
		stroke-width: 3px;
	}
	.smoothLine {
		fill: none;
		stroke: #e74c3c;
		stroke-width: 3px;
	}
	.area {
		fill: #e74c3c;
		opacity: 0.5;
	}
	.circle {
		stroke: #e74c3c;
		stroke-width: 3px;
		fill: #FFF;
	}
	.grid {
		stroke: #DDD;
		stroke-width: 1px;
		fill: none;
	}
</style>