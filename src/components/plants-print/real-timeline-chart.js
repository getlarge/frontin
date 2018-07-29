import { min, max } from "d3-array"
import { axisBottom, axisLeft } from "d3-axis"
import { brush, brushX } from "d3-brush"
import { easeLinear } from "d3-ease"
import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
import { schemeCategory10, schemePaired } from "d3-scale-chromatic"
import { append, attr, event, select, selectAll, style } from "d3-selection"
import { area, line, curveBasis, curveCardinal, curveMonotoneX, curveNatural } from "d3-shape"
import { active, transition } from "d3-transition"
import { zoom, zoomIdentity } from "d3-zoom"


export const realTimeLineChart = function () {
    //var margin = {top: 25, right: 25, bottom: 25, left: 25},
    var margin = {top: 25, right: 25, bottom: 25, left: 25},
        //width = Math.max(document.documentElement.clientWidth/1.6, window.innerWidth/1.6 || 0) - margin.left - margin.right,
        //height = Math.max(document.documentElement.clientHeight/1.5, window.innerHeight/1.5 || 0) - margin.top - margin.bottom,

        width = Math.max(document.documentElement.clientWidth/1.6, window.innerWidth/1.6 || 0),
        height = Math.max(document.documentElement.clientHeight/1.5, window.innerHeight/1.5 || 0),
        duration = 2000,
        color = ["#b4d785", "#3d991c"],
        x1 = [],
        y1 = [],
        x1save = [],
        y1save = [];

    var zoomed = false;

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

            var xMin = min(data, function(c) { return min(c.values, function(d) { return d.time; })});
            var xMax = new Date(new Date(max(data, function(c) {
                return max(c.values, function(d) { return d.time; })
            })).getTime() - (duration*2));

            var x0 = [xMin, xMax],
                y0 = [
                    min(data, function(c) { return min(c.values, function(d) { return d.value; })}), 
                    max(data, function(c) { return max(c.values, function(d) { return d.value; })})
                ];

            var t = transition().duration(duration).ease(easeLinear),
                x = scaleTime().domain(x0).rangeRound([0, width-margin.left-margin.right]),
                //x = scaleTime().rangeRound([0, width]),
                //y = scaleLinear().domain(y0).rangeRound([height, 0]),
                y = scaleLinear().rangeRound([height-margin.top-margin.bottom, 0]),
                z = scaleOrdinal(color);


            // x.domain(x0);
            // y.domain(y0);
            z.domain(data.map(function(c) { return c.label; }));

            var xAxis = axisBottom(x).ticks(5),
                yAxis = axisLeft(y);

            var brushing = brush().on("end", brushended),
                idleTimeout,
                idleDelay = duration;

            var line1 = line()
                .curve(curveNatural)
                .x(function(d) { return x(d.time); })
                .y(function(d) { return y(d.value); });

            var area1 = area()
                .curve(curveMonotoneX)
                .x(function(d) { return x(d.time); })
                .y0(height)
                .y1(function(d) { return y(d.value); });


            var svg = select(this).selectAll("svg").data([data]);
            
            var gEnter = svg.enter().append("svg").append("g");
            gEnter.append("g").attr("class", "axis axis--x");
            gEnter.append("g").attr("class", "axis axis--y");
            gEnter.append("g").attr("class", "brush");
            gEnter.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);
            gEnter.append("g")
                .attr("class", "lines")
                .attr("clip-path", "url(#clip)")
                .selectAll(".data").data(data).enter()
                .append("path")
                .attr("class", "data");

            var legendEnter = gEnter.append("g")
                .attr("class", "legend")
                .attr("transform", "translate(" + (width) + ",15)");
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

                // todo : change dirty hack to kill zoom
            var svg = selection.select("svg").on("click", zoomed = false);
            svg.attr('width', width).attr('height', height);
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            g.select("g.axis.axis--x")
                .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
                .transition(t)
                .call(xAxis);
            g.select("g.axis.axis--y")
                .transition(t)
                .attr("class", "axis ")
                .call(yAxis);

            g.select("defs clipPath rect")
                .transition(t)
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.right);

            g.selectAll("g path.data")
                .data(data)
                .style("stroke", function(d) { return z(d.label); })
                .style("stroke-width", 2)
                .style("fill", function(d) { return z(d.label); })
                .style("fill-opacity", "0.4")
                .transition()
                .duration(duration)
                .ease(easeLinear)
                .on("start", tick);

            g.selectAll("g .legend text")
                .data(data)
                .text(function(d) {
                    return d.label.toUpperCase() + ": " + d.values[d.values.length - 1].value;
                });
            g.selectAll("g .brush")
                .call(brushing);

            function tick() {
                //console.log("tick", x1)
                if ( x1.length > 0 ) {
                    console.log("tickzom1")
                    zoomed = true;
                    x.domain(x1save);
                    y.domain(y1save);
                    //var t = g.transition().duration(750);
                    // g.select(".axis--x").call(xAxis);
                    // g.select(".axis--y").call(yAxis);
                    select(this)
                        .attr("d", function(d) { return area1(d.values); })
                        .attr("transform", null);
                    var xMinLess = new Date(new Date(x1save[0]).getTime() - duration);                   
                    active(this)
                        .attr("transform", "translate(" + x(xMinLess) + ","+ y1save[0] +")")
                        //.transition()
                        //on("start", tick);
                }

                else if ( zoomed === false ) {
                    x.domain(x0);
                    y.domain(y0);
                    select(this)
                        .attr("d", function(d) { return area1(d.values); })
                        .attr("transform", null);
                    var xMinLess = new Date(new Date(xMin).getTime() - duration);
                    //console.log("tick1", xMinLess)
                    active(this)
                        .attr("transform", "translate(" + x(xMinLess) + ",0)")
                        .transition()
                        //.on("start", tick);
                }
                
            }

            function brushended() {
                var s = event.selection;
                if (!s) {
                    if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
                    //console.log("unclicked")
                    x1 = [];
                    y1 = [];
                    x.domain(x0);
                    y.domain(y0);

                } else {
                    x1 = [s[0][0], s[1][0]].map(x.invert, x);
                    y1 = [s[1][1], s[0][1]].map(y.invert, y);
                    x1save = x1;
                    y1save = y1;
                    x.domain(x1);
                    y.domain(y1);
                    g.select(".brush").call(brushing.move, null);
                }
                zoom();

            }

            function idled() {
              idleTimeout = null;

            }

            function zoom() {
                var t = g.transition().duration(750);
                g.select(".axis--x").transition(t).call(xAxis);
                g.select(".axis--y").transition(t).call(yAxis);
                g.selectAll("g path.data").transition(t)
                    .attr("d", function(d) { return area1(d.values); })
                    .attr("transform", null);
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