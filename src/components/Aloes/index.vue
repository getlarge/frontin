<template lang="html">
  <b-container
    class="home-container"
    fluid>
    <p
      class="info-title">
      What if your sensors could speak a common language ?
    </p>
    <b-row 
      align-v="center"
      align-h="center"
      no-gutters>
      <b-col 
        cols="12"
        sm="6"
        md="6"
        lg="5"
        xl="5"
        offset-lg="1"
        offset-xl="1">
        <svg
          :viewBox="`0 0 ${svgSettings.width} ${svgSettings.height}`" 
          pointer-events="all" 
          preserveAspectRatio="xMinYMin meet"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="info-layer">
          <defs>
            <filter 
              id="circle-shadow-selected" 
              y="-10" 
              x="-10"
              height="40"
              width="150">
              <feOffset 
                in="SourceAlpha" 
                dx="1" 
                dy="1" 
                result="offset1" />
              <feGaussianBlur 
                in="offset2" 
                stdDeviation="1" 
                result="blur1"/>
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter 
              id="circle-shadow" 
              y="-10"
              x="-10"
              height="40"
              width="150">
              <feOffset 
                in="SourceAlpha" 
                dx="2" 
                dy="2" 
                result="offset2" />
              <feGaussianBlur 
                in="offset2" 
                stdDeviation="2"  
                result="blur2"/>
              <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g 
            transform="translate(200,200)">
            <circle
              cx="80"
              cy="0"
              r="80"
              class="device-circle twin"/>
            <image
              x="40"
              y="-40"
              height="80"
              width="80"
              v-bind="{ 'xlink:href':$store.state.style.pictures.nodeOff }"
              class="sensor-icon"
              @click="deviceTwinSelected = !deviceTwinSelected"/>
            <circle
              cx="0"
              cy="0"
              r="80"
              class="device-circle"/>
            <image
              x="-40"
              y="-40"
              height="80"
              width="80"
              v-bind="{ 'xlink:href':$store.state.style.pictures.node }"
              class="sensor-icon"
              @click="deviceTwinSelected = !deviceTwinSelected"/>
          </g>
        </svg>
      </b-col>
      <b-col 
        cols="12"
        sm="6"
        md="6"
        lg="5"
        xl="5">
        <transition 
          name="fade"
          mode="out-in">
          <div 
            v-if="!deviceTwinSelected"
            key="text">
            <p
              class="info-subtitle">
              Easily register your devices
            </p>
            <p class="info-description">
              Powered by aloes-handlers to encode/decode MQTT stream, and aloes-microservices to transport and persist data.
            </p>
          </div>
          <div 
            v-else-if="deviceTwinSelected"
            class="info-video"
            key="video">
            <video
              ref="videoPlayer"
              muted
              autoplay
              loop>
              <source
                :src="$store.state.style.videos.createDeviceWebm"
                type="video/webm">
              <source
                :src="$store.state.style.videos.createDeviceMp4"
                type="video/mp4">
              <source
                :src="$store.state.style.videos.createDeviceOgv"
                type="video/ogg">
            </video>
          </div>
        </transition>
      </b-col>
    </b-row>
    <b-row 
      align-v="center"
      align-h="center">
      <b-col 
        cols="12"
        sm="6"
        lg="5"
        xl="5"
        order-md="12"
        order-lg="12"
        order-xl="12">
        <device-tree 
          v-if="deviceTreeLoaded"
          :source="`${$store.state.clientUrl}/data/device-tree.json`"
          :client-url="$store.state.clientUrl"
          @node-selected="onNodeSelected"
          @node-deselected="onNodeDeselected"
          @node-clicked="onNodeClicked"/>
      </b-col>
      <b-col 
        cols="12"
        sm="6"
        lg="6"
        xl="5"
        order-md="1"
        order-lg="1"
        order-xl="1">
        <transition 
          name="fade"
          mode="out-in">
          <div 
            v-if="sensor === null && device === null"
            key="text">
            <p
              class="info-subtitle">
              Collect and visualize attached sensors
            </p>
            <p class="info-description">
              Displayed with aloes-vuecomponents & aloes-webcomponents set
            </p>
          </div>
          <aloes-sensor-snap
            v-else-if="vueElem && sensor !== null"
            :id="sensor.id"
            :device-id="sensor.deviceId"
            :name="sensor.name"
            :type="sensor.type"
            :value="sensor.value"
            :frame-counter="sensor.frameCounter"
            :resources="JSON.stringify(sensor.resources)"
            :icons="sensor.icons"
            :colors="sensor.colors"
            :protocol-name="sensor.protocolName"
            :protocol-version="sensor.protocolVersion"
            :dev-eui="sensor.devEui"
            :native-type="sensor.nativeType"
            :native-resource="sensor.nativeResource"
            :input-path="sensor.inputPath"
            :output-path="sensor.outputPath"
            key="sensor"/>
          <device-card
            v-else-if="device !== null"
            :device="device"
            ref="deviceCard"
            key="device"/> 
        </transition>    
      </b-col>
    </b-row>
    <b-row 
      align-v="center"
      align-h="center">
      <b-col 
        cols="12"
        sm="6" 
        lg="5"
        xl="5">
        <object-composition 
          :source="`${$store.state.clientUrl}/data/virtual-object-composition.json`"
          :client-url="$store.state.clientUrl"
          @node-selected="onNodeSelected"
          @node-deselected="onNodeDeselected"
          @node-clicked="onNodeClicked"/>
      </b-col>
      <b-col 
        cols="12"
        sm="6"
        lg="5"
        xl="5">
        <p
          class="info-subtitle">
          Compose custom objects
        </p>
        <p class="info-description">
          Share and control them from any web interface.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script type="text/javascript">
// import Vue from "vue";
// import wrap from "@vue/web-component-wrapper";
//  import logger from "@/services/logger";

export default {
  name: "Presentation",

  components: {
    "device-card": () => import("@/components/Aloes/DeviceCard.vue"),
    "device-tree": () => import("@/components/Aloes/DeviceTree.vue"),
    "object-composition": () =>
      import("@/components/Aloes/ObjectComposition.vue")
  },

  data() {
    return {
      deviceTreeLoaded: true,
      deviceTwinSelected: false,
      svgSettings: {
        width: 500,
        height: 400
      },
      vueElem: false,
      device: null,
      sensor: null,
      view: "SensorSnap"
    };
  },

  // created() {
  //   let aloesWebcomponents = document.createElement("script");
  //   aloesWebcomponents.setAttribute("src", "/aloes-webcomponents/aloes.js");
  //   //  aloesWebcomponents.setAttribute("async", true);
  //   aloesWebcomponents.onload = () => (this.deviceTreeLoaded = true);
  //   document.body.appendChild(aloesWebcomponents);
  // },

  mounted() {
    this.deviceTwinSelected = false;
    this.sensor = null;
    this.device = null;
    // const CustomElement = wrap(Vue, () =>
    //   import(`@/components/Aloes/SensorSnap.vue`)
    // );
    // window.customElements.define("aloes-sensor-snap", CustomElement);
    this.vueElem = true;
  },

  beforeDestroy() {
    //  EventBus.$off("start:tutorial");
    //  EventBus.$emit("stop:tutorial");
    this.sensor = null;
    this.device = null;
    this.deviceTwinSelected = false;
  },

  computed: {},

  methods: {
    onNodeSelected(event) {
      //  console.log("onNodeSelected:req", event.data);
      // logger.publish(4, "device", "onNodeSelected:req", event);
      // if (event.data && event.data.resources) this.sensor = event.data;
      // else if (event.data && event.data.qrCode) this.device = event.data;
    },

    onNodeDeselected(event) {
      //  console.log("onNodeDeselected:req", event);
      // this.sensor = null;
      // this.device = null;
    },

    onNodeClicked(event) {
      //  console.log("onNodeClicked:req", event);
      //  const node = event.detail[0];
      if (event.data && event.data.resources && this.sensor === null) {
        this.sensor = event.data;
        this.device = null;
      } else if (event.data && event.data.resources && this.sensor !== null) {
        this.sensor = null;
        this.device = null;
      }
      if (event.data && event.data.qrCode && this.device === null) {
        this.device = event.data;
        this.sensor = null;
      } else if (event.data && event.data.qrCode && this.device !== null) {
        this.device = null;
        this.sensor = null;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/aloes-presentation.scss";
</style>
