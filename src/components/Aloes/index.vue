<template lang="html">
  <b-container class="home-container" fluid>
    <p class="info-title">
      What if your sensors could speak a common language ?
    </p>
    <b-row align-v="center" align-h="center" no-gutters>
      <b-col cols="12" sm="6" md="6" lg="5" xl="5" offset-lg="1" offset-xl="1">
        <svg
          :viewBox="`0 0 ${svgSettings.width} ${svgSettings.height}`"
          pointer-events="all"
          preserveAspectRatio="xMinYMin meet"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="info-layer"
        >
          <defs>
            <filter id="circle-shadow-selected" y="-10" x="-10" height="40" width="150">
              <feOffset in="SourceAlpha" dx="1" dy="1" result="offset1" />
              <feGaussianBlur in="offset2" stdDeviation="1" result="blur1" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="circle-shadow" y="-10" x="-10" height="40" width="150">
              <feOffset in="SourceAlpha" dx="2" dy="2" result="offset2" />
              <feGaussianBlur in="offset2" stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(200,200)">
            <circle cx="80" cy="0" r="80" class="device-circle twin" />
            <image
              x="40"
              y="-40"
              height="80"
              width="80"
              v-bind="{'xlink:href': $store.state.style.pictures.nodeOff}"
              class="sensor-icon"
              @click="deviceTwinSelected = !deviceTwinSelected"
            />
            <circle cx="0" cy="0" r="80" class="device-circle" />
            <image
              x="-40"
              y="-40"
              height="80"
              width="80"
              v-bind="{'xlink:href': $store.state.style.pictures.node}"
              class="sensor-icon"
              @click="deviceTwinSelected = !deviceTwinSelected"
            />
          </g>
        </svg>
      </b-col>
      <b-col cols="12" sm="6" md="6" lg="5" xl="5">
        <transition name="fade" mode="out-in">
          <div v-if="!deviceTwinSelected" key="text">
            <p class="info-subtitle">
              Easily register your devices
            </p>
            <p class="info-description">
              Powered by
              <a href="https://framagit.org/getlarge/aloes-handlers" target="_blank">aloes-handlers</a>
              to encode/decode MQTT stream, and
              <a href="https://framagit.org/getlarge/device-manager" target="_blank">device-manager</a>
              to transport and persist data .
            </p>
          </div>
          <div v-else-if="deviceTwinSelected" class="info-video" key="video">
            <video ref="videoPlayer" muted autoplay loop>
              <source :src="$store.state.style.videos.createDeviceWebm" type="video/webm" />
              <source :src="$store.state.style.videos.createDeviceMp4" type="video/mp4" />
              <source :src="$store.state.style.videos.createDeviceOgv" type="video/ogg" />
            </video>
          </div>
        </transition>
      </b-col>
    </b-row>

    <b-row align-v="center" align-h="center">
      <b-col cols="12" sm="6" lg="5" xl="5" order-md="12" order-lg="12" order-xl="12">
        <device-tree
          v-if="deviceTreeLoaded"
          :source="`/data/device-tree.json`"
          :device="device"
          :client-url="$store.state.clientUrl"
          :height="300"
          :width="300"
          @node-selected="onNodeSelected"
          @node-deselected="onNodeDeselected"
          @node-clicked="onNodeClicked"
        />
      </b-col>
      <b-col cols="12" sm="6" lg="6" xl="5" order-md="1" order-lg="1" order-xl="1">
        <transition name="fade" mode="out-in">
          <div v-if="sensor === null && device === null" key="text">
            <p class="info-subtitle">
              Collect and visualize attached sensors
            </p>
            <p class="info-description">
              Displayed with device-snap &
              <a href="https://framagit.org/aloes/sensor-snap" target="_blank">sensor-snap</a>
              libraries.
            </p>
          </div>
          <sensor-snap
            v-if="vueElem && sensor !== null"
            :ref="`sensorSnap-${sensor.id}`"
            :id="sensor.id.toString()"
            :device-id="sensor.deviceId"
            :dev-eui="sensor.devEui"
            :name="sensor.name"
            :type="sensor.type"
            :value="JSON.stringify(sensor.value)"
            :frame-counter="sensor.frameCounter"
            :resources="JSON.stringify(sensor.resources)"
            :resource="sensor.resource"
            :icons="sensor.icons.toString()"
            :colors="sensor.colors.toString()"
            :protocol-name="sensor.protocolName"
            :protocol-version="sensor.protocolVersion"
            :input-path="sensor.inputPath || null"
            :output-path="sensor.outputPath || null"
            :in-prefix="sensor.inPrefix"
            :out-prefix="sensor.outPrefix"
            :native-type="sensor.nativeType"
            :native-resource="sensor.nativeResource"
            :native-sensor-id="sensor.nativeSensorId"
            :native-node-id="sensor.nativeNodeId || null"
            :height="320"
            :width="300"
            key="sensor"
            @update-sensor="onUpdateSensor"
            @delete-sensor="onDeleteSensor"
          />
          <device-card v-else-if="device !== null" :device="device" ref="deviceCard" key="device" />
        </transition>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center">
      <b-col cols="12" sm="6" lg="5" xl="5">
        <object-composition
          :source="`/data/virtual-object-composition.json`"
          :client-url="$store.state.clientUrl"
          @node-selected="onNodeSelected"
          @node-deselected="onNodeDeselected"
          @node-clicked="onNodeClicked"
        />
      </b-col>
      <b-col cols="12" sm="6" lg="5" xl="5">
        <p class="info-subtitle">
          Compose custom objects
        </p>
        <p class="info-description">
          Share and control them from any web interface, thanks to
          <a href="https://framagit.org/aloes/virtual-objects" target="_blank">virtual-objects</a>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script type="text/javascript">
import logger from "@/services/logger";
import * as SensorSnap from "sensor-snap";

export default {
  name: "Presentation",

  components: {
    "device-card": () => import("@/components/Aloes/DeviceCard.vue"),
    "device-tree": () => import("@/components/Aloes/DeviceTree.vue"),
    "object-composition": () => import("@/components/Aloes/ObjectComposition.vue"),
    ...SensorSnap.components,
  },

  data() {
    return {
      deviceTreeLoaded: true,
      deviceTwinSelected: false,
      svgSettings: {
        width: 500,
        height: 400,
      },
      device: null,
      sensor: null,
      vueElem: false,
      randomPics: [
        "/icons/aloes/dither.png",
        "/icons/aloes/camera.png",
        "/icons/aloes/electrons.png",
        "/icons/aloes/clock.png",
        "/icons/aloes/pattern.png",
        "/icons/aloes/arduino.png",
      ],
    };
  },

  mounted() {
    this.deviceTwinSelected = false;
    this.sensor = null;
    this.device = null;
    this.vueElem = true;
    //  this.measurementTest();
  },

  beforeDestroy() {
    this.sensor = null;
    this.device = null;
    this.deviceTwinSelected = false;
  },

  computed: {},

  methods: {
    async onUpdateSensor(sensor) {
      logger.publish(4, "home", "onUpdateSensor:req", sensor);
      this.sensor = sensor;
      if (sensor.type === 3349) {
        const buffer = await this.cameraTest();
        return this.$refs[`sensorSnap-${this.sensor.id}`].sendCommand("getImage", new Blob([buffer]));
        //  const sensor = JSON.parse(JSON.stringify(this.sensor));
        //  console.log("oldSensor", sensor.resources["5910"]);
        // sensor.value = Buffer.from(buffer);
        // sensor.resources["5910"] = Buffer.from(buffer);
        // this.sensor = sensor;
        //console.log("newSensor", this.sensor.resources["5910"]);
      }
      // if (sensor.type === 3306) {
      //   return this.measurementTest();
      // }
      //   if (this.$refs[`sensorSnap-${this.sensor.id}`].componentsType === "gauge") {
      //   this.measurementTest();
      // }
    },

    onDeleteSensor(sensor) {
      logger.publish(4, "device", "onDeleteSensor:req", sensor);
      //  this.$store.dispatch("device/delSensor", sensor.id)
    },

    onNodeSelected(node) {
      logger.publish(4, "device", "onNodeSelected:req", node.data);
    },

    onNodeDeselected() {
      logger.publish(4, "device", "onNodeDeselected:req");
    },

    onNodeClicked(node) {
      //  const node = node.detail[0];
      if (node.data && node.data.resources && this.sensor === null) {
        this.device = null;
        this.sensor = {...node.data};
      } else if (node.data && node.data.resources) {
        this.sensor = null;
        this.device = null;
      }
      if (node.data && node.data.qrCode && this.device === null) {
        this.device = {...node.data};
        this.sensor = null;
      } else if (node.data && node.data.qrCode) {
        this.device = null;
        this.sensor = null;
      }
    },

    measurementTest() {
      setInterval(() => {
        const resource = this.sensor.resource.toString();
        const sensor = JSON.parse(JSON.stringify(this.sensor));
        console.log("oldSensor", sensor.resources[resource]);
        sensor.value = this.sensor.resources[resource] + Math.floor(Math.random() + 10);
        sensor.resources[resource] = sensor.value;
        this.sensor = sensor;
        console.log("newSensor", this.sensor.resources[resource]);
      }, 1000);
    },

    async cameraTest() {
      const randomPic = this.randomPics[Math.floor(Math.random() * this.randomPics.length)];
      const buffer = await fetch(`${randomPic}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
          }
          return response.arrayBuffer();
        })
        .then((buffer) => Buffer.from(buffer));
      return buffer;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/aloes-presentation.scss";
</style>
