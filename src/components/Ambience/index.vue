<template >
  <b-container ref="slider-master" id="ambience" fluid class="bv-example-row">
    <b-row >
      <b-col 
        class="colzy" 
        id="control-col" 
        cols="6"
        sm="3" 
        md="3" 
        lg="3" >
        <div 
          v-for="(item,index) in format"
          :key="index"
          id="edit-container">
          <file-uploader :mimetype="item" />
        </div>
        <button 
          class="create-button" 
          @click="addItem">
          <font-awesome-icon icon="plus-circle" size="3x" /> 
          Create a new widget
        </button>
        <!-- <div v-if="$refs.fileUploader.isSuccess">
        </div> -->
        <div v-if="as0.length > 0" >
          <draggable  
            :list="as0"
            :options="{group:'sliders'}" 
            :move="checkMove"
            tag="div" 
            class="dragArea" 
            @end="endDrag" 
            @start="startDrag">
            <audio-slider 
              v-for="(element) in as0" 
              :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" 
              :key="element.id" 
              :icon="element.iconFile" 
              :sources="element.audioSource" 
              :loop="true" 
              :draggable="true" />
          </draggable>
        </div>
        <div v-else>
            <p></p>
        </div>
      </b-col>
      <b-col 
        class="colzy" 
        cols="6"
        sm="3" 
        md="3" 
        lg="3" >
        <draggable 
          :list="as1" 
          :options="{group:'sliders'}"  
          :move="checkMove" @end="endDrag" 
          tag="div" 
          class="dragArea" 
          @start="startDrag">
          <audio-slider 
            v-for="(element) in as1"  
            :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}"  
            :key="element.id" 
            :icon="element.iconFile" 
            :sources="element.audioSource" 
            :draggable="true" 
            :loop="true" />
        </draggable>
      </b-col>
      <b-col 
        class="colzy" 
        sm="3" 
        md="3" 
        lg="3" >
        <draggable 
          :list="as2" 
          :options="{group:'sliders'}"  
          :move="checkMove"
          tag="div" 
          class="dragArea" 
          @end="endDrag" 
          @start="startDrag">
          <audio-slider  
            v-for="(element) in as2" 
            :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" 
            :key="element.id" 
            :icon="element.iconFile" 
            :sources="element.audioSource" 
            :loop="true" 
            :draggable="true" />
        </draggable>
      </b-col>
      <b-col 
        class="colzy" 
        cols="6"
        sm="3" 
        md="3" 
        lg="3">
        <draggable  
          :list="as3" 
          tag="div" 
          class="dragArea" 
          :options="{group:'sliders'}"  
          :move="checkMove" 
          @end="endDrag" 
          @start="startDrag">
          <audio-slider  
            v-for="(element) in as3" 
            :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" 
            :key="element.id" 
            :icon="element.iconFile" 
            :sources="element.audioSource" 
            :loop="true" 
            :draggable="true" />
        </draggable>
        <button 
          class="log-button" 
          @click="getBuffer">
          <font-awesome-icon icon="info-circle" size="lg" /> 
          Logger
        </button>
      </b-col>
    </b-row>
      <!-- <div class="status">
          <p v-if="canDrag!=null"  :class="canDrag? 'ok' : 'ko'">
              can Drag: {{canDrag}} future index {{futureIndex}}
          </p>
          <small v-else>
              No drag operation
          </small>
      </div> -->
  </b-container>

</template>

<script>
/// todo : add params in the url to share custom boards
// todo : image resizing and cropping after upload ( 300 x 300px square )
import { mapState } from "vuex";
import { rgb } from "d3-color";
import { interpolateHclLong } from "d3-interpolate";
import { select } from "d3-selection";
import draggable from "vuedraggable";
import { EventBus } from "@/main";
import audioSlider from "./AudioSlider";
import fileUploader from "./FileUploader";

export default {
  data() {
    return {
      format: ["audio", "image"],
      audioSource: [],
      iconFile: "",
      //counter: 0,
      model: {
        id: null,
        name: "null",
        audioSource: ["null"],
        iconFile: "null"
      },
      colorSet: [
        {
          color1: "#01c669",
          color2: "#ff830f" //"#48725e"
        }
      ],
      duration: 7000,
      dragging: false,
      targetElement: null,
      canDrag: null,
      futureIndex: null,
      sliderValue: 0
    };
  },

  components: {
    draggable,
    audioSlider,
    fileUploader
  },

  created() {},

  mounted() {
    EventBus.$on("start:tutorial", () => {
      EventBus.$emit(
        "update:tutorial",
        "Tutorial",
        this.tutorialText,
        this.tutorialTags,
        this.tutorialImg
      );
    });
    EventBus.$on("start:audio-slider", (id, value) => {
      //this.store.push()
      if (value > this.sliderValue) {
        this.sliderValue = this.sliderValue + 0.1;
      }
      if (value < this.sliderValue) {
        this.sliderValue = this.sliderValue - 0.1;
      }
      EventBus.$emit("update:audio-slider", this.sliderValue);
      return this.toggleBG(id, this.sliderValue);
    });
    EventBus.$on("file-uploader", (format, uploadedFile) => {
      if (format === "audio") {
        //this.$store.state
        return (this.audioSource[0] = uploadedFile[0].url);
      }
      if (format === "image") {
        return (this.iconFile = uploadedFile[0].url);
      }
    });
    this.color = interpolateHclLong(
      rgb(this.colorSet[0].color1),
      rgb(this.colorSet[0].color2)
    );
  },

  updated() {
    //this.update();
  },

  beforeDestroy() {
    EventBus.$off("start:audio-slider");
    EventBus.$off("file-uploader");
    EventBus.$off("start:tutorial");
    EventBus.$emit("stop:tutorial");
  },

  computed: {
    ...mapState({
      as0: state => state.ambience.as0,
      as1: state => state.ambience.as1,
      as2: state => state.ambience.as2,
      as3: state => state.ambience.as3,
      counter: state => state.ambience.counter,
      tutorialText: state => state.ambience.tutorial.text,
      tutorialTags: state => state.ambience.tutorial.tags,
      tutorialImg: state => state.ambience.tutorial.img
    })
  },

  methods: {
    toggleBG(id, value) {
      //this.globalValues = globalValues+ ou - values;
      // attribuer une palette de couleurs par composants
      select("#control-col")
        .style("opacity", "0.4")
        .style("background-color", this.color(value));
    },

    privateCheckMove(evt) {
      this.targetElement = evt.relatedContext.element;
      if (evt.relatedContext.list.length === 5) {
        return false;
      }
      return true;
    },

    checkMove(evt) {
      var res = this.privateCheckMove(evt);
      this.canDrag = res;
      this.futureIndex = evt.draggedContext.futureIndex;
      return res;
    },

    endDrag() {
      this.canDrag = null;
      this.targetElement = null;
      this.futureIndex = null;
    },

    startDrag(evt) {
      //console.log(evt)
    },

    addItem() {
      if (this.as0.length === 0) {
        this.$store.commit("ambience/updateASCounter", 1);
        var obj = Object.assign({}, this.model);
        obj.id = 9 + this.counter;
        obj.name = "customWidget-" + this.counter;
        obj.audioSource = this.audioSource;
        obj.iconFile = this.iconFile;
        return this.$store.commit("ambience/updateAS0", obj);
      }
    },

    getBuffer() {
      // console.log("as0", this.as0);
      // console.log("as1", this.as1);
      // console.log("as2", this.as2);
      // console.log("as3", this.as3);
      // console.log("model", this.model);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/ambienz.scss";
</style>
