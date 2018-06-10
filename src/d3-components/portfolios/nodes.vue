<!--

Based on:

Links:

-->

<template>
  <svg width="500" height="500"></svg>
</template>

<script>

import PH2 from './ph2/index'
import { json } from "d3-fetch"
import { select, selectAll } from "d3-selection"
import ToneSynth from "@/tone-components/synth"

export default {
  props: ['groupBy', 'data'],
  watch: {
    groupBy: function(groupBy) {
      //console.log('groupBy', groupBy)
      this.ph2.setLayout(groupBy);
    },
    data: function(data) {
      this.ph2.setData(data);
    }
  },
  mounted: function() {
    // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    // var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var that = this;

    var synth = new ToneSynth();
    synth._init();

    const STATES_DATA_PATH = 'static/data/getlarge.json';
    var svg = select(this.$el);
    var width = +svg.attr('width');
    var height = +svg.attr('height');
    var nodeG = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

    // var pathG = svg.append('g')
  
    // TODO: remove it later
    json(STATES_DATA_PATH)
      .then(data => {
          //console.log('parsed that', that.groupBy)
          synth.synthQuick("C2");
          that.ph2 = new PH2(nodeG, data, that.groupBy);
    })

  }
}

</script>

<style scoped>

  path.link {
    fill: none;
  }
  .node:not(:hover) .nodetext {
    display: none;
  }

  .vis-node{
      cursor: pointer;
      stroke-opacity: 0.5;
      stroke-width: 7px;
      stroke: #fff;
  }

  .vis-node:hover,
  .vis-node.vis-open {
      stroke: rgba(0, 0, 0, 0.2);
  }

  .vis-link{
      cursor: pointer;
      stroke: #999;
      stroke-width: 2;
      stroke-opacity: 0.25;
  }

  .vis-link:hover,
  .vis-link.vis-open{
      stroke-width: 4 !important;
      stroke-opacity: 0.5;
  }

    .vis-hidden {
      display: none !important;
      visibility: hidden !important;
  }

  .vis-close{
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 10px;
  }
  .vis-close:before { content: "\2716"; }

  .vis-tooltip{
      font-size: 10px;
      opacity: 0.5;
      text-anchor: middle;
      fill: #000;
  }

  .vis-overlay{
      display: none;
      position: absolute;
      z-index: 11;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #ccc;
      color: #6d6357;
      font-size: 14px;
      line-height: 20px;
      height: auto;
      top:200px;
      left:20px;
      padding: 0 15px;
  }

  .vis-metadata{
      display: none;
      position: absolute;
      z-index: 12;
      background: #fbfbfb;
      border-radius: 2px;
      border: 1px solid #ccc;
      color: #6d6357;
      font-size: 14px;
      height: auto;
      left: 10px;
      max-width: 500px;
      min-width: 200px;
      padding: 0 15px;
      top: 10px;
      width: auto;
  }

</style>