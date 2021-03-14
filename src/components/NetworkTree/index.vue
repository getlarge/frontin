<template>
  <b-container id="tidy-tree" fluid class="bv-example-row">
    <b-row align-h="center">
      <b-col sm="4" md="3" lg="2" xl="2">
        <div class="panel-heading" />
        <div class="panel-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label for="type" class="control-label"> Type </label>
              <div>
                <select id="type" v-model="type" class="form-control">
                  <option>tree</option>
                  <option>cluster</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="layout-type" class="control-label">
                Layout Type
              </label>
              <div>
                <select id="layout-type" v-model="layoutType" class="form-control">
                  <option>euclidean</option>
                  <option>circular</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="margin-x" class="control-label"> X-offset : {{ Marginx }}px </label>
              <div class="">
                <input id="margin-x" v-model.number="Marginx" class="form-control" type="range" min="-100" max="600" />
              </div>
            </div>
            <div class="form-group">
              <label for="margin-y" class="control-label"> Y-offset : {{ Marginy }}px </label>
              <div class="">
                <input id="margin-y" v-model.number="Marginy" class="form-control" type="range" min="-400" max="400" />
              </div>
            </div>
            <div class="form-group">
              <label for="margin-y" class="control-label">Radius : {{ radius }}px</label>
              <div class="">
                <input id="margin-y" class="form-control" type="range" min="1" max="10" v-model.number="radius" />
              </div>
            </div>
            <div class="form-group">
              <label for="velocity" class="control-label"> Duration : {{ duration }}ms </label>
              <div class="">
                <input id="velocity" v-model.number="duration" class="form-control" type="range" min="0" max="3000" />
              </div>
            </div>
            <div class="form-group">
              <span v-if="currentNode"> Current Node: {{ currentNode.data.text }} </span>
              <span v-else> No Node selected. </span>
              <font-awesome-icon v-if="isLoading" icon="spinner" :transform="{ rotate: 42 }" size="xs" />
            </div>
            <button
              :disabled="!currentNode"
              type="button"
              class="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Expand All from current"
              @click="expandAll"
            >
              <font-awesome-icon icon="expand" size="xs" />
            </button>
            <button
              :disabled="!currentNode"
              type="button"
              class="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Collapse All from current"
              @click="collapseAll"
            >
              <font-awesome-icon icon="compress" size="xs" />
            </button>
            <button
              :disabled="!currentNode"
              type="button"
              class="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Show only from current"
              @click="showOnly"
            >
              <font-awesome-icon icon="search-plus" size="xs" />
            </button>
            <button
              :disabled="!currentNode"
              type="button"
              class="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Show current"
              @click="collapseAll"
            >
              <font-awesome-icon icon="binoculars" size="xs" />
            </button>
            <button
              v-if="zoomable"
              :disabled="!currentNode"
              type="button"
              class="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Reset zoom"
              @click="resetZoom"
            >
              <font-awesome-icon icon="arrows-alt" size="xs" />
            </button>
          </div>
        </div>
        <!-- <div class="panel-heading">Events</div>
        <div class="panel-body log">
          <div v-for="(event,index) in events" :key="index">
            <p><b>Name:</b> {{event.eventName}} <b>Data:</b>{{event.data.text}}</p>
          </div>
        </div> -->
      </b-col>
      <b-col id="tree-container" sm="8" md="9" lg="10" xl="10" class="panel panel-default">
        <tree
          ref="tree"
          :identifier="getId"
          :zoomable="zoomable"
          :data="Graph.tree"
          :node-text="nodeText"
          :margin-x="Marginx"
          :margin-y="Marginy"
          :radius="radius"
          :type="type"
          :layout-type="layoutType"
          :duration="duration"
          class="tree"
          @clicked="onClick"
          @expand="onExpand"
          @retract="onRetract"
        />
        <p><br />TODO : unify transport protocol layers using <a href="#/aloes-protocol"> IPSO</a> references.</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { select } from 'd3-selection';
import { tree } from 'vued3tree';
import data from '@/assets/data/mqtt';
import { EventBus } from '@/services/PubSub';

/// todo: fetch the json from the http server or the broker storage ?
/// todo: assign marginY & x values based on window size
/// add tree viz in child component
/// stop animation propag on selected node's children
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
  events: [],
});

export default {
  name: 'NetworkTree',

  components: {
    tree,
  },

  data() {
    //return initialState()
    return data;
  },

  // watch: {
  //   data(current, old) {
  //     console.log("watch updated tree", data.Graph.tree);
  //   },
  // },

  created() {},

  mounted() {
    //console.log(this.$el.children[0])
    this.pageTopic = 'getlarge' + this.$route.path;
    this.div = select('#tidy-tree')
      .append('div')
      .attr('class', 'payloadContainer')
      .style('opacity', 0);

    // todo subscribe on selected device broker and on newly created virtual object bridge
    EventBus.$emit('sub:mqtt', `${process.env.VUE_APP_MQTT_CLIENT_USER}/#`);

    EventBus.$on('rx:mqtt', (topic, payload) => {
      //console.log(topic, payload.toString())
      this.addNode(topic, payload.toString());
    });

    EventBus.$on('start:tutorial', () => {
      const text =
        'Real time logical mapping of a network composed of web portal, devices, sensors; using MQTT protocol. \nYou can select each circles to navigate in the tree, click on the text next to light grey circles to display messages';
      const tags = '';
      const img = '/img/tuto-mqtt-tree.gif';
      EventBus.$emit('update:tutorial', this.$route.name, text, tags, img);
      EventBus.$emit('tx:mqtt', 'getlarge' + this.$route.path, 'started');
      this.tutorial = true;
    });

    EventBus.$on('stop:tutorial', () => {
      EventBus.$emit('tx:mqtt', 'getlarge' + this.$route.path, 'ended');
      this.tutorial = false;
    });
  },

  updated() {
    //console.log("updated tree2", this.$refs['tree'].$el.children[1])
  },

  beforeDestroy() {
    // if ( this.tutorial === true ) {
    //     EventBus.$emit("mqtt-tx", (this.pageTopic, "ended"));
    // }
    EventBus.$off('rx:mqtt');
    EventBus.$emit('stop:tutorial');
    EventBus.$off('start:tutorial');
  },

  methods: {
    do(action) {
      if (this.currentNode) {
        this.isLoading = true;
        this.$refs['tree'][action](this.currentNode).then(() => {
          this.isLoading = false;
        });
      }
    },

    getId(node) {
      return node.id;
    },

    expandAll() {
      this.do('expandAll');
    },

    collapseAll() {
      this.do('collapseAll');
    },

    showOnly() {
      this.do('showOnly');
    },

    show() {
      this.do('show');
    },

    onClick(evt) {
      this.currentNode = evt.element;
      if (evt.element.data.dirty) {
        this.openTooltip(evt.element);
        this.currentSensor = evt.element.data;
      } else {
        this.currentSensor = null;
        this.closeTooltip();
      }
      this.onEvent('onClick', evt);
    },

    onExpand(evt) {
      this.onEvent('onExpand', evt);
    },

    onRetract(evt) {
      this.onEvent('onRetract', evt);
    },

    onEvent(eventName, data) {
      this.events.push({ eventName, data: data.data });
      //console.log({eventName, data: data})
    },

    resetZoom() {
      this.isLoading = true;
      this.$refs['tree'].resetZoom().then(() => {
        this.isLoading = false;
      });
    },

    addNode(topic, body) {
      // console.log("tree", data.Graph.tree)
      // console.log("component", this.$refs['tree'])
      const parts = topic.split('/');
      if (data.Graph.tree.children[0] === undefined) {
        const newnode = { text: parts.shift(), children: [] };
        data.Graph.tree.children = [newnode];
        this.walk(parts, newnode, body);
      } else {
        this.walk(parts, data.Graph.tree, body);
      }
    },

    walk(parts, node, body) {
      /// parsing mqtt topic
      // todo : fill the nodes based on native protocol or virtual object
      let newnode;
      let z = 0;
      if (parts.length !== 0) {
        var current = parts.shift();
        if (node.children && node.children.length !== 0) {
          //console.log("walking old");
          for (z = 0; z < node.children.length; z++) {
            //console.log(node.children[z].text + " - " + current);
            if (node.children[z].text == current) {
              //console.log("found");
              //console.log("children found", node.children[z] );
              this.walk(parts, node.children[z], body);
              break;
            }
          }
          //console.log("done loop - " + z + ", " + node.children.length);
          if (z === node.children.length) {
            //console.log("adding new");
            //var newId = data.each(d => { d.id = this.identifier(d.data) })
            //console.log(newId);
            //var newnode = {"text": current, "id": , "children":[]};
            newnode = { text: current, children: [] };
            node.children.push(newnode);
            this.$refs['tree'].onData(data.Graph.tree);
            // todo : create and fill input for each part of the topic
            this.walk(parts, node.children[z], body);
          }
        } else if (node._children && node._children.length != 0) {
          //console.log("walking hidden");
          for (z = 0; z < node._children.length; z++) {
            //console.log(node._children[z].name + " - " + current);
            if (node._children[z].text === current) {
              //console.log("found");
              this.walk(parts, node._children[z], body);
              break;
            }
          }
          //console.log("done hidden loop - " + z + ", " + node._children.length);
          if (z === node._children.length) {
            //console.log("adding new hidden");
            newnode = { text: current, _children: [] };
            node._children.push(newnode);
            this.$refs['tree'].onData(data.Graph.tree);
            // todo : create and fill input for each part of the topic
            //localStorage.setItem("testJSON", data.Graph.tree);

            this.walk(parts, node._children[z], body);
          }
        } else {
          //console.log("empty");
          newnode = { text: current, children: [] };
          node.children = [newnode];
          // todo : update input
          this.walk(parts, node.children[0], body);
        }
      } else {
        //console.log("body", body);
        // todo : check typeof body
        // parse mqtt payload based on typeof
        // create and fill inputs for each part of the payload

        node.payload = body;
        node.dirty = true;
        if (node === this.currentSensor) {
          this.updateTooltip(node);
        }
      }
    },

    openTooltip(data) {
      // var text = localStorage.getItem("testJSON");
      // var obj = JSON.parse(text);
      // console.log(obj)

      this.div
        .transition()
        .duration(200)
        .style('opacity', 0.8)
        .style('fill', '#33b277');

      //console.log(JSON.parse(data.data.payload));
      //var payloadElem = JSON.parse(data.data.payload);
      this.div
        .html("<p class='payload'>" + data.data.payload + '</p>')
        //this.div.html("<p class='payload'>"+payloadElem.data+" - "+payloadElem.time+"</p>")
        //.style("width", (Math.max(document.documentElement.clientWidth, window.innerWidth || 0))/3 + "px")
        .style('left', '30%')
        //.style("left", data.x + "px")
        .style('top', '0%');
    },

    updateTooltip(data) {
      //console.log("data", data);
      this.div
        .transition()
        .duration(200)
        .style('opacity', 0.8)
        .style('fill', '#33b277');
      //  const payloadElem = JSON.parse(data.payload);
      this.div
        .html("<p class='payload'>" + data.payload + '</p>')
        //this.div.html("<p class='payload'>"+payloadElem.data+" - "+payloadElem.time+"</p>")
        .style('height', 'auto')
        .style('max-width', '40%');
    },

    closeTooltip() {
      this.div
        .transition()
        .duration(500)
        .style('opacity', 0);
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/network-tree.scss';
</style>
