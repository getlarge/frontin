<template>
  <div id="timeline">
    <svg />
    <cards
      v-if="currentProject"
      ref="card"
      :title="currentProject.name"
      :description="currentProject.description"
      :tags="currentProject.tags"
      :img="currentProject.img"
      :link="currentProject.link"
    />
  </div>
</template>

<script>
import { min, max, range, sum } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { easeQuadInOut } from 'd3-ease';
import { json } from 'd3-fetch';
import { hierarchy } from 'd3-hierarchy';
import { scaleLinear, scalePow, scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { area, stack, stackOrderNone, stackOffsetNone } from 'd3-shape';
import { timeFormat } from 'd3-time-format';
import EventBus from '@/services/EventBus';

export default {
  name: 'Timeline',

  components: {
    cards: () => import('@/components/Utils/Cards'),
  },

  data() {
    return {
      pageTopic: 'getlarge' + this.$route.path,
      colorPalette: scaleOrdinal().range([
        '#28693e',
        '#3f9e5e',
        '#60c780',
        '#5ca775',
        '#84c899',
        '#80e56b',
        '#9adfb0',
        '#417c52',
        '#56a46f',
        '#5df48a',
      ]),
      dataPath: '/data/cv.json',
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
        paletteLength: 10,
      },
      nodes: null,
      D: null,
      waves: null,
    };
  },

  computed: {
    width: {
      get() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      },
    },
    height: {
      get() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      },
    },
  },
  created() {},

  async mounted() {
    await this.initTimeLine();

    this.$on('projectSelected', (i) => {
      this.currentProject = this.node[i];
    });

    this.$on('projectDeselected', () => {
      // if not mouseover =>  this.$refs.card.closeCard()
      //this.currentProject = undefined;
    });

    EventBus.$on('start:tutorial', () => {
      const text =
        "You'll find here a resume of my work experiences. \n To get a description, you can select an event on hovering a wave, you can also click on text flags to read more about each project.";
      const tags = '';
      const img = '/img/tuto-timeline.gif';
      EventBus.$emit('update:tutorial', 'Tutorial', text, tags, img);
      //alert("You can select an event on hovering each stack,\n you can also click on flag links");
    });

    EventBus.$on('stop:tutorial', () => {
      //this.currentProject = undefined;
    });

    EventBus.$on('stop:cards', () => {
      this.currentProject = undefined;
    });
  },

  beforeDestroy() {
    // if (this.$store.menu.tutorial === true) {
    //  EventBus.$emit("stop:tutorial");
    // }
    EventBus.$off('start:tutorial');
    EventBus.$off('stop:cards');
  },

  methods: {
    getUtcDate(timestamp) {
      const timestampToDate = new Date(timestamp);
      return new Date(timestampToDate.getTime() + timestampToDate.getTimezoneOffset() * 60000);
    },

    getDateDiffInDays(date2, date1) {
      return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
    },

    async initTimeLine() {
      const self = this;
      this.settings.m = this.settings.f + this.settings.lineHeight;
      this.settings.height = this.settings.m + this.settings.s;

      const projects = await json(`${this.dataPath}`);
      const root = hierarchy(projects);
      const nodes = root.descendants();
      this.node = nodes[0].data.projects.reverse();

      const timestamp = new Date().getTime();
      this.node.forEach((d) => {
        0 === d.ended_at && (d.ended_at = timestamp), (d.color = self.colorPalette(d.category));
      });

      // const startTime = moment.utc(min(this.node, (d) => d.started_at));
      // const endTime = moment.utc(max(this.node, (d) => d.ended_at));
      // const timeDiff = endTime.diff(startTime, 'days') + 1;

      const startTime = this.getUtcDate(min(this.node, (d) => d.started_at));
      const endTime = this.getUtcDate(max(this.node, (d) => d.ended_at));
      const timeDiff = this.getDateDiffInDays(endTime, startTime);

      // console.log({ startTime, startTime2, endTime, endTime2, timeDiff, timeDiff2 });

      this.nodes = this.node.map((d) => {
        for (
          var timeRange = range(timeDiff).map(() => 0),
            startedAt = this.getUtcDate(d.started_at),
            endedAt = this.getUtcDate(d.ended_at),
            projectTimeDiff = this.getDateDiffInDays(endedAt, startedAt),
            avgDate = Math.floor(projectTimeDiff / 2),
            projectGlobalDiff = this.getDateDiffInDays(startedAt, startTime),
            c = 0;
          c < projectTimeDiff;
          c++
        )
          (k = c < avgDate ? easeQuadInOut(c / avgDate) : 1 - easeQuadInOut(Math.abs(c - avgDate) / avgDate)),
            (timeRange[projectGlobalDiff + c] = k);
        return {
          midpoint: projectGlobalDiff + avgDate,
          project: d,
          values: timeRange,
        };
      });

      const O = range(timeDiff).map((d) => {
        const n = {};
        return self.nodes.forEach((e, r) => (n[self.node[r].name] = e.values[d])), n;
      });

      const P = stack()
        .keys(self.node.map((d) => d.name))
        .order(stackOrderNone)
        .offset(stackOffsetNone);

      self.D = scalePow()
        .exponent(self.settings.v)
        .domain([0, timeDiff - 1])
        .range([0, self.settings.width]);

      const E = max(range(timeDiff).map((d) => sum(self.nodes, (i) => i.values[d])));
      const F = scaleLinear()
        .domain([0, E])
        .range([self.settings.lineHeight, 0]);
      const N = area()
        .x((d, i) => self.D(i))
        .y0((d) => F(d[0]))
        .y1((d) => F(d[1]));

      select('#timeline').style('padding-bottom', (self.settings.height / self.settings.width) * 100 + '%');
      const frame = select('#timeline > svg')
        .attr('viewBox', '0 0 ' + self.settings.width + ' ' + self.settings.height)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .on('mouseout', self.removeNode);
      self.timeline = frame
        .append('g')
        .attr('class', 'timeline')
        .attr('transform', 'translate(0 ' + self.settings.f + ')');
      self.timeline
        .append('rect')
        .attr('width', self.settings.width)
        .attr('height', self.settings.lineHeight)
        .attr('fill', 'transparent')
        .on('click', self.removeNode)
        .on('mouseout', self.reduce);

      self.dataSet = null;

      const L = P(O);

      self.waves =
        (self.timeline
          .selectAll('path')
          .data(L)
          .enter()
          .append('path')
          .attr('d', N)
          .on('click', (d, i) => self.addNode(self.node[i], !0))
          .on('mouseover', self.extend)
          .on('mouseout', self.reduce)
          .exit()
          .remove(),
        []);
      const flags = self.timeline
        .selectAll('.flag')
        .data(L)
        .enter()
        .append('g')
        .attr('class', 'flag')
        .on('click', (d, i) => self.addNode(self.node[i]));
      //.on("mouseover", self.extend);

      flags
        .append('line')
        .attr('x1', self.a)
        .attr('x2', self.a)
        .attr('y2', (d, i) => F(d[self.nodes[i].midpoint][1]) + 1)
        .attr('stroke-width', 1)
        .attr('opacity', 0.6)
        .attr('stroke', (d, i) => self.node[i].color);

      const flagsLinks = flags
        .append('a')
        .attr('xlink:href', (d, i) => self.node[i].link)
        .attr('target', '_blank')
        .attr('transform', self.i);

      flagsLinks
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 100)
        .attr('height', 16)
        .attr('fill', 'transparent');
      // .attr("fill", function(t, n) {
      //      return node[n].color
      // }),
      flagsLinks
        .append('text')
        .attr('x', 2)
        //.style("font-size", (self.width/50-self.height/100)+"px")
        .attr('class', 'flagsText')
        .style('cursor', (d, i) => (self.node[i].link !== null ? 'pointer' : 'default'))
        .text((d, i) => self.node[i].name);

      self.waves = flagsLinks.nodes().map(function(d) {
        const n = d.children[1].getBBox();
        return {
          bbox: n,
          width: Math.ceil(n.width) + 6,
        };
      });
      flagsLinks.select('rect').attr('width', (d, i) => self.waves[i].width);

      self.q = range(10).map(() => null);
      flagsLinks.attr('transform', self.i);
      self.q = range(10).map(() => null);
      flags.select('line').attr('y1', self.o);
      flags.exit().remove();
      self.update(); //

      for (
        var z = scalePow()
            .exponent(self.settings.v)
            .domain([startTime, endTime])
            .range([0, self.settings.width]),
          G = timeFormat('%Y'),
          H = parseInt(G(startTime), 10),
          J = parseInt(G(endTime), 10),
          K = [],
          k = H;
        k < J;
        k++
      ) {
        K.push(new Date(k, 1).getTime());
        const S = axisBottom()
          .scale(z)
          .tickValues(K)
          .tickFormat(G);
        frame
          .append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + self.settings.m + ')')
          .call(S);
      }
    },

    update() {
      const self = this;
      this.timeline
        .selectAll('path')
        .transition()
        .attr('opacity', '0.9')
        .attr('fill', self.coloring);
      //timeline.selectAll(".flag rect").transition().attr("fill", coloring),
      //timeline.selectAll(".flag line").transition().attr("stroke", coloring),

      this.timeline
        .selectAll('.flag text')
        .transition()
        .attr('fill', (d, i) => ((this.dataSet && this.node[i] !== this.dataSet) || !d ? 'transparent' : '#686868'));
      this.timeline
        .selectAll('.flag line')
        .transition()
        .attr('opacity', (d, i) => ((this.dataSet && this.node[i] !== this.dataSet) || !d ? '0' : '0.6'));
    },

    a(d, i) {
      const self = this;
      return Math.round(self.D(self.nodes[i].midpoint));
    },

    o(d, i) {
      const self = this;
      let e = 0;
      const r = self.waves[i];
      if (r) {
        let o = self.a(d, i);
        let u = o + r.width;
        u > self.settings.width && ((o -= r.width), (u -= r.width)),
          (e = self.q.findIndex((d) => !d || d.u === i || d.x < o)),
          -1 === e
            ? (e = 0)
            : (self.q[e] = {
                x: u,
                u: i,
              });
      }
      return (e + 1) * self.settings.h * -1;
    },

    i(d, i) {
      let e = this.a(d, i);
      const r = this.waves[i];
      return r && e + r.width > this.settings.width && (e -= r.width), 'translate(' + e + ' ' + this.o(d, i) + ')';
    },

    addNode(d) {
      this.dataSet = d;
      //  this.$emit('projectSelected', i);
      this.update();
    },

    removeNode() {
      this.dataSet = null;
      //this.$emit('projectDeselected');
      this.update();
    },

    extend(event, d) {
      this.addNode(this.node[d.index], !0);
      this.$emit('projectSelected', d.index);
    },

    reduce(event) {
      event.stopPropagation();
      this.$emit('projectDeselected');
    },

    coloring(d, i) {
      const e = this.node[i];
      return (this.dataSet && e !== this.dataSet) || !d ? '#f4f4f4' : e.color;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/experience.scss';
</style>
