<template>
    <div id="vis">
        <mq-layout class="controls-laptop" mq="laptop">
            <label>Adjust width</label>
            <input type="range" v-model="settings.width" min="0" max="100" />
         </mq-layout>
        <mq-layout class="controls-tablet" mq="tablet">
            <label>Adjust width</label>
            <input type="range" v-model="settings.width" min="0" max="100" />
        </mq-layout>
        <mq-layout class="controls-mobile" mq="mobile">
            <label class="controls-mobile">Adjust width</label>
            <input type="range" v-model="settings.width" min="0" max="100" />
        </mq-layout>

        <div class="svg-container" :style="{width: settings.width + '%'}">
            <svg id="svg" pointer-events="all" viewBox="0 0 960 600" preserveAspectRatio="xMinYMin meet">
                <g :id="links"></g>
                <g :id="images"></g>
                <g :id="nodes"></g>
                <g :id="texts"></g>
            </svg>
        </div>
    </div>
</template>

<script>
	import { range } from "d3-array";
	import { rgb, interpolateRgb } from "d3-color";
	import { drag } from "d3-drag";
	import { easeCubic, easeElastic, easeLinear } from "d3-ease";
	import { json } from "d3-fetch";
	import { forceSimulation, force, forceCenter, forceCollide, forceLink, forceManyBody, forceX, forceY } from "d3-force";
	import { format } from "d3-format";
	import { hierarchy, tree } from "d3-hierarchy";
	import { interpolateString } from "d3-interpolate";
	import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale";
	import { schemeCategory10 } from "d3-scale-chromatic";
	import { append, attr, event, select, selectAll, style } from "d3-selection";
	import { interval, now, timeout, timer } from "d3-timer";
	import { active, transition } from "d3-transition";
	import { zoom } from "d3-zoom";
    import { EventBus } from '@/main'

    import ToneSynth from '@/tone-components/synth'


	export default {
		data() {
		    return {
                graph: null,
                simulation: null,
                //color : scaleOrdinal.range(["#A07A19", "#AC30C0", "#EB9A72", "#BA86F5", "#EA22A8"]);
                color: scaleOrdinal(schemeCategory10),
                settings: {
                    strokeColor: "#29B5FF",
                    width: 100,
                    svgWigth: 960,
                    svgHeight: 600
                },
                synth: new(ToneSynth),
            };
	  	},

        created() {
            EventBus.$on("got-width-setting", width => {
              console.log("width", width)
              //return this.tick(soundFrame);
              //return this.insertDatapoints(soundFrame, "soundFrame"); /// get the dataset + event to identify which line to update

            });

        },

		mounted() {
            var that = this;
            const DATA_PATH = 'static/data/getlarge.json';
            //const DATA_PATH = 'static/data/animate-force.json';
            json(DATA_PATH).then(graph => {
                var root = hierarchy(graph);
                var nodes = root.descendants();
                var links = root.links(nodes)
                var defs = select("#svg").insert("svg:defs")
                    .data(["end"])
                    .enter().append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");

                that.graph = {
                    nodes : nodes,
                    links : links
                }
                console.log(that.graph);
                // var attractForce = forceManyBody(that.graph.nodes).strength(200).distanceMax(400).distanceMin(60),
                //     repelForce = forceManyBody(that.graph.nodes).strength(-140).distanceMax(550).distanceMin(50);

                that.simulation = forceSimulation(that.graph.nodes)
                    .alphaDecay(0.005)
                    .alpha(0.2)
                    .force("link", forceLink(that.graph.links).id((d, i) => d.id ).distance((d, i) => d.source.data.size / d.source.data.group * 3.5).strength((l, i) => 1 ).iterations(2))
                    .force("charge", forceManyBody(that.graph.nodes).strength(-300).distanceMax(350).distanceMin(100))
                    .force("center", forceCenter(that.settings.svgWigth / 2, that.settings.svgHeight / 2))
                    .force("collisionForce", forceCollide(5).strength(50).iterations(5))
                    .alphaTarget(0.4)
                    .force("x", forceX((d, i) => d.x * 2))
                    .force("y", forceY((d, i) => d.y * 2))
                
            });
        },

        updated() {
            var that = this;
            //console.log(that.nodes)
            that.simulation.nodes(that.graph.nodes).on('tick', that.ticked);
        },

        beforeDestroy() {
            EventBus.$off("got-width-setting");
        },

        computed: {
            nodes () {
                var that = this;
                if (this.graph) {
                    return select("#svg").append("g")
                        .attr("class", "nodes")
                        .selectAll("circle")
                        .data(that.graph.nodes, d => d.data.id )
                        .enter().append("circle")
                        .attr("r", d => d.data.size || 4.5 )
                        .style("fill", d => this.color(d.data.group))
                        .style("opacity", "0")
                        //.on("click", this.onClickNode)
                        .call(drag()
                            .on("start", function dragstarted(d) {
                                if (!event.active) that.simulation.alphaTarget(0.3).restart();
                                d.fx = d.x;
                                d.fy = d.y;
                                that.synth.synthAttack(d.data.notes); //ex delay : '+0.05'

                            })
                            .on("drag", function dragged(d) {
                                d.fx = event.x;
                                d.fy = event.y;
                                EventBus.$emit('mqtt-tx', "getlarge/nodes-position", d.fx + "-" + d.fy)
                                that.synth.synthModulo(event.x, event.y)

                            })
                            .on("end", function dragended(d) {
                                if (!event.active) that.simulation.alphaTarget(0);
                                d.fx = null;
                                d.fy = null;
                                that.synth.synthRelease()

                            })) 
                        // node.append("image")
                       
                }
            },
            links() {
                var that = this;
                //console.log(that)
                if (this.graph) {
                    return select("#svg").append("g")
                        .attr("class", "links")
                        .selectAll("path.link")
                        .data(that.graph.links, (d) => d.target.id )
                        .enter().insert("path")
                        .style("stroke-width", (d) => (d.target.data.size / d.target.data.group * 1.3).toString() + "px")
                        .style("stroke", "#eee")
                        .style("fill", "none");
                }
            },

            texts() {
                var that = this;
                if (that.nodes) {
                    console.log("that", that)
                    return select("#svg").append("g")
                        .attr("class", "texts")
                        .selectAll("text")
                        //.data(that.graph.nodes)
                        .data(that.graph.nodes, d => d.data.id )
                        .enter().append("text")
                        .attr("x", 20)
                        .attr("y", (d) => 25 + d.data.size)
                        .attr("fill", "#000")
                        .text((d) => d.data.title );
                }
            },

            images() {
                var that = this;
                //console.log(that)
                if (that.graph) {
                    return  select("#svg").append("g") //that.nodes.
                        .attr("class", "images")
                        .selectAll("image")
                        .data(that.graph.nodes, d => d.data.id )
                        .enter().append("image")
                        .attr("xlink:href", (d) => d.data.mini)
                        .attr("crossOrigin", "anonymous")
                        .attr("x", (d) => -1 * d.data.size)
                        .attr("y", (d) => -1 * d.data.size)
                        .attr("height", (d) => 2 * d.data.size)
                        .attr("width", (d) => 2 * d.data.size)
                }
            },

        },

        methods: {
            nodeTransform(d) {
                var maxNodeSize = 50;
                //console.log(d.data.size);
                d.x = Math.max(maxNodeSize, Math.min(this.settings.svgWigth - (d.data.size || 16), d.x));
                d.y = Math.max(maxNodeSize, Math.min(this.settings.svgHeight - (d.data.size || 16), d.y));
                return "translate(" + d.x + "," + d.y + ")";
            },

            ticked() {
                var that = this;
                that.links.attr("d", (d) => {
                    var dx = d.target.x - d.source.x,
                        dy = d.target.y - d.source.y,
                        dr = Math.sqrt(dx * dx + dy * dy);
                    return "M" + d.source.x + "," +
                        d.source.y +
                        "A" + dr + "," +
                        dr + " 0 0,1 " +
                        d.target.x + "," +
                        d.target.y;
                })
                that.nodes.attr("transform", that.nodeTransform);
                that.texts.attr("transform", that.nodeTransform);
                that.images.attr("transform", that.nodeTransform);
                // that.nodes
                //     .attr("cx", (d) => d.x)
                //     .attr("cy", (d) => d.y);
            }
        }
	
	}

</script>

<style scoped>
	#vis {
        width: 100%;
        height: 100%;
    }

    .svg-container {
        display: table;
        border: 1px solid #f8f8f8;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    }

    .links line {
        stroke: #999;
        stroke-opacity: 0.6;
    }

    .links path {
        stroke: #FFF;
        stroke-opacity: 0;
    }
    .nodes circle {
        stroke: #fff;
        stroke-width: 1.5px;
    }

    .texts text {
      display: none;
      font-size: 12px;
    }


</style>

<style scoped>
    
        .controls-mobile label { 
            font-size: 10px;
            display: block;
        }
        .controls-laptop label{ 
            font-size: 14px;
            display: block;
        }
        .controls-tablet label{ 
            font-size: 12px;
            display: block;
        }

        .controls-mobile>*+* { 
            position: fixed;
            width: 50px;
            margin-top: 1rem;
        }
        .controls-tablet>*+*{ 
            position: fixed;
            width: 80px;
            margin-top: 1rem;
        }
        .controls-laptop>*+*{ 
            position: fixed;
            width: 100px;
            margin-top: 1rem;
        }
        .controls-mobile { 
            position: fixed;
            border-radius: 5px;
            top: 400px;
            right: 50px;
            background: #f8f8f8;
            padding: 0.5rem;
            display: flex;
            flex-direction: column; 
        }
        .controls-tablet { 
            position: fixed;
            border-radius: 5px;
            top: 150px;
            right: 40px;
            background: #f8f8f8;
            padding: 0.5rem;
            display: flex;
            flex-direction: column; 
        }
        .controls-laptop { 
            position: fixed;
            border-radius: 5px;
            top: 100px;
            right: 60px;
            background: #f8f8f8;
            padding: 0.5rem;
            display: flex;
            flex-direction: column; 
        }

</style>