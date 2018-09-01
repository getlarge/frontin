<template>

    <div id="bubbles">
       <div class="svg-container" >
        <cards
          v-if="currentBubble"
          :title="currentBubble.data.id"
          :description="currentBubble.data.description"
          :tags="currentBubble.data.family"
          :img="currentBubble.data.img"
          />
          <svg id="svg" pointer-events="all" viewBox="0 0 1200 600" preserveAspectRatio="xMinYMin meet">
              <g :id="nodes"></g>
          </svg>
      </div>
    </div>

</template>

<script>
import { mapState } from "vuex";
import { range } from "d3-array";
import { rgb, interpolateRgb } from "d3-color";
import { drag } from "d3-drag";
import { easeCubic, easeElastic, easeLinear } from "d3-ease";
import { json } from "d3-fetch";
import {
  forceSimulation,
  force,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceX,
  forceY
} from "d3-force";
import { hierarchy, tree } from "d3-hierarchy";
import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale";
import { append, attr, event, select, selectAll, style } from "d3-selection";
import { interval, now, timeout, timer } from "d3-timer";
import { active, transition } from "d3-transition";
import cards from "@/components/utils/cards";

export default {
  data() {
    return {
      serverURL: config.httpServerURL,
      dataPath: "static/data/bubbles.json",
      graph: null,
      simulation: null,
      colorPalette: scaleOrdinal().range([
        "#28693e",
        "#3f9e5e",
        "#60c780",
        "#5ca775",
        "#84c899",
        "#9adfb0",
        "#6ed659",
        "#417c52",
        "#56a46f"
      ]),
      currentBubble: undefined,
      settings: {
        strokeColor: "#29B5FF",
        width: 100,
        svgWigth: 1200,
        svgHeight: 600,
        circles: {
          levels: 6,
          maxValue: 100,
          labelFactor: 1.15,
          opacity: 0.2
        },
        filter: null
      }
    };
  },

  components: {
    cards: cards
  },
  
  created() {},

  mounted() {
    this.initFilter();
    this.initBubbles();
    this.$on("bubbleSelected", (d, i) => {
      //console.log(this.graph.nodes)
    });
    this.$on("bubbleDeselected", () => {
      //console.log("nodeDeselected");
    });
  },

  updated() {
    var that = this;
    that.simulation
      .nodes(that.graph.nodes)
      // .force("x", forceX((d, i) => d.x * d.data.category ))
      // .force("y", forceY((d, i) => d.y * d.data.category ))
      .on("tick", that.ticked);
    //console.log(that.graph.nodes)
  },

  beforeDestroy() {
    // this.nodes = null;
    // this.currentNode = null;
    // this.graph = null;
  },

  computed: {
    ...mapState({
      serverURL: state => state.base.serverURL
    }),

    nodes() {
      var that = this;
      if (this.graph) {
        return (
          select("#svg")
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(that.graph.nodes, d => d.data.id)
            .enter()
            .append("circle")
            .attr("r", d => d.data.size || 4.5)
            //.style("fill", d => this.colorPalette(d.data.category))
            .style("fill", "transparent")
            .style("stroke", "#686868")
            .style("stroke-width", "0.5")
            .on("mouseenter", this.mouseEnter)
            .on("mouseleave", this.mouseLeave)
        );
        //.style("opacity", d => d.data.group > 2 ? "0" : "1")
      }
    },

    images() {
      var that = this;
      if (that.graph) {
        return (
          select("#svg")
            .append("g") //that.nodes._groups
            .attr("class", "images")
            .selectAll("image")
            .data(that.graph.nodes, d => d.data.id)
            .enter()
            .append("image")
            .attr("xlink:href", d => d.data.mini)
            .attr("crossOrigin", "anonymous")
            .attr("x", d => -1 * d.data.size)
            .attr("y", d => -1 * d.data.size)
            .attr("height", d => 2 * d.data.size)
            .attr("width", d => 2 * d.data.size)
            .attr("filter", "url(#drop-shadow)")
            //.attr("opacity", d => d.data.group > 2 ? "01" : "1")
            .on("mouseclick", this.mouseClick)
            .on("mouseenter", this.mouseEnter)
            .on("mouseleave", this.mouseLeave)
            .call(
              drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended)
            )
        );
      }
    }
  },

  methods: {
    initFilter() {
      var defs = select("#svg").append("defs");
      this.filter = defs
        .append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");
      // SourceAlpha refers to opacity of graphic that this filter will be applied to
      // convolve that with a Gaussian with standard deviation 3 and store result
      // in blur
      this.filter
        .append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");
      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
      this.filter
        .append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");
      // overlay original SourceGraphic over translated blurred opacity by using
      // feMerge filter. Order of specifying inputs is important!
      var feMerge = this.filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "offsetBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    },

    initBubbles() {
      var that = this;
      json(serverURL + this.dataPath).then(graph => {
        var root = hierarchy(graph);
        var nodes = root.descendants();

        that.graph = {
          nodes: nodes
        };

        that.simulation = forceSimulation(that.graph.nodes)
          .alphaDecay(0.015)
          .alpha(0.2)
          .force("center", forceCenter(that.settings.svgWigth / 2, that.settings.svgHeight / 2))
          .force("charge", forceManyBody(that.graph.nodes).strength(-10))
          .force(
            "collisionForce",
            forceCollide(2)
              .strength(-50)
              .iterations(3)
          )
          .alphaTarget(0.8);
        // .force("x", forceX((d, i) => d.x * d.data.category ))
        // .force("y", forceY((d, i) => d.y * d.data.category ))
      });
    },

    ticked() {
      var that = this;
      that.images.attr("transform", that.nodeTransform);
      that.nodes.attr("transform", that.nodeTransform);
    },

    nodeTransform(d) {
      var maxNodeSize = 50;
      d.x = Math.max(maxNodeSize, Math.min(this.settings.svgWigth - (d.data.size || 16), d.x));
      d.y = Math.max(maxNodeSize, Math.min(this.settings.svgHeight - (d.data.size || 16), d.y));
      return "translate(" + d.x + "," + d.y + ")";
    },
    dragstarted(d, i) {
      this.currentBubble = this.graph.nodes[i];
      if (!event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      //select(this).raise().classed("active", true);
    },

    dragged(d, i) {
      d.fx = event.x;
      d.fy = event.y;
      //select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    },

    dragended(d, i) {
      if (!event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      this.currentBubble = undefined;

      //select(this).classed("active", false);
    },

    mouseClick(d, i) {
      console.log("this", this);
      this.$emit("bubbleClicked", i);
    },

    mouseEnter(d, i) {
      select(this.images._groups[0][i])
        .transition()
        .attr("x", d => -2 * d.data.size)
        .attr("y", d => -2 * d.data.size)
        .attr("height", d => 4 * d.data.size)
        .attr("width", d => 4 * d.data.size);

      this.$emit("bubbleSelected", d, i);
    },

    mouseLeave(d, i) {
      // select("#tip")
      //   .remove("#tip");
      select(this.images._groups[0][i])
        .transition()
        .attr("x", d => -1 * d.data.size)
        .attr("y", d => -1 * d.data.size)
        .attr("height", d => 2 * d.data.size)
        .attr("width", d => 2 * d.data.size);
      this.$emit("bubbleDeselected");
    }
  }
};
</script>

<style scoped>
#bubbles {
  width: 100%;
  height: 100%;
  font-family: "MarketDeco";
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
  left: 0;
}

.active {
  stroke: #000;
  stroke-width: 2px;
}
</style>
