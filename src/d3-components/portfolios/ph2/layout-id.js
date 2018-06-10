import * as _ from 'lodash'

import { drag } from "d3-drag"
import { forceSimulation, force, forceCenter, forceCollide, forceLink, forceManyBody, forceX, forceY } from "d3-force"
import { hierarchy, tree } from "d3-hierarchy"
import { event, select, selectAll, style } from "d3-selection"
import { active, transition } from "d3-transition"

export default class {
  constructor(elem, data, simulation) {
    this.elem = elem;
    this.data = data;
    this.simulation = simulation;
  }

  init() {
    
    var root = hierarchy(this.data)
    this.nodes = root.descendants()
    this.links = root.links(this.nodes)

    var groups = _(this.nodes)
      .map((k, i) => ({
        id: k.data.id,
        index: i
      }))
      .groupBy('id')
      .value();

    this.ids = _.map(groups, (v, k) => ({ key: k, r: -30 }));

    // console.log('data', this.data)
    // console.log('root', root)
    // console.log('nodes', this.nodes)
    // console.log('linkss', this.links)
    // console.log('groups', groups)
    // console.log('ids', this.ids)

    console.log("link", groups[this.ids[0].key][0]);
    console.log("links", this.links)

  }

  enter() {
    this.nodesBefore = this.simulation.nodes();

    console.log("nodesBefore", this.nodesBefore)

    var attractForce = forceManyBody(this.nodes).strength(200).distanceMax(400).distanceMin(60),
      repelForce = forceManyBody(this.nodes).strength(-140).distanceMax(550).distanceMin(50),
      charge = forceManyBody(this.nodes).strength(-300).distanceMax(350).distanceMin(100),
      linkForce = forceLink(this.links).id((d, i) => { return d.id; }).distance((d, i) =>  d.source.data.size / d.source.data.group * 3.5 ).strength((l, i) =>  1).iterations(2),
      collisionForce = forceCollide(5).strength(50).iterations(5);

    this.simulation.nodes(this.nodes)
      .alphaDecay(0.005)
      .alpha(0.2)
      .force("id-linkForce", linkForce)
      .force("id-charge", charge)
      //.force("id-center", forceCenter(w / 2 + 50, h / 2 - 100))
      .force("id-collisionForce", collisionForce)
      .alphaTarget(0.4)
      .force("id-x", forceX((d, i) => d.x * 2 ))
      .force("id-y", forceY((d, i) => d.y * 2 ))
      //.on("tick", ticked)
      //.restart();

    // this.simulation
    //   .force("id-link", forceLink().id(d => d.index))
    //   //.force("id-link", forceLink().id(d => d.data.id))
    //   .force("id-charge", forceManyBody().strength(-30))
    //   .force("id-x", forceX().strength(0.11))
    //   .force("id-y", forceY().strength(0.11))

    // //console.log(this.simulation.force("link").distance());
    // this.simulation.force("link")//.distance(-10)

    // this.simulation.nodes(_.concat(this.nodesBefore, this.ids));

  
    this.idG = this.elem.append("g");
    this.idLabels = this.idG
      .selectAll('text')
      .data(this.nodes)
      .enter()
      .attr("class", "nodetext")
      .append('text')
      .text(d => d.data.title)
      //.attr("text-anchor", "middle")
      .attr("font-size", "8")

    // this.pathG = this.elem.insert("svg:defs")
    //     .data(["end"])
    //     .enter()
    //     .append("svg:path")
    //     .attr("d", "M0,-5L10,0L0,5")

    // this.path = this.pathG
    //     .selectAll("path.link")
    //     .data(this.links, d => d.target.id )
    //     .enter()
    //     .insert("svg:path")
    //     .attr("class", "link")
    //     .style("stroke-width", d =>  (d.target.data.size / d.target.data.group * 1.3).toString() + "px" )
    //     .style("stroke", "#eee")

    // this.simulation
    //   .force("id-link")
    //   .links(this.links);

  }

  ticked() {
    this.path.attr("d", function(d) {
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

    this.idLabels
      .attr('x', d => d.x)
      .attr('y', d => d.y + d.data.size)
  }

  exit() {
    this.simulation
      .nodes(this.nodesBefore);
    this.simulation
      .force("id-link", null)
      .force("id-charge", null)
      .force("id-x", null)
      .force("id-y", null)

    this.pathG.remove();
    this.idG.remove();
  }
}
