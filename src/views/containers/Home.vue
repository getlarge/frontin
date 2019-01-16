<template>
  <b-container 
    id="hello"
    fluid >
    <b-row align-h="center">
      <b-col 
        cols="6" 
        sm="8" 
        md="7" 
        lg="6" 
        xl="5" >
        <svg 
          id="svg" 
          pointer-events="all" 
          viewBox="0 0 550 100" 
          preserveAspectRatio="xMinYMin meet"/>
      </b-col>
    </b-row>
    <hr class="my-4">
    <b-row align-h="center">
      <b-col 
        cols="10" 
        sm="10" 
        md="8" 
        lg="7" 
        xl="6">
        <p class="introduction">
        This portfolio shows a selection of my work. Each project on this site is done by myself, from design to engineering and the source code can be found <a href="https://framagit.org/getlarge/frontin" target="_blank">here</a>. I hope you'll have a good time passing by.
        </p>
      </b-col>
    </b-row>
    <b-row 
      v-if="!contactCard" 
      align-h="center">
      <b-col 
        cols="4" 
        sm="4" 
        lg="3">
        <a 
          class="doors" 
          accesskey="E" 
          href="#/experience" 
          title="Enter" >
          <img 
            :src="$store.state.style.pictures.iconInfo" 
            class="signs" 
            @mouseover="$store.commit('home/updateHomeIcons', {id:0, path:'/icons/info2.png'})"  
            @mouseout="$store.commit('home/updateHomeIcons', {id:0, path:'/icons/info.png'})" 
            alt="info icon" />
        </a>
      </b-col>
      <b-col 
        cols="4" 
        sm="4" 
        lg="3" >
        <a 
          class="doors" 
          accesskey="C" 
          title="Contact"
          @click="toggleCard">  
          <img 
            :src="$store.state.style.pictures.iconLetter" 
            class="signs" 
            alt="hi icon"
            @mouseover="$store.commit('home/updateHomeIcons', {id:1, path:'/icons/letter2.png'})"
            @mouseout="$store.commit('home/updateHomeIcons', {id:1, path:'/icons/letter.png'})" />
        </a>
      </b-col>
    </b-row>
    <b-row 
      v-else-if="contactCard && !available && frontCard !== null && backCard !== null" 
      align-h="center">
      <b-col  
        class="card" 
        cols="8" 
        sm="8" 
        md="6" 
        lg="5" 
        xl="4">
        <mq-layout 
          class="card-mobile" 
          mq="mobile">
          <v-touch v-on:pressup="toggleCard" v-on:press="contactCard = false" >
            <info-card 
              :frontType="'text'"
              :frontTitle="frontCard.title"
              :frontData="frontCard.text1"
              :backTitle="backCard.title"
              :backData="backCard.text" />
          </v-touch>
        </mq-layout>
        <mq-layout 
          class="card-tablet" 
          mq="tablet">
          <v-touch v-on:tap="toggleCard" v-on:press="contactCard = false" >
            <info-card 
              :frontType="'text'"
              :frontTitle="frontCard.title"
              :frontData="frontCard.text1"
              :backTitle="backCard.title"
              :backData="backCard.text" />
          </v-touch>
        </mq-layout>
        <mq-layout 
          class="card-laptop" 
          mq="laptop">
          <info-card 
            :frontType="'text'"
            :frontTitle="frontCard.title"
            :frontData="frontCard.text1"
            :backTitle="backCard.title"
            :backData="backCard.text" 
            @click.native="toggleCard" />
        </mq-layout>
        <mq-layout 
          class="card-desktop" 
          mq="desktop">
            <info-card
              :frontType="'text'"
              :frontTitle="frontCard.title"
              :frontData="frontCard.text1"
              :backTitle="backCard.title"
              :backData="backCard.text" 
              @click.native="toggleCard" />
        </mq-layout>
        <mq-layout 
          class="card-xxl" 
          mq="xxl">
          <info-card
            :frontType="'text'"
            :frontTitle="frontCard.title"
            :frontData="frontCard.text1"
            :backTitle="backCard.title"
            :backData="backCard.text"              
            @click.native="toggleCard" />
        </mq-layout>
      </b-col>
    </b-row>
    <b-row 
      v-else-if="contactCard && available && frontCard !== null && backCard !== null" 
      align-h="center">
       <b-col  
        class="card" 
        cols="8" 
        sm="8" 
        md="6" 
        lg="5" 
        xl="4">
        <mq-layout 
          class="card-mobile" 
          mq="mobile">
          <v-touch v-on:press="toggleCard" >
            <info-card 
              :frontType="'text'"
              :frontTitle="frontCard.title"
              :frontData="frontCard.text2"
              :backTitle="backCard.title"
              :backData="backCard.text" />
          </v-touch>
        </mq-layout>
        <mq-layout 
          class="card-tablet" 
          mq="tablet">
          <v-touch v-on:tap="toggleCard" >
            <info-card
              :frontType="'text'"
              :frontTitle="frontCard.title"
              :frontData="frontCard.text2"
              :backTitle="backCard.title"
              :backData="backCard.text"/>
          </v-touch>
        </mq-layout>
        <mq-layout 
          class="card-laptop" 
          mq="laptop">
          <info-card 
            @click.native="toggleCard" 
            :frontType="'text'"
            :frontTitle="frontCard.title"
            :frontData="frontCard.text2"
            :backTitle="backCard.title"
            :backData="backCard.text"/>
        </mq-layout>
        <mq-layout 
          class="card-desktop" 
          mq="desktop">
            <info-card
              :frontType="'text'"
              :frontTitle="frontCard.title"
              :frontData="frontCard.text2"
              :backTitle="backCard.title"
              :backData="backCard.text" 
              @click.native="toggleCard"/>
        </mq-layout>
        <mq-layout 
          class="card-xxl" 
          mq="xxl">
            <info-card 
             :frontType="'text'"
              :frontTitle="frontCard.title"
              :frontData="frontCard.text2"
              :backTitle="backCard.title"
              :backData="backCard.text" 
              @click.native="toggleCard"/>
        </mq-layout>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { shuffle } from "d3-array";
//  import {easeLinear} from "d3-ease";
import { select } from "d3-selection";
import { interval } from "d3-timer";
import { transition } from "d3-transition";
import InfoCard from "vue-info-card";
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

  mounted() {
    this.g = select("#svg").append("g");
    this.updateTitle(this.letters);
    this.interv = interval(() => {
      /// Once the counter hits a multiple of 3, show initial title
      this.updateCounter % 3 === 0
        ? this.updateTitle(this.letters)
        : this.updateTitle(shuffle(this.updatedLetters));
    }, this.settings.duration / 2);

    EventBus.$on("start:tutorial", () => {
      EventBus.$emit(
        "update:tutorial",
        "Home",
        this.tutorialText,
        this.tutorialTags,
        this.tutorialImg
      );
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
    serverURL: {
      get() {
        return this.$store.state.base.serverURL;
      }
    },
    tutorial: {
      get() {
        return this.$store.state.base.tutorial;
      }
    },

    tutorialText: {
      get() {
        return this.$store.state.base.tutorial.text;
      }
    },
    tutorialTags: {
      get() {
        return this.$store.state.home.tutorial.tags;
      }
    },
    tutorialImg: {
      get() {
        return this.$store.state.home.tutorial.img;
      }
    },
    letters: {
      get() {
        return this.$store.state.home.letters;
      }
    },
    updatedLetters: {
      get() {
        return this.$store.state.home.updatedLetters;
      }
    },
    icons: {
      get() {
        return this.$store.state.home.icons;
      }
    },
    updateCounter: {
      get() {
        return this.$store.state.home.updateCounter;
      }
    },
    contactCard: {
      get() {
        return this.$store.state.home.contactCard;
      }
    },
    available: {
      get() {
        return this.$store.state.home.available;
      }
    },
    clientUrl() {
      return this.$store.state.clientUrl;
    },
    frontCard() {
      return {
        title: "Hey, i'm ...",
        text1: `<img class='square' src=${
          this.clientUrl
        }/icons/rectangle.png/><div><img class='trombi' src=${this.clientUrl}${
          this.icons[4].path
        }></img><p class='text'></br>...on a mission, but you can send me your request anyway!</p></div>`,
        text2: `<img class='square' src=${
          this.$store.state.style.pictures.rectangle
        }><div><img class='trombi' src=${this.clientUrl}${
          this.icons[3].path
        }></img><p class='text'>Your project requires UI/UX design, frontend / backend development, or embedded system prototyping ?</br>Why not talking about it now.</p></div>`
      };
    },
    backCard() {
      return {
        title: "contact",
        text: `<img class='square' src=${
          this.$store.state.style.pictures.rectangleFlipped
        }><div><img class='trombi' style='opacity:0.8;' src=${this.clientUrl}${
          this.icons[2].path
        }></img><p class='text'>Edouard Maleix</br><a href=mailto:ed@${
          this.$store.state.base.domain
        }>ed@${this.$store.state.base.domain}</a></br><a href=tel:${
          this.$store.state.base.tel
        }>${
          this.$store.state.base.tel
        }</a></br>Nantes</br>References on request</p></div>`
      };
    }
  },

  methods: {
    // front() {
    //   this.frontCard = this.$store.dispatch("home/frontCard");
    // },

    // back() {
    //   this.backCard = this.$store.dispatch("home/backCard");
    // },

    toggleCard() {
      if (!this.contactCard) {
        this.$store.commit("home/updateContactCard", true);
        //this.updateContactCard(true);
        //console.log("card-on")
      } else {
        this.$store.commit("home/updateContactCard", false);
        //console.log("card-off")
      }
    },

    updateTitle(data) {
      //console.log("data", data);
      this.$store.commit("home/updateHomeCounter", 1);
      var t = transition().duration(this.settings.duration / 10);
      var text = this.g.selectAll("text").data(data, d => d);

      text
        .exit()
        .transition(t)
        .attr("y", this.settings.height / 1.5)
        .style("fill", "#33b277")
        .style("fill-opacity", 1e-6)
        .remove();

      text
        .attr("y", this.settings.height / 1.5)
        .style("fill", "#686868")
        .style("fill-opacity", 1)
        .transition(t)
        .attr("x", (d, i) => i * 35);

      text
        .enter()
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

<style lang="scss">
@import "../../styles/home.scss";
</style>
