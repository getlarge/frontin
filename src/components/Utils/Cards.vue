<template>
  <div id="cards">
    <vue-draggable-resizable
      id="tooltipContainer"
      :x="dragBoxX"
      :y="dragBoxY / 4"
      :min-width="dragBoxWidth"
      :min-height="dragBoxHeight"
      :drag-handle="'.drag-button'"
      :handles="['tr']"
      :resizable="false"
      @dragging="onDrag"
    >
      <div id="tooltip">
        <b-container fluid>
          <a :href="link" target="_blank" class="title">
            {{ title }}
          </a>
          <button class="drag-button">
            <font-awesome-icon icon="arrows-alt" size="lg" />
          </button>
          <button class="close-button" @click="closeCard">
            <font-awesome-icon icon="times" size="lg" />
          </button>
          <b-row>
            <b-col cols="7" sm="7" md="6" lg="5" xl="5">
              <div class="description">{{ description }}</div>
              <div class="tags">{{ tags }}</div>
            </b-col>
            <b-col cols="5" sm="5" md="6" lg="7" xl="7">
              <a :href="`${img}`" target="_blank">
                <img
                  :width="dragBoxWidth / 3"
                  :height="dragBoxHeight / 1.5"
                  :src="`${img}`"
                  class="pics"
                />
              </a>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import { select } from "d3-selection";
import { EventBus } from "@/services/PubSub";

export default {
  name: "Cards",

  components: {
    VueDraggableResizable
  },

  props: ["title", "description", "img", "tags", "link", "X", "Y"],

  data() {
    return {
      width: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      ),
      height: Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      x: 0,
      y: 0,
      dragX: 0,
      dragY: 0,
      dragWidth: 0,
      dragHeight: 0
    };
  },

  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    windowHeight() {
      return this.$store.state.windowHeight;
    },
    documentWidth() {
      return this.$store.state.documentWidth;
    },
    documentHeight() {
      return this.$store.state.documentHeight;
    },
    dragBoxX: {
      get() {
        if (this.dragX) {
          return this.dragX;
        }
        return this.width / 20;
      },
      set(value) {
        this.dragX = value;
      }
    },
    dragBoxY: {
      get() {
        if (this.dragY) {
          return this.dragY;
        }
        return this.height / 2;
      },
      set(value) {
        this.dragY = value;
      }
    },
    dragBoxWidth: {
      get() {
        if (this.dragWidth) {
          return this.dragWidth;
        }
        return this.width / 2;
      },
      set(value) {
        this.dragWidth = value;
      }
    },
    dragBoxHeight: {
      get() {
        if (this.dragHeight) {
          return this.dragHeight;
        }
        return this.height / 2.2;
      },
      set(value) {
        this.dragHeight = value;
      }
    }
  },

  mounted() {
    //  select(this).remove();
    select(window).on("resize", this.updateSettings());
  },

  beforeDestroy() {
    select(this).remove();
  },

  methods: {
    updateSettings() {
      this.dragBoxX = Math.max(this.documentWidth, this.windowWidth || 0) / 20;
      this.dragBoxY = Math.max(this.documentHeight, this.windowHeight || 0) / 2;
      this.dragBoxHeight =
        Math.max(this.documentHeight, this.windowHeight || 0) / 2.2;
      this.dragBoxWidth =
        Math.max(this.documentWidth, this.windowWidth || 0) / 2;
    },

    onResize(x, y, width, height) {
      this.dragBoxX = x;
      this.dragBoxY = y;
      this.dragBoxHeight = height;
      this.dragBoxWidth = width;
      // this.x = x;
      // this.y = y;
      // this.width = width;
      // this.height = height;
    },

    onDrag(x, y) {
      this.dragBoxX = x;
      this.dragBoxY = y;
    },

    closeCard() {
      //console.log("remove-card");
      select(this).remove();
      //document.getElementById("cards").outerHTML = "";
      EventBus.$emit("stop:cards");
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/cards.scss";
</style>
