<template>
  <b-container id="tidy-tree" fluid class="bv-example-row">
          <h1>Network tree</h1>

      <b-row align-h="center">
          <b-col sm="3" md="3" lg="3" >
              <div class="panel-heading">Props</div>

              <div class="panel-body">
                  <div class="form-horizontal">

                  <div class="form-group">
                    <label for="type" class="control-label col-sm-3">type</label>
                      <div  class="col-sm-9">
                        <select id="type" class="form-control" v-model="type">
                          <option>tree</option>
                          <option>cluster</option>
                        </select>
                      </div>
                  </div>

                  <div class="form-group">
                    <label for="layout-type" class="control-label col-sm-3">layoutType</label>
                      <div  class="col-sm-9">
                        <select id="layout-type" class="form-control" v-model="layoutType">
                          <option>euclidean</option>
                          <option>circular</option>
                        </select>       
                    </div>
                  </div> 

                  <div class="form-group">
                    <label for="margin-x" class="control-label col-sm-3">marginx</label>
                    <div class="col-sm-7">
                      <input id="margin-x" class="form-control" type="range" min="-200" max="200" v-model.number="Marginx">
                    </div> 
                      <div class="col-sm-2">
                        <p>{{Marginx}}px</p>       
                    </div> 
                  </div>        

                  <div class="form-group">
                    <label for="margin-y" class="control-label col-sm-3">marginy</label>
                    <div class="col-sm-7">
                      <input id="margin-y" class="form-control" type="range" min="-200" max="200" v-model.number="Marginy">
                    </div>
                    <div class="col-sm-2">
                      <p>{{Marginy}}px</p>       
                    </div> 
                  </div>   

                   <div class="form-group">
                    <label for="margin-y" class="control-label col-sm-3">radius</label>
                    <div class="col-sm-7">
                      <input id="margin-y" class="form-control" type="range" min="1" max="10" v-model.number="radius">
                    </div>
                    <div class="col-sm-2">
                      <p>{{radius}}px</p>       
                    </div> 
                  </div>        

                  <div class="form-group">
                    <label for="velocity" class="control-label col-sm-3">Duration</label>
                    <div class="col-sm-7">
                      <input id="velocity" class="form-control" type="range" min="0" max="3000" v-model.number="duration">
                    </div>
                    <div class="col-sm-2">
                      <p>{{duration}}ms</p>       
                    </div>
                  </div>  

                  <div class="form-group">
                    <span v-if="currentNode">Current Node: {{currentNode.data.text}}</span>
                    <span v-else>No Node selected.</span>
                        <font-awesome-icon v-if="isLoading" :icon="['fas', 'spinner']" :transform="{ rotate: 42 }" size="xs" />
                  </div> 

                  <button type="button" :disabled="!currentNode" class="btn btn-primary" @click="expandAll" data-toggle="tooltip" data-placement="top" title="Expand All from current">
                    <font-awesome-icon :icon="['fas', 'expand']" size="xs" />
                  </button>

                  <button type="button" :disabled="!currentNode" class="btn btn-secondary" @click="collapseAll" data-toggle="tooltip" data-placement="top" title="Collapse All from current">
                  <font-awesome-icon :icon="['fas', 'compress']" size="xs" />
                  </button>

                  <button type="button" :disabled="!currentNode" class="btn btn-success" @click="showOnly" data-toggle="tooltip" data-placement="top" title="Show Only from current">
                  <font-awesome-icon :icon="['fas', 'search-plus']" size="xs" />
                  </button>

                  <button type="button" :disabled="!currentNode" class="btn btn-warning" @click="show" data-toggle="tooltip" data-placement="top" title="Show current">
                  <font-awesome-icon :icon="['fas', 'binoculars']" size="xs" />
                  </button>

                  <button v-if="zoomable" type="button" class="btn btn-warning" @click="resetZoom" data-toggle="tooltip" data-placement="top" title="Reset Zoom">
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

          <b-col sm="9" md="9" lg="9" class="panel panel-default">
            <tree ref="tree" :identifier="getId" :zoomable="zoomable" :data="Graph.tree" :node-text="nodeText"  :margin-x="Marginx" :margin-y="Marginy" :radius="radius" :type="type" :layout-type="layoutType" :duration="duration" class="tree" @clicked="onClick" @expand="onExpand" @retract="onRetract"/>          
          </b-col>
      </b-row>

    </b-container>
</template>

<script>

  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import {tree} from 'vued3tree'
  import data from '@/../static/data/mqtt'
  import { EventBus } from '@/main'

  Object.assign(data, {
    type: 'tree',
    layoutType: 'euclidean',
    duration: 450,
    Marginx: 30,
    Marginy: -10,
    radius: 5,
    nodeText: 'text',
    currentNode: null,
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
      EventBus.$on("mqtt-rx", (topic, payload) => {
        // var split = message.split('>')
        // var topic = split[0];
        // var payload = split[1];
      return this.addNode(topic, payload.toString());
      });

    },

    mounted() {
      //console.log(this);
    },

    updated() {
      //console.log("updated tree2", this.$data.Graph.tree)
    },
    
    beforeDestroy() {
      EventBus.$off("mqtt-rx");
    },

    watch: {
      data (current, old) {
          console.log("watch updated tree", data.Graph.tree)
          //console.log(this);
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
        this.currentNode = evt.element
        this.onEvent('onClick', evt)
      },
      onExpand (evt) {
        this.onEvent('onExpand', evt)
      },
      onRetract (evt) {
        this.onEvent('onRetract', evt)
      },
      onEvent (eventName, data) {
        this.events.push({eventName, data: data.data})
        console.log({eventName, data: data})
      },
      resetZoom () {
        this.isLoading = true
        this.$refs['tree'].resetZoom().then(() => { this.isLoading = false })
      },

      addNode(topic, body) {
        var self = this;
        //console.log("tree", data.Graph.tree)
        //console.log("componenent", this.$refs['tree'])
        var parts = topic.split("/");
        if (data.Graph.tree.children[0]===undefined){
          newnode = {"text": parts.shift(), "children":[]};
          data.Graph.tree.children = [newnode];
          this.walk(parts,newnode,body);
        } else {
          this.walk(parts,data.Graph.tree,body);
        }
      },

      walk(parts, node, body) {
        var that = this;
        if (parts.length != 0) {
          var current = parts.shift();
          if (node.children && node.children.length != 0) {
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
            if (z == node.children.length) {
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
            var z=0;
            for(z=0; z < node._children.length; z++) {
              //console.log(node._children[z].name + " - " + current);
              if (node._children[z].text == current) {
                //console.log("found");
                this.walk(parts,node._children[z], body);
                break;
              }
            }
          //console.log("done hidden loop - " + z + ", " + node._children.length);
            if (z == node._children.length) {
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
          //console.log("body");
          node.data = body;
          node.dirty = true;
          //this.$refs['tree'].onData(data.Graph.tree)
        }
      },
    }
  }
</script>

<style scoped>

  #tidy-tree {
    text-align: center;
    color: #2c3e50;
    margin-top: 3%;
  }

  .tree {
    height: 600px;
    width: 100%;
  }

  .graph-root {
    height: 800px;
    width: 100%;
  }

  .linktree {
    stroke: url(#gradient);
  }

  .form-group {
    text-align: left;
  }

  .form-control:hover {
    color: #33b277;
  }

  input.form-control {
    width: 100%;
  }

  .log  {
    height: 500px;
    overflow-x: auto;
    overflow-y: auto;
    overflow: auto;
    text-align: left;
  }

</style>
