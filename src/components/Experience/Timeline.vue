<template>
  <div id="interactive-timeline" >
    <cards
      v-if="currentProject"
      :title="currentProject.name"
      :description="currentProject.description"
      :tags="currentProject.tags"
      :img="currentProject.img"
      :link="currentProject.link"/>
    <div id="timeline" >
      <svg/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { min, max, range, sum } from "d3-array";
import { axisBottom } from "d3-axis";
import { easeQuadInOut } from "d3-ease";
import { json } from "d3-fetch";
import { hierarchy } from "d3-hierarchy";
import { scaleLinear, scalePow, scaleOrdinal } from "d3-scale";
import { event, select } from "d3-selection";
import { area, stack, stackOrderNone, stackOffsetNone } from "d3-shape";
import { timeFormat } from "d3-time-format";
//  import {active, transition} from "d3-transition";
import cards from "@/components/Utils/Cards";
import { EventBus } from "@/main";

export default {
  name: "timeline",

  data() {
    return {
      pageTopic: "getlarge" + this.$route.path,
      width: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      ),
      height: Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      colorPalette: scaleOrdinal().range([
        "#28693e",
        "#3f9e5e",
        "#60c780",
        "#5ca775",
        "#84c899",
        "#80e56b",
        "#9adfb0",
        "#417c52",
        "#56a46f",
        "#5df48a"
      ]),
      dataPath: "/data/cv.json",
      currentProject: undefined,
      node: null,
      dataSet: null,
      timeline: null,
      settings: {
        k: null,
        width: 1000, // viewbox width
        lineHeight: 110, // flag height or stack height
        s: 20,
        f: 350, // over height
        m: null,
        height: null,
        v: 1.5,
        h: 40, // line height
        paletteLength: 10
      },
      I: null,
      D: null,
      waves: null
    };
  },

  components: {
    cards: cards
  },

  created() {},

  mounted() {
    this.initTimeLine();

    this.$on("projectSelected", i => {
      this.currentProject = this.node[i];
    });

    this.$on("projectDeselected", () => {
      //this.currentProject = undefined;
    });
    EventBus.$on("start:tutorial", () => {
      const text =
        "You'll find here a resume of my work experiences. \n To get a description, you can select an event on hovering a wave, you can also click on text flags to read more about each project.";
      const tags = "";
      const img = "/img/tuto-timeline.gif";
      EventBus.$emit("update:tutorial", "Tutorial", text, tags, img);
      //alert("You can select an event on hovering each stack,\n you can also click on flag links");
    });
    EventBus.$on("stop:tutorial", () => {
      //this.currentProject = undefined;
    });

    EventBus.$on("stop:cards", () => {
      this.currentProject = undefined;
    });
  },

  updated() {
    //console.log("this", this)
  },

  beforeUnmout() {},

  beforeDestroy() {
    // if (this.$store.menu.tutorial === true) {
    //  EventBus.$emit("stop:tutorial");
    // }
    EventBus.$off("start:tutorial");
    EventBus.$off("stop:cards");
  },

  computed: {},

  methods: {
    initTimeLine() {
      const self = this;
      this.settings.m = this.settings.f + this.settings.lineHeight;
      this.settings.height = this.settings.m + this.settings.s;

      json(`${this.$store.state.clientUrl}${this.dataPath}`).then(projects => {
        const root = hierarchy(projects);
        const nodes = root.descendants();
        this.node = nodes[0].data.projects.reverse();

        const timestamp = new Date().getTime();
        this.node.forEach(d => {
          0 === d.ended_at && (d.ended_at = timestamp),
            (d.color = self.colorPalette(d.category));
        });

        const startTime = min(this.node, d => d.started_at);
        const endTime = max(this.node, d => d.ended_at);
        const M = moment.utc(startTime),
          _ = moment.utc(endTime),
          b = _.diff(M, "days") + 1;

        this.I = this.node.map(d => {
          for (
            var n = range(b).map(() => 0),
              e = moment.utc(d.started_at),
              r = moment.utc(d.ended_at),
              a = r.diff(e, "days"),
              o = Math.floor(a / 2),
              i = e.diff(M, "days"),
              c = 0;
            c < a;
            c++
          )
            (k =
              c < o
                ? easeQuadInOut(c / o)
                : 1 - easeQuadInOut(Math.abs(c - o) / o)),
              (n[i + c] = k);
          return {
            midpoint: i + o,
            project: d,
            values: n
          };
        });
        const O = range(b).map(d => {
          const n = {};
          return (
            self.I.forEach((e, r) => (n[self.node[r].name] = e.values[d])), n
          );
        });
        const P = stack()
          .keys(self.node.map(d => d.name))
          .order(stackOrderNone)
          .offset(stackOffsetNone);
        self.D = scalePow()
          .exponent(self.settings.v)
          .domain([0, b - 1])
          .range([0, self.settings.width]);
        const E = max(range(b).map(d => sum(self.I, i => i.values[d])));
        const F = scaleLinear()
          .domain([0, E])
          .range([self.settings.lineHeight, 0]);
        const N = area()
          .x((d, i) => self.D(i))
          .y0(d => F(d[0]))
          .y1(d => F(d[1]));

        select("#timeline").style(
          "padding-bottom",
          (self.settings.height / self.settings.width) * 100 + "%"
        );
        var frame = select("#timeline > svg")
          .attr(
            "viewBox",
            "0 0 " + self.settings.width + " " + self.settings.height
          )
          .attr("preserveAspectRatio", "xMinYMin meet")
          .on("mouseout", self.n);
        self.timeline = frame
          .append("g")
          .attr("class", "timeline")
          .attr("transform", "translate(0 " + self.settings.f + ")");
        self.timeline
          .append("rect")
          .attr("width", self.settings.width)
          .attr("height", self.settings.lineHeight)
          .attr("fill", "transparent")
          .on("click", self.n)
          .on("mouseout", self.reduce);

        self.dataSet = null;
        var L = P(O);
        self.waves = (self.timeline
          .selectAll("path")
          .data(L)
          .enter()
          .append("path")
          .attr("d", N)
          .on("click", (d, i) => self.t(self.node[i], !0))
          .on("mouseover", self.extend)
          .on("mouseout", self.reduce)
          .exit()
          .remove(),
        []);
        var flags = self.timeline
          .selectAll(".flag")
          .data(L)
          .enter()
          .append("g")
          .attr("class", "flag")
          .on("click", (d, i) => self.t(self.node[i]));
        //.on("mouseover", self.extend);

        flags
          .append("line")
          .attr("x1", self.a)
          .attr("x2", self.a)
          .attr("y2", (d, i) => F(d[self.I[i].midpoint][1]) + 1)
          .attr("stroke-width", 1)
          .attr("opacity", 0.6)
          .attr("stroke", (d, i) => self.node[i].color);

        var flagsLinks = flags
          .append("a")
          .attr("xlink:href", (d, i) => self.node[i].link)
          .attr("target", "_blank")
          .attr("transform", self.i);

        flagsLinks
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 100)
          .attr("height", 16)
          .attr("fill", "transparent");
        // .attr("fill", function(t, n) {
        //      return node[n].color
        // }),
        flagsLinks
          .append("text")
          .attr("x", 2)
          //.style("font-size", (self.width/50-self.height/100)+"px")
          .attr("class", "flagsText")
          .style(
            "cursor",
            (d, i) => (self.node[i].link !== null ? "pointer" : "default")
          )
          .text((d, i) => self.node[i].name);

        self.waves = flagsLinks.nodes().map(function(d) {
          var n = d.children[1].getBBox();
          return {
            bbox: n,
            width: Math.ceil(n.width) + 6
          };
        });
        flagsLinks.select("rect").attr("width", (d, i) => self.waves[i].width);

        self.q = range(10).map(function() {
          return null;
        });
        flagsLinks.attr("transform", self.i);
        self.q = range(10).map(function() {
          return null;
        });
        flags.select("line").attr("y1", self.o);
        flags.exit().remove();
        self.update(); //

        for (
          var z = scalePow()
              .exponent(self.settings.v)
              .domain([startTime, endTime])
              .range([0, self.settings.width]),
            G = timeFormat("%Y"),
            H = parseInt(G(startTime), 10),
            J = parseInt(G(endTime), 10),
            K = [],
            k = H;
          k < J;
          k++
        ) {
          K.push(new Date(k, 1).getTime());
          var S = axisBottom()
            .scale(z)
            .tickValues(K)
            .tickFormat(G);
          frame
            .append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + self.settings.m + ")")
            .call(S);
        }
      });
    },

    update() {
      var self = this;
      self.timeline
        .selectAll("path")
        .transition()
        .attr("opacity", "0.9")
        .attr("fill", self.coloring),
        //timeline.selectAll(".flag rect").transition().attr("fill", coloring),
        //timeline.selectAll(".flag line").transition().attr("stroke", coloring),
        self.timeline
          .selectAll(".flag text")
          .transition()
          .attr(
            "fill",
            (d, i) =>
              (self.dataSet && self.node[i] !== self.dataSet) || !d
                ? "transparent"
                : "#686868"
          );
      self.timeline
        .selectAll(".flag line")
        .transition()
        .attr(
          "opacity",
          (d, i) =>
            (self.dataSet && self.node[i] !== self.dataSet) || !d ? "0" : "0.6"
        );
    },

    a(d, i) {
      var self = this;
      return Math.round(self.D(self.I[i].midpoint));
    },

    o(d, i) {
      var self = this;
      var e = 0,
        r = self.waves[i];
      if (r) {
        var o = self.a(d, i),
          u = o + r.width;
        u > self.settings.width && ((o -= r.width), (u -= r.width)),
          (e = self.q.findIndex(d => !d || d.u === i || d.x < o)),
          -1 === e
            ? (e = 0)
            : (self.q[e] = {
                x: u,
                u: i
              });
      }
      return (e + 1) * self.settings.h * -1;
    },

    i(d, i) {
      var e = this.a(d, i),
        r = this.waves[i];
      return (
        r && e + r.width > this.settings.width && (e -= r.width),
        "translate(" + e + " " + this.o(d, i) + ")"
      );
    },

    t(d) {
      this.dataSet = d;
      //  this.$emit('projectSelected', i);
      this.update();
    },

    n() {
      // onmouseout
      this.dataSet = null;
      //this.$emit('projectDeselected');
      this.update();
    },

    extend(d, i) {
      this.t(this.node[i], !0);
      this.$emit("projectSelected", i);
    },

    reduce() {
      event.stopPropagation();
      this.$emit("projectDeselected");
    },

    coloring(d, i) {
      var e = this.node[i];
      return (this.dataSet && e !== this.dataSet) || !d ? "#f4f4f4" : e.color;
    }
  }
};
</script>


<style lang="scss">
@import "../../styles/experience.scss";
</style>
