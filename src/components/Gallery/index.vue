<template>
  <b-container id="vis" fluid>
    <b-row align-h="center">
      <b-col sm="4" md="4" lg="4">
        <div id="gallery" />
      </b-col>
      <b-col sm="8" md="8" lg="8">
        <div :style="{ width: settings.width + '%' }" class="svg-container">
          <svg id="svg" pointer-events="all" viewBox="0 0 900 700" preserveAspectRatio="xMinYMin meet">
            <defs>
              <filter id="circle-shadow-selected">
                <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
              </filter>
              <filter id="circle-shadow">
                <feDropShadow dx="1" dy="1" stdDeviation="0.5" />
              </filter>
            </defs>
            <g :id="links" />
            <g :id="nodes" />
          </svg>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { drag } from 'd3-drag';
import { json } from 'd3-fetch';
import { forceSimulation, forceCenter, forceCollide, forceLink, forceManyBody } from 'd3-force';
import { hierarchy } from 'd3-hierarchy';
import { scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import EventBus from '@/services/EventBus';

export default {
  data() {
    return {
      dataPath: '/data/gallery.json',
      graph: null,
      simulation: null,
      colorPalette: scaleOrdinal().range([
        '#417c52',
        '#56a46f',
        '#28693e',
        '#3f9e5e',
        '#60c780',
        '#5ca775',
        '#84c899',
        '#9adfb0',
        '#6ed659',
      ]),
      settings: {
        //  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        width: 100,
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        strokeColor: '#29B5FF',
        svgWidth: 900,
        svgHeight: 700,
        circles: {
          levels: 6,
          maxValue: 100,
          labelFactor: 1.15,
          opacity: 0.2,
        },
      },
      //  synth: new ToneSynth(),
      gallery: false,
    };
  },

  computed: {
    serverUrl() {
      return this.$store.state.serverUrl;
    },
    nodes() {
      if (this.graph) {
        return select('#svg')
          .append('g')
          .attr('class', 'nodes')
          .selectAll('circle')
          .data(this.graph.nodes, (d) => d.data.id)
          .enter()
          .append('circle')
          .attr('r', (d) => d.data.size || 4.5)
          .style('fill', (d) => this.colorPalette(d.data.category))
          .style('opacity', (d) => (d.data.group > 2 ? '0' : '1'))
          .attr('filter', 'url(#circle-shadow)');
      }
      return null;
    },
    links() {
      if (this.graph) {
        return select('#svg')
          .append('g')
          .attr('class', 'links')
          .selectAll('path.link')
          .data(this.graph.links, (d) => d.target.id)
          .enter()
          .insert('path')
          .style('stroke-width', (d) => ((d.source.data.size / d.source.data.group) * 0.05).toString() + 'px')
          .style('stroke', 'black')
          .style('opacity', (d) => (d.source.data.group > 2 ? '0' : '0.6'))
          .style('fill', 'none');
      }
      return null;
    },

    texts() {
      if (this.nodes) {
        return (
          select('#svg')
            .append('g')
            .attr('class', 'texts')
            .selectAll('text')
            .data(this.graph.nodes, (d) => d.data.id)
            .enter()
            .append('text')
            // .attr("x", d => d.data.group > 1 ? -d.data.size/2 : -d.data.size/1.6)
            // .attr("y", (d) => d.data.size*0.15)
            .attr('fill', '#FFF')
            .attr('text-anchor', 'middle')
            .style('text-transform', 'uppercase')
            .style('font-size', (d) => (d.data.group > 1 ? '18' : '21'))
            .attr('opacity', (d) => (d.data.group > 2 ? '0' : '1'))
            .text((d) => (d.data.group < 3 ? d.data.title : ''))
        );
      }
      return null;
    },

    images() {
      if (this.graph) {
        return select('#svg')
          .append('g') //that.nodes.
          .attr('class', 'images')
          .selectAll('image')
          .data(this.graph.nodes, (d) => d.data.id)
          .enter()
          .append('image')
          .attr('xlink:href', (d) => (d.data.group > 2 ? `${this.$store.state.clientUrl}${d.data.mini}` : ''))
          .attr('crossOrigin', 'anonymous')
          .attr('x', (d) => -1 * d.data.size)
          .attr('y', (d) => -1 * d.data.size)
          .attr('height', (d) => (d.data.group > 2 ? 1.5 * d.data.size : 2 * d.data.size))
          .attr('width', (d) => (d.data.group > 2 ? 1.5 * d.data.size : 2 * d.data.size))
          .attr('opacity', (d) => (d.data.group < 2 ? '0' : '1'))
          .attr('filter', 'url(#circle-shadow)')
          .attr('cursor', 'pointer')
          .on('click', this.mouseClick)
          .on('mouseenter', this.mouseEnter)
          .on('mouseleave', this.mouseLeave)
          .on('mouseover', function() {
            select(this).attr('filter', 'url(#circle-shadow-selected)');
          })
          .on('mouseout', function() {
            select(this).attr('filter', 'url(#circle-shadow)');
          })
          .call(
            drag()
              .on('start', this.dragstarted)
              .on('drag', this.dragged)
              .on('end', this.dragended),
          );
      }
      return null;
    },
  },

  async mounted() {
    await this.initPortfolio();
    // this.$on("nodeSelected", i => {
    //   //console.log("nodeSelected", this.graph.nodes[i].data);
    // });
    // this.$on("nodeDeselected", () => {
    //   //console.log("nodeDeselected");
    // });

    EventBus.$on('start:tutorial', () => {
      const text =
        'Another way to browse into a portfolio ... \nAccess pictures by clicking on circles containing images.';
      const tags = '';
      const img = '/img/tuto-gallery.gif';
      EventBus.$emit('update:tutorial', this.$route.name, text, tags, img);
    });
  },

  updated() {
    this.simulation.nodes(this.graph.nodes).on('tick', this.ticked);
  },

  beforeDestroy() {
    EventBus.$off('start:tutorial');
    EventBus.$emit('stop:tutorial');
  },

  methods: {
    async initPortfolio() {
      const graph = await json(`${this.dataPath}`);
      const root = hierarchy(graph);
      const nodes = root.descendants();
      const links = root.links(nodes);

      this.graph = {
        nodes: nodes,
        links: links,
      };

      this.simulation = forceSimulation(this.graph.nodes)
        .alphaDecay(0.005)
        .alpha(0.2)
        .force(
          'link',
          forceLink(this.graph.links)
            .id((d) => d.id)
            .distance((d) => (d.source.data.size / d.source.data.group) * 3)
            .strength(0.2)
            .iterations(2),
        )
        .force('charge', forceManyBody(this.graph.nodes).strength(-100))
        .force('center', forceCenter(this.settings.svgWidth / 2, this.settings.svgHeight / 2))
        .force(
          'collisionForce',
          forceCollide(5)
            .strength(-250)
            .iterations(1),
        )
        .alphaTarget(0.4);
      // .force("x", forceX((d, i) => d.x ))
      // .force("y", forceY((d, i) => d.y ))
    },

    nodeTransform(d) {
      const maxNodeSize = 50;
      d.x = Math.max(maxNodeSize, Math.min(this.settings.svgWidth - (d.data.size || 16), d.x));
      d.y = Math.max(maxNodeSize, Math.min(this.settings.svgHeight - (d.data.size || 16), d.y));
      return 'translate(' + d.x + ',' + d.y + ')';
    },

    // textTransform(d, i) {
    //   const total = nodes.length;
    //   const radius = Math.min(this.settings.svgWidth / 2, this.settings.svgHeight / 2);
    //   const angleSlice = (Math.PI * 2) / total;
    //   const rotate =
    //     angleSlice * i > Math.PI / 2 ? (angleSlice * i * 180) / Math.PI - 270 : (angleSlice * i * 180) / Math.PI - 90;
    //   return `translate(${radius * Math.cos(angleSlice * i - Math.PI / 2) * this.settings.circles.labelFactor},
    //     ${radius * Math.sin(angleSlice * i - Math.PI / 2) * this.settings.circles.labelFactor})rotate(${rotate})`;
    // },

    ticked() {
      this.links.attr('d', (d) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M ${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x}, ${d.target.y}`;
      });

      this.nodes.attr('transform', this.nodeTransform);
      this.texts.attr('transform', this.nodeTransform);
      // this.texts.attr('transform', this.textTransform);
      this.images.attr('transform', this.nodeTransform);
    },

    createGallery(d) {
      if (d.data.group > 2) {
        select('#gallery')
          .attr('class', 'gallery-open')
          .html(
            "<p class='title'>" +
              d.data.title +
              "</p><p class='desc'>" +
              d.data.description +
              '</br><a href=' +
              d.data.link +
              '>link</a></p>',
          )
          .append('img')
          .attr('class', 'img-open')
          .attr('src', d.data.group === 3 ? `${this.$store.state.clientUrl}${d.data.img[0]}` : '')
          .attr('target', 'blank')
          .attr('x', -1 * d.data.size)
          .attr('y', -1 * d.data.size)
          .attr('opacity', d.data.link ? '0.8' : '0');
        //.on("clickwindow", this.toggleGallery("#gallery",".gallery-open"))
      } else {
        select('#gallery')
          .select('.img-open')
          .remove();
        select('#gallery')
          .select('.title')
          .remove();
        select('#gallery')
          .select('.desc')
          .remove();
      }
    },

    toggleGallery() {
      this.gallery = !this.gallery;
    },

    mouseClick(event, d) {
      //this.$emit('nodeClicked', d.index);
      this.createGallery(d);
    },

    mouseEnter(event, d) {
      this.$emit('nodeSelected', d.index);
    },

    mouseLeave(event, d) {
      if (this.currentNode !== null) {
        this.$emit('nodeDeselected', d.index);
      }
    },

    dragstarted(event, d) {
      //  this.synth.synthAttack(d.data.notes); //ex delay : '+0.05'
      if (!event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },

    dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
      //  this.synth.synthModulo(event.x, event.y);
      //EventBus.$emit('mqtt-tx', "getlarge/nodes-position", d.fx + "-" + d.fy)
    },

    dragended(event, d) {
      if (!event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      //  this.synth.synthRelease();
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/gallery.scss';
</style>
