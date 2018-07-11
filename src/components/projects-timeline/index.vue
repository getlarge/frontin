<template>
	<div id="project-timeline" >
	    <h1 class="head-title" >Projects timeline </h1>
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
	import { rgb } from "d3-color"
	import { easeLinear, easeQuadInOut } from "d3-ease"
	import { interpolate, interpolateHcl, interpolateHclLong } from "d3-interpolate"
	import { scaleLinear, scalePow, scaleOrdinal, scaleTime } from "d3-scale"
	import { schemeCategory10, schemePaired } from "d3-scale-chromatic"
	import { event, select, selectAll, style } from "d3-selection"
	import { area, stack, stackOrderNone, stackOffsetNone } from "d3-shape"
	import { timeFormat } from "d3-time-format"
	import { active, transition } from "d3-transition"
	import tooltip from "./tooltip"
	import moment from 'moment'
	import { EventBus } from '@/main'

	export default {

		data() {
		    return {
		    	pageTopic: "getlarge" + this.$route.path,
				width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
				height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
				currentProject: undefined,
				projectData: undefined,
				projects : [{
			            "name": "Web app development",
			            "link": "#",
			            "category": 8,
			            "description": "Working on the frontend and backend, with the intent to create a fully interactive browsing experience.",
			            "tags": "NodeJS, VueJS, D3JS, MQTT, Express, Open Source",
			            "img": "static/icons/here.png",
			            "started_at": 1526384090000,
			            "ended_at": 0,
			            "is_alive": true
			        }, {
			        	"name": "Web presentations",
			            "link": "https://aloes.io",
			            "category": 0,
			            "description": "Summarize and describe product and goals on a website and an interactive presentation, Aloes",
			          	"tags": "NodeJS, HTML5, Bootstrap, RevealJS, FabricJS",
			            "img": "static/img/aloes.gif",
			            "started_at": 1519904090000,
			            "ended_at": 1523792090000,
			            "is_alive": true
			        },{
			   			"name": "IoT platform",
			            "link": "https://app.aloes.io",
			            "category": 4,
			            "description": "Designing a web platform for professionals with Exostic, aiming to simplify devices and softwares interoperability. Backend and frontend dev.",
			            "tags": "IoT, Dataviz, low code",
			            "img": "static/img/dashboard.gif",
			            "started_at": 1503806400000,
			            "ended_at": 1526384090000,
			            "is_alive": true
			        }, {
			        	"name": "Cosmonode board",
			            "link": "https://framagit.org/getlarge/Cosmonode_PCBs",
			            "category": 6,
			            "description": "Creating a multipurpose board to ease IoT experiments on the field.",
			           	"tags": "OpenHardware, PCB, Kicad, MVP, Lora",
			            "img": "static/img/cosmonode.gif",
			            "started_at": 1497526490000,
			            "ended_at": 1515584090000,
			            "is_alive": true
			        }, {
			        	"name": "Greenspace study",
			            "link": "#",
			            "category": 3,
			            "description": "Studying faisability of automated green installation in offices at Nantes. Katra - Chessé",
			           	"tags": "Green, design, automation",
			            "img": "static/img/chesse.png",
			            "started_at": 1489145690000,
			            "ended_at": 1497822490000,
			            "is_alive": false
			        }, {
			        	"name": "Web app prototype",
			            "link": "#",
			            "category": 8,
						"description": "First attempt in web development, to visualize data and manage devices remotely.",
			           	"tags": "Node-red, Raspberry Pi, PoC",
			            "img": "static/img/proto7.png",		            
			            "started_at": 1482582490000,
			            "ended_at": 1489939290000,
			            "is_alive": false
			        }, {
			        	"name": "DIY Gateway",
			            "link": "https://framagit.org/getlarge/GatewayManager",
			            "category": 7,
						"description": "Developping a gateway firmware to forward nodes (+ sensors) comunication to the web",
			           	"tags": "ESP8266, C++, MySensors MQTT, Open Source",
			            "img": "static/img/arduino.png",	
			            "started_at": 1483312090000,
			            "ended_at": 1497526490000,
			            "is_alive": true
			        }, {
			        	"name": "Biodiag prototype",
			            "link": "#",
			            "category": 6,
			            "description": "First sketch to monitor plants, and trigger reactions based on environment conditions.",
			            "tags": "Hardware, Software, Arduino, PoC",
			            "img": "static/img/proto6.jpg",
			            "started_at": 1461312090000,
			            "ended_at": 1489145690000,
			            "is_alive": true
			        }, {
			        	"name": "Plants have conversations",
			            "link": "#",
			            "category": 1,
			            "description": "Studying the ways to catch , classify, and interprete plants signals. ",
			            "tags": "Botanic, secret life of plants",
			            "img": "static/icons/random-dither-green.png",
			            "started_at": 1481260890000,
			            "ended_at": 0,
			            "is_alive": true
			        }, {
			            "name": "Art exhibition",
			            "link": "#",
			            "category": 5,
			            "description": "Exhibition introducing two handmade creations, Promenarts gallery",
			            "tags": "arts, île de Ré",
			            "img": "static/img/promenarts.jpg",
			            "started_at": 1460720090000,
			            "ended_at": 1476531290000,
			            "is_alive": true
			        }, {
			        	"name": "Vegetal column prototypes",
			            "link": "#",
			            "category": 1,
			            "description": "Another approach to grow plants, now commercialized.",
			            "tags": "Urban farming, innovation, hydroponic",
			            "img": "static/img/proto4.jpg",
			            "started_at": 1445513690000,
			            "ended_at": 1469187290000,
			            "is_alive": true
			        }, {
			        	"name": "Publication",
			            "link": "#",
			            "category": 5,
			            "description": "Vegetal installation in a nice residence hidden in La Rochelle, Habitat magazine",
			            "tags": "luxury spot, japanese garden",
			            "img": "static/img/publish.jpg",
			            "started_at": 1443314890000,
			            "ended_at": 1445516890000,
			            "is_alive": true
			        }, {
			            "name": "Greenspace study ",
			            "link": "#",
			            "category": 3,
			            "description": "Assisting landscape team for an installation linked to the public opening of the greenhouses, La Rochelle",
			            "tags": "project call, hydroponic",
			            "img": "static/img/serre-lr.jpg",
			            "started_at": 1421384400000,
			            "ended_at": 1428638400000,
			            "is_alive": false
			        }, {
			            "name": "IVI",
			            "link": "#",
			            "category": 2,
			            "description": "Created a company to offer my skills on designing and making unexpected nests for plants.",
			            "tags": "design vegetal, landscapes",
			            "img": "static/img/mv_3.jpg",
			            "started_at": 1398425690000,
			            "ended_at": 1500873690000,
			            "is_alive": false
			        }, {
			            "name": "Green wall experimentations",
			            "link": "#",
			            "category": 1,
			            "description": "After experimenting with hydroponics for a while, i made a fun attempt to create a flying garden, later turning into a job.",
			            "tags": "green wall, NFT, experiment",
			            "img": "static/img/visuals.gif",			            
			            "started_at": 1378380890000,
			            "ended_at": 1398425690000,
			            "is_alive": false
			        }, {
			            "name": "Online store",
			            "link": "#",
			            "category": 0,
			            "description": "Setting up an online grow shop ( frontend, graphic creation, content management, SEO ), Home Garden Labs",
			            "tags": "e-commerce, garden, organic, hydroponic",
			            "img": "static/img/HGL.jpg",
			            "started_at": 1346844890000,
			            "ended_at": 1395380890000,
			            "is_alive": false
			        }]
			}
	  	},

		components: {
			tooltip: tooltip,
		},

	  	created() {
	  	},

	  	mounted() {
            this.$on("projectSelected", e => {
              //console.log("projectSelected", e);
              this.currentProject = this.projects[e];
            });	

            this.$on("projectDeselected", () => {
              //console.log("projectDeselected");
              this.currentProject = undefined;
            });		    

            this.initTimeLine();
		},

		updated() {
			//console.log("updated")
		},

		beforeDestroy() {
		},

		watch: { 
	      	
		},

		computed: {
			currentProjectDescription: function() {
				return "Description: " + this.currentProject.link;
			}
		},

		methods: {

		    initTimeLine() {
		    	var self = this;

				function t(t) {
			        dataSet = t;
			        update();
			    }
			    function n() { // onmouseout
			        dataSet = null;
			        update();
			    }
			    function extend(n, e) { //onmouseover
			        t(node[e], !0);
			        self.$emit('projectSelected', e);

			    }
			    function reduce() { //onmouseenter.?
			        event.stopPropagation();
			        self.$emit('projectDeselected');
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

			    function coloring(t, n) {
			        var e = node[n];
			        return dataSet && e !== dataSet || !t ? "#f4f4f4" : e.color
			    }

			    function update() {
			        timeline.selectAll("path").transition().attr("fill", coloring),
			        //timeline.selectAll(".flag rect").transition().attr("fill", coloring),
			        //timeline.selectAll(".flag line").transition().attr("stroke", coloring),
			        // timeline.selectAll(".flag rect").transition().attr("fill", function(t, n) {
			        //     return dataSet && node[n] !== dataSet || !t ? "transparent" : coloring
			        // });			        
			        timeline.selectAll(".flag text").transition().attr("fill", function(t, n) {
			            return dataSet && node[n] !== dataSet || !t ? "transparent" : "#686868"
			        });
			        timeline.selectAll(".flag line").transition().attr("opacity", function(t, n) {
			            return dataSet && node[n] !== dataSet || !t ? "0" : "0.6"
			        });
			    }

			    var k,
			    	l = 1000, // viewbox width
					d = 110, // flag height or stack height
					s = 20,
					f = 180, // over height
					m = f + d,
					p = m + s,
					v = 1.5,
					h = 35, // line height
					paletteLength = 10;

					const colorPalette = scaleOrdinal().range([ "#28693e", "#3f9e5e", "#60c780", "#5ca775", "#84c899", "#9adfb0", "#6ed659", "#417c52", "#56a46f" ]); 
					var colorScheme = 
				      scaleLinear().domain([1,paletteLength]).interpolate(interpolateHclLong)
				      .range([rgb("#007AFF"), rgb('#FFF500')]);

					var node = this.projects.reverse();
			    
			    if (node) {
			        var timestamp = (new Date).getTime(),
		          		//colors = scaleOrdinal(schemePaired);
		          		colors = colorPalette;

			        node.forEach(function(t, n) {
			            0 === t.ended_at && (t.ended_at = timestamp),
			            //t.color = colors(n);
			            t.color = colors(t.category);
			           
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
			        var N = area()
			        .x(function(t, n) {
			            return D(n)
			        }).y0(function(t) {
			            return F(t[0])
			        }).y1(function(t) {
			            return F(t[1])
			        });

			        select("#timeline").style("padding-bottom", p / l * 100 + "%");
			        var frame = select("#timeline > svg").attr("viewBox", "0 0 " + l + " " + p ).attr("preserveAspectRatio", "xMinYMin meet").on("mouseout", n),
			          	timeline = frame.append("g").attr("class", "timeline").attr("transform", "translate(0 " + f + ")");
			        
			        timeline.append("rect").attr("width", l).attr("height", d).attr("fill", "transparent").on("click", n).on("mouseout", reduce);
			        
			        var dataSet = null,
			          	L = P(O),
			          	Q = (timeline.selectAll("path").data(L).enter().append("path").attr("d", N).on("click", function(n, e) {
			            	t(node[e], !0)
			        	}).on("mouseover", extend).on("mouseout", reduce).exit().remove(), []),
			          	flags = timeline.selectAll(".flag").data(L).enter().append("g").attr("class", "flag").on("click", function(n, e) {
			            	t(node[e])
			        	}).on("mouseover", extend);


			        flags.append("line").attr("x1", a).attr("x2", a).attr("y2", function(t, n) {
			            return F(t[I[n].midpoint][1]) + 1
			        }).attr("stroke-width", 1).attr("opacity", 0.6)
			        	.attr("stroke", function(t, n) {
			            return node[n].color
			        });
			        var flagsLinks = flags.append("a").attr("xlink:href", function(t, n) {
			            return node[n].link
			        }).attr("target", "_blank").attr("transform", i);
			        flagsLinks.append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 16)
			        	.attr("fill", "transparent");
			        	// .attr("fill", function(t, n) {
			         //    	return node[n].color
			        	// }),
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

	.axis text {
	    font-size: 10px;
	    fill: #686868
	}

	.axis path {
	    fill: none;
	    stroke: #686868;
	    shape-rendering: geometricPrecision;
	}

	.flag {
	    cursor: pointer;
	}

	.flag text {
		font-family: 'Aloes-Rg';
	    font-size: 10px;
	    text-transform: uppercase; 
	    opacity: 0.7;
	}

 	.head-title {
 	    font-family: 'Aloes-Bd';
    	font-size: 22px;  
 	 	text-transform: uppercase; 
 	 	color: #686868; 
	    text-align: left;
	    margin-left: 2%; 
  	}
</style>