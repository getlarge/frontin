<template>
	<div id="project-timeline" >
	    <tooltip
			v-if="currentProject"
			:title="currentProject.name"
			:description="currentProject.description"
			:tags="currentProject.tags"
			:img="currentProject.img"
			/>
		<div id="timeline" >
			<svg></svg>
		</div>
  </div>

</template>

<script>

	import { min, max, range, sum } from "d3-array"
	import { axisBottom } from "d3-axis"
	import { easeLinear, easeQuadInOut } from "d3-ease"
	import { scaleLinear, scalePow, scaleOrdinal, scaleTime } from "d3-scale"
	import { event, select, selectAll, style } from "d3-selection"
	import { area, stack, stackOrderNone, stackOffsetNone } from "d3-shape"
	import { timeFormat } from "d3-time-format"
	import { active, transition } from "d3-transition"
	import tooltip from "@/components/utils/tooltip"
	import moment from 'moment'
	import { EventBus } from '@/main'
	import { projects } from '@/../static/data/cv'

	export default {

		data() {
		    return {
		    	pageTopic: "getlarge" + this.$route.path,
				width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
				height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
				colorPalette : scaleOrdinal().range([ "#28693e", "#3f9e5e", "#60c780", "#5ca775", "#84c899", "#9adfb0", "#6ed659", "#417c52", "#56a46f" ]),
				currentProject: undefined,
				projects : projects,
				node: null,
				dataSet: null,
				timeline: null,
				settings: {
					k: null,
			    	width : 1000, // viewbox width
					lineHeight : 110, // flag height or stack height
					s : 20,
					f : 250, // over height
					m : null,
					height : null,
					v : 1.5,
					h : 45, // line height
					paletteLength : 10,
				}
			}
	  	},

		components: {
			tooltip: tooltip,
		},

	  	created() {
	  	},

	  	mounted() {
	  		this.initTimeLine();
			console.log("this", this)

            this.$on("projectSelected", i => {
              this.currentProject = this.node[i];
            });	

            this.$on("projectDeselected", () => {
              this.currentProject = undefined;
            });		    

		},

		updated() {
			//console.log("this", this)
		},

		beforeUnmout() {

		},

		beforeDestroy() {
			//this.currentProject = undefined;
			// this.node = null;
			// this.dataSet = null;
			// this.timeline = null;
    		//delete this.currentProject;
		},

		watch: { 
	      	
		},

		computed: {
			currentProjectDescription: function() {
				return "Description: " + this.currentProject.link;
			}, 

		},

		methods: {

		    initTimeLine() {
		    	var self = this;

			    function a(d, i) {
			        return Math.round(D(I[i].midpoint))
			    }

				function o(d, i) {
			        var e = 0,
			          	r = Q[i];
			        if (r) {
			            var o = a(d, i),
			            u = o + r.width;
			            u > self.settings.width && (o -= r.width,
			            u -= r.width),
			            e = q.findIndex(function(d) {
			                return !d || d.u === i || d.x < o
			            }),
			            -1 === e ? e = 0 : q[e] = {
			                x: u,
			                u: i
			            }
			        }
			        return (e + 1) * self.settings.h * -1
			    }

			    function i(d, i) {
			        var e = a(d, i),
			           r = Q[i];
			        return r && e + r.width > self.settings.width && (e -= r.width),
			        "translate(" + e + " " + o(d, i) + ")"
			    }

				self.settings.m = self.settings.f + self.settings.lineHeight,
				self.settings.height = this.settings.m+ this.settings.s,

				this.node = this.projects.reverse();
			    console.log("this", this)

			    if (this.node) {
			        var timestamp = (new Date).getTime(),
		          		colors = this.colorPalette;

			        this.node.forEach(function(d, i) {
			            0 === d.ended_at && (d.ended_at = timestamp),
			            //t.color = colors(i);
			            d.color = colors(d.category);
			           
			        }); 
				    var startTime = min(this.node, function(d) {
			            	return d.started_at
			        	});
			        var endTime = max(this.node, function(d) {
			            	return d.ended_at
			        	});
			        var	M = moment.utc(startTime), 
			        	_ = moment.utc(endTime),
			        	b = _.diff(M, "days") + 1, 
			        	I = this.node.map(function(d) {
				            for (var n = range(b).map(function() {
				                return 0
				            }),
					        e = moment.utc(d.started_at), 
					        r = moment.utc(d.ended_at), 
					        a = r.diff(e, "days"), 
					        o = Math.floor(a / 2), 
					        i = e.diff(M, "days"), c = 0; c < a; c++)
			                k = c < o ? easeQuadInOut(c / o) : 1 - easeQuadInOut(Math.abs(c - o) / o),
			                n[i + c] = k;
				            return {
				                midpoint: i + o,
				                project: d,
				                values: n
				            }
				        });

			        var	O = range(b).map(function(d) {
				            var n = {};
				            return I.forEach(function(e, r) {
				                n[self.node[r].name] = e.values[d]
				            }),
				            n
			        	});
			        var P = stack().keys(this.node.map(function(d) {
			            return d.name
			        })).order(stackOrderNone).offset(stackOffsetNone);
			        var D = scalePow().exponent(self.settings.v).domain([0, b - 1]).range([0, this.settings.width]);
			        var E = max(range(b).map(function(d) {
			            return sum(I, function(i) {
			                return i.values[d]
			            })
			        }));
			        var F = scaleLinear().domain([0, E]).range([self.settings.lineHeight, 0]);
			        var N = area()
				        .x(function(d, i) {
				            return D(i)
				        }).y0(function(d) {
				            return F(d[0])
				        }).y1(function(d) {
				            return F(d[1])
				        });

			        select("#timeline").style("padding-bottom", this.settings.height / this.settings.width * 100 + "%");
			        var frame = select("#timeline > svg").attr("viewBox", "0 0 " + this.settings.width + " " + this.settings.height ).attr("preserveAspectRatio", "xMinYMin meet").on("mouseout", self.n);
			        self.timeline = frame.append("g").attr("class", "timeline").attr("transform", "translate(0 " + self.settings.f + ")");
			        self.timeline.append("rect").attr("width", this.settings.width).attr("height", self.settings.lineHeight).attr("fill", "transparent").on("click", self.n).on("mouseout", self.reduce);
			        
			        self.dataSet = null;
			        var L = P(O),
			          	Q = (self.timeline.selectAll("path").data(L).enter().append("path").attr("d", N).on("click", function(d, i) {
			            	self.t(self.node[i], !0)
			        	}).on("mouseover", self.extend).on("mouseout", self.reduce).exit().remove(), []),
			          	flags = this.timeline.selectAll(".flag").data(L).enter().append("g").attr("class", "flag").on("click", function(d, i) {
			            	self.t(self.node[i])
			        	}).on("mouseover", self.extend);


			        flags.append("line").attr("x1", a).attr("x2", a).attr("y2", function(d, i) {
			            return F(d[I[i].midpoint][1]) + 1
			        }).attr("stroke-width", 1).attr("opacity", 0.6)
			        	.attr("stroke", function(d, i) {
			            return self.node[i].color
			        });
			        var flagsLinks = flags.append("a").attr("xlink:href", function(d, i) {
			            return self.node[i].link
			        }).attr("target", "_blank").attr("transform", i);
			        flagsLinks.append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 16)
			        	.attr("fill", "transparent");
			        	// .attr("fill", function(t, n) {
			         //    	return node[n].color
			        	// }),
			        flagsLinks.append("text").attr("x", 2)
			        .style("font-size", "10px")
			        .attr("fill", "#ededed")
			        .style("text-transform", "uppercase") 
    				.text(function(d, i) {
			            return self.node[i].name
			        });
			        var Q = flagsLinks.nodes().map(function(d) {
			            var n = d.children[1].getBBox();
			            return {
			                bbox: n,
			                width: Math.ceil(n.width) + 6
			            }
			        });
			        flagsLinks.select("rect").attr("width", function(d, i) {
			            return Q[i].width
			        });
			        var q = range(10).map(function() {
			            return null
			        });
			        flagsLinks.attr("transform", i),
			        q = range(10).map(function() {
			            return null
			        }),
			        flags.select("line").attr("y1", o),
			        flags.exit().remove();
			        self.update(); //

			        for (var z = scalePow().exponent(self.settings.v).domain([startTime, endTime]).range([0, self.settings.width]), G = timeFormat("%Y"), H = parseInt(G(startTime), 10), J = parseInt(G(endTime), 10), K = [], k = H; k < J; k++) {
			            K.push(new Date(k,1).getTime());
			        	var S = axisBottom().scale(z).tickValues(K).tickFormat(G);
			        	frame.append("g").attr("class", "axis").attr("transform", "translate(0," + self.settings.m + ")").call(S)
			        }
			    }
			},

			update() {
		        this.timeline.selectAll("path").transition().attr("fill", this.coloring),
		        //timeline.selectAll(".flag rect").transition().attr("fill", coloring),
		        //timeline.selectAll(".flag line").transition().attr("stroke", coloring),	        
		        this.timeline.selectAll(".flag text").transition().attr("fill", function(d, i) {
		            return this.dataSet && this.node[i] !== this.dataSet || !d ? "transparent" : "#686868"
		        });
		        this.timeline.selectAll(".flag line").transition().attr("opacity", function(d, i) {
		            return this.dataSet && this.node[i] !== this.dataSet || !d ? "0" : "0.6"
		        });
		    },

			t(d) {
		        this.dataSet = d;
		        this.update();
		    },

		    n() { // onmouseout
		        this.dataSet = null;
		        this.update();
		    },

		    extend(d, i) { 
		        this.t(this.node[i], !0);
		        this.$emit('projectSelected', i);

		    },

		    reduce() { 
		        event.stopPropagation();
		        this.$emit('projectDeselected');
		    },


		    coloring(d, i) {
		        var e = this.node[i];
		        return this.dataSet && e !== this.dataSet || !d ? "#f4f4f4" : e.color
		    },

	    },
	}
</script>


<style scoped>

	#project-timeline {
		color: #686868;
	    margin-top: 3%;
	    margin-bottom: 0% !important;
	}

	#timeline {
	    display: inline-block;
	    position: relative;
	    width: 100%;
	    vertical-align: middle;
	    overflow: hidden;
	    margin-top: 12%;
	}

	#timeline svg {
	    display: inline-block;
	    position: absolute;
	    top: 0;
	    left: 0
	}

	#timeline path {
	    cursor: pointer;
	    stroke: #FFF;
	    stroke-width: 0px;
	}

	.timeline-tooltip.hidden {
	    visibility: hidden
	}

	a:hover {
	    color: #6ad1a4;
	}

/*	.axis text {
	    font-size: 10px;
	    fill: #686868
	}

	.axis path {
	    fill: none;
	    stroke: #686868;
	    shape-rendering: geometricPrecision;
	}*/

	.flag {
	    cursor: pointer;
	}

	.flag text {
		font-family: 'Aloes-Rg';
	    font-size: 9px;
	    text-transform: uppercase; 
	    opacity: 0.7;
	}


</style>