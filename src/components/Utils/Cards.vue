<template>
  <div id="cards">
    <mq-layout class="cards-mobile" mq="mobile">
      <div v-if="dragBoxWidth >= dragBoxHeight * 1.3" class="">
        <vue-draggable-resizable
          id="tooltipContainer"
          :x="dragBoxX"
          :y="dragBoxY / 1.6"
          :w="dragBoxWidth * 1.2"
          :h="dragBoxHeight * 1.15"
          :drag-handle="'.drag-button'"
          resizable
          @dragging="onDrag"
          @deactivated="closeCard"
          @resizing="onResize"
        >
          <div id="tooltip">
            <b-container>
              <a :href="link" target="_blank" class="title">
                {{ title }}
              </a>
              <button class="drag-button">
                <font-awesome-icon icon="arrows-alt" size="xs" />
              </button>
              <button class="close-button" v-hammer:tap="closeCard">
                <font-awesome-icon icon="times" size="xs" />
              </button>
              <b-row>
                <b-col cols="6" sm="6">
                  <div v-if="dragBoxWidth > dragBoxHeight * 2.2">
                    <div class="description">{{ description }}</div>
                  </div>
                  <div v-else>
                    <div class="description">{{ description }}</div>
                  </div>
                </b-col>
                <b-col cols="6" sm="6">
                  <a
                    v-if="dragBoxWidth > dragBoxHeight * 1.5"
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank"
                  >
                    <img
                      :width="dragBoxWidth / 2"
                      :height="dragBoxY / 1.5"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"
                    />
                  </a>
                  <a
                    v-else
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank"
                  >
                    <img
                      :src="`${$store.state.clientUrl}${img}`"
                      :width="dragBoxWidth / 2.5"
                      :height="dragBoxY / 1.5"
                      class="pics"
                    />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
      <div v-else>
        <vue-draggable-resizable
          id="tooltipContainer"
          :x="dragBoxX / 1.2"
          :y="dragBoxY / 4"
          :w="dragBoxWidth * 1.8"
          :h="dragBoxHeight * 0.6"
          :drag-handle="'.drag-button'"
          resizable
          @dragging="onDrag"
          @deactivated="closeCard"
          @resizing="onResize"
        >
          <div id="tooltip">
            <b-container>
              <a :href="link" target="_blank" class="title">
                {{ title }}
              </a>
              <button class="drag-button">
                <font-awesome-icon icon="arrows-alt" size="xs" />
              </button>
              <button class="close-button" v-hammer:tap="closeCard">
                <font-awesome-icon icon="times" size="xs" />
              </button>
              <b-row>
                <b-col cols="6" sm="6">
                  <div class="description">{{ description }}</div>
                </b-col>
                <b-col cols="6" sm="6">
                  <a :href="`${$store.state.clientUrl}${img}`" target="_blank">
                    <img
                      :width="dragBoxWidth / 2"
                      :height="dragBoxY / 3"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"
                    />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
    </mq-layout>

    <mq-layout class="cards-tablet" mq="tablet">
      <div v-if="dragBoxWidth >= dragBoxHeight * 1.1" class="">
        <vue-draggable-resizable
          id="tooltipContainer"
          :x="dragBoxX"
          :y="dragBoxY / 2.2"
          :w="dragBoxWidth * 1.4"
          :h="dragBoxHeight * 1.15"
          :drag-handle="'.drag-button'"
          resizable
          @dragging="onDrag"
          @deactivated="closeCard"
          @resizing="onResize"
        >
          <div id="tooltip">
            <b-container>
              <a :href="link" target="_blank" class="title">
                {{ title }}
              </a>
              <button class="drag-button">
                <font-awesome-icon icon="arrows-alt" size="sm" />
              </button>
              <button class="close-button" v-hammer:tap="closeCard">
                <font-awesome-icon icon="times" size="sm" />
              </button>
              <b-row>
                <b-col sm="5" md="5">
                  <div class="description">{{ description }}</div>
                </b-col>
                <b-col sm="7" md="7">
                  <a :href="`${$store.state.clientUrl}${img}`" target="_blank">
                    <img
                      :width="dragBoxWidth / 2"
                      :height="dragBoxY / 1.5"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"
                    />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
      <div v-else>
        <vue-draggable-resizable
          id="tooltipContainer"
          :x="dragBoxX / 1.2"
          :y="dragBoxY / 4"
          :w="dragBoxWidth"
          :h="dragBoxHeight * 0.8"
          :drag-handle="'.drag-button'"
          resizable
          @dragging="onDrag"
          @deactivated="closeCard"
          @resizing="onResize"
        >
          <div id="tooltip">
            <b-container>
              <a :href="link" target="_blank" class="title">
                {{ title }}
              </a>
              <button class="drag-button">
                <font-awesome-icon icon="arrows-alt" size="sm" />
              </button>
              <button class="close-button" v-hammer:tap="closeCard">
                <font-awesome-icon icon="times" size="sm" />
              </button>
              <b-row>
                <b-col sm="5" md="5">
                  <div class="description">{{ description }}</div>
                </b-col>
                <b-col sm="7" md="7">
                  <a :href="`${$store.state.clientUrl}${img}`" target="_blank">
                    <img
                      :width="dragBoxWidth / 2"
                      :height="dragBoxY / 3"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"
                    />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
    </mq-layout>

    <mq-layout class="cards-laptop" mq="laptop">
      <div v-if="dragBoxWidth >= dragBoxHeight * 1.1">
        <vue-draggable-resizable
          id="tooltipContainer"
          :x="dragBoxX"
          :y="dragBoxY / 3"
          :w="dragBoxWidth"
          :h="dragBoxHeight"
          :drag-handle="'.drag-button'"
          :maximize="true"
          resizable
          @dragging="onDrag"
          @resizing="onResize"
        >
          <div id="tooltip">
            <b-container fluid class="bv-example-row">
              <a :href="link" target="_blank" class="title">
                {{ title }}
              </a>
              <button class="drag-button">
                <font-awesome-icon icon="arrows-alt" size="sm" />
              </button>
              <button
                class="close-button"
                @click="closeCard"
                v-hammer:tap="closeCard"
              >
                <font-awesome-icon icon="times" size="sm" />
              </button>
              <b-row>
                <b-col md="5" lg="5">
                  <div class="description">{{ description }}</div>
                  <div class="tags">{{ tags }}</div>
                </b-col>
                <b-col md="7" lg="7">
                  <a :href="`${$store.state.clientUrl}${img}`" target="_blank">
                    <img
                      :width="dragBoxWidth / 2"
                      :height="dragBoxY / 1.5"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"
                    />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
      <div v-else>
        <vue-draggable-resizable
          id="tooltipContainer"
          :x="dragBoxX / 1.2"
          :y="dragBoxY / 5"
          :w="dragBoxWidth"
          :h="dragBoxHeight * 0.5"
          :drag-handle="'.drag-button'"
          :maximize="true"
          :resizable="true"
          @dragging="onDrag"
          @resizing="onResize"
        >
          <div id="tooltip">
            <b-container>
              <a :href="link" target="_blank" class="title">
                {{ title }}
              </a>
              <button class="drag-button">
                <font-awesome-icon icon="arrows-alt" size="sm" />
              </button>
              <button class="close-button" @click="closeCard">
                <font-awesome-icon icon="times" size="sm" />
              </button>
              <b-row>
                <b-col sm="5">
                  <div class="description">{{ description }}</div>
                  <div class="tags">{{ tags }}</div>
                </b-col>
                <b-col sm="7">
                  <a :href="`${$store.state.clientUrl}${img}`" target="_blank">
                    <img
                      :width="dragBoxWidth / 2"
                      :height="dragBoxY / 3"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"
                    />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
    </mq-layout>

    <mq-layout class="cards-desktop" mq="desktop">
      <vue-draggable-resizable
        id="tooltipContainer"
        :x="dragBoxX"
        :y="dragBoxY / 4"
        :minw="width / 2.2"
        :minh="height / 2.2"
        :drag-handle="'.drag-button'"
        resizable
        @dragging="onDrag"
        :handles="['tr']"
        @resizing="onResize"
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
              <b-col lg="5">
                <div class="description">{{ description }}</div>
                <div class="tags">{{ tags }}</div>
              </b-col>
              <b-col lg="7">
                <a :href="`${$store.state.clientUrl}${img}`" target="_blank">
                  <img
                    :width="dragBoxWidth / 2"
                    :height="dragBoxY / 1.5"
                    :src="`${$store.state.clientUrl}${img}`"
                    class="pics"
                  />
                </a>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </vue-draggable-resizable>
    </mq-layout>

    <mq-layout class="cards-xxl" mq="xxl">
      <vue-draggable-resizable
        id="tooltipContainer"
        :x="dragBoxX"
        :y="dragBoxY / 4"
        :minw="width / 2.2"
        :minh="height / 2.2"
        :drag-handle="'.drag-button'"
        resizable
        :handles="['tr']"
        @dragging="onDrag"
        @resizing="onResize"
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
              <b-col xl="5">
                <div class="description">{{ description }}</div>
                <div class="tags">{{ tags }}</div>
              </b-col>
              <b-col xl="7">
                <a :href="`${$store.state.clientUrl}${img}`" target="_blank">
                  <img
                    :width="dragBoxWidth / 2"
                    :height="dragBoxY / 1.5"
                    :src="`${$store.state.clientUrl}${img}`"
                    class="pics"
                  />
                </a>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </vue-draggable-resizable>
    </mq-layout>
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
    select(this).remove();
    select(window).on("resize", this.updateSettings());
  },

  beforeDestroy() {
    select(this).remove();
  },

  methods: {
    updateSettings() {
      this.dragBoxX = Math.max(this.documentWidth, this.windowWidth || 0) / 2;
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
