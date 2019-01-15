<template lang="html">
  <svg
    :id="`device-tree-${deviceId}`"
    :viewBox="`0 0 ${width} ${height}`" 
    pointer-events="all" 
    preserveAspectRatio="xMinYMin meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <filter 
        id="circle-shadow-selected" 
        y="-10" 
        x="-10"
        height="40"
        width="150">
        <feOffset 
          in="SourceAlpha" 
          dx="1" 
          dy="1" 
          result="offset1" />
        <feGaussianBlur 
          in="offset2" 
          stdDeviation="1" 
          result="blur1"/>
        <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter 
        id="circle-shadow" 
        y="-10"
        x="-10"
        height="40"
        width="150">
        <feOffset 
          in="SourceAlpha" 
          dx="2" 
          dy="2" 
          result="offset2" />
        <feGaussianBlur 
          in="offset2" 
          stdDeviation="2"  
          result="blur2"/>
        <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g :id="watchSensorsLinks"></g>
    <g :id="watchSensorsNodes"></g>
  </svg>
</template>

<script type="text/javascript">
import { drag } from "d3-drag";
import { json } from "d3-fetch";
import {
  forceSimulation,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody
} from "d3-force";
import { hierarchy } from "d3-hierarchy";
import { event, select } from "d3-selection";

export default {
  name: "DeviceTree",

  props: {
    width: {
      type: Number,
      required: false,
      default: 500
    },
    height: {
      type: Number,
      required: false,
      default: 500
    },
    clientUrl: {
      type: String,
      required: false,
      default: "http://localhost:8080"
    },
    source: {
      type: String,
      required: false,
      default: "/data/device-tree.json"
    },
    device: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      watchSensors: this.$props.source,
      watchSensorsGraph: null,
      watchSensorsSimulation: null
    };
  },

  created() {},

  mounted() {
    this.initDeviceTree();
  },

  updated() {
    if (
      this.watchSensorsGraph &&
      this.watchSensorsGraph.nodes &&
      this.watchSensorsGraph.links
    ) {
      this.watchSensorsSimulation
        .nodes(this.watchSensorsGraph.nodes)
        .on("tick", this.watchSensorsTicked);
    }
  },

  beforeDestroy() {
    select(`device-tree-${this.deviceId}`).empty();
    //select("#device-tree").selectAll("*").remove();
  },

  computed: {
    deviceProps() {
      if (this.$props.device !== null) {
        return JSON.parse(this.$props.device);
      }
      return null;
    },
    deviceId() {
      if (this.deviceProps !== null) {
        return this.deviceProps.id;
      }
      return 1;
    },
    watchSensorsNodes() {
      if (this.watchSensorsGraph) {
        return select(`#device-tree-${this.deviceId}`)
          .append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(this.watchSensorsGraph.nodes, d => d.data.id)
          .enter()
          .append("circle")
          .attr("class", "object-cirle")
          .attr("r", d => d.data.size || 4.5)
          .attr("filter", "url(#circle-shadow)")
          .style("fill", d => d.data.colors[0])
          .on("mouseover", function() {
            select(this).attr("filter", "url(#circle-shadow-selected)");
          })
          .on("mouseout", function() {
            select(this).attr("filter", "url(#circle-shadow)");
          })
          .call(
            drag()
              .on("start", this.dragstarted)
              .on("drag", this.dragged)
              .on("end", this.dragended)
          );
      }
      return null;
    },
    watchSensorsLinks() {
      if (this.watchSensorsGraph) {
        return select(`#device-tree-${this.deviceId}`)
          .append("g")
          .attr("class", "links")
          .selectAll("path.link")
          .data(this.watchSensorsGraph.links, d => d.target.id)
          .enter()
          .insert("path")
          .style(
            "stroke-width",
            d =>
              ((d.source.data.size / d.source.data.group) * 0.05).toString() +
              "px"
          )
          .style("stroke", "black")
          .style("fill", "none");
      }
      return null;
    },
    watchSensorsImages() {
      if (this.watchSensorsGraph) {
        return select(`#device-tree-${this.deviceId}`)
          .append("g")
          .attr("class", "images")
          .selectAll("image")
          .data(this.watchSensorsGraph.nodes, d => d.data.id)
          .enter()
          .append("image")
          .attr("xlink:href", d => `${this.$props.clientUrl}${d.data.icons[1]}`)
          .attr("crossOrigin", "anonymous")
          .attr("x", d => (-1 * d.data.size) / 2)
          .attr("y", d => (-1 * d.data.size) / 2)
          .attr("height", d => d.data.size)
          .attr("width", d => d.data.size)
          .style("cursor", "pointer")
          .on("click", this.mouseClick)
          .on("mouseenter", this.mouseEnter)
          .on("mouseleave", this.mouseLeave);
      }
      return null;
    }
  },

  methods: {
    async initDeviceTree() {
      let graph = {};
      if (this.deviceProps) {
        // replace sensors key by children
        graph = this.deviceProps;
        graph.children = graph.sensors;
        delete graph.sensors;
      } else {
        graph = await json(this.watchSensors);
      }
      const root = hierarchy(graph);
      const nodes = root.descendants();
      const links = root.links(nodes);
      this.watchSensorsGraph = {
        nodes: nodes,
        links: links
      };
      this.watchSensorsSimulation = forceSimulation(
        this.watchSensorsGraph.nodes
      )
        .alphaDecay(0.005)
        .alpha(0.2)
        .force(
          "link",
          forceLink(this.watchSensorsGraph.links)
            .id(d => d.id)
            .distance(d => d.source.data.size * 2)
            .strength(() => 0.2)
            .iterations(2)
        )
        .force(
          "charge",
          forceManyBody(this.watchSensorsGraph.nodes).strength(-100)
        )
        .force(
          "center",
          forceCenter(this.$props.width / 2, this.$props.height / 2)
        )
        .force(
          "collisionForce",
          forceCollide(5)
            .strength(-50)
            .iterations(1)
        )
        .alphaTarget(0.4);
    },

    nodeTransform(d) {
      const maxNodeSize = 50;
      d.x = Math.max(
        maxNodeSize,
        Math.min(this.$props.width - (d.data.size || 16), d.x)
      );
      d.y = Math.max(
        maxNodeSize,
        Math.min(this.$props.height - (d.data.size || 16), d.y)
      );
      return "translate(" + d.x + "," + d.y + ")";
    },

    watchSensorsTicked() {
      this.watchSensorsLinks.attr("d", d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return (
          "M" +
          d.source.x +
          "," +
          d.source.y +
          "A" +
          dr +
          "," +
          dr +
          " 0 0,1 " +
          d.target.x +
          "," +
          d.target.y
        );
      });
      this.watchSensorsNodes.attr("transform", this.nodeTransform);
      this.watchSensorsImages.attr("transform", this.nodeTransform);
    },

    mouseClick(...args) {
      this.$emit("node-clicked", ...args);
    },

    mouseEnter(...args) {
      this.$emit("node-selected", ...args);
    },

    mouseLeave(...args) {
      this.$emit("node-deselected", ...args);
    },

    dragstarted(d) {
      if (!event.active) this.watchSensorsSimulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },

    dragged(d) {
      d.fx = event.x;
      d.fy = event.y;
    },

    dragended(d) {
      if (!event.active) this.watchSensorsSimulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }
};
</script>
