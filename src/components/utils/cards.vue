<template>
    <div id="cards" >  
        <mq-layout class="cards-mobile" mq="mobile">
            <div v-if="settings.dragBoxWidth >= (settings.dragBoxHeight*1.3)" class="">
                <vue-draggable-resizable   id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/1.6"  :w="settings.dragBoxWidth*1.2" :h="settings.dragBoxHeight*1.15" :drag-handle="'.drag-button'" v-on:dragging="onDrag" @deactivated="closeCard" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container  >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> <font-awesome-icon :icon="['fas', 'arrows-alt']" size="xs" /> </button>
                            <v-touch class="close-button" v-on:tap="closeCard">  <font-awesome-icon :icon="['fas', 'times']" size="xs" /></v-touch>
                            <b-row >
                                <b-col xs="6" >
                                    <div v-if="settings.dragBoxWidth > settings.dragBoxHeight*2.2 ">
                                        <div class="description">{{description}}</div>
                                    </div>
                                    <div v-else>
                                        <div  class="description">{{description}}</div>
                                    </div>
                                </b-col>
                                <b-col xs="6" >
                                    <a v-if="settings.dragBoxWidth > settings.dragBoxHeight*1.5"  :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" /></a>
                                    <a v-else :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2.5" :height="settings.dragBoxY/1.5" :src="serverURL+img" /></a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>
            </div>
            <div v-else  >
                 <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX/1.2" :y="settings.dragBoxY/4"  :w="settings.dragBoxWidth*1.8" :h="settings.dragBoxHeight*0.6" :drag-handle="'.drag-button'" v-on:dragging="onDrag" @deactivated="closeCard" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> <font-awesome-icon :icon="['fas', 'arrows-alt']" size="xs" /> </button>
                            <v-touch class="close-button" v-on:tap="closeCard">  <font-awesome-icon :icon="['fas', 'times']" size="xs" /></v-touch>
                            <b-row >
                                <b-col xs="6"  >
                                    <div class="description">{{description}}</div>
                                </b-col>
                                <b-col xs="6"   >
                                    <a :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/3" :src="serverURL+img" /></a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>    
            </div>
        </mq-layout>

        <mq-layout class="cards-tablet" mq="tablet">
            <div v-if="settings.dragBoxWidth >= (settings.dragBoxHeight*1.1)" class="">
                <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/2.2"  :w="settings.dragBoxWidth*1.4" :h="settings.dragBoxHeight*1.15" :drag-handle="'.drag-button'" v-on:dragging="onDrag" @deactivated="closeCard" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> 
                                <font-awesome-icon :icon="['fas', 'arrows-alt']" size="sm" /> 
                            </button>
                            <v-touch class="close-button" v-on:tap="closeCard">  
                                <font-awesome-icon :icon="['fas', 'times']" size="sm" />
                            </v-touch>
                            <b-row >
                                <b-col sm="5"  >
                                    <div class="description">{{description}}</div>
                                </b-col>
                                <b-col sm="7"   >
                                    <a :href="serverURL+img" target="_blank">
                                        <b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" />
                                    </a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>
            </div>
            <div v-else >
                <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX/1.2" :y="settings.dragBoxY/4"  :w="settings.dragBoxWidth" :h="settings.dragBoxHeight*0.8" :drag-handle="'.drag-button'" v-on:dragging="onDrag" @deactivated="closeCard" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> 
                                <font-awesome-icon :icon="['fas', 'arrows-alt']" size="sm" /> 
                            </button>
                            <v-touch class="close-button" v-on:tap="closeCard">  
                                <font-awesome-icon :icon="['fas', 'times']" size="sm" />
                            </v-touch>
                            <b-row >
                                <b-col sm="5"  >
                                    <div class="description">{{description}}</div>
                                </b-col>
                                <b-col sm="7"   >
                                    <a :href="serverURL+img" target="_blank">
                                        <b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/3" :src="serverURL+img" />
                                    </a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>            
            </div>
        </mq-layout>
    
        <mq-layout class="cards-laptop" mq="laptop">
            <div v-if="settings.dragBoxWidth >= (settings.dragBoxHeight*1.1)">
            <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/3"  :w="settings.dragBoxWidth" :h="settings.dragBoxHeight" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :maximize="true" :resizable="false" v-on:resizing="onResize" >
                <div id="tooltip">
                    <b-container fluid class="bv-example-row">
                        <div class="title">{{title}}</div>
                        <button class="drag-button" >
                            <font-awesome-icon :icon="['fas', 'arrows-alt']" size="sm" />
                        </button>
                        <v-touch class="close-button" @click="closeCard" v-on:tap="closeCard">  
                            <font-awesome-icon :icon="['fas', 'times']" size="sm" />
                        </v-touch>
                        <b-row >
                            <b-col  md="5" lg="5" >
                                <div class="description">{{description}}</div>
                                <div class="tags">{{tags}}</div>
                            </b-col>
                            <b-col md="7" lg="7" >
                                <a :href="serverURL+img" target="_blank">
                                    <b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" />
                                </a>
                            </b-col>  
                        </b-row>
                    </b-container>
                </div>
            </vue-draggable-resizable>
        </div>
        <div v-else >
                <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX/1.2" :y="settings.dragBoxY/5"  :w="settings.dragBoxWidth" :h="settings.dragBoxHeight*0.5" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :maximize="true" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container >
                            <div class="title">{{title}}</div>
                            <button class="drag-button">
                                <font-awesome-icon :icon="['fas', 'arrows-alt']" size="sm" />
                            </button>
                            <button class="close-button" @click="closeCard">
                                <font-awesome-icon :icon="['fas', 'times']" size="sm" />
                            </button>
                            <b-row >
                                <b-col sm="5"  >
                                    <div class="description">{{description}}</div>
                                    <div class="tags">{{tags}}</div>
                                </b-col>
                                <b-col sm="7"   >
                                    <a :href="serverURL+img" target="_blank">
                                        <b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/3" :src="serverURL+img" />
                                    </a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>            
            </div>
        </mq-layout>

        <mq-layout class="cards-desktop" mq="desktop">
             <vue-draggable-resizable id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/4"  :minw="settings.dragBoxWidth" :minh="settings.dragBoxHeight" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" :handles="['tr']">
                <div id="tooltip">
                    <b-container  fluid >
                        <div class="title">{{title}}</div>              
                        <button class="drag-button" > 
                            <font-awesome-icon :icon="['fas', 'arrows-alt']" size="lg" /> 
                        </button>
                        <button class="close-button" @click="closeCard"> 
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" /> 
                        </button>
                        <b-row >
                            <b-col lg="5" >
                                <div class="description">{{description}}</div>
                                <div class="tags">{{tags}}</div>                
                            </b-col>
                            <b-col lg="7" >
                                <a :href="serverURL+img" target="_blank">
                                    <b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img"/>
                                </a>
                            </b-col>  
                        </b-row>
                    </b-container>
                </div>
            </vue-draggable-resizable>
        </mq-layout>

        <mq-layout class="cards-xxl" mq="xxl">
            <vue-draggable-resizable id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/4"  :minw="settings.dragBoxWidth" :minh="settings.dragBoxHeight" :drag-handle="'.drag-button'" v-on:dragging="onDrag"  :resizable="false" v-on:resizing="onResize" :handles="['tr']">
                <div id="tooltip">
                    <b-container  fluid >
                        <div class="title">{{title}}</div>
                        <button class="drag-button" > 
                            <font-awesome-icon :icon="['fas', 'arrows-alt']" size="lg" /> 
                        </button>
                        <button class="close-button" @click="closeCard"> 
                            <font-awesome-icon :icon="['fas', 'times']" size="lg" /> 
                        </button>
                        <b-row >
                            <b-col xl="5" >
                                <div class="description">{{description}}</div>
                                <div class="tags">{{tags}}</div>
                            </b-col>
                            <b-col xl="7" >
                                <a :href="serverURL+img" target="_blank">
                                    <b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" />
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
  
    import config from "@/config.json"
    import VueDraggableResizable from "vue-draggable-resizable"
    import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
    import { event, select } from "d3-selection"
    import { EventBus } from '@/main'

    export default {
        name: 'cards',
        props: ['title', 'description', 'img', 'tags', 'X', 'Y'],

        data: function () {
            return {
                serverURL: config.httpServerURL,
                settings: {
                    dragBoxX: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/20,
                    dragBoxY: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/2,
                    dragBoxHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/2.2,
                    dragBoxWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/2,
                },
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }
        },

        components: {
            VueDraggableResizable,
            FontAwesomeIcon
        },

        mounted() {
            select(window).on('resize', this.updateSettings);
        },

        methods: {
            onResize: function (x, y, width, height) {
                this.x = x
                this.y = y
                this.width = width
                this.height = height
            },

            onDrag: function (x, y) {
                this.x = x
                this.y = y
            },

            updateSettings() {
                this.settings = {
                    dragBoxX: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/20,
                    dragBoxY: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/2,
                    dragBoxHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/2.2,
                    dragBoxWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/2,
                }
            },

            closeCard() {
                //console.log("remove-card");
                select(this).remove();
                EventBus.$emit("stop:cards");
            }
        }

    }

</script>

<style lang="scss">

    #tooltipContainer {
        border-radius: 3px;
        background: rgba(255,255,255,01);
        color: #000;
        z-index: 2000 !important;
        box-shadow: 0 1px 5px rgba(0,0,0,0.4);
        -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
        border:1px solid rgba(200,200,200,0.85);
        text-align: center;
    }

    #tooltip {
        text-align:center;
        z-index: 1000;
        position: absolute;
        display: block;
        max-height: 70px;
    }

    #tooltip .title {
        color: #686868;
        font-family: 'Aloes-Bd';
        margin-bottom: 3%;
    }

    #tooltip .description {
        color:#686868;
        text-align: justify;
        
    } 

    #tooltip .pics {
        object-fit: cover
    }

    #tooltip .tags {
        margin-top: 3%;
        color:#33b277;
        text-align: justify;
        text-transform: lowercase;
    }

    #tooltip .description {
        margin-top: 3%;
        font-size: 90%;
    } 

    #tooltip .tags {
        font-size: 85%;
    }

    .cards-mobile {

        background-color: rgba(0,0,0,0.5);
        z-index: 2000;
        #tooltipContainer {
            font-size: 90%;
            line-height: 11px;
            padding: 6px;
        }
 
        #tooltip .description {
            margin-top: 0%;
            font-size: 65%;
        } 

        #tooltip .tags {
            font-size: 75%;
        }

    }

    .cards-tablet {

        background-color: rgba(0,0,0,0.5);
        z-index: 2000;
        #tooltipContainer {
            font-size: 100%;
            line-height: 12px;
            padding: 3px;
        }

        #tooltip .description {
            margin-top: 0%;
            font-size: 70%;
        } 

        #tooltip .tags {
            font-size: 70%;
        }
    }

    .cards-laptop {
        #tooltipContainer {
            font-size: 100%;
            line-height: 15px;
            padding: 12px;
        }

        #tooltip .description {
            margin-top: 2%;
            font-size: 90%;
        } 


    }

    .cards-desktop {

        background-color: rgba(0,0,0,0.5);
        z-index: 2000;
        #tooltipContainer {
            font-size: 100%;
            line-height: 20px;
            padding: 13px;         
        }

    }

    .cards-xxl {

        background-color: rgba(0,0,0,0.5);
        z-index: 2000;
        #tooltipContainer {
            font-size: 1.1rem;
            line-height: 25px;
            padding: 13px;
        }
    }

    .drag-button {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        color: #33b277;
        position: absolute;
        font-size: 1rem;
        top : 0.5%;
        right: 4%;
    }

    .drag-button:hover {
        position: absolute;
        font-size: 1rem;
        cursor: pointer;
    }

    .close-button {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        color: #33b277;
        position: absolute;
        font-size: 1rem;
        top : 0.5%;
        right: 0.5%;
    }

    .close-button:hover {
        font-size: 1rem;
        color: #33b277;
        cursor: pointer; 
    }

    .pop {
        top: 80px;
    }

</style>
