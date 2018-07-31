<template>

    <div id="hello">
        <b-container  fluid >
            <b-row align-h="center">
                <b-col xs="6" sm="8" md="7" lg="6" xl="5" >
                    <svg id="svg" pointer-events="all" viewBox="0 0 550 100" preserveAspectRatio="xMinYMin meet">
                    </svg>
                </b-col>
            </b-row>
            <hr class="my-4">
            <b-row align-h="center">
                <b-col xs="10" sm="10" md="8" lg="7" xl="6">
                    <p class="desc">
                    This portfolio shows a selected portion of my work. Every project on this site is done by myself, from design to engineering. I hope you'll have a good time passing by.
                    </p>
                </b-col>
            </b-row>
            <b-row  v-if="contactCard === false" align-h="center">
                <b-col xs="4" sm="4" lg="3">
                    <a class="doors"  href="#/experience" title="Enter" >
                        <img  class="signs" @mouseover="icon1='static/icons/info2.png'" @mouseout="icon1='static/icons/info.png'" :src="serverURL+icon1" alt="info icon" />
                    </a>
                </b-col>
                <b-col xs="4" sm="4" lg="3" >
                    <a class="doors" @click="toggleCard(); icon2='static/icons/letter2.png'" title="Contact" >  
                        <img @mouseover="icon2='static/icons/letter2.png'" @mouseout="icon2='static/icons/letter.png'" class="signs" :src="serverURL+icon2" alt="hi icon" />
                    </a>
                </b-col>
            </b-row>
            <b-row v-else-if="contactCard === true && available === false" align-h="center">
                 <b-col  class="card" xs="8" sm="8" md="6" lg="5" xl="4">
                    <mq-layout class="card-mobile" mq="mobile">
                        <v-touch v-on:pressup="toggleCard"  v-on:press="contactCard = false"  >
                            <info-card   :frontType="'text'"
                                  :frontTitle="front.title"
                                  :frontData="front.text1"
                                  :backTitle="back.title"
                                  :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-tablet" mq="tablet">
                        <v-touch v-on:tap="toggleCard"  v-on:press="contactCard = false"  >
                            <info-card :frontType="'text'"
                                  :frontTitle="front.title"
                                  :frontData="front.text1"
                                  :backTitle="back.title"
                                  :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-laptop" mq="laptop">
                        <info-card  @click.native="toggleCard()"  :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text1"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-desktop" mq="desktop">
                        <info-card  @click.native="toggleCard()"  :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text1"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-xxl" mq="xxl">
                        <info-card  @click.native="toggleCard()"  :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text1"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                </b-col>
            </b-row>
            <b-row v-else   align-h="center">
                 <b-col  class="card" xs="8" sm="8" md="6" lg="5" xl="4">
                    <mq-layout class="card-mobile" mq="mobile">
                        <v-touch v-on:press="toggleCard" >
                            <info-card  :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-tablet" mq="tablet">
                        <v-touch v-on:tap="toggleCard" >
                            <info-card   :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-laptop" mq="laptop">
                        <info-card  @click.native="toggleCard()"  :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-desktop" mq="desktop">
                        <info-card  @click.native="toggleCard()"  :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-xxl" mq="xxl">
                        <info-card  @click.native="toggleCard()"  :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>

    import config from "@/config.json"
    import { routes } from "@/router/menu"
    import { shuffle } from "d3-array"
    import { rgb } from "d3-color"
    import { easeLinear } from "d3-ease"
    import { interpolateHcl, interpolateHclLong } from "d3-interpolate"
    import { event, mouse, select, selectAll } from "d3-selection"
    import { interval, now, timeout, timer } from "d3-timer"
    import { active, transition } from "d3-transition"
    import InfoCard from "vue-info-card"
    import { EventBus } from "@/main"

    const tel= "+33624297761";
    const icon3 = "static/img/ed2.jpg";
    const icon4 = "static/icons/available.png";
    const icon5 = "static/icons/notavailable.png";
    const rectangle = "<img class='square' src="+config.httpServerURL+"static/icons/rectangle.png />";
    const rectangleFlipped = "<img class='square' src="+config.httpServerURL+"static/icons/rectangle-flipped.png />";
    const frontCard2 =rectangle+"<div><img class='trombi' src="+config.httpServerURL+icon4+"></img><p class='text'>Your project requires UI/UX design, frontend / backend development, or embedded system prototyping ?</br>Why not talking about it now.</p></div>";
    const frontCard1 =rectangle+"<div><img class='trombi' src="+config.httpServerURL+icon5+"></img><p class='text'></br>...on a mission, but you can send me your request anyway!</p></div>";
    const backCard =rectangleFlipped+"<div><img class='trombi' style='opacity:0.8;' src="+config.httpServerURL+icon3+"></img><p class='text'>Edouard Maleix</br><a href=mailto:ed@"+config.domain+">ed@"+config.domain+"</a></br><a href=tel:"+config.tel+">"+config.tel+"</a></br>Nantes</br>References on request</p></div>";

    export default {
        data() {
          return {
            items: routes,
            serverURL: config.httpServerURL,
            icon1: "static/icons/info.png",
            icon2: "static/icons/letter.png",
            settings: {
                width: 500,
                height: 100,
                duration : 10000,
            },
            colorSet: [
                {
                color1: "#01c669",
                color2: "#ff830f", //"#48725e"
                },
            ],
            letters: "edouard maleix".split(""),
            updateCounter: 0,
            contactCard: false,
            available: true,
            front: {
                title: "Hey, i'm ...",
                text1: frontCard1,
                text2: frontCard2,
            },
            back: {
                title: "contact",
                text: backCard,
            },
          }
        },

        components: {
            InfoCard,
        },

        mounted() {
            var self = this;
            this.g = select("#svg").append("g");
            this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
            this.update(this.letters);
            this.interv = interval(function() {
                /// Once the counter hit a multiple of 3, show "normal" title
                self.updateCounter % 3 === 0 ? self.update("edouard maleix".split("")) : self.update(shuffle(self.letters))
            }, self.settings.duration/2);
            //select('.context-menu').remove();
            EventBus.$on("start:tutorial", i => {
                var text = "This portfolio is a selection of recent work, that i want to share. it represents the path of ";
                var tags = "";
                var img = "static/img/tuto-home.gif";
                EventBus.$emit('update:tutorial', "Home", text, tags, img );     
            });  
        },

        updated() {

        },

        beforeDestroy() {
            EventBus.$off("start:tutorial");
            EventBus.$emit("stop:tutorial");     
            this.interv.stop();
        },

        computed: {
       
        },

        methods: {
            toggleCard() {
                if (this.contactCard === false) {
                    this.contactCard = true;
                    //console.log("card-on")
                }
                else { 
                    this.contactCard = false;
                    //console.log("card-off")
                }
            },

            update(data) {
                //console.log("data", data);
                var self = this;
                self.updateCounter++;

                var t = transition()
                    .duration(self.settings.duration/10);

                var text = this.g.selectAll("text")
                    .data(data, function(d) { return d; });

                text.exit()
                  .transition(t)
                    .attr("y", self.settings.height/1.5)
                    .style("fill", "#33b277")
                    .style("fill-opacity", 1e-6)
                    .remove();

                text.attr("y", self.settings.height/1.5)
                    .style("fill", "#686868")
                    .style("fill-opacity", 1)
                  .transition(t)
                    .attr("x", function(d, i) { return i * 35; });

                text.enter().append("text")
                    .attr("dy", ".5em")
                    .attr("y", 0)
                    .attr("x", function(d, i) { return i * 35; })
                    .style("fill-opacity", 1e-6)
                    .style("fill", "#686868")
                    //.style("font-size", "30px")
                    .style("font-size", self.settings.height/3+"px")
                    .text(function(d) { return d; })
                  .transition(t)
                    .attr("y", self.settings.height/1.5)
                    .style("fill-opacity", 1);
            },

        }
          
    }
      
</script>

<style lang="scss" >

    #hello {
        position: relative;
        color: #686868;
        background-color: white;
        width: 100%;
        height: 850px;
        min-height: 700px;
        text-align: center;
        overflow: hidden;
    }

    #svg {
        margin-top: 0%;
        margin-left: 12%;
    }

    .desc {
        margin-top: 2%;
        margin-bottom: 1%;
        font-size: 1.2rem;
        text-align: justify;
    }

    .signs {
        width: 80%;
        height: 80%;
        opacity: 1 !important;
        background-color: white;

    }
    /*signs:hover {
    content:url(@/../static/icons/send.png); 
    }*/

    .doors {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: white;
        opacity: 1;
    }

    .doors:hover {
        opacity: 1;
        background-color: white;
        cursor: pointer; 
    }

    .doors:active {
        opacity: 1;
        background-color: white;
        border: none;
        cursor: pointer; 
    }

    .doors:focus {
        opacity: 1;
        background-color: white;
        border: none;
        cursor: pointer; 
    }

    .card {
        margin-top: 2%;
        height: 60%;
        border: 0px !important;
        font-size: 1.2rem;
        z-index:1500;
    }

    .with-shadow {
        box-shadow: 0 0 0 0 !important;
    }

    .square {
        position: absolute;
        top: 0px;
        left:0px;
        width: 100%;
        min-height: 95%;
    }

    .info-card .title {
        text-transform: uppercase;
       color:  #029ea8 !important;
       opacity: 0.8;
    }

    .trombi {
        position: absolute;
        left: 5%;
        top: 30%;
        width: 38%;
        border-radius: 3px !important;
    }

    .text {
        text-align: justify;
        position: absolute;
        left: 50%;
        padding-right: 3%;
        width: 45%;
        height: 280px;
        font-size: 85%;
    }

    .card-mobile {
        font-size: 70%!important;
    }

    .card-tablet {
        font-size: 75%!important;

        .text {
            top: 30%;
            height: 280px;
        }

    }

    .card-laptop {
        font-size: 80%!important;
        .text {
            top: 30%;
            height: 280px;
        }
    }

    .card-desktop {
        font-size: 85%!important;
        .text {
            top: 35%;
            height: 280px;
        }
        .trombi {
            position: absolute;
            left: 5%;
            top: 35%;
        }
    }

    .card-xxl {
        font-size: 100%;
        .text {
            top: 45%;
            height: 280px;
        }
        .trombi {
            position: absolute;
            left: 5%;
            top: 40%;
        }
    }
    
</style>
