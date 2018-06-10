// http://vallandingham.me/bubble_charts_with_d3v4.html

import layoutTotal from './layout-total'
import layoutId from './layout-id'
import layoutDay from './layout-day'

import _ from 'lodash'
import { drag } from "d3-drag"
import { easeCubic, easeElastic, easeLinear } from "d3-ease"
import { forceSimulation, force, forceCenter, forceCollide, forceLink, forceManyBody, forceX, forceY } from "d3-force"
import { hierarchy, tree } from "d3-hierarchy"
import { active, transition } from "d3-transition"
import { event, select, selectAll, style } from "d3-selection"
import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
import { schemeCategory10 } from "d3-scale-chromatic"
//import socketClient from '@/services/socket-client'

// TODO: do it d3-way so I can use selection.call()

export default class PH2 {
  constructor(elem, data, layoutName) {
    this.svg = elem;
    this.data = data;
    this.setData(data);
    this._init();
    //this.nodeTransform(this.nodes);
    // this.dragNodeStarted(this.nodes);
    // this.dragNodeEnded(this.nodes);
    // this.onDragNode(this.nodes);
    //this.onClickNode();
    // this.onMouseLeaveNode(this.nodes);
    // this.onMouseEnterNode(this.nodes);
    this.layout = undefined;
    this.simulator; 
    this.setLayout(layoutName);
  }

  setLayout(layoutName) {

    //console.log('setLayout', layoutName)

    if(layoutName === undefined) {
      throw new Error('layoutName is undefined');
    }
    if(!this.layouts) {
      throw new Error('Layouts are not defined');
    }
    if(!this.layouts[layoutName]) {
      throw new Error('Can`t find layout ' + layoutName);
    }

    if(this.layout) {
      this.layout.exit();
    }

    this.layout = this.layouts[layoutName];
    if(!this.layout.inited) {
      this.layout.init();
      this.layout.inited = true;
    }
    //console.log('setLayout2', layoutName)
    //console.log('layout', this.layout)
    this.layout.enter();
    this.simulation.alpha(1);
    this.simulation.restart();

  }

  setData(data) {
      var root = hierarchy(data)
      this.nodes = root.descendants()
  }

  _init() {
    console.log('nodes', this.nodes);

    //var socket = new socketClient();

    this.simulation = forceSimulation()
      .force("index-collide", forceCollide(d => d.data.size + 5).iterations(16))
      .force("index-x", forceX().strength(0.04))
      .force("index-y", forceY().strength(0.04))

    this._initLayouts();
    
     var coloring = scaleOrdinal().range(schemeCategory10);
    // var overlay = select("body").append("div").attr("class", "vis-overlay");
    // var closeOverlay = overlay.append("a").attr("class", "vis-close");
    // var overlayInner = overlay.append("div").attr("class", "vis-inner");

    // var closeOverlay.on("click", () => {
    //   removeOpenClass();
    //   overlay.classed("vis-hidden", true);
    // });
    var node = this.svg.append("svg:g")
      .attr("opacity", "0.9")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.nodes, d => d.data.id )
      .enter()
      .append("circle")
      .attr("r", d => d.data.size || 4.5 )
      .style("fill", d => coloring(d.data.group))
      .on("click", this.onClickNode)


    // var node = this.svg.append("g")
    //   .selectAll("svg:circle")
    //   .data(this.nodes, d => d.data.id )

    // var nodeEnter = node.enter()
    //   .append("svg:g")
    //   .attr("class", "node")
    //   .attr("transform", d => "translate(" + d.x + "," + d.y + ")" )
    //   .attr("opacity", "0.9")
    //   .call(drag()
    //     .on("start", dragNodeStarted)
    //     .on("drag", onDragNode)
    //     .on("end", dragNodeEnded))

    // nodeEnter.append("svg:circle")
    //   .attr("r", d => d.data.size || 4.5 )
    //   .style("fill", d => coloring(d.data.group))
    //   //.attr("opacity", "0");


 
    // var images = nodeEnter.append("svg:image")
    //     .attr("xlink:href", d =>  d.data.mini )
    //     .attr("crossOrigin", "anonymous")
    //     .attr("x", d =>  -1 * d.data.size )
    //     .attr("y", d =>  -1 * d.data.size )
    //     .attr("height", d =>  2 * d.data.size )
    //     .attr("width", d =>  2 * d.data.size )

    var that = this;
    var ticked = () => {
      //node.attr("transform", this.nodeTransform);
      node
        .attr("cx", d => d.x )
        .attr("cy", d => d.y );
      if(that.layout.ticked) {
        that.layout.ticked();
      }
    }

    this.simulation
      .nodes(this.nodes)
      .on("tick", ticked);

   

  };
  nodeTransform(d) {
    var maxNodeSize = 50
    d.x = Math.max(maxNodeSize, Math.min(w - (d.data.size || 16), d.x));
    d.y = Math.max(maxNodeSize, Math.min(h - (d.data.size || 16), d.y));
    return "translate(" + d.x + "," + d.y + ")";
  };

  onClickNode(d) {
    // if (d.data.note) {
    //   synth.synthQuick(d.data.note)
    // }

    //socket.sendMessage('yo', 'test');

    var overlay = select(".vis-overlay"),
      overlayInner = select(".vis-overlay > .vis-inner"),
      html = "<p><b>* " + d.data.title + "</b></p>";
    if (d.data.img) { html += "<img style='width: 450px;' src=" + d.data.img + "></img>"; }
    if (d.data.text) { html += "<p>" + d.data.text + "</p>"; }
    if (d.data.link) { html += "<p>Read more <a target='blank' href=" + d.data.link + " >" + d.data.title + " page ⇢" + "</a></p>"; }
    if (d.data.subtitle) {
      select(".title").html(d.data.subtitle);
      //io.emit('my other event', { my: 'data' });
    }
    overlayInner.html(html);
    overlay.classed("vis-hidden", false);
    overlay.style("display", "block");
    // .style("top", (n.y - 50).toString() + "px")
    // .style("left", (n.x-50).toString() + "px");
    removeOpenClass();
    select(this).classed("vis-open", true);
    //update();
  };

  removeOpenClass(d) {
    selectAll("svg .vis-open").classed("vis-open", false);
  };
  

  _initLayouts() {
    this.layouts = {
      'total': layoutTotal,
      'id': layoutId,
      'day': layoutDay
    };

    for (var k in this.layouts) {
      var v = this.layouts[k];
      this.layouts[k] = new v(this.svg, this.data, this.simulation);
    }
  }

}
