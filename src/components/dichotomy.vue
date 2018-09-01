<template >

    <!--        Updating Peter Cook version -->     
    <b-container id="tree-holder" fluid>
        <b-row align-h="center">        
            <b-col id="tree" sm="10" md="10" lg="10" >
                <svg id="branches" pointer-events="all" viewBox="0 20 800 450" preserveAspectRatio="xMinYMin meet"> 
                </svg>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <h1  class="def"> Dichotomy</h1>
            <b-col class="infos" xs="4" sm="7" md="8" lg="5">
                <p>:  is a mode of branching by repeated bifurcation - thus a focus on branching rather than on division.
                </p>
                <!-- Todo :  using image analytic tool ( ml5js maybe ) browser side, it could be possible to extract parameters from species pictures and then synthesize plant's flow structure. 
                -->
            </b-col>
            <b-col id="regenerate" xs="2" sm="1" md="1" lg="1">
                <button @click="updateTimer()">
                    <font-awesome-icon v-if="timer === false" :icon="['fas', 'play']" size="2x" />
                    <font-awesome-icon v-else :icon="['fas', 'stop']" size="2x" /> 
                </button>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import { rgb } from "d3-color";
import { easeLinear } from "d3-ease";
import { interpolateHclLong } from "d3-interpolate";
import { event, select, selectAll } from "d3-selection";
import { interval } from "d3-timer";
import { active, transition } from "d3-transition";
import { EventBus } from "@/main";

export default {
    data() {
        return {
            branches: [],
            seed: { i: 0, x: 375, y: 440, a: 0, l: 85, d: -1 }, // a = angle, l = length, d = depth
            da: 0.45, // Angle delta
            dl: 0.81, // Length delta (factor)
            ar: 0.6, // Randomness
            maxDepth: 10,
            settings: {
                strokeColor: "#29B5FF",
                width: 100,
                svgWidth: 800,
                svgHeight: 450,
                duration: 10000
            },
            colorSet: [
                {
                    color1: "#2e9621",
                    color2: "#443016"
                },
                {
                    color1: "#77c117",
                    color2: "#915d02"
                }
            ],
            timer: false
        };
    },

    components: {
        FontAwesomeIcon
    },

    created() {},

    mounted() {
        this.regenerate("createTree");
        EventBus.$on("start:tutorial", i => {
            var text =
                "This work is based on Peter Cook's algorithm reproducing plant's branching mechanism. I tried to push realism further by observing their growing patterns, and playing with variables like vertical/horizontal proportion - angle and length growing's ratio - maximum number of branching, etc ... \nClick the play icon to regenerate the tree";
            var tags = "";
            var img = "static/icons/wald.png";
            EventBus.$emit("update:tutorial", "En savoir plus", text, tags, img);
        });
        this.updateTimer();
        EventBus.$on("stop:cards", i => {
            //this.currentProject = undefined;
        });
    },

    updated() {},

    beforeDestroy() {
        if (this.interv) {
            this.interv.stop();
        }
        EventBus.$emit("stop:tutorial");
        EventBus.$off("start:tutorial");
    },

    computed: {},

    methods: {
        // Tree creation functions
        branch(b) {
            var end = this.endPt(b),
                daR,
                newB;
            this.branches.push(b);
            if (b.d === this.maxDepth) return;
            // Left branch
            daR = this.ar * Math.random() - this.ar * 0.5;
            newB = {
                i: this.branches.length,
                x: end.x,
                y: end.y,
                a: b.a - this.da + daR,
                l: b.l * this.dl,
                d: b.d + 1,
                parent: b.i
            };
            this.branch(newB);
            // Right branch
            daR = this.ar * Math.random() - this.ar * 0.5;
            newB = {
                i: this.branches.length,
                x: end.x,
                y: end.y,
                a: b.a + this.da + daR,
                l: b.l * this.dl,
                d: b.d + 1,
                parent: b.i
            };
            this.branch(newB);
        },

        // D3 functions
        x1(d) {
            return d.x;
        },
        y1(d) {
            return d.y;
        },
        x2(d) {
            return this.endPt(d).x;
        },
        y2(d) {
            return this.endPt(d).y;
        },
        opacity(d) {
            return d.l / 30;
        },
        RootOpacity(d) {
            return d.l / 20;
        },
        stroke(d) {
            return d.l / 20;
        },
        rootStroke(d) {
            return d.l / 9;
        },
        strokeWidth(d) {
            return ((d.l / 10) * (this.maxDepth - d.d)) / 10;
        },
        highlightParents(d) {
            var colour =
                event.type === "mouseover"
                    ? "#17a2b8"
                    : interpolateHclLong(
                          rgb(this.colorSet[0].color1),
                          rgb(this.colorSet[0].color2)
                      );
            var depth = d.d;
            for (var i = 0; i <= depth; i++) {
                select("#branch-" + parseInt(d.i)).style("stroke", colour);
                d = this.branches[d.parent];
            }
        },

        moveLeaves(d) {
            var self = this;
            var depth = d.d;
            if (event.type === "mouseover") {
                console.log("d", d.x, d.y);
                console.log("event", event.x, event.y);
                for (var i = 0; i <= depth; i++) {
                    select("#branch-" + parseInt(d.i))
                        .transition()
                        .duration(this.settings.duration / 10)
                        .style("stroke-width", this.stroke)
                        .attr("opacity", this.opacity)
                        .attr("x1", this.x1)
                        .attr("y1", this.y1)
                        .attr(
                            "x2",
                            d.d >= this.maxDepth - 2 ? d.x + d.l * Math.sin(d.a - 0.1) : this.x2
                        )
                        .attr(
                            "y2",
                            d.d >= this.maxDepth - 2 ? d.y + d.l * Math.sin(d.a - 0.1) : this.y2
                        );
                    d = this.branches[d.parent];
                }
            } else {
                select("#branch-" + parseInt(d.i))
                    .transition()
                    .duration(this.settings.duration / 10)
                    .style("stroke-width", this.stroke)
                    .attr("opacity", this.opacity)
                    .attr("x1", this.x1)
                    .attr("y1", this.y1)
                    .attr("x2", this.x2)
                    .attr("y2", this.y2);
            }
        },

        createBranches() {
            var color = interpolateHclLong(
                rgb(this.colorSet[1].color1),
                rgb(this.colorSet[1].color2)
            );
            var that = this;
            select("#branches")
                .selectAll("line")
                .data(this.branches)
                .enter()
                .append("line")
                // curve effect
                .style("stroke", d => color(d.l / 40))
                .attr("class", "branches")
                .style("stroke-width", this.stroke)
                //.style("stroke", "#C6C6C6")
                .style("opacity", this.opacity)
                .attr("x1", this.x1)
                .attr("y1", this.y1)
                .attr("x2", this.x2)
                .attr("y2", this.y2)
                .attr("id", d => "branch-" + d.i )
                //.attr('parent-id', function(d) {return 'id-'+d.parent;})
                .on("mouseover", this.highlightParents)
                .on("mouseout", this.highlightParents);
        },

        updateBranches() {
            select("#branches")
                .selectAll("line")
                .data(this.branches)
                // .attr('x1', this.x1)
                // .attr('y1', this.y1)
                .transition()
                .duration(this.settings.duration / 2)
                //.delay(10000)
                //.ease(easeLinear)
                .style("stroke-width", this.stroke)
                .attr("opacity", this.opacity)
                .attr("x1", this.x1)
                .attr("y1", this.y1)
                .attr("x2", this.x2)
                .attr("y2", this.y2);
        },

        regenerate(initialise) {
            this.branches = [];
            this.branch(this.seed);
            switch (initialise) {
                case "createTree":
                    this.createBranches();
                    break;
                case "updateTree":
                    this.updateBranches();
                    break;
                case "moveLeaves":
                    this.moveLeaves();
                    break;
            }
            //initialise ? this.createBranches() : this.updateBranches();
        },

        updateTimer() {
            if (this.timer === false) {
                this.timer = true;
                this.regenerate("updateTree");
                this.interv = interval(() => {
                    this.regenerate("updateTree");
                }, this.settings.duration);
            } else {
                this.interv.stop();
                this.timer = false;
            }
        },

        endPt(b) {
            // Return endpoint of branch
            var x = b.x + b.l * Math.sin(b.a);
            var y = b.y - b.l * Math.cos(b.a);
            return { x: x, y: y };
        }
    }
};
</script>

<style scoped>
path,
line {
    stroke: #777;
}

/*.svg-container {
        display: table;
        border: 1px solid #f8f8f8;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    }*/

.def {
    text-transform: uppercase;
    color: #686868;
    font-family: "Aloes-Bd";
    font-size: 18px;
}

#tree-holder {
    margin-top: 3%;
    margin-bottom: 3%;
}

.infos p {
    color: #686868;
    font-size: 14px;
    text-align: left;
}

/*.regenerate {
        border: 0px;
        color: #777;
        background-color: #17a2b8;
    }*/

#regenerate button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    color: #686868;
    cursor: pointer;
}
#regenerate button:hover {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    color: #33b277;
    cursor: pointer;
}
#regenerate button:focus {
    background-color: transparent;
    border: none;
    color: #33b277;
    cursor: pointer;
}
</style>
