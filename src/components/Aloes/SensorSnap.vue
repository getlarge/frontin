<template lang="html">
  <div class="aloes-sensor-snap">
    <!-- template based on sensorstype list ? -->
    <svg
      height="160"
      width="150"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="sensor">
      <text 
        transform="translate(75, 15)"
        text-anchor="middle"
        x="0"
        class="sensor-title"
        @click.prevent.stop="aSide = !aSide">
          {{ updatedName }}
      </text>
      <g 
        v-if="aSide"
        transform="translate(15,25)">
        <image
          x="0"
          y="0"
          transform="translate(30,25)"
          height="60"
          width="60"
          v-bind="{ 'xlink:href':iconsProps[0] }"
          class="sensor-icon"/>
        <text
          transform="translate(60, 110)"
          text-anchor="middle"
          x="0"
          class="sensor-value">
          {{ value }}
        </text>
        <circle
          cx="60"
          cy="60"
          r="60"
          class="sensor-button"
          @click.prevent.stop="updateSensor(sensor)"/>
      </g>
      <g
        v-else-if="!aSide"
        transform="translate(75, 15)">
        <text 
          text-anchor="middle"
          x="0"
          class="sensor-details">
          <tspan 
            x="0" 
            y="20"> 
            IPSO : {{ type }}
          </tspan>
           <tspan 
            x="0" 
            y="40"> 
            counter : {{ frameCounter }}
          </tspan>
          <tspan 
            x="0" 
            y="60"> 
          {{ protocolName }} {{ protocolVersion }}
          </tspan>
          <tspan 
            x="0" 
            y="80"> 
            routes :
          </tspan>
          <tspan 
            x="0" 
            y="95"> 
            {{ inputPath }}
          </tspan>
          <tspan 
            x="0" 
            y="110"> 
            {{ outputPath }}
          </tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "aloes-sensor-snap",

  props: {
    id: {
      type: String,
      required: true
    },
    "device-id": {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    resources: {
      type: String,
      required: true
    },
    icons: {
      type: String,
      required: false
    },
    colors: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    "frame-counter": {
      type: Number,
      required: false,
      default: 0
    },
    "dev-eui": {
      type: String,
      required: true
    },
    "protocol-name": {
      type: String,
      required: true,
      default: ""
    },
    "protocol-version": {
      type: String,
      required: false
    },
    "input-path": {
      type: String,
      required: true,
      default: ""
    },
    "output-path": {
      type: String,
      required: true,
      default: ""
    }
  },

  data() {
    return {
      updatedName: null,
      updatedType: null,
      updatedValue: null,
      aSide: true,
      styles: `div.aloes-sensor-snap {
  --primary-color: #528fa2;
  --secondary-color: #ededed;
  --success: ${this.colors.split(",")[0]};
  --warning: ${this.colors.split(",")[1]};
  --border-radius: 5px;
  --border: 1px solid transparent;
  --box-shadow: 0 1px 2px 0px #6e6e6e;
  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;
  text-align: center;
}
div.aloes-sensor-snap > svg.sensor {
  border-radius: var(--border-radius);
  border: var(--border);
  box-shadow: var(--box-shadow);
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  point-event: none;
}
div.aloes-sensor-snap > svg.sensor:hover {
  box-shadow: var(--box-shadow-selected);
}
div.aloes-sensor-snap > svg > text.sensor-title {
  fill: var(--primary-color);
  cursor: pointer;
  font-size: 100%;
  font-weight: 400;
}
div.aloes-sensor-snap > svg > g > circle.sensor-button {
  fill: transparent;
  stroke: var(--secondary-color);
  stroke-width: 3;
  cursor: pointer;
}
div.aloes-sensor-snap > svg > g > circle.sensor-button:hover {
  stroke: var(--primary-color);
  stroke-width: 4;
}
div.aloes-sensor-snap > svg > g > circle.sensor-button:active {
  stroke: var(--primary-color);
  stroke-width: 6;
}
div.aloes-sensor-snap > svg > g > text.sensor-value {
  font-size: 110%;
  font-weight: 600;
}
div.aloes-sensor-snap > svg > g > text.sensor-details {
  font-size: 80%;
  font-weight: 400;
}`
    };
  },

  computed: {
    iconsProps: {
      get() {
        return this.$props.icons.split(",");
      }
    },
    colorsProps: {
      get() {
        return this.$props.colors.split(",");
      }
    },
    resourcesProps: {
      get() {
        return JSON.parse(this.$props.resources);
      }
    },
    sensor() {
      return {
        id: this.$props.id,
        deviceId: this.$props.deviceId,
        name: this.$props.name,
        type: this.$props.type,
        resources: this.resourcesProps,
        icons: this.iconsProps,
        colors: this.colorsProps,
        value: this.$props.value,
        devEui: this.$props.devEui,
        frameCounter: this.$props.frameCounter,
        protocolName: this.$props.protocolName,
        protocolVersion: this.$props.protocolVersion,
        inputPath: this.$props.inputPath,
        outputPath: this.$props.outputPath
      };
    }
  },

  watch: {
    name: {
      handler(name) {
        this.updatedName = name;
      },
      immediate: true
    },
    type: {
      handler(type) {
        this.updatedType = type;
      },
      immediate: true
    },
    value: {
      handler(value) {
        this.updatedValue = value;
      },
      immediate: true
    }
  },

  created() {
    /* eslint-disable no-console */
    //  console.log("aloes-sensor created()", JSON.parse(JSON.stringify(this.resources)));
  },

  mounted() {
    const style = document.createElement("style");
    style.innerHTML = this.styles;
    this.$el.prepend(style);
  },

  updated() {
    /* eslint-disable no-console */
    //  console.log("aloes-sensor updated()", this.iconsProps);
  },

  methods: {
    sensorType() {
      const resourcesKeys = Object.getOwnPropertyNames(this.resources);
      if (resourcesKeys[0] === 5700) {
        return "immutable";
      } else if (resourcesKeys[0] === 5500) {
        return "switch";
      }
      return null;
    },

    onChangeCallback(...args) {
      this.$emit("change", ...args);
      // publish to corresponding sensor
    },

    updateSensor(...args) {
      this.$emit("update-sensor", ...args);
    },

    deleteSensor(...args) {
      this.$emit("delete-sensor", ...args);
    }
  }
};
</script>
