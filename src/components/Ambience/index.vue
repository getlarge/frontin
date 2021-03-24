<template>
  <b-container ref="slider-master" id="ambience" fluid class="bv-example-row">
    <b-row>
      <b-col class="colzy" id="control-col" ref="controlCol" cols="6" sm="3" md="3" lg="3">
        <div v-for="(item, index) in format" :key="index" class="edit-container">
          <file-uploader :resourceType="item" />
        </div>
        <button class="create-button" @click="addItem">
          <font-awesome-icon icon="plus-circle" size="3x" />
          Create a new widget
        </button>
        <!-- <div v-if="$refs.fileUploader.isSuccess">
        </div> -->
        <div v-if="as0.length > 0">
          <column :widgets.sync="as0" :color-set="colorSet" @update:slider="onSliderUpdated"> </column>
        </div>
        <div v-else>
          <p></p>
        </div>
      </b-col>

      <b-col class="colzy" cols="6" sm="3" md="3" lg="3">
        <column :widgets.sync="as1" :color-set="colorSet" @update:slider="onSliderUpdated" />
      </b-col>
      <b-col class="colzy" cols="6" sm="3" md="3" lg="3">
        <column :widgets.sync="as2" :color-set="colorSet" @update:slider="onSliderUpdated" />
      </b-col>
      <b-col class="colzy" cols="6" sm="3" md="3" lg="3">
        <column :widgets.sync="as3" :color-set="colorSet" @update:slider="onSliderUpdated" />

        <button class="log-button" @click="getBuffer">
          <font-awesome-icon icon="info-circle" size="lg" />
          Logger
        </button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/// todo : add params in the url to share custom boards
// todo : image resizing and cropping after upload ( 300 x 300px square )
import { rgb } from 'd3-color';
import { interpolateHclLong } from 'd3-interpolate';
import EventBus from '@/services/EventBus';

export default {
  data() {
    return {
      format: ['Audios', 'Images'],
      audioSource: [],
      iconFile: '',
      model: {
        id: null,
        name: 'null',
        audioSource: ['null'],
        iconFile: 'null',
      },
      colorSet: [
        {
          color1: '#528fa2',
          color2: '#2bb673',
        },
      ],
      sliderValue: 0,
    };
  },

  components: {
    column: () => import('@/components/Ambience/Column.vue'),
    fileUploader: () => import('@/components/Ambience/FileUploader.vue'),
  },

  computed: {
    as0: {
      get() {
        return this.$store.state.ambience.as0;
      },
      set(value) {
        this.$store.state.ambience.as0 = value;
      },
    },
    as1: {
      get() {
        return this.$store.state.ambience.as1;
      },
      set(value) {
        this.$store.state.ambience.as1 = value;
      },
    },
    as2: {
      get() {
        return this.$store.state.ambience.as2;
      },
      set(value) {
        this.$store.state.ambience.as2 = value;
      },
    },
    as3: {
      get() {
        return this.$store.state.ambience.as3;
      },
      set(value) {
        this.$store.state.ambience.as3 = value;
      },
    },
    tutorialText() {
      return this.$store.state.ambience.tutorial.text;
    },
    tutorialTags() {
      return this.$store.state.ambience.tutorial.tags;
    },
    tutorialImg() {
      return this.$store.state.ambience.tutorial.img;
    },
  },

  mounted() {
    this.setListeners();
    this.color = interpolateHclLong(rgb(this.colorSet[0].color1), rgb(this.colorSet[0].color2));
  },

  updated() {
    //this.update();
  },

  beforeDestroy() {
    EventBus.$off('start:audio-slider');
    EventBus.$off('file-uploader');
    EventBus.$off('start:tutorial');
    EventBus.$emit('stop:tutorial');
  },

  methods: {
    setListeners() {
      EventBus.$on('start:tutorial', () => {
        EventBus.$emit('update:tutorial', 'Tutorial', this.tutorialText, this.tutorialTags, this.tutorialImg);
      });

      EventBus.$on('file-uploader', (format, uploadedFile) => {
        if (format === 'audio') {
          //this.$store.state
          this.audioSource[0] = uploadedFile[0].url;
        } else if (format === 'image') {
          this.iconFile = uploadedFile[0].url;
        }
      });
    },

    onSliderUpdated(elementId, value) {
      // this.$refs.controlCol.style.opacity = 0.4;
      this.$refs.controlCol.style.backgroundColor = this.color(elementId * value);
    },

    addItem() {
      if (this.as0.length === 0) {
        this.$store.commit('ambience/updateASCounter', 1);
        const obj = Object.assign({}, this.model);
        obj.id = 9 + this.counter;
        obj.name = 'customWidget-' + this.counter;
        obj.audioSource = this.audioSource;
        obj.iconFile = this.iconFile;
        return this.$store.commit('ambience/updateAS0', obj);
      }
    },

    getBuffer() {
      // console.log("as0", this.as0);
      // console.log("as1", this.as1);
      // console.log("as2", this.as2);
      // console.log("as3", this.as3);
      // console.log("model", this.model);
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/ambienz.scss';
</style>
