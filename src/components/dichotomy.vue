<template >
  	<b-container id="tree-holder" fluid>
  		<b-row align-h="center">      	
			<h1>Regular dichotomy</h1>
			<b-col class="infos" sm="6" md="6" lg="6">
		        </br>
				<p>" a dichotomy is a mode of branching by repeated bifurcation - thus a focus on branching rather than on division."
	      		</p>
			</b-col>
      	</b-row>
			
		<b-row align-h="center">      	
			<b-col id="tree" sm="10" md="10" lg="10" >
		        <svg id="branches" pointer-events="all" viewBox="0 0 900 450" preserveAspectRatio="xMinYMin meet"> 
			        <g :id="line"></g>
		    	</svg>
	<!-- 				<svg id="roots" pointer-events="all" viewBox="0 0 900 200" preserveAspectRatio="xMinYMin meet">
					</svg> -->
			</b-col>
		</b-row>
		<b-button class="regenerate" ><font-awesome-icon :icon="['fas', 'play']" size="2x" /> </b-button>
    </b-container>

</template>
<script>
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
	import { rgb } from "d3-color";
	import { drag } from "d3-drag";
	import { easeLinear } from "d3-ease"
	import { forceSimulation, force, forceCenter, forceCollide, forceLink, forceManyBody, forceX, forceY } from "d3-force"
	import { interpolateHcl } from "d3-interpolate"
	import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
	import { append, attr, event, select, selectAll, style } from "d3-selection"
	import { area, line, curveCardinal, curveNatural, curveCatmullRom } from "d3-shape"
	import { active, transition } from "d3-transition"
	import { EventBus } from '@/main'

	export default {

		data() {
		    return {
				branches: [],
				seed: {i: 0, x: 450, y: 450, a: 0, l: 85, d:-1}, // a = angle, l = length, d = depth
				da: 0.45, // Angle delta
				dl: 0.81, // Length delta (factor)
				ar : 0.5, // Randomness
				maxDepth : 11,
				roots: [],
				seed2: {i: 0, x: 450, y: -20, a: 179, l:25, d:0}, // a = angle, l = length, d = depth
				maxDepth2 : 9,
				settings: {
		            strokeColor: "#29B5FF",
		            width: 100,
		            svgWidth: 900,
		            svgHeight: 600,
	        	},
		        simulation: null,
		        line1: {},
		        lineData: [
					{date: new Date(2007, 3, 24), value: 93.24},
					{date: new Date(2007, 3, 25), value: 95.35},
					{date: new Date(2007, 3, 26), value: 98.84},
					{date: new Date(2007, 3, 27), value: 99.92},
					{date: new Date(2007, 3, 30), value: 99.80},
					{date: new Date(2007, 4,  1), value: 99.47},
				],
			}
	  	},

		components: {
		  FontAwesomeIcon,
		},
	  created() {
	  },

	  mounted() {
	  		// this.simulation = forceSimulation(this.branches)
     //                .alphaDecay(0.005)
     //                .alpha(0.2)
     //                .alphaTarget(0.4)
     //                .force("x", forceX((d, i) => d.x * 2))
     //                .force("y", forceY((d, i) => d.y * 2));

		    this.initTree();
		    //console.log(this);
		},

	  updated() {
		    this.update();
		},

		computed: {
	    line() {
        var that = this;
        //console.log(that)
        if (this.lineData) {
          return select("#branches").append("g")
        		.attr("class", "line")
				.datum(this.lineData)
		    	.attr("d", this.line1)
		    	.enter().insert("path")
	              .style("stroke-width", (d) => (d.target.data.size / d.target.data.group * 1.3).toString() + "px")
	              .style("stroke", "#eee")
	              .style("fill", "none");
          }
      	},
		},

		methods: {
			initTree() {
				selectAll('.regenerate')
					.on('click', this.regenerate);
				//this.lineScape();

				this.regenerate(true);

			},
			lineScape(b) {
			    line()
				    .x(function(d) { return x(d.date); })
				    .y(function(d) { return y(d.value); })
				    .curve(curveCatmullRom.alpha(0.5));
				  		
			},			
			// Tree creation functions
			branch(b) {
				var self = this;
				var end = this.endPt(b), daR, newB;
				this.branches.push(b);
				if (b.d === this.maxDepth)
					return;
				// Left branch
				daR = this.ar * Math.random() - this.ar * 0.5;
				newB = {
					i: this.branches.length,
					x: end.x,
					y: end.y,
					a: b.a - this.da + daR,
					l: b.l * this.dl,
					d: b.d + 1,
					parent: b.i
				};
				self.branch(newB);

				// Right branch
				daR = this.ar * Math.random() - this.ar * 0.5;
				newB = {
					i: this.branches.length,
					x: end.x, 
					y: end.y, 
					a: b.a + this.da + daR, 
					l: b.l * this.dl, 
					d: b.d + 1,
					parent: b.i
				};
				self.branch(newB);
			},
			root(b) {
				var self = this;
				var end = this.rootEndPt(b), daR, newR;
				this.roots.push(b);
				if (b.d === this.maxDepth2)
					return;
				// Left roots
				daR = this.ar * Math.random() - this.ar * 0.5;
				newR = {
					i: this.roots.length,
					x: end.x,
					y: end.y,
					a: b.a - this.da - daR,
					l: b.l * this.dl,
					d: b.d + 1,
					parent: b.i
				};
				self.root(newR);

				// Right roots
				daR = this.ar * Math.random() - this.ar * 0.5;
				newR = {
					i: this.roots.length,
					x: end.x, 
					y: end.y, 
					a: b.a + this.da - daR, 
					l: b.l * this.dl, 
					d: b.d + 1,
					parent: b.i
				};
				self.root(newR);
			},
			// D3 functions
			x1(d) {return d.x;},
			y1(d) {return d.y;},
			x2(d) {return this.endPt(d).x;},
			y2(d) {return this.endPt(d).y;},
			Rx1(d) {return d.x;},
			Ry1(d) {return d.y;},
			Rx2(d) {return this.rootEndPt(d).x;},
			Ry2(d) {return this.rootEndPt(d).y;},
			opacity(d) {return d.l/30 },	
			RootOpacity(d) {return d.l/20 },	
			stroke(d) {return d.l/20 },
			rootStroke(d) {return d.l/9 },
			strokeWidth(d) {return d.l/10*(this.maxDepth-d.d)/10 },
			highlightParents(d) {
				var colour = event.type === 'mouseover' ? '#17a2b8' : interpolateHcl(rgb("#2e9621"),rgb('#443016'));
				var depth = d.d;
				for(var i = 0; i <= depth; i++) {
					select('#branch-'+parseInt(d.i)).style('stroke', colour);
					d = this.branches[d.parent];
				}	
			},
			highlightRootParents(d) {
				var colour = event.type === 'mouseover' ? '#17a2b8' : '#C6C6C6';
				var depth = d.d;
				for(var i = 0; i <= depth; i++) {
					select('#root-'+parseInt(d.i)).style('stroke', colour);
					d = this.roots[d.parent];
				}	
			},
			create() {
				//this.createRoots();
				this.createBranches();
			},

			update() {
				//this.updateRoots();
				this.updateBranches();
			},

			createBranches() {
				var color = interpolateHcl(rgb("#77c117"),rgb('#915d02'));
				var that = this;
				select('#branches')
					.selectAll('line')
					.data(this.branches)
					.enter()
					.append('line')
					// curve effect
					.style('stroke', function (d) {
				      return color(d.l/40);
				    })
					.attr('class', "branches")
                    .style("stroke-width", this.stroke)
                    //.style("stroke", "#C6C6C6")
					.style('opacity', this.opacity)
					.attr('x1', this.x1)
					.attr('y1', this.y1)
					.attr('x2', this.x2)
					.attr('y2', this.y2)
					.attr('id', function(d) {return 'branch-'+d.i;})
					//.attr('parent-id', function(d) {return 'id-'+d.parent;})
					.on('mouseover', this.highlightParents)
					.on('mouseout', this.highlightParents);
					
			},


			updateBranches() {
				return select('#branches')
					.selectAll('line')
					.data(this.branches)
					// .attr('x1', this.x1)
					// .attr('y1', this.y1)
				     .transition()
				        .duration(1500)
    					//.ease(easeLinear)
				        .style("stroke-width", this.stroke)
						.attr('opacity', this.opacity)
						.attr('x1', this.x1)
						.attr('y1', this.y1)
						.attr('x2', this.x2)
						.attr('y2', this.y2);
			},
			createRoots() {
				var that = this;
				select('#roots')
					.selectAll('line')
					.data(this.roots)
					.enter()
					.append('line')
					.attr('class', "roots")
			    .style("stroke-width", this.rootStroke)
					.attr('opacity', this.rootOpacity)
					.style("stroke", "#dddddd")
					.attr('x1', this.Rx1)
					.attr('y1', this.Ry1)
					.attr('x2', this.Rx2)
					.attr('y2', this.Ry2)
					.attr('id', function(d) {return 'root-'+d.i;})
					.on('mouseover', this.highlightRootParents)
					.on('mouseout', this.highlightRootParents);
					
			},
			updateRoots() {
				return select('#roots')
					.selectAll('line')
					.data(this.roots)
				     .transition()
				        //.duration(250)
				        .style("stroke-width", this.rootStroke)
						.attr('opacity', this.rootOpacity)
						.attr('x1', this.Rx1)
						.attr('y1', this.Ry1)
						.attr('x2', this.Rx2)
						.attr('y2', this.Ry2);
			},

			regenerate(initialise) {
				var that = this;
				//this.roots = [];
				this.branches = [];
				//this.root(this.seed2);
				this.branch(this.seed);
				initialise ? this.create() : this.update();
			},

			endPt(b) {
				// Return endpoint of branch
				var x = b.x + b.l * Math.sin( b.a );
				var y = b.y - b.l * Math.cos( b.a );
				return {x: x, y: y};
			},
			rootEndPt(b) {
				// Return endpoint of branch
				var x = b.x + b.l * Math.sin( b.a ) ;
				var y = b.y - b.l * Math.cos( b.a );
				return {x: x, y: y};
			},
		}
	}

	
</script>

<style scoped>

	path, line {
        stroke: #777;
    }	

    /*.svg-container {
        display: table;
        border: 1px solid #f8f8f8;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    }*/

    h1 {
    	text-transform: uppercase; 
	    color: #686868; 
	    font-family: 'Aloes-Bd';
	    font-size: 24px; 
    }

    #tree-holder {
    	margin-top: 3%;
    }

    #tree {
    	margin-top: 3%;
    }

    .infos {
    	color: #686868; 
		font-size: 14px; 
    	text-align: justify;
   	}

	.roots {
		margin-top: -10px;
	}

	/*.regenerate {
		border: 0px;
		color: #777;
		background-color: #17a2b8;
	}*/

	.regenerate {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		color: #686868;
		cursor: pointer; 
	}
	.regenerate:hover {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		color: #33b277;
		cursor: pointer; 
	}


</style>