
<template>
	<div id="line-chart">
		<svg></svg>

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
	import { area, line, curveCardinal, curveNatural } from "d3-shape"
	import { active, transition } from "d3-transition"
	import { EventBus } from '@/main'

	var globalX = 0;
	var duration = 500;
	var max = 500;
	var step = 20;


//// Save data + add zoom to navigate
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
				width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
				height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
				dvColors: {
					v1: "#cb503a",
					v2: "#72c039",
					v3: "#65b9ac"
				},
				line1: [],
				smoothLine: [] ,
				lineArea: [] ,
				areaPath: [] ,
				xAxis: [] ,
				axisX: [] ,
				path: [] ,
				x: [],
				y: []
			}
	  	},

	  	created() {
	  		EventBus.$on("got-sound-frame", soundFrame => {
		      console.log("soundFrame", soundFrame)
		      return this.tick(soundFrame);
		      //return this.insertDatapoints(soundFrame, "soundFrame"); /// get the dataset + event to identify which line to update

	    	});
	  		EventBus.$on("got-volt-frame", voltFrame => {
		      //console.log("voltFrame", voltFrame)
		      //return this.tick(voltFrame);
	    	});
	  	},

	  	mounted() {
		    this.initLine();
		},

		updated() {
			//console.log("updated")
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

				//this.x = scaleTime().domain([0, 1000]).range([0, 1000]);
		    	this.x = scaleLinear().domain([0, this.width-200]).range([0, this.width-200]);
				this.y = scaleLinear().domain([0, this.height-200]).range([this.height-200, 0]);
			    // var lineChart = select("#line-chart")
			    var lineChart = select("#line-chart > svg")
				    .attr("width", this.width)
				    .attr("height", this.height);
			    this.line1 = line()
							    .x( d => this.x(d.x))
							    .y( d => this.y(d.y));
			    this.smoothLine = line()
			    					.curve(curveCardinal)
								    .x( d => this.x(d.x))
								    .y( d => this.y(d.y));
				this.lineArea = area()
						    .x( d => this.x(d.x))
						    .y0(this.y(0))
						    .y1( d => this.y(d.y))
						    .curve(curveCardinal);
			    this.xAxis = axisBottom().scale(this.x);
			    this.axisX = lineChart.append('g').attr("class", "x axis")
			    			 .attr('transform', `translate(${this.width/20}, ${this.height*0.8})`)
						     .call(this.xAxis);						    
		    	this.path = lineChart.append("path");
		    	this.areaPath = lineChart.append("path");

			},

			tick(dataSet) {
			//tick() {
			    var point = {
				    x: globalX,
				    //x: dataSet.x / 100000,
				    y: dataSet.y 
			    };
			    this.displayedValues.push(point);
			    //console.log("dataSet reworked", this.displayedValues);
			    globalX += step;
			    this.path.datum(this.displayedValues)
				    .attr("class", "smoothline")
				    .attr("d", this.smoothline);
				this.areaPath.datum(this.displayedValues)
			    .attr('class', 'area')
			    .attr('d', this.lineArea);

			    //this.x.domain([dataSet.x - step, dataSet.x]);
			    this.x.domain([globalX - (max - step), globalX]);
			    this.axisX.transition()
				     .duration(duration)
				     .ease(easeLinear,2)
				     .call(this.xAxis);
			    this.path.attr('transform', null)
				    .transition()
				    .duration(duration)
				    .ease(easeLinear,2)
				    .attr('transform', 'translate(' + this.x(globalX - max) + ')');
				  //  .attr("transform", "translate(" + this.x(dataSet.x) + ")")
			    this.areaPath.attr('transform', null)
				    .transition()
				    .duration(duration)
				    .ease(easeLinear,2)
				    .attr('transform', 'translate(' + this.x(globalX - max) + ')');
				    //.on("end", this.tick)
			    if (this.displayedValues.length > 50) this.displayedValues.shift();
		    },

			insertDatapoints(messages, event) {
			    for (let i = 0; i < messages.length; i++) {
			        let points = {
			            x: messages[i].x,
			            y: messages[i].y,
			            type: messages[i].type
			        };
			        //chart.series.addData(voltageData);
			        this.displayedValues.push(points);
			    }
			    //chart.render();
			    this.tick(event);
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


<style>
	g.axis {
		fill: #d6d6d6;
		font-size: 12px;
	}
	path.line {
/*		fill: none;
*/		stroke: #f1c40f;
		stroke-width: 3px;
	}
	path.smoothLine {
/*		fill: none;
*/		stroke: #f1c40f;
		stroke-width: 3px;
	}
	path.area {
		fill: #13679A;
		opacity: 0.5;
	}
	.circle {
		stroke: #e74c3c;
		stroke-width: 3px;
		fill: #FFF;
	}
</style>