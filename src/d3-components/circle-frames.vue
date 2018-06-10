<template>
  <svg id="circle-frames"></svg>
</template>

<script>
//import * as d3 from 'd3'
import { rgb, interpolateRgb } from "d3-color"
import { easeCubic, easeElastic, easeLinear } from "d3-ease"
import { interpolateString } from "d3-interpolate"
import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
import { schemeCategory10 } from "d3-scale-chromatic"
import { append, attr, event, select, selectAll, style } from "d3-selection"
import { active, transition } from "d3-transition"

export default {
	data() {
	    return {
	    	circlesData: [],
	    	width: 900,
	    	height: 800,
	    }
	},

  	mounted() {
	  	this.initCircles();
	  	this.addText();
	},

	methods: {

		initCircles() {
			var svg = select("#circle-frames")
		    // var width = +svg.attr('width');
		    // var height = +svg.attr('height');
				.attr('width', this.width + 50)
			    .attr('height', this.height + 50);
			/// Data variables
			var a = { id: "a", "r": "395", "start": "0", "end": "1000" };
			var	b = { id: "b", "r": "385", "start": "1000", "end": "0" };
			var	c = { id: "c", "r": "375", "start": "1000", "end": "0" };
			this.circlesData = [a, b];
			//var circleFrames = svg.append("g")
			var circleFrames = svg.append("g").style("stroke-width", "5px").selectAll(".circleFrames");
			this.createCircles(circleFrames);
		},

		createCircles(circles) {
			console.log('create')
			var coloring = scaleOrdinal().range(schemeCategory10);

			/// Circle Frames generation
			circles
				.data(this.circlesData, d => d.id)
				.enter().append("circle")
				.attr("cx", this.width / 2 + 100)
				.attr("cy", this.height / 2 - 100)
				.style("fill", "none")
				.attr("opacity", "0.7")
				.style("stroke-dasharray", "20,20")
				.attr("r", d => d.r)
				.style("stroke", d => coloring(d.id))
				.call(node => {
					node.transition()
						.delay(0)
						.duration(10000)
						.ease(easeElastic)
						.attrTween("stroke-dashoffset", () => {
							var i = interpolateString("10000", "0")
							return (t) => i(t)
						})
						//.on("end", this.rotateCircle(circles));
				})
					.merge(circles);
				
		},

		rotateCircle(circles) {
			console.log('rotate')
			circles
				.transition()
				.ease(easeCubic)
				.attrTween("stroke-dashoffset", () => {
					var i = interpolateString("0", "10000");
					return t => i(t);
				})
				.delay(100)
				.duration(3000)
				.transition()
				.ease(easeCubic)
				.attrTween("stroke-dashoffset", () => {
					var i = interpolateString("1000", "0");
					return t => i(t);
				})
				.delay(100)
				.duration(2500)
				.on("end", this.rotateCircle(circles));
		},

		addText() {
			select("h1")
				.transition()
				.duration(2500)
				.on("start", function repeat() {
					active(this)
					.style("opacity", 1)
					.attr("fill", "#000")
					.tween("text", () => {
						var that = select(this),
							i = interpolateString("getlarge", "Edouard");
						return (t) => i(t)
					})
					.transition()
					.delay(1500)
					.on("start", repeat);
				});
		}
	}
}

</script>

