<template >

    <b-container ref="slider-master" id="ambience" fluid class="bv-example-row">
        <b-row >
            <b-col class="colzy" id="control-col" sm="3" md="3" lg="3" >
                <div id="edit-container" v-for="item in format">
                    <file-uploader :mimetype="item" > </file-uploader>
                </div>
                <button class="create-button" @click="addItem"><font-awesome-icon :icon="['fas', 'plus-circle']" size="3x" /> Create a new widget</button>
                <!-- <div v-if="$refs.fileUploader.isSuccess">
                </div> -->
                <div v-if="as0.length > 0" >
                    <draggable  :list="as0" tag="div" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
                        <audio-slider v-for="(element, index) in as0" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true"  ></audio-slider>
                    </draggable>
                </div>
                <div v-else>
                    <p></p>
                </div>
            </b-col>
            <b-col class="colzy" sm="3" md="3" lg="3" >
                 <draggable tag="div" :list="as1" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
                    <audio-slider v-for="(element, index) in as1"  :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}"  :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :draggable="true" :loop="true" ></audio-slider>
                </draggable>
            </b-col>
            <b-col class="colzy" sm="3" md="3" lg="3" >
                <draggable tag="div" :list="as2" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
                    <audio-slider  v-for="(element, index) in as2" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true" ></audio-slider>
                </draggable>
            </b-col>
            <b-col class="colzy" sm="3" md="3" lg="3" >
                <draggable  :list="as3" tag="div" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
                    <audio-slider  v-for="(element, index) in as3" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true"  ></audio-slider>
                </draggable>
                <button class="log-button" @click="getBuffer"><font-awesome-icon :icon="['fas', 'info-circle']" size="lg" /> Logger</button>
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
import { easeLinear } from "d3-ease";
import { interpolateHcl, interpolateHclLong } from "d3-interpolate";
import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale";
import { event, select, selectAll } from "d3-selection";
import { active, transition } from "d3-transition";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import draggable from "vuedraggable";
import { EventBus } from "@/main";
import audioSlider from "./audio-slider";
import fileUploader from "@/components/utils/file-upload";

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
        fileUploader,
        FontAwesomeIcon
    },

    created() {},

    mounted() {
        EventBus.$on("start:tutorial", i => {
            EventBus.$emit("update:tutorial", "Tutorial", this.tutorialText, this.tutorialTags, this.tutorialImg);
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
                var url = uploadedFile[0].url;
                return (this.audioSource[0] = uploadedFile[0].url);
            }
            if (format === "image") {
                return (this.iconFile = uploadedFile[0].url);
            }
        });
        this.color = interpolateHclLong(rgb(this.colorSet[0].color1), rgb(this.colorSet[0].color2));
    },

    updated() {
        //this.update();
    },

    beforeDestroy() {
        EventBus.$off("start:tutorial");
        EventBus.$emit("stop:tutorial");
    },

    computed: {
        ...mapState({
            serverURL: state => state.base.serverURL,
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
            var self = this;
            //this.globalValues = globalValues+ ou - values;
            // attribuer une palette de couleurs par composants
            select("#control-col")
                .style("opacity", "0.4")
                .style("background-color", self.color(value));
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
            var self = this;
            if (this.as0.length === 0) {
                self.$store.commit("updateASCounter", 1);
                var obj = Object.assign({}, self.model);
                obj.id = 9 + self.counter;
                obj.name = "customWidget-" + self.counter;
                obj.audioSource = self.audioSource;
                obj.iconFile = self.iconFile;
                return self.$store.commit("updateAS0", obj);
            }
        },

        getBuffer() {
            console.log("as0", this.as0);
            console.log("as1", this.as1);
            console.log("as2", this.as2);
            console.log("as3", this.as3);
            console.log("model", this.model);
        }
    }
};
</script>

<style lang="scss">
#ambience {
    text-align: center;
    font-size: 16px;
    padding: 3%;
    color: grey;

    .colzy {
        padding-bottom: 2%;
        padding-top: 5%;
    }

    #control-col {
        background-color: #aaf7d3;
        color: white;
        opacity: 1;
        width: 100%;
        min-height: 500px;
        border-radius: 50px;

        #edit-container {
            height: 30%;
            margin-top: 2%;
            margin-bottom: 2%;
        }

        button.create-button {
            display: flex;
            align-items: center;
            background-color: transparent;
            border: none;
            font-size: 16px;
            padding-top: 1%;
            padding-bottom: 2%;
            color: white;
            position: relative;
        }

        button.create-button:hover {
            display: flex;
            align-items: center;
            color: #e8e8e8;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    }

    h1 {
        font-family: "Aloes-Bd";
        font-size: 28px;
        text-transform: uppercase;
        text-align: center;
        color: white;
    }
}

#audio-slider {
    max-width: 95%;
}

.log-button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    padding-top: 5%;
    padding-bottom: 10%;
    position: absolute;
    top: 85%;
    color: white;
    cursor: pointer;
}
</style>
