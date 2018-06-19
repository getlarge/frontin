<!--

It would be great if you color the map by population using data from index.vue

Based on:
  http://bl.ocks.org/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9
  http://bl.ocks.org/mapsam/6083585


Links:

-->

<template>
  <svg ></svg>
</template>

<script>

  import * as d3 from 'd3'
  import * as topojson from 'topojson'

  export default {
    data() {
        return {
          pageTopic: "getlarge" + this.$route.path,
          width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
          height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      }
    },

    mounted() {
      var v = this;
      // var svg = d3.select(this.$el);
      // var width = +svg.attr('width');
      // var height = +svg.attr('height');
      
      var svg = d3.select(this.$el)
            .attr("width", this.width)
            .attr("height", this.height);

      var projection = d3.geoAlbersUsa();
      var path = d3.geoPath().projection(projection);

      d3.json("static/data/us.json").then(function(json) {
        var g = svg.append('g');
        g.selectAll('.state')
          .data(topojson.feature(json, json.objects.usStates).features)
          .enter()
          .append("path")
          .attr("class", "state")
          .attr("d", path)
          .on('mouseover', function(d) {
            v.$emit('stateSelected', d.properties.STATE_ABBR)
      		})
          .on('mouseout', function(d) {
            v.$emit('stateDeselected', d.properties.STATE_ABBR)
          })
        g.attr('transform', 'scale(0.8)')
      });

    }
    // TODO: fire events
  }
</script>

<style>
  .state {
    fill: #ccc;
    stroke: #fff;
  }
  .state:hover {
    fill: steelblue;
  }
</style>
