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
                    <p class="introduction">
                    This portfolio shows a selection of my work. Each project on this site is done by myself, from design to engineering and the source code can be found <a href="https://framagit.org/getlarge/frontin" target="_blank">here</a>. I hope you'll have a good time passing by.
                    </p>
                </b-col>
            </b-row>
            <b-row v-if="contactCard === false" align-h="center">
                <b-col xs="4" sm="4" lg="3">
                    <a class="doors" href="#/experience" title="Enter" >
                        <img class="signs" @mouseover="$store.commit('updateHomeIcons', {id:0, path:'static/icons/info2.png'})"  @mouseout="$store.commit('updateHomeIcons', {id:0, path:'static/icons/info.png'})" :src="serverURL+icon1" alt="info icon" />
                    </a>
                </b-col>
                <b-col xs="4" sm="4" lg="3" >
                    <a class="doors" @click="toggleCard" title="Contact" >  
                        <img @mouseover="$store.commit('updateHomeIcons', {id:1, path:'static/icons/letter2.png'})" @mouseout="$store.commit('updateHomeIcons', {id:1, path:'static/icons/letter.png'})" class="signs" :src="serverURL+icon2" alt="hi icon" />
                    </a>
                </b-col>
            </b-row>
            <b-row v-else-if="contactCard === true && available === false" align-h="center">
                 <b-col  class="card" xs="8" sm="8" md="6" lg="5" xl="4">
                    <mq-layout class="card-mobile" mq="mobile">
                        <v-touch v-on:pressup="toggleCard" v-on:press="contactCard = false"  >
                            <info-card :frontType="'text'"
                                :frontTitle="front.title"
                                :frontData="front.text1"
                                :backTitle="back.title"
                                :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-tablet" mq="tablet">
                        <v-touch v-on:tap="toggleCard" v-on:press="contactCard = false"  >
                            <info-card :frontType="'text'"
                                :frontTitle="front.title"
                                :frontData="front.text1"
                                :backTitle="back.title"
                                :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-laptop" mq="laptop">
                        <info-card @click.native="toggleCard" :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text1"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-desktop" mq="desktop">
                        <info-card @click.native="toggleCard" :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text1"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-xxl" mq="xxl">
                        <info-card @click.native="toggleCard" :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text1"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                </b-col>
            </b-row>
            <b-row v-else align-h="center">
                 <b-col  class="card" xs="8" sm="8" md="6" lg="5" xl="4">
                    <mq-layout class="card-mobile" mq="mobile">
                        <v-touch v-on:press="toggleCard" >
                            <info-card :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-tablet" mq="tablet">
                        <v-touch v-on:tap="toggleCard" >
                            <info-card :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                            </info-card>
                        </v-touch>
                    </mq-layout>
                    <mq-layout class="card-laptop" mq="laptop">
                        <info-card @click.native="toggleCard" :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-desktop" mq="desktop">
                        <info-card @click.native="toggleCard" :frontType="'text'"
                              :frontTitle="front.title"
                              :frontData="front.text2"
                              :backTitle="back.title"
                              :backData="back.text" >
                        </info-card>
                    </mq-layout>
                    <mq-layout class="card-xxl" mq="xxl">
                        <info-card @click.native="toggleCard" :frontType="'text'"
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
import { shuffle } from "d3-array";
import { easeLinear } from "d3-ease";
import { event, mouse, select, selectAll } from "d3-selection";
import { interval } from "d3-timer";
import { active, transition } from "d3-transition";
import InfoCard from "vue-info-card";
import { mapGetters, mapMutations, mapState } from "vuex";
import { EventBus } from "@/main";

export default {
    data() {
        return {
            settings: {
                width: 500,
                height: 100,
                duration: 10000
            }
        };
    },

    components: {
        InfoCard
    },

    created() {
        //console.log(this.$store)
    },

    mounted() {
        var self = this;
        this.g = select("#svg").append("g");
        this.updateTitle(this.letters);
        this.interv = interval(function() {
            /// Once the counter hits a multiple of 3, show initial title
            self.updateCounter % 3 === 0
                ? self.updateTitle(self.letters)
                : self.updateTitle(shuffle(self.updatedLetters));
        }, self.settings.duration / 2);

        EventBus.$on("start:tutorial", i => {
            EventBus.$emit("update:tutorial", "Home", this.tutorialText, this.tutorialTags, this.tutorialImg);
        });
    },

    updated() {},

    beforeDestroy() {
        EventBus.$off("start:tutorial");
        if (this.tutorial === true) {
            EventBus.$emit("stop:tutorial");
        }
        this.interv.stop();
    },

    computed: {
        ...mapState({
            serverURL: state => state.base.serverURL,
            tutorial: state => state.menu.tutorial,
            letters: state => state.home.letters,
            updatedLetters: state => state.home.updatedLetters,
            icon1: state => state.home.icons[0].path,
            icon2: state => state.home.icons[1].path,
            icon3: state => state.home.icons[2].path,
            icon4: state => state.home.icons[3].path,
            icon5: state => state.home.icons[4].path,
            tutorialText: state => state.home.tutorial.text,
            tutorialTags: state => state.home.tutorial.tags,
            tutorialImg: state => state.home.tutorial.img,
            updateCounter: state => state.home.updateCounter,
            contactCard: state => state.home.contactCard,
            available: state => state.home.available
        }),
        // ...mapMutations([
        //     "updateContactCard"
        // ]),
        ...mapGetters({
            front: "frontCard",
            back: "backCard"
        })
    },

    methods: {
        toggleCard() {
            if (this.contactCard === false) {
                this.$store.commit("updateContactCard", true);
                //this.updateContactCard(true);
                //console.log("card-on")
            } else {
                this.$store.commit("updateContactCard", false);
                //console.log("card-off")
            }
        },

        updateTitle(data) {
            //console.log("data", data);
            this.$store.commit("updateHomeCounter", 1);
            var t = transition().duration(this.settings.duration / 10);
            var text = this.g.selectAll("text").data(data, d => d);

            text.exit()
                .transition(t)
                .attr("y", this.settings.height / 1.5)
                .style("fill", "#33b277")
                .style("fill-opacity", 1e-6)
                .remove();

            text.attr("y", this.settings.height / 1.5)
                .style("fill", "#686868")
                .style("fill-opacity", 1)
                .transition(t)
                .attr("x", (d, i) => i * 35);

            text.enter()
                .append("text")
                .attr("dy", ".5em")
                .attr("y", 0)
                .attr("x", (d, i) => i * 35)
                .style("fill-opacity", 1e-6)
                .style("fill", "#686868")
                .style("font-size", this.settings.height / 3 + "px")
                .text(d => d)
                .transition(t)
                .attr("y", this.settings.height / 1.5)
                .style("fill-opacity", 1);
        }
    }
};
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

    .introduction {
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
        z-index: 1500;

        .square {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            min-height: 95%;
        }

        .info-card .title {
            text-transform: uppercase;
            color: #029ea8 !important;
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
            font-size: 70% !important;
        }

        .card-tablet {
            font-size: 75% !important;

            .text {
                top: 30%;
                height: 280px;
            }
        }

        .card-laptop {
            font-size: 80% !important;
            .text {
                top: 30%;
                height: 280px;
            }
        }

        .card-desktop {
            font-size: 85% !important;
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
    }

}

#svg {
    margin-top: 0%;
    margin-left: 12%;
}


.with-shadow {
    box-shadow: 0 0 0 0 !important;
}



</style>
