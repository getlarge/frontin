<!--

Based on:
	http://bl.ocks.org/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9
	http://bl.ocks.org/mapsam/6083585

-->

<template>
		<svg ></svg>
</template>

<script>
import { mapState } from "vuex";
import { json } from "d3-fetch";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { append, attr, event, select, selectAll, style } from "d3-selection";
import * as topojson from "topojson";

export default {
	data() {
		return {
			pageTopic: "getlarge" + this.$route.path,
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		};
	},

	mounted() {
		var self = this;
		// var svg = d3.select(this.$el);
		// var width = +svg.attr('width');
		// var height = +svg.attr('height');
		var svg = select(this.$el)
			.attr("width", this.width)
			.attr("height", this.height);

		var projection = geoAlbersUsa();
		var path = geoPath().projection(projection);

		json(serverURL + "static/data/us.json").then(function(obj) {
			var g = svg.append("g");
			g.selectAll(".state")
				.data(topojson.feature(obj, obj.objects.usStates).features)
				.enter()
				.append("path")
				.attr("class", "state")
				.attr("d", path)
				.on("mouseover", function(d) {
					self.$emit("stateSelected", d.properties.STATE_ABBR);
				})
				.on("mouseout", function(d) {
					self.$emit("stateDeselected", d.properties.STATE_ABBR);
				});
			g.attr("transform", "scale(0.8)");
		});
	},

	computed: {
		...mapState({
			serverURL: state => state.base.serverURL
		})
	}

	// TODO: fire events
};
</script>

<style>
.state {
	fill: #ccc;
	stroke: #fff;
}
.state:hover {
	fill: steelblue;
}
</style>
