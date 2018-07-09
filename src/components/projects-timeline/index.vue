
<template>
	<div id="project-timeline">
		<svg></svg>
	</div>
</template>

<script>

	import config from '@/config.json'
	import { min, max, range, sum } from "d3-array"
	import { axisBottom } from "d3-axis"
	import { easeLinear, easeQuadInOut } from "d3-ease"
	import { scaleLinear, scalePow, scaleOrdinal, scaleTime } from "d3-scale"
	import { schemeCategory10, schemePaired } from "d3-scale-chromatic"
	import { event, select, selectAll, style } from "d3-selection"
	import { area, stack, stackOrderNone, stackOffsetNone } from "d3-shape"
	import { timeFormat } from "d3-time-format"
	import { active, transition } from "d3-transition"
	import moment from 'moment'
	import { EventBus } from '@/main'

	export default {

		data() {
		    return {
		    	pageTopic: "getlarge" + this.$route.path,
				width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
				height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
				projects : [{
			            "name": "web app development",
			            "link": "/projects/web/",
			            "started_at": 1526384090000,
			            "ended_at": 0,
			            "is_alive": true
			        }, {
			        	"name": "presentation slides Aloes",
			            "link": "/projects/pitch/",
			            "started_at": 1519904090000,
			            "ended_at": 1523792090000,
			            "is_alive": true
			        }, {
			        	"name": "customer development",
			            "link": "/projects/pitch/",
			            "started_at": 1516793690000,
			            "ended_at": 0,
			            "is_alive": true
			        }, {
			   			"name": "product design II",
			            "link": "/projects/product-design/",
			            "started_at": 1503806400000,
			            "ended_at": 1526384090000,
			            "is_alive": true
			        }, {
			        	"name": "hardware prototype II",
			            "link": "/projects/hardware/",
			            "started_at": 1497526490000,
			            "ended_at": 1515584090000,
			            "is_alive": true
			        }, {
			        	"name": "study for Katra - Chessé",
			            "link": "/projects/study-katra/",
			            "started_at": 1489145690000,
			            "ended_at": 1497822490000,
			            "is_alive": false
			        }, {
			        	"name": "web app PoC",
			            "link": "/projects/app-poc/",
			            "started_at": 1468582490000,
			            "ended_at": 1473939290000,
			            "is_alive": true
			        }, {
			        	"name": "software development",
			            "link": "/projects/product-design/",
			            "started_at": 1463312090000,
			            "ended_at": 1497526490000,
			            "is_alive": true
			        }, {
			        	"name": "hardware prototype",
			            "link": "/projects/hardware/",
			            "started_at": 1463312090000,
			            "ended_at": 1489145690000,
			            "is_alive": true
			        }, {
			        	"name": "plants have conversations",
			            "link": "/projects/plants-talk/",
			            "started_at": 1481260890000,
			            "ended_at": 0,
			            "is_alive": true
			        }, {
			            "name": "art exhibition",
			            "link": "/projects/art-exhibition/",
			            "started_at": 1460720090000,
			            "ended_at": 1476531290000,
			            "is_alive": true
			        }, {
			        	"name": "vegetal column prototypes",
			            "link": "/projects/vegetal-column/",
			            "started_at": 1445513690000,
			            "ended_at": 1469187290000,
			            "is_alive": true
			        }, {
			        	"name": "publication",
			            "link": "/projects/publication/",
			            "started_at": 1449884890000,
			            "ended_at": 1449916890000,
			            "is_alive": true
			        }, {
			        	"name": "product design",
			            "link": "/projects/product-design/",
			            "started_at": 1430884890000,
			            "ended_at": 1441884890000,
			            "is_alive": false
			        }, {
			            "name": "study for city greenspaces",
			            "link": "/projects/study-larochelle/",
			            "started_at": 1421384400000,
			            "ended_at": 1428638400000,
			            "is_alive": false
			        }, {
			            "name": "hydroponics advisor",
			            "link": "/projects/hydroponic-advisor/",
			            "started_at": 1403496000000,
			            "ended_at": 1410235200000,
			            "is_alive": true
			        }, {
			            "name": "IVI",
			            "link": "/projects/ivi/",
			            "started_at": 1398425690000,
			            "ended_at": 1500873690000,
			            "is_alive": false
			        }, {
			            "name": "green wall experimentations",
			            "link": "/projects/green-wall/",
			            "started_at": 1378380890000,
			            "ended_at": 1398425690000,
			            "is_alive": false
			        }, {
			            "name": "HGL - online store",
			            "link": "/projects/hgl/",
			            "started_at": 1346844890000,
			            "ended_at": 1378380890000,
			            "is_alive": false
			        }]
			}
	  	},

	  	created() {
	  		EventBus.$on("got-volt-frame", voltFrame => {
		      //console.log("voltFrame", voltFrame)
		      //return this.tick(voltFrame);
	    	});
	  	},

	  	mounted() {
		    this.initTimeLine();
		},

		updated() {
			//console.log("updated")
		},

		beforeDestroy() {
			EventBus.$off("got-volt-frame");
		},

		watch: { 
	      	
		},

		computed: {
			filter: function() {

			}
		},

		methods: {
		    initTimeLine() {
				function t(t) {
			        dataSet = t,
			        update()
			    }
			    function n() { // onmouseout
			        dataSet = null,
			        update()
			    }
			    function e(n, e) { //onmouseover
			        t(node[e], !0)
			    }
			    function r() { //onmouseenter.?
			        event.stopPropagation()
			    }
			    function a(t, n) {
			        return Math.round(D(I[n].midpoint))
			    }
			    function o(t, n) {
			        var e = 0,
			          	r = Q[n];
			        if (r) {
			            var o = a(t, n)
			              , i = o + r.width;
			            i > l && (o -= r.width,
			            i -= r.width),
			            e = q.findIndex(function(t) {
			                return !t || t.i === n || t.x < o
			            }),
			            -1 === e ? e = 0 : q[e] = {
			                x: i,
			                i: n
			            }
			        }
			        return (e + 1) * h * -1
			    }

			    function i(t, n) {
			        var e = a(t, n)
			          , r = Q[n];
			        return r && e + r.width > l && (e -= r.width),
			        "translate(" + e + " " + o(t, n) + ")"
			    }

			    function c(t, n) {
			        var e = node[n];
			        return dataSet && e !== dataSet || !t ? "#000" : e.color
			    }

			    function update() {
			        timeline.selectAll("path").transition().attr("fill", c),
			        timeline.selectAll(".flag rect").transition().attr("fill", c),
			        timeline.selectAll(".flag line").transition().attr("stroke", c),
			        timeline.selectAll(".flag text").transition().attr("fill", function(t, n) {
			            return dataSet && node[n] !== dataSet || !t ? "#000" : "#fff"
			        })
			    }

			    var k,
			    	l = 1e3, // viewbox width
					d = 120, // flag height
					s = 20,
					f = 120, // stack height
					m = f + d,
					p = m + s,
					v = 1.4,
					h = 20,
					node = this.projects.reverse();
			    
			    if (node) {
			        var timestamp = (new Date).getTime(),
		          		colors = scaleOrdinal(schemePaired);

			        node.forEach(function(t, n) {
			            0 === t.ended_at && (t.ended_at = timestamp),
			            t.color = colors(n)
			        }); 
				    var startTime = min(node, function(t) {
			            	return t.started_at
			        	});
			        var endTime = max(node, function(t) {
			            	return t.ended_at
			        	});
			        var	M = moment.utc(startTime), 
			        	_ = moment.utc(endTime),
			        	b = _.diff(M, "days") + 1, 
			        	I = node.map(function(t) {
				            for (var n = range(b).map(function() {
				                return 0
				            }),
						        e = moment.utc(t.started_at), 
						        r = moment.utc(t.ended_at), 
						        a = r.diff(e, "days"), 
						        o = Math.floor(a / 2), 
						        i = e.diff(M, "days"), c = 0; c < a; c++)
			                k = c < o ? easeQuadInOut(c / o) : 1 - easeQuadInOut(Math.abs(c - o) / o),
			                n[i + c] = k;
				            return {
				                midpoint: i + o,
				                project: t,
				                values: n
				            }
				        }),

			        	O = range(b).map(function(t) {
				            var n = {};
				            return I.forEach(function(e, r) {
				                n[node[r].name] = e.values[t]
				            }),
				            n
			        	});
			        var P = stack().keys(node.map(function(t) {
			            return t.name
			        })).order(stackOrderNone).offset(stackOffsetNone);
			        var D = scalePow().exponent(v).domain([0, b - 1]).range([0, l]);
			        var E = max(range(b).map(function(t) {
			            return sum(I, function(n) {
			                return n.values[t]
			            })
			        }));
			        var F = scaleLinear().domain([0, E]).range([d, 0]);
			        var N = area().x(function(t, n) {
			            return D(n)
			        }).y0(function(t) {
			            return F(t[0])
			        }).y1(function(t) {
			            return F(t[1])
			        });

			        select("#project-timeline").style("padding-bottom", p / l * 100 + "%");
			        var frame = select("#project-timeline > svg").attr("viewBox", "0 0 " + l + " " + p).attr("preserveAspectRatio", "xMinYMin meet").on("mouseout", n),
			          	timeline = frame.append("g").attr("class", "timeline").attr("transform", "translate(0 " + f + ")");
			        
			        timeline.append("rect").attr("width", l).attr("height", d).attr("fill", "transparent").on("click", n).on("mouseout", r);
			        
			        var dataSet = null,
			          	L = P(O),
			          	Q = (timeline.selectAll("path").data(L).enter().append("path").attr("d", N).on("click", function(n, e) {
			            	t(node[e], !0)
			        	}).on("mouseover", e).on("mouseout", r).exit().remove(), []),
			          	flags = timeline.selectAll(".flag").data(L).enter().append("g").attr("class", "flag").on("click", function(n, e) {
			            	t(node[e])
			        	}).on("mouseover", e);
			        flags.append("line").attr("x1", a).attr("x2", a).attr("y2", function(t, n) {
			            return F(t[I[n].midpoint][1]) + 1
			        }).attr("stroke-width", 1).attr("stroke", function(t, n) {
			            return node[n].color
			        });
			        var flagsLinks = flags.append("a").attr("xlink:href", function(t, n) {
			            return node[n].link
			        }).attr("transform", i);
			        flagsLinks.append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 16).attr("fill", function(t, n) {
			            return node[n].color
			        }),
			        flagsLinks.append("text").attr("x", 2).attr("y", 12).text(function(t, n) {
			            return node[n].name
			        });
			        var Q = flagsLinks.nodes().map(function(t) {
			            var n = t.children[1].getBBox();
			            return {
			                bbox: n,
			                width: Math.ceil(n.width) + 6
			            }
			        });
			        flagsLinks.select("rect").attr("width", function(t, n) {
			            return Q[n].width
			        });
			        var q = range(10).map(function() {
			            return null
			        });
			        flagsLinks.attr("transform", i),
			        q = range(10).map(function() {
			            return null
			        }),
			        flags.select("line").attr("y1", o),
			        flags.exit().remove(),
			        update(); //

			        for (var z = scalePow().exponent(v).domain([startTime, endTime]).range([0, l]), G = timeFormat("%Y"), H = parseInt(G(startTime), 10), J = parseInt(G(endTime), 10), K = [], k = H; k < J; k++) {
			            K.push(new Date(k,1).getTime());
			        	var S = axisBottom().scale(z).tickValues(K).tickFormat(G);
			        	frame.append("g").attr("class", "axis").attr("transform", "translate(0," + m + ")").call(S)
			        }
			    }
			},

	    },
	}
</script>


<style lang="scss">

	#project-timeline {
	    display: inline-block;
	    position: relative;
	    width: 100%;
	    vertical-align: middle;
	    overflow: hidden;
	    margin-top: 10%;
	}

	#project-timeline svg {
	    display: inline-block;
	    position: absolute;
	    top: 0;
	    left: 0
	}

	#project-timeline path {
	    cursor: pointer;
	    stroke: #999;
	    stroke-width: 0.2px;
	}

	#timeline-tooltip.hidden {
	    visibility: hidden
	}

	/*rect {
	    stroke: #686868;
	    stroke-width: 0.5px
	}*/

	a:hover>rect {
/*	    fill: #ff5eaa;
*/	    stroke: #999
	}

	.axis text {
	    font-size: 10px;
	    fill: #999
	}

	.axis line,.axis path {
	    fill: none;
	    stroke: #999;
	    shape-rendering: crispEdges
	}

	.flag {
	    cursor: pointer
	}

	.flag text {
		color: #efefef;
	    font-size: 12px
	}

</style>