<template>
  <b-container id="hello" fluid>
    <b-row align-h="center">
      <b-col cols="12" sm="8" md="7" lg="6" xl="5">
        <svg
          id="guyName"
          pointer-events="all"
          viewBox="0 0 500 100"
          preserveAspectRatio="xMinYMin meet"
        />
      </b-col>
    </b-row>
    <hr class="my-4" />
    <b-row align-h="center">
      <b-col cols="10" sm="10" md="8" lg="7" xl="6">
        <p class="introduction">
          This portfolio shows a selection of my work. Each project on this site
          is done by myself, from design to engineering and the source code can
          be found
          <a href="https://framagit.org/getlarge/frontin" target="_blank"
            >here</a
          >. I hope you'll have a good time passing by.
        </p>
      </b-col>
    </b-row>
    <b-row v-if="!contactCard" align-h="center">
      <b-col cols="6" sm="4" lg="3">
        <a class="doors" accesskey="E" href="#/experience" title="Enter">
          <img
            :src="infoIcon"
            class="signs"
            @mouseover="infoIcon = iconInfo2"
            @mouseout="infoIcon = iconInfo"
            alt="info icon"
          />
        </a>
      </b-col>
      <b-col cols="6" sm="4" lg="3">
        <a
          class="doors"
          accesskey="C"
          title="Contact"
          @click="contactCard = !contactCard"
        >
          <img
            :src="letterIcon"
            class="signs"
            alt="hi icon"
            @mouseover="letterIcon = iconLetter2"
            @mouseout="letterIcon = iconLetter"
          />
        </a>
      </b-col>
    </b-row>
    <b-row
      v-else-if="
        contactCard && !available && frontCard !== null && backCard !== null
      "
      align-h="center"
    >
      <b-col class="card" cols="8" sm="8" md="6" lg="5" xl="4">
        <mq-layout class="card-mobile" mq="mobile">
          <info-card
            front-type="text"
            :front-title="frontCard.title"
            :front-data="frontCard.text1"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-tablet" mq="tablet">
          <info-card
            front-type="text"
            :front-title="frontCard.title"
            :front-data="frontCard.text1"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-laptop" mq="laptop">
          <info-card
            front-type="text"
            :front-title="frontCard.title"
            :front-data="frontCard.text1"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-desktop" mq="desktop">
          <info-card
            front-type="text"
            :front-title="frontCard.title"
            :front-data="frontCard.text1"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-xxl" mq="xxl">
          <info-card
            front-type="text"
            :front-title="frontCard.title"
            :front-data="frontCard.text1"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
      </b-col>
    </b-row>
    <b-row
      v-else-if="
        contactCard && available && frontCard !== null && backCard !== null
      "
      align-h="center"
    >
      <b-col class="card" cols="8" sm="8" md="6" lg="5" xl="4">
        <mq-layout class="card-mobile" mq="mobile">
          <info-card
            :front-type="'text'"
            :front-title="frontCard.title"
            :front-data="frontCard.text2"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-tablet" mq="tablet">
          <info-card
            :front-type="'text'"
            :front-title="frontCard.title"
            :front-data="frontCard.text2"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-laptop" mq="laptop">
          <info-card
            :front-type="'text'"
            :front-title="frontCard.title"
            :front-data="frontCard.text2"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-desktop" mq="desktop">
          <info-card
            :front-type="'text'"
            :front-title="frontCard.title"
            :front-data="frontCard.text2"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
        </mq-layout>
        <mq-layout class="card-xxl" mq="xxl">
          <info-card
            :front-type="'text'"
            :front-title="frontCard.title"
            :front-data="frontCard.text2"
            :back-title="backCard.title"
            :back-data="backCard.text"
            @click.native="contactCard = !contactCard"
          />
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
import { EventBus } from "@/services/PubSub";

export default {
  data() {
    return {
      settings: {
        width: 500,
        height: 100,
        duration: 10000
      },
      infoIcon: this.$store.state.style.pictures.iconInfo,
      letterIcon: this.$store.state.style.pictures.iconLetter
    };
  },

  components: {
    InfoCard
  },

  mounted() {
    this.g = select("#guyName").append("g");
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
    if (this.tutorial) {
      EventBus.$emit("stop:tutorial");
    }
    this.interv.stop();
  },

  computed: {
    serverURL() {
      return this.$store.state.serverURL;
    },
    tutorial() {
      return this.$store.state.tutorial;
    },
    tutorialText() {
      return this.$store.state.tutorial.text;
    },
    tutorialTags() {
      return this.$store.state.tutorial.tags;
    },
    tutorialImg() {
      return this.$store.state.tutorial.img;
    },
    letters() {
      return this.$store.state.letters;
    },
    updatedLetters() {
      return this.$store.state.updatedLetters;
    },
    iconInfo() {
      return this.$store.state.style.pictures.iconInfo;
    },
    iconInfo2() {
      return this.$store.state.style.pictures.iconInfo2;
    },
    iconLetter() {
      return this.$store.state.style.pictures.iconLetter;
    },
    iconLetter2() {
      return this.$store.state.style.pictures.iconLetter2;
    },
    availableIcon() {
      return this.$store.state.style.pictures.available;
    },
    notAvailableIcon() {
      return this.$store.state.style.pictures.notAvailable;
    },
    guyIcon() {
      return this.$store.state.style.pictures.guy;
    },
    updateCounter: {
      get() {
        return this.$store.state.updateCounter;
      },
      set(value) {
        this.$store.commit("updateCounter", value);
      }
    },
    contactCard: {
      get() {
        return this.$store.state.contactCard;
      },
      set(value) {
        this.$store.commit("updateContactCard", value);
      }
    },
    available: {
      get() {
        return this.$store.state.available;
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
          this.notAvailableIcon
        }></img><p class='text'></br>...on a mission, but you can send me your request anyway!</p></div>`,
        text2: `<img class='square' src=${
          this.$store.state.style.pictures.rectangle
        }><div><img class='trombi' src=${
          this.availableIcon
        }></img><p class='text'>Your project requires UI/UX design, frontend / backend development, or embedded system prototyping ?</br>Why not talking about it now.</p></div>`
      };
    },
    backCard() {
      return {
        title: "contact",
        text: `<img class='square' src=${
          this.$store.state.style.pictures.rectangleFlipped
        }><div><img class='trombi' style='opacity:0.8;' src=${
          this.guyIcon
        }></img><p class='text'>Edouard Maleix</br><a href=mailto:ed@${
          this.$store.state.domain
        }>ed@${this.$store.state.domain}</a></br><a href=tel:${
          this.$store.state.tel
        }>${
          this.$store.state.tel
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

    updateTitle(data) {
      //console.log("data", data);
      this.updateCounter = 1;
      const t = transition().duration(this.settings.duration / 10);
      const text = this.g.selectAll("text").data(data, d => d);

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
