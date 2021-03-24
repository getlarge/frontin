<template>
  <draggable
    v-model="widgetsClone"
    group="sliders"
    :move="checkMove"
    tag="div"
    class="dragArea"
    @start="startDrag"
    @end="endDrag"
    @change="onChange"
  >
    <transition-group name="audio-sliders">
      <audio-slider
        v-for="element in widgetsClone"
        :class="{
          target: element === targetElement,
          ok: canDrag,
          ko: !canDrag,
        }"
        :key="element.id"
        :id="element.id"
        :icon="element.iconFile"
        :sources="element.audioSource"
        :draggable="true"
        :loop="true"
        :colors-set="colorSet"
        @update:slider="(value) => onSliderUpdated(element.id, value)"
      />
    </transition-group>
  </draggable>
</template>

<script>
export default {
  props: {
    widgets: {
      type: Array,
      required: true,
      default: () => [
        {
          id: 0,
          name: 'café',
          audioSource: [`/sounds/cafe.mp3`],
          iconFile: `/icons/koffee.png`,
        },
      ],
    },
    colorSet: {
      type: Array,
      required: false,
      default: () => [
        {
          color1: '#528fa2',
          color2: '#2bb673',
        },
      ],
    },
  },

  data() {
    return {
      widgetsClone: [],
      audioSource: [],
      iconFile: '',
      duration: 7000,
      dragging: false,
      targetElement: null,
      canDrag: null,
      futureIndex: null,
      maxItemsCount: 5,
    };
  },

  components: {
    draggable: () => import('vuedraggable'),
    audioSlider: () => import('@/components/Ambience/AudioSlider'),
  },

  computed: {},

  created() {
    this.widgetsClone = JSON.parse(JSON.stringify(this.$props.widgets));
  },

  methods: {
    onSliderUpdated(elementId, value) {
      this.$emit('update:slider', elementId, value);
    },

    privateCheckMove(evt) {
      this.targetElement = evt.relatedContext.element;
      if (evt.relatedContext.list.length === this.maxItemsCount) {
        return false;
      }
      return true;
    },

    checkMove(evt) {
      this.canDrag = this.privateCheckMove(evt);
      this.futureIndex = evt.draggedContext.futureIndex;
      return this.canDrag;
    },

    endDrag() {
      this.canDrag = null;
      this.targetElement = null;
      this.futureIndex = null;
    },

    startDrag() {
      //console.log(evt)
    },

    onChange() {
      this.$emit('update:widgets', this.widgetsClone);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/ambienz.scss';
</style>
