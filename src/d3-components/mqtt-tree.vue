<template>
	<div id="mqtt-tree">
		<svg ></svg>
	</div>
</template>

<script>
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
		},

		methods: {


		}
	}

</script>

