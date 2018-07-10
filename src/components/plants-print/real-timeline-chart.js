  import { min, max } from "d3-array"
  import { axisBottom, axisLeft} from "d3-axis"
  import { easeLinear } from "d3-ease"
  import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
  import { schemeCategory10, schemePaired } from "d3-scale-chromatic"
  import { append, attr, event, select, selectAll, style } from "d3-selection"
  import { area, line, curveBasis, curveCardinal, curveNatural } from "d3-shape"
  import { active, transition } from "d3-transition"


export const realTimeLineChart = function () {
  var margin = {top: 25, right: 25, bottom: 25, left: 25},
      width = Math.max(document.documentElement.clientWidth/1.6, window.innerWidth/1.6 || 0),
      height = Math.max(document.documentElement.clientHeight/1.5, window.innerHeight/1.5 || 0),
      duration = 1000,
      //color = schemePaired;
      color = ["#0fc153", "#33b277"];

  function chart(selection) {
    // Based on https://bl.ocks.org/mbostock/3884955
    selection.each(function(data) {
      data = ["x", "y"].map(function(c) {
        return {
          label: c,
          values: data.map(function(d) {
            return {time: +d.time, value: d[c]};
          })
        };
      });

      var t = transition().duration(duration).ease(easeLinear),
          x = scaleTime().rangeRound([0, width-margin.left-margin.right]),
          y = scaleLinear().rangeRound([height-margin.top-margin.bottom, 0]),
          z = scaleOrdinal(color);

      var xMin = min(data, function(c) { return min(c.values, function(d) { return d.time; })});
      var xMax = new Date(new Date(max(data, function(c) {
        return max(c.values, function(d) { return d.time; })
      })).getTime() - (duration*2));

      x.domain([xMin, xMax]);
      y.domain([
        min(data, function(c) { return min(c.values, function(d) { return d.value; })}),
        max(data, function(c) { return max(c.values, function(d) { return d.value; })})
      ]);
      z.domain(data.map(function(c) { return c.label; }));

      var line1 = line()
        .curve(curveNatural)
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.value); });
      
      var lineArea = area()
        .x(function(d) { return x(d.time); })
        .y0(y(0))
        .y1(function(d) { return y(d.value); })
        .curve(curveCardinal);


      var svg = select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "axis x");
      gEnter.append("g").attr("class", "axis y");
      gEnter.append("defs").append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width-margin.left-margin.right)
          .attr("height", height-margin.top-margin.bottom);
      gEnter.append("g")
          .attr("class", "lines")
          .attr("clip-path", "url(#clip)")
        .selectAll(".data").data(data).enter()
          .append("path")
            .attr("class", "data");

      var legendEnter = gEnter.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width-margin.right-margin.left-110) + ",15)");
      legendEnter.append("rect")
        .attr("width", 50)
        .attr("height", 75)
        .attr("fill", "#ffffff")
        .attr("fill-opacity", 0.7);
      legendEnter.selectAll("text")
        .data(data).enter()
        .append("text")
          .attr("y", function(d, i) { return (i*20) + 25; })
          .attr("x", 5)
          .attr("fill", function(d) { return z(d.label); });

      var svg = selection.select("svg");
      svg.attr('width', width).attr('height', height);
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.select("g.axis.x")
        .attr("transform", "translate(0," + (height-margin.bottom-margin.top) + ")")
        .transition(t)
        .call(axisBottom(x).ticks(5));
      g.select("g.axis.y")
        .transition(t)
        .attr("class", "axis y")
        .call(axisLeft(y));

      g.select("defs clipPath rect")
        .transition(t)
        .attr("width", width-margin.left-margin.right)
        .attr("height", height-margin.top-margin.right);

      g.selectAll("g path.data")
        .data(data)
        .style("stroke", function(d) { return z(d.label); })
        .style("stroke-width", 2)
        .style("fill", "none")
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .on("start", tick);

      g.selectAll("g .legend text")
        .data(data)
        .text(function(d) {
          return d.label.toUpperCase() + ": " + d.values[d.values.length-1].value;
        });

      // For transitions https://bl.ocks.org/mbostock/1642874
      function tick() {
        select(this)
          .attr("d", function(d) { return line1(d.values); })
          .attr("transform", null);

        var xMinLess = new Date(new Date(xMin).getTime() - duration);
        active(this)
            .attr("transform", "translate(" + x(xMinLess) + ",0)")
          .transition()
            .on("start", tick);
      }
    });
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };

  return chart;

}