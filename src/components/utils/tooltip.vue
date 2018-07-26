<template>
    <div >  
        <mq-layout class="controls-mobile" mq="mobile">
            <!-- v-if="settings.dragBoxWidth > settings.dragBoxHeight  " -->
            <div v-if="settings.dragBoxWidth >= (settings.dragBoxHeight*1.5)" class="">
                <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/1.6"  :w="settings.dragBoxWidth*1.2" :h="settings.dragBoxHeight*1.05" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container  >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> <font-awesome-icon :icon="['fas', 'arrows-alt']" size="xs" /> </button>
                            <a class="close-button" @click="close()"> <font-awesome-icon :icon="['fas', 'times']" size="lg" /> </a>
                            <b-row >
                                <b-col xs="5" >
                                    <div v-if="settings.dragBoxWidth > settings.dragBoxHeight*2.2 ">
                                        <div class="description">{{description}}</div>
                                        <div class="tags">{{tags}}</div>
                                    </div>
                                    <div v-else>
                                        <div  style="font-size: 0.2rem;" class="description">{{description}}</div>
                                        <div class="tags">{{tags}}</div>
                                    </div>
                                </b-col>
                                <b-col xs="7" >
                                    <a v-if="settings.dragBoxWidth > settings.dragBoxHeight*1.5"  :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" /></a>
                                    <a v-else :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2.5" :height="settings.dragBoxY/1.5" :src="serverURL+img" /></a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>
            </div>
            <div v-else  class="pop">
                please rotate your screen 
            </div>
        </mq-layout>

        <mq-layout class="controls-tablet" mq="tablet">
            <div v-if="settings.dragBoxWidth >= (settings.dragBoxHeight*1.1)" class="">
                <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/2.2"  :w="settings.dragBoxWidth" :h="settings.dragBoxHeight*1.05" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> <font-awesome-icon :icon="['fas', 'arrows-alt']" size="sm" /> </button>
                            <a class="close-button" @click="close()"> <font-awesome-icon :icon="['fas', 'times']" size="sm" /> </a>
                            <b-row >
                                <b-col sm="5"  >
                                    <div class="description">{{description}}</div>
                                    <div class="tags">{{tags}}</div>
                                </b-col>
                                <b-col sm="7"   >
                                    <a :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" /></a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>
            </div>
            <div v-else >
                <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX/1.2" :y="settings.dragBoxY/4"  :w="settings.dragBoxWidth" :h="settings.dragBoxHeight*0.5" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> <font-awesome-icon :icon="['fas', 'arrows-alt']" size="sm" /> </button>
                            <a class="close-button" @click="close()"> <font-awesome-icon :icon="['fas', 'times']" size="sm" /> </a>
                            <b-row >
                                <b-col sm="5"  >
                                    <div class="description">{{description}}</div>
                                    <div class="tags">{{tags}}</div>
                                </b-col>
                                <b-col sm="7"   >
                                    <a :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/3" :src="serverURL+img" /></a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>            
            </div>
        </mq-layout>
    
        <mq-layout class="controls-laptop" mq="laptop">
            <div v-if="settings.dragBoxWidth >= (settings.dragBoxHeight*1.1)">
            <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/3"  :w="settings.dragBoxWidth" :h="settings.dragBoxHeight" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
                <div id="tooltip">
                    <b-container fluid class="bv-example-row">
                        <div class="title">{{title}}</div>
                        <button class="drag-button" > <font-awesome-icon :icon="['fas', 'arrows-alt']" size="lg" /> </button>
                        <button class="close-button" @click="close()"> <font-awesome-icon :icon="['fas', 'times']" size="lg" /> </button>
                        <b-row >
                            <b-col  md="5" lg="5" >
                                <div class="description">{{description}}</div>
                                <div class="tags">{{tags}}</div>
                            </b-col>
                            <b-col md="7" lg="7" >
                                <a :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" /></a>
                            </b-col>  
                        </b-row>
                    </b-container>
                </div>
            </vue-draggable-resizable>
        </div>
        <div v-else >
                <vue-draggable-resizable  id="tooltipContainer" :x="settings.dragBoxX/1.2" :y="settings.dragBoxY/5"  :w="settings.dragBoxWidth" :h="settings.dragBoxHeight*0.5" :drag-handle="'.drag-button'" v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
                    <div id="tooltip">
                        <b-container >
                            <div class="title">{{title}}</div>
                            <button class="drag-button"> <font-awesome-icon :icon="['fas', 'arrows-alt']" size="lg" /> </button>
                            <button class="close-button" @click="close()"> <font-awesome-icon :icon="['fas', 'times']" size="lg" /> </button>
                            <b-row >
                                <b-col sm="5"  >
                                    <div class="description">{{description}}</div>
                                    <div class="tags">{{tags}}</div>
                                </b-col>
                                <b-col sm="7"   >
                                    <a :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/3" :src="serverURL+img" /></a>
                                </b-col>  
                            </b-row>
                        </b-container>
                    </div>
                </vue-draggable-resizable>            
            </div>
        </mq-layout>

        <mq-layout class="controls-desktop" mq="desktop">
             <vue-draggable-resizable id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/4"  :minw="settings.dragBoxWidth" :minh="settings.dragBoxHeight" :drag-handle="'.drag-button'" v-on:dragging="onDrag"  :resizable="false" v-on:resizing="onResize" :handles="['tr']">
                <div id="tooltip">
                    <b-container  fluid >
                        <div class="title">{{title}}</div>              
                        <button class="drag-button" > <font-awesome-icon :icon="['fas', 'arrows-alt']" size="lg" /> </button>
                        <button class="close-button" @click="close()"> <font-awesome-icon :icon="['fas', 'times']" size="lg" /> </button>
                        <b-row >
                            <b-col lg="5" >
                                <div class="description">{{description}}</div>
                                <div class="tags">{{tags}}</div>                
                            </b-col>
                            <b-col lg="7" >
                                <a :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img"/></a>
                            </b-col>  
                        </b-row>
                    </b-container>
                </div>
            </vue-draggable-resizable>
        </mq-layout>

        <mq-layout class="controls-xxl" mq="xxl">
            <vue-draggable-resizable id="tooltipContainer" :x="settings.dragBoxX" :y="settings.dragBoxY/4"  :minw="settings.dragBoxWidth" :minh="settings.dragBoxHeight" :drag-handle="'.drag-button'" v-on:dragging="onDrag"  :resizable="false" v-on:resizing="onResize" :handles="['tr']">
                <div id="tooltip">
                    <b-container  fluid >
                        <div class="title">{{title}}</div>
                        <button class="drag-button" > <font-awesome-icon :icon="['fas', 'arrows-alt']" size="2x" /> </button>
                        <button class="close-button" @click="close()"> <font-awesome-icon :icon="['fas', 'times']" size="2x" /> </button>
                        <b-row >
                            <b-col xl="5" >
                                <div class="description">{{description}}</div>
                                <div class="tags">{{tags}}</div>
                            </b-col>
                            <b-col xl="7" >
                                <a :href="serverURL+img" target="_blank"><b-img class="pics" :width="settings.dragBoxWidth/2" :height="settings.dragBoxY/1.5" :src="serverURL+img" /></a>
                            </b-col>  
                        </b-row>
                    </b-container>
                </div>
            </vue-draggable-resizable>
        </mq-layout>
    </div>
</template>

<script>
  
    import config from '@/config.json'
    import VueDraggableResizable from 'vue-draggable-resizable'
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import { EventBus } from '@/main'

    export default {
        name: 'tooltip',
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

            close: () => {
                var self = this;
                console.log(this.a)
                EventBus.$emit('stop:tooltip' );
            }
        }

    }

</script>

<style lang="scss">

    #tooltipContainer {
        border-radius: 3px;
        background: rgba(255,255,255,0.9);
        color: #000;
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

    .controls-mobile {
        #tooltipContainer {
            font-size: 0.5rem;
            line-height: 7px;
            padding: 6px;
        }

        #tooltip .description {
            font-size: 0.35rem;
        }

        #tooltip .tags {
            font-size: 0.3rem;
        }

 
    }

    .controls-tablet {
        #tooltipContainer {
            font-size: 0.65rem;
            line-height: 9px;
            padding: 10px;
        }

        #tooltip .description {
            margin-top: 1%;
            font-size: 0.55rem;
        }

        #tooltip .tags {
            font-size: 0.5rem;
        } 
    }

    .controls-laptop {
        #tooltipContainer {
            font-size: 0.7rem;
            line-height: 15px;
            padding: 12px;
        }

        #tooltip .description {
            margin-top: 2%;
            font-size: 0.6rem;
        } 

        #tooltip .tags {
            font-size: 0.5rem;
        }

    }

    .controls-desktop {
        #tooltipContainer {
            font-size: 1rem;
            line-height: 20px;
            padding: 13px;         
        }

        #tooltip .description {
            margin-top: 3%;
            font-size: 0.8rem;
        } 

        #tooltip .tags {
            font-size: 0.7rem;
        }
    }

    .controls-xxl {
        #tooltipContainer {
            font-size: 1.2rem;
            line-height: 25px;
            padding: 13px;
        }

        #tooltip .description {
            margin-top: 3%;
            font-size: 1rem;
        } 

        #tooltip .tags {
            font-size: 0.9rem;
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
