<template>
    <div id="vis">
        <b-container fluid >
            <b-row align-h="center">
 <cards
                        v-if="currentNode"
                        :title="currentNode.id"
                        :description="currentNode.description"
                        :tags="currentNode.tags"
                        :img="currentNode.img"
                        />
              <b-col sm="9" md="9" lg="9" >               
                
                <div class="svg-container" :style="{width: settings.width + '%'}">
                    
                    <svg id="svg" pointer-events="all" viewBox="0 0 1200 800" preserveAspectRatio="xMinYMin meet">
                        <g :id="links"></g>
                        <g :id="nodes"></g>
                    </svg>
                </div>
                </b-col>  
            </b-row>
          </b-container>
    </div>
</template>

<script>

    import config from '@/config.json'
	import { range } from "d3-array"
	import { drag } from "d3-drag"
	import { json } from "d3-fetch"
	import { forceSimulation, force, forceCenter, forceCollide, forceLink, forceManyBody, forceX, forceY } from "d3-force"
	import { format } from "d3-format"
	import { hierarchy, tree } from "d3-hierarchy"
	import { scaleOrdinal } from "d3-scale"
	import { event, select, selectAll } from "d3-selection"
	import { active, transition } from "d3-transition"
    import cards from "@/components/utils/cards"
    import { EventBus } from '@/main'
    import ToneSynth from '@/tone-components/synth'

	export default {
		data() {
		    return {
                serverURL: config.httpServerURL,
                dataPath : 'static/data/portfolio.json',
                graph: null,
                simulation: null,
                colorPalette : scaleOrdinal().range([ "#28693e", "#3f9e5e", "#60c780", "#5ca775", "#84c899", "#9adfb0", "#6ed659", "#417c52", "#56a46f" ]),
                currentNode: undefined,
                settings: {
                    strokeColor: "#29B5FF",
                    width: 100,
                    svgWigth: 1200,
                    svgHeight: 800,
                    circles: {
                        levels: 6,
                        maxValue: 100,
                        labelFactor: 1.15,
                        opacity: 0.2,
                    },
                },
                synth: new(ToneSynth),
            };
	  	},

        components: {
            cards: cards,
        },

        created() {

        },

        mounted() {
            this.initPortfolio();

            EventBus.$on("stop:cards", i => {
                this.currentNode = undefined;
            });

            this.$on("nodeSelected", i => {
              //console.log("nodeSelected", this.graph.nodes[i].data);
              //this.currentNode = this.graph.nodes[i].data;
            }); 

            this.$on("nodeDeselected", () => {
              //console.log("nodeDeselected");
              //this.currentNode = undefined;
            });  

            EventBus.$on("start:tutorial", i => {
                var text = "Click the play icon to regenerate the tree";
                var tags = "";
                var img = "static/img/tuto-portfolio.gif";
                EventBus.$emit("update:tutorial", this.$route.name, text, tags, img );     
            });

            //select(".svg-container").on("click", this.currentNode = null);
   
        },

        updated() {
            var that = this;
            that.simulation.nodes(that.graph.nodes).on('tick', that.ticked);
            //console.log(that.graph.nodes)
        },

        beforeDestroy() { 
            EventBus.$off("start:tutorial");               
            EventBus.$emit("stop:tutorial");     

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
                        .style("fill", d => this.colorPalette(d.data.category))
                        //.style("fill", "#686868")
                        .style("opacity", d => d.data.group > 2 ? "0" : "1")
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
                        .style("stroke-width", (d) => (d.source.data.size / d.source.data.group*0.1).toString() + "px")
                        .style("stroke", "black")
                        //.style("stroke", d => that.colorPalette(d.target.data.category))
                        .style("opacity", d => d.source.data.group > 2 ? "0" : "0.6")
                        .style("fill", "none");
                }
            },

            texts() {
                var that = this;
                if (that.nodes) {
                    return select("#svg").append("g")
                        .attr("class", "texts")
                        .selectAll("text")
                        .data(that.graph.nodes, d => d.data.id )
                        .enter().append("text")
                        // .attr("x", d => d.data.group > 1 ? -d.data.size/2 : -d.data.size/1.6)
                        // .attr("y", (d) => d.data.size*0.15)
                        .attr("fill", "#FFF")
                        .attr("text-anchor", "middle")
                        .style("text-transform", "uppercase")
                        .style("font-size", d => d.data.group > 1 ? "18" : "21")
                        .attr("opacity", d => d.data.group > 2 ? "0" : "1")
                        .text((d) =>  d.data.group < 3 ? d.data.title : "" );
                }
            },

            images() {
                var self = this;
                if (self.graph) {
                    return  select("#svg").append("g") //that.nodes.
                        .attr("class", "images")
                        .selectAll("image")
                        .data(self.graph.nodes, d => d.data.id )
                        .enter().append("image")
                        .attr("xlink:href", (d) => d.data.group > 2 ? self.serverURL+d.data.mini : "")
                        .attr("crossOrigin", "anonymous")
                        .attr("x", (d) => -1 * d.data.size)
                        .attr("y", (d) => -1 * d.data.size)
                        //.attr("height", (d) => 1.5 * d.data.size)
                        .attr("height", d => d.data.group > 2 ? (1.5 * d.data.size) : (2 * d.data.size) )
                        .attr("width", d => d.data.group > 2 ? (1.5 * d.data.size) : (2 * d.data.size) )

                        .attr("opacity", d => d.data.group > 2 ? "01" : "1")
                        .on( 'click', this.mouseClick)
                        .on( 'mouseenter', this.mouseEnter)
                        // set back
                        .on( 'mouseleave', this.mouseLeave)
                        .call(drag()
                            .on("start", this.dragstarted)
                            .on("drag", this.dragged)
                            .on("end", this.dragended)) 
                }
            },

        },

        methods: {
            initPortfolio() {
                var that = this;
                json(this.serverURL + this.dataPath).then(graph => {
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

                    that.simulation = forceSimulation(that.graph.nodes)
                        .alphaDecay(0.005)
                        .alpha(0.2)
                        .force("link", forceLink(that.graph.links).id((d, i) => d.id ).distance((d, i) => d.source.data.size / d.source.data.group * 3).strength((l, i) => 0.2 ).iterations(2))
                        .force("charge", forceManyBody(that.graph.nodes).strength(-100))
                        .force("center", forceCenter(that.settings.svgWigth / 2, that.settings.svgHeight / 2))
                        .force("collisionForce", forceCollide(5).strength(-250).iterations(1))
                        .alphaTarget(0.4)
                         // .force("x", forceX((d, i) => d.x ))
                         // .force("y", forceY((d, i) => d.y )) 
                });
            },

            nodeTransform(d) {
                var maxNodeSize = 50;
                d.x = Math.max(maxNodeSize, Math.min(this.settings.svgWigth - (d.data.size || 16), d.x));
                d.y = Math.max(maxNodeSize, Math.min(this.settings.svgHeight - (d.data.size || 16), d.y));
                return "translate(" + d.x + "," + d.y + ")";
            },

            ticked() {
                // var total = nodes.length;
                // var radius = Math.min(this.settings.svgWidth / 2, this.settings.svgHeight / 2);
                // var angleSlice = Math.PI * 2 / total;
                var self = this;
                self.links.attr("d", (d) => {
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
                self.nodes.attr("transform", self.nodeTransform);
                self.texts.attr("transform", self.nodeTransform);
                self.images.attr("transform", self.nodeTransform);
               
                // that.texts.attr("transform", function(d, i) {
                //     var rotate = angleSlice * i > Math.PI / 2 ?
                //         (angleSlice * i * 180 / Math.PI) - 270 :
                //         (angleSlice * i * 180 / Math.PI) - 90;
                //     return "translate(" + radius * Math.cos(angleSlice * i - Math.PI / 2) * this.settings.circles.labelFactor +
                //         "," + radius * Math.sin(angleSlice * i - Math.PI / 2) * this.settings.circles.labelFactor +
                //         ") rotate(" + rotate + ")"
                // })
            },

            mouseClick(d, i) {
                this.currentNode = d.data;
            },

            mouseEnter(d, i) {
                //this.currentNode = d.data;
                this.$emit('nodeSelected', i);
            },

            mouseLeave(d, i) {
                if ( this.currentNode !== null ) {
                    //this.currentNode = null;
                    this.$emit('nodeDeselected');                    
                }

            },
            
            dragstarted(d) {
                this.synth.synthAttack(d.data.notes); //ex delay : '+0.05'
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;

            },

            dragged(d) {
                d.fx = event.x;
                d.fy = event.y;
                this.synth.synthModulo(event.x, event.y)
                //EventBus.$emit('mqtt-tx', "getlarge/nodes-position", d.fx + "-" + d.fy)
            },

            dragended(d) {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
                this.synth.synthRelease()
            },

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
       /* border: 1px solid #f8f8f8;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);*/
    }


    .texts text {
      display: none;
      font-size: 12px;
    }


</style>
