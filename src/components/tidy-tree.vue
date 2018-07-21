<template>
    <b-container id="tidy-tree" fluid class="bv-example-row">
        <b-row align-h="center">
            <b-col xs="12" sm="4" md="3" lg="2" xl="2" >
                <div class="panel-heading"></div>

                <div class="panel-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="type" class="control-label">Type</label>
                            <div >
                                <select id="type" class="form-control" v-model="type">
                                    <option>tree</option>
                                    <option>cluster</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="layout-type" class="control-label">Layout Type</label>
                            <div  >
                                <select id="layout-type" class="form-control" v-model="layoutType">
                                    <option>euclidean</option>
                                    <option>circular</option>
                                </select>       
                            </div>
                        </div> 

                        <div class="form-group">
                            <label for="margin-x" class="control-label">X-margin :  {{Marginx}}px</label>  
                            <div class="">
                                <input id="margin-x" class="form-control" type="range" min="-100" max="600" v-model.number="Marginx">
                            </div> 
                        </div>        

                        <div class="form-group">
                            <label for="margin-y" class="control-label">Y-margin :  {{Marginy}}px</label>
                            <div class="">
                                <input id="margin-y" class="form-control" type="range" min="-200" max="400" v-model.number="Marginy">
                            </div>
                        </div>   

                        <div class="form-group">
                            <label for="margin-y" class="control-label">Radius : {{radius}}px</label>
                            <div class="">
                                <input id="margin-y" class="form-control" type="range" min="1" max="10" v-model.number="radius">
                            </div>
                        </div>        

                        <div class="form-group">
                            <label for="velocity" class="control-label">Duration : {{duration}}ms</label>
                            <div class="">
                                <input id="velocity" class="form-control" type="range" min="0" max="3000" v-model.number="duration">
                            </div>
                        </div>  

                        <div class="form-group">
                            <span v-if="currentNode">Current Node: {{currentNode.data.text}}</span>
                            <span v-else>No Node selected.</span>
                            <font-awesome-icon v-if="isLoading" :icon="['fas', 'spinner']" :transform="{ rotate: 42 }" size="xs" />
                        </div> 

                        <button type="button" :disabled="!currentNode" class="btn" @click="expandAll" data-toggle="tooltip" data-placement="top" title="Expand All from current">
                            <font-awesome-icon :icon="['fas', 'expand']" size="xs" />
                        </button>

                        <button type="button" :disabled="!currentNode" class="btn" @click="collapseAll" data-toggle="tooltip" data-placement="top" title="Collapse All from current">
                            <font-awesome-icon :icon="['fas', 'compress']" size="xs" />
                        </button>

                        <button type="button" :disabled="!currentNode" class="btn" @click="showOnly" data-toggle="tooltip" data-placement="top" title="Show Only from current">
                            <font-awesome-icon :icon="['fas', 'search-plus']" size="xs" />
                        </button>

                        <button type="button" :disabled="!currentNode" class="btn" @click="show" data-toggle="tooltip" data-placement="top" title="Show current">
                            <font-awesome-icon :icon="['fas', 'binoculars']" size="xs" />
                        </button>

                        <button v-if="zoomable" type="button" class="btn " @click="resetZoom" data-toggle="tooltip" data-placement="top" title="Reset Zoom">
                            <font-awesome-icon :icon="['fas', 'arrows-alt']" size="xs" />
                        </button>
                    </div>
                </div>
<!--               <div class="panel-heading">Events</div>
              <div class="panel-body log">
                <div v-for="(event,index) in events" :key="index">
                  <p><b>Name:</b> {{event.eventName}} <b>Data:</b>{{event.data.text}}</p>
                </div>
              </div> -->
            </b-col>

            <b-col xs ="12" sm="8" md="9" lg="10" xl="10" class="panel panel-default">
                <tree ref="tree" :identifier="getId" :zoomable="zoomable" :data="Graph.tree" :node-text="nodeText"  :margin-x="Marginx" :margin-y="Marginy" :radius="radius" :type="type" :layout-type="layoutType" :duration="duration" class="tree" @clicked="onClick" @expand="onExpand" @retract="onRetract"/> 
                <p>Real time logical mapping of a network composed of web portal, devices, sensors; using MQTT protocol.
                </p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import { event, select, selectAll } from "d3-selection"
    import { active, transition } from "d3-transition"
    import { tree } from 'vued3tree'
    import data from '@/../static/data/mqtt' /// todo: fetch the json from the http server or the broker storage ?
    import { EventBus } from '@/main'

/// todo: assign marginY & x values based on window size
    Object.assign(data, {
        type: 'tree',
        layoutType: 'euclidean',
        duration: 0,
        Marginx: 200,
        Marginy: 60,
        radius: 8,
        nodeText: 'text',
        currentNode: null,
        currentSensor: null,
        zoomable: true,
        isLoading: false,
        graph: null,
        events: []
    })

    export default {
        data () {
          //return initialState()
            return data
        },

        components: {
            tree,
            FontAwesomeIcon
        },

        created() {

        },

        mounted() {
            // make object.assign here ?
            EventBus.$on("mqtt-rx", (topic, payload) => {
                return this.addNode(topic, payload.toString());
            });
            this.pageTopic = "getlarge/" + this.$route.path;
            //this.div = select(this.$refs['tree'].$el).append("div").attr("class", "tooltip").style("opacity", 0);
            this.div = select(this.$el).append("div").attr("class", "tooltip").style("opacity", 0);
            EventBus.$emit("mqtt-tx", (this.pageTopic, "started"));            
        },

        updated() {
          //console.log("updated tree2", this.$data.Graph.tree)
          //console.log("updated tree2", this.$refs['tree'].$el.children[1])
        },
        
        beforeDestroy() {
            EventBus.$emit("mqtt-tx", (this.pageTopic, "ended"));            
            EventBus.$off("mqtt-rx");
        },

        watch: {
            data (current, old) {
              console.log("watch updated tree", data.Graph.tree)
            },
        },

        methods: {
            do (action) {
                if (this.currentNode) {
                  this.isLoading = true
                  this.$refs['tree'][action](this.currentNode).then(() => { this.isLoading = false })
                }
            },

            getId (node) {
                return node.id
            },

            expandAll () {
                this.do('expandAll')
            },

            collapseAll () {
                this.do('collapseAll')
            },

            showOnly () {
                this.do('showOnly')
            },

            show () {
                this.do('show')
            },

            onClick (evt) {
                this.currentNode = evt.element;
                if ( evt.element.data.dirty ) {
                    this.openTooltip(evt.element);
                    this.currentSensor = evt.element.data;
                }
                else {
                    this.currentSensor = null;
                    this.closeTooltip();
                }
                this.onEvent('onClick', evt);
            },

            onExpand (evt) {
                this.onEvent('onExpand', evt);
            },

            onRetract (evt) {
                this.onEvent('onRetract', evt);
            },

            onEvent (eventName, data) {
                this.events.push({eventName, data: data.data});
                console.log({eventName, data: data})
            },

            resetZoom () {
                this.isLoading = true
                this.$refs['tree'].resetZoom().then(() => { this.isLoading = false })
            },

            addNode(topic, body) {
                var self = this;
                // console.log("tree", data.Graph.tree)
                // console.log("component", this.$refs['tree'])
                var parts = topic.split("/");
                if (data.Graph.tree.children[0] === undefined){
                newnode = {"text": parts.shift(), "children":[]};
                data.Graph.tree.children = [newnode];
                this.walk(parts,newnode,body);
                } else {
                this.walk(parts,data.Graph.tree,body);
                }
            },

            walk(parts, node, body) {
                var that = this;
                if (parts.length !== 0) {
                    var current = parts.shift();
                    if (node.children && node.children.length !== 0) {
                    //console.log("walking old");
                        var z=0;
                        for(z=0; z < node.children.length; z++) {
                          //console.log(node.children[z].text + " - " + current);
                            if (node.children[z].text == current) {
                                //console.log("found");
                                //console.log("children found", node.children[z] );
                                this.walk(parts,node.children[z], body);
                                break;
                            }
                        }
                    //console.log("done loop - " + z + ", " + node.children.length);
                        if (z === node.children.length) {
                            //console.log("adding new");
                            //var newId = data.each(d => { d.id = this.identifier(d.data) })
                            //console.log(newId);
                            //var newnode = {"text": current, "id": , "children":[]};
                            var newnode = {"text": current, "children":[]};
                            node.children.push(newnode);
                            this.$refs['tree'].onData(data.Graph.tree)
                            this.walk(parts,node.children[z],body);
                        }
                    } else if (node._children && node._children.length != 0) {
                        //console.log("walking hidden");
                        var z = 0;
                        for(z === 0; z < node._children.length; z++) {
                            //console.log(node._children[z].name + " - " + current);
                            if (node._children[z].text === current) {
                                //console.log("found");
                                this.walk(parts,node._children[z], body);
                                break;
                            }
                        }
                        //console.log("done hidden loop - " + z + ", " + node._children.length);
                        if (z === node._children.length) {
                            //console.log("adding new hidden");
                            var newnode = {"text": current, "_children":[]};
                            node._children.push(newnode);
                            this.$refs['tree'].onData(data.Graph.tree)
                            this.walk(parts,node._children[z],body);
                        }
                    } else {
                        //console.log("empty");
                        newnode = {"text": current, "children":[]};
                        node.children = [newnode];
                        this.walk(parts,node.children[0],body);
                    }
                } else {
                    //console.log("body", body);
                    node.payload = body;
                    node.dirty = true;
                    if ( node === this.currentSensor ) {
                        //this.openTooltip(node);
                    }
                }
            },

            openTooltip(data) {
                //console.log("data", data);
                var self = this;       
                this.div.transition()
                    .duration(200)
                    .style("opacity", .8)
                    .style("fill", "#33b277");

                this.div.html("Payload :" + data.data.payload)
                    .style("width", ( Math.max(document.documentElement.clientWidth, window.innerWidth || 0))/1.7 + "px")
                    .style("height", (Math.max(document.documentElement.clientHeight, window.innerHeight || 0))/13 + "px")
                    // .style("left", ( Math.max(document.documentElement.clientWidth, window.innerWidth || 0))/5 + "px")
                    // .style("top", 50 + "px");
                    .style("left", data.y + "px")
                    .style("top", data.x+ (Math.max(document.documentElement.clientHeight, window.innerHeight || 0))/13 +"px");
            },

            closeTooltip() {
                this.div.transition()
                    .duration(500)
                    .style("opacity", 0);
            },      

        }
    }
</script>

<style lang="scss">

    #tidy-tree {
        text-align: center;
        color: #686868;
        margin-top: 3%;
    }

    .tree {
        height: 700px;
        width: 100%;
    }

    .treeclass .nodetree circle:hover {
        fill: #33b277;
        cursor: pointer;
    }

    .treeclass .nodetree text {
        font-size: 0.8rem;
    }

    .graph-root {
        height: 800px;
        width: 100%;
    }

    .linktree {
        stroke: url(#gradient);
    }

    .panel-body {
        padding-left: 3%;
    }

    div.tooltip {
        position: absolute;
        text-align: center;
        padding: 2px;
        font: 14px;
        color: white;
        background: #33b277;
        border: 0px;
        border-radius: 8px;
        pointer-events: none;
    }

    .form-group {
        text-align: left;
        padding-right: 0px;
    }

    button.btn:hover{
        color: #33b277;
        background-color: transparent;
        border: 1px;
        border-color: #f9b23e;
    }

    button.btn:active {
        background-color: transparent;
        border: 1px;
        border-color: #f9b23e;
    }

    .control-label {
        font-size: 18px;
    }

    .form-control:hover {
        color: #33b277;
    }

    .form-control:focus {
        box-shadow: 2px 2px 12px #000;
        color: #33b277;
        border-color: #f9b23e;
    }

    .form-control {
        box-shadow: 1px 1px 3px #000;
        padding: 0.5rem 0.5rem;
        width: 100%;
    }

    input[type=range] {
        height: 26px;
        -webkit-appearance: none;
        margin: 10px 0;
        width: 100%;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #B0B0B0;
        border-radius: 5px;
        border: 0px solid #000000;
    }
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 0px solid #2497E3;
        height: 20px;
        width: 20px;
        border-radius: 26px;
        background: #686868;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #B0B0B0;
    }
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #B0B0B0;
        border-radius: 5px;
        border: 0px solid #000000;
    }
    input[type=range]::-moz-range-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 0px solid #2497E3;
        height: 20px;
        width: 20px;
        border-radius: 26px;
        background: #686868;
        cursor: pointer;
    }
    input[type=range]::-ms-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #B0B0B0;
        border: 0px solid #000000;
        border-radius: 10px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-fill-upper {
        background: #B0B0B0;
        border: 0px solid #000000;
        border-radius: 10px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 0px 0px 0px #000000;
        border: 0px solid #2497E3;
        height: 20px;
        width: 20px;
        border-radius: 26px;
        background: #686868;
        cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: #B0B0B0;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: #B0B0B0;
    }

    .log  {
        height: 500px;
        overflow-x: auto;
        overflow-y: auto;
        overflow: auto;
        text-align: left;
    }

</style>
