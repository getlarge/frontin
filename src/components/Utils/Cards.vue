<template>
  <div id="cards" >  
    <mq-layout 
      class="cards-mobile" 
      mq="mobile">
      <div 
        v-if="settings.dragBoxWidth >= (settings.dragBoxHeight*1.3)" 
        class="">
        <vue-draggable-resizable 
          id="tooltipContainer" 
          :x="settings.dragBoxX" 
          :y="settings.dragBoxY / 1.6" 
          :w="settings.dragBoxWidth * 1.2" 
          :h="settings.dragBoxHeight * 1.15" 
          :drag-handle="'.drag-button'" 
          :resizable="false"
          @dragging="onDrag" 
          @deactivated="closeCard" 
          @resizing="onResize" >
          <div id="tooltip">
            <b-container  >
              <!-- <div class="title">{{ title }}</div> -->
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
              <button 
                class="drag-button"> 
                <font-awesome-icon 
                  icon="arrows-alt" 
                  size="xs" /> 
              </button>
              <button 
                class="close-button" 
                v-hammer:tap="closeCard"> 
                <font-awesome-icon 
                  icon="times" 
                  size="xs"/>
              </button>
              <b-row >
                <b-col 
                cols="6"
                sm="6">
                  <div v-if="settings.dragBoxWidth > settings.dragBoxHeight * 2.2">
                    <div class="description">{{ description }}</div>
                  </div>
                  <div v-else>
                    <div class="description">{{ description }}</div>
                  </div>
                </b-col>
                <b-col 
                  cols="6"
                  sm="6">
                  <a 
                    v-if="settings.dragBoxWidth > settings.dragBoxHeight * 1.5"  
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank">
                    <b-img 
                      :width="settings.dragBoxWidth / 2" 
                      :height="settings.dragBoxY / 1.5"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"/>
                  </a>
                  <a 
                    v-else 
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank">
                    <b-img 
                      :src="`${$store.state.clientUrl}${img}`"
                      :width="settings.dragBoxWidth/2.5" 
                      :height="settings.dragBoxY/1.5"
                      class="pics"/>
                    </a>
                </b-col>  
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
      <div v-else >
        <vue-draggable-resizable  
          id="tooltipContainer" 
          :x="settings.dragBoxX / 1.2" 
          :y="settings.dragBoxY/4"  
          :w="settings.dragBoxWidth*1.8"
          :h="settings.dragBoxHeight*0.6" 
          :drag-handle="'.drag-button'" 
          :resizable="false"
          @dragging="onDrag" 
          @deactivated="closeCard"  
          @resizing="onResize">
          <div id="tooltip">
            <b-container >
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
              <!-- <div class="title">{{title}}</div> -->
              <button class="drag-button"> 
                <font-awesome-icon 
                  icon="arrows-alt" 
                  size="xs" /> 
              </button>
              <button 
                class="close-button" 
                v-hammer:tap="closeCard"> 
                <font-awesome-icon 
                  icon="times" 
                  size="xs"/>
              </button>
              <b-row >
                <b-col
                  cols="6" 
                  sm="6">
                    <div class="description">{{description}}</div>
                </b-col>
                <b-col 
                  cols="6"
                  sm="6">
                  <a 
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank">
                    <b-img 
                      :width="settings.dragBoxWidth / 2"
                      :height="settings.dragBoxY / 3"
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics"/>
                  </a>
                </b-col>  
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>    
      </div>
    </mq-layout>

    <mq-layout 
      class="cards-tablet" 
      mq="tablet">
      <div 
        v-if="settings.dragBoxWidth >= (settings.dragBoxHeight * 1.1)" 
        class="">
        <vue-draggable-resizable  
          id="tooltipContainer" 
          :x="settings.dragBoxX" 
          :y="settings.dragBoxY / 2.2"  
          :w="settings.dragBoxWidth * 1.4" 
          :h="settings.dragBoxHeight * 1.15" 
          :drag-handle="'.drag-button'" 
          :resizable="false"
          @dragging="onDrag" 
          @deactivated="closeCard"  
          @resizing="onResize" >
          <div id="tooltip">
            <b-container >
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
              <!-- <div class="title">{{title}}</div> -->
              <button class="drag-button"> 
                  <font-awesome-icon icon="arrows-alt" size="sm" /> 
              </button>
              <button 
                class="close-button" 
                v-hammer:tap="closeCard"> 
                <font-awesome-icon 
                  icon="times" 
                  size="sm"/>
              </button>
              <b-row >
                <b-col 
                  sm="5" 
                  md="5">
                  <div class="description">{{description}}</div>
                </b-col>
                <b-col 
                  sm="7"
                  md="7" >
                  <a 
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank">
                    <b-img
                      :width="settings.dragBoxWidth / 2" 
                      :height="settings.dragBoxY / 1.5" 
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics" />
                  </a>
                </b-col>  
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
      <div v-else >
        <vue-draggable-resizable 
          id="tooltipContainer" 
          :x="settings.dragBoxX / 1.2" 
          :y="settings.dragBoxY / 4"  
          :w="settings.dragBoxWidth" 
          :h="settings.dragBoxHeight * 0.8" 
          :drag-handle="'.drag-button'" 
          :resizable="false"
          @dragging="onDrag" 
          @deactivated="closeCard" 
          @resizing="onResize" >
          <div id="tooltip">
            <b-container >
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
              <!-- <div class="title">{{title}}</div> -->
              <button class="drag-button"> 
                  <font-awesome-icon icon="arrows-alt" size="sm" /> 
              </button>
              <button 
                class="close-button" 
                v-hammer:tap="closeCard"> 
                <font-awesome-icon 
                  icon="times" 
                  size="sm"/>
              </button>
              <b-row >
                <b-col 
                  sm="5"
                  md="5">
                    <div class="description">{{description}}</div>
                </b-col>
                <b-col 
                  sm="7"
                  md="7" >
                  <a 
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank">
                    <b-img 
                      :width="settings.dragBoxWidth / 2" 
                      :height="settings.dragBoxY / 3" 
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics" />
                  </a>
                </b-col>  
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>            
      </div>
    </mq-layout>

    <mq-layout 
      class="cards-laptop" 
      mq="laptop">
      <div 
        v-if="settings.dragBoxWidth >= (settings.dragBoxHeight * 1.1)">
        <vue-draggable-resizable  
          id="tooltipContainer" 
          :x="settings.dragBoxX" 
          :y="settings.dragBoxY / 3" 
          :w="settings.dragBoxWidth" 
          :h="settings.dragBoxHeight" 
          :drag-handle="'.drag-button'" 
          :maximize="true" 
          :resizable="false"
          @dragging="onDrag" 
          @resizing="onResize" >
          <div id="tooltip">
            <b-container fluid class="bv-example-row">
              <!-- <div class="title">{{title}}</div> -->
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
              <button class="drag-button" >
                  <font-awesome-icon icon="arrows-alt" size="sm" />
              </button>
              <button 
                class="close-button"
                @click="closeCard"
                v-hammer:tap="closeCard"> 
                <font-awesome-icon 
                  icon="times" 
                  size="sm"/>
              </button>
              <b-row >
                <b-col 
                md="5" 
                lg="5">
                  <div class="description">{{description}}</div>
                  <div class="tags">{{tags}}</div>
                </b-col>
                <b-col 
                  md="7" 
                  lg="7" >
                  <a 
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank">
                    <b-img 
                      :width="settings.dragBoxWidth / 2"
                      :height="settings.dragBoxY / 1.5" 
                      :src="`${$store.state.clientUrl}${img}`" 
                      class="pics" />
                  </a>
                </b-col>  
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>
      </div>
      <div v-else >
        <vue-draggable-resizable 
          id="tooltipContainer" 
          :x="settings.dragBoxX / 1.2" 
          :y="settings.dragBoxY / 5"
          :w="settings.dragBoxWidth" 
          :h="settings.dragBoxHeight * 0.5" 
          :drag-handle="'.drag-button'" 
          :maximize="true" 
          :resizable="false" 
          @dragging="onDrag" 
          @resizing="onResize">
          <div id="tooltip">
            <b-container >
              <!-- <div class="title">{{title}}</div> -->
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
              <button class="drag-button">
                  <font-awesome-icon icon="arrows-alt" size="sm" />
              </button>
              <button class="close-button" @click="closeCard">
                  <font-awesome-icon icon="times" size="sm" />
              </button>
              <b-row >
                <b-col sm="5" >
                  <div class="description">{{description}}</div>
                  <div class="tags">{{tags}}</div>
                </b-col>
                <b-col sm="7" >
                  <a 
                    :href="`${$store.state.clientUrl}${img}`"
                    target="_blank">
                    <b-img 
                      :width="settings.dragBoxWidth / 2" 
                      :height="settings.dragBoxY / 3" 
                      :src="`${$store.state.clientUrl}${img}`"
                      class="pics" />
                  </a>
                </b-col>  
              </b-row>
            </b-container>
          </div>
        </vue-draggable-resizable>            
        </div>
    </mq-layout>

    <mq-layout 
      class="cards-desktop" 
      mq="desktop">
       <vue-draggable-resizable 
        id="tooltipContainer" 
        :x="settings.dragBoxX" 
        :y="settings.dragBoxY / 4"  
        :minw="settings.dragBoxWidth" 
        :minh="settings.dragBoxHeight" 
        :drag-handle="'.drag-button'" 
        :resizable="false"
        @dragging="onDrag"  
        :handles="['tr']"
        @resizing="onResize">
        <div id="tooltip">
          <b-container  fluid >
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
            <!-- <div class="title">{{title}}</div>    -->           
            <button class="drag-button" > 
                <font-awesome-icon icon="arrows-alt" size="lg" /> 
            </button>
            <button class="close-button" @click="closeCard"> 
                <font-awesome-icon icon="times" size="lg" /> 
            </button>
            <b-row >
              <b-col lg="5" >
                <div class="description">{{description}}</div>
                <div class="tags">{{tags}}</div>                
              </b-col>
              <b-col lg="7" >
                <a 
                  :href="`${$store.state.clientUrl}${img}`"
                  target="_blank">
                  <b-img 
                    :width="settings.dragBoxWidth / 2"
                    :height="settings.dragBoxY / 1.5" 
                    :src="`${$store.state.clientUrl}${img}`" 
                    class="pics" />
                </a>
              </b-col>  
            </b-row>
          </b-container>
        </div>
      </vue-draggable-resizable>
    </mq-layout>

    <mq-layout 
      class="cards-xxl" 
      mq="xxl">
      <vue-draggable-resizable 
        id="tooltipContainer" 
        :x="settings.dragBoxX" 
        :y="settings.dragBoxY / 4" 
        :minw="settings.dragBoxWidth"
        :minh="settings.dragBoxHeight" 
        :drag-handle="'.drag-button'"
        :resizable="false"
        :handles="['tr']"
        @dragging="onDrag"  
        @resizing="onResize">
        <div id="tooltip">
          <b-container  fluid >
              <a
                :href="link"
                target="_blank"
                class="title">
                {{ title }}
              </a>
            <!-- <div class="title">{{title}}</div> -->
            <button class="drag-button" > 
                <font-awesome-icon icon="arrows-alt" size="lg" /> 
            </button>
            <button class="close-button" @click="closeCard"> 
                <font-awesome-icon icon="times" size="lg" /> 
            </button>
            <b-row >
              <b-col xl="5" >
                  <div class="description">{{description}}</div>
                  <div class="tags">{{tags}}</div>
              </b-col>
              <b-col xl="7" >
                <a 
                  :href="`${$store.state.clientUrl}${img}`"
                  target="_blank">
                  <b-img 
                    :width="settings.dragBoxWidth / 2" 
                    :height="settings.dragBoxY / 1.5" 
                    :src="`${$store.state.clientUrl}${img}`" 
                    class="pics" />
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
import {mapState} from "vuex";
import VueDraggableResizable from "vue-draggable-resizable";
import {select} from "d3-selection";
import {EventBus} from "@/main";

export default {
  name: "cards",
  props: ["title", "description", "img", "tags", "link", "X", "Y"],

  data() {
    return {
      settings: {
        dragBoxX: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 20,
        dragBoxY: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2,
        dragBoxHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2.2,
        dragBoxWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
      },
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  },

  components: {
    VueDraggableResizable,
  },

  mounted() {
    select(window).on("resize", this.updateSettings);
  },

  computed: {
    ...mapState({
      serverURL: (state) => state.base.serverURL,
    }),
  },

  methods: {
    onResize(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },

    onDrag(x, y) {
      this.x = x;
      this.y = y;
    },

    updateSettings() {
      this.settings = {
        dragBoxX: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 20,
        dragBoxY: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2,
        dragBoxHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2.2,
        dragBoxWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
      };
    },

    closeCard() {
      //console.log("remove-card");
      select(this).remove();
      EventBus.$emit("stop:cards");
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/cards.scss";
</style>
