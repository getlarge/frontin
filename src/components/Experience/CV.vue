<template>
  <div class="block" id="cv">
    <mq-layout class="pdfExport-mobile" mq="mobile">
      <v-touch title="export pdf" class="pdfExport" v-on:tap="transformPdf">
        <font-awesome-icon icon="download" size="2x" alt="download" />
      </v-touch>
    </mq-layout>
    <mq-layout class="pdfExport-tablet" mq="tablet">
      <v-touch title="export pdf" class="pdfExport" v-on:tap="transformPdf">
        <font-awesome-icon icon="download" size="2x" alt="download" />
      </v-touch>
    </mq-layout>
    <mq-layout class="pdfExport-laptop" mq="laptop">
      <button title="export pdf" class="pdfExport" @click="transformPdf">
        <font-awesome-icon icon="download" size="2x" alt="download" />
      </button>
    </mq-layout>
    <mq-layout class="pdfExport-desktop" mq="desktop">
      <button title="export pdf" class="pdfExport" @click="transformPdf">
        <font-awesome-icon icon="download" size="2x" alt="download" />
      </button>
    </mq-layout>
    <mq-layout class="pdfExport-xxl" mq="xxl">
      <button title="export pdf" class="pdfExport" @click="transformPdf">
        <font-awesome-icon icon="download" size="3x" alt="download" />
      </button>
    </mq-layout>

    <b-container class="container" fluid>
      <b-row class="content" align-h="center">
        <b-col sm="7" md="7">
          <div class="titles">
            <h1>Edouard Maleix</h1>
            <h2>Developer – Consultant</h2>
          </div>
          <div class="infos">
            <h3>
              <a :href="`tel:${tel}`">
                <font-awesome-icon class="icons" icon="phone" size="sm" />
                {{ tel }}
              </a>
            </h3>
            <h3>
              <a :href="`mailto:ed@${domain}`">
                <font-awesome-icon
                  class="icons"
                  icon="envelope-open"
                  size="sm"
                />
                ed@{{ domain }}
              </a>
            </h3>
            <h3>
              <a :href="'https://' + domain" target="_blank">
                <font-awesome-icon class="icons" icon="link" size="sm" />
                {{ domain }}
              </a>
            </h3>
            <h3>
              <p>
                <font-awesome-icon class="icons" icon="home" size="sm" />
                95 rue Paul Bellamy 44000 NANTES
              </p>
            </h3>
            <h3>
              <a>
                <font-awesome-icon class="icons" icon="language" size="sm" />
                French (<font-awesome-icon
                  v-for="item in fr"
                  :key="item.id"
                  icon="star"
                  size="xs"
                  class="icons"
                />) English (<font-awesome-icon
                  v-for="item in en"
                  :key="item.id"
                  icon="star"
                  size="xs"
                  class="icons"
                />) German (<font-awesome-icon
                  v-for="item in de"
                  :key="item.id"
                  icon="star"
                  size="xs"
                  class="icons"
                />)
              </a>
            </h3>
          </div>
        </b-col>
        <b-col class="pics" sm="5" md="5">
          <img :src="`${$store.state.clientUrl}${img1}`" class="face" alt="" />
        </b-col>
        <b-col class="articles" sm="12" md="12">
          <h2>Skills</h2>
          <div>
            <ul>
              <li>
                REST API - Realtime communication - MVC / MVVM architecture
              </li>
              <li>Build automation - application deployment</li>
              <li>
                Realtime data vizualisation - UI/UX design – Graphic creation
              </li>
              <li>Embedded development ( software & hardware )</li>
              <li>Agile - Scrum - Lean Startup</li>
            </ul>
          </div>
        </b-col>
        <b-col class="articles" sm="12" md="12">
          <h2>Experiences</h2>
          <div>
            <h3>DEVELOPER / CONSULTANT - FREELANCE</h3>
            <h4>october 2018 until now</h4>
            <ul>
              <li>
                Creating a web app for Yogi in my City - a social network
                linking Yoga teachers and studios
              </li>
              <li>
                In charge of backend / frontend development, and participation
                in webdesign
              </li>
              <li>Profile edition - search - geolocation - mapping</li>
              <li>Messenger - Agenda edition / matching</li>
              <li>Subscription / payment</li>
              <li>Access controlled by roles and tokens</li>
            </ul>
            <h5>Technical environment :</h5>
            <ul>
              <li>
                NodeJS, Loopback, Vue.js, Socket.io, Stripe, MongoDB,
                OpenCageData
              </li>
            </ul>
            <h4>july 2018 until september 2018</h4>
            <ul>
              <li>Developing my web portfolio ( getlarge.eu )</li>
              <li>Self-training : D3JS, Vue, Nativescript</li>
              <li>Training courses : React, Loopback</li>
              <li>
                Made contributions to open source projects ( Aloes, MySensors,
                IPSO alliance )
              </li>
            </ul>
            <h5>Technical environment :</h5>
            <ul>
              <li>NodeJS, ExpressJS, Webpack, SVG, Event-driven programming</li>
            </ul>
            <h4>november 2017 until june 2018</h4>
            <ul>
              <li>Participating to IoT platform development, Exostic</li>
              <li>
                Building web communication tools ( aloes.io -
                slides.aloes.io/pitch )
              </li>
              <li>
                Prototyped React components to illustrate use cases (
                app.aloes.io )
              </li>
              <li>
                Conceived & deployed LoRaWAN gateway and nodes ( hardware /
                software open source )
              </li>
              <li>Maintained development flow on Kanban boards</li>
              <li>Tested newly built functionnalities / notifying issues</li>
              <li>
                Trained bots, to act as assistants for visitors and platform
                users
              </li>
            </ul>
            <h5>Technical environment :</h5>
            <ul>
              <li>
                JavaScript, MQTT, HTTP, Git, React, CoffeeJS, Lora,
                Object-oriented programming
              </li>
            </ul>
          </div>
          <div>
            <h3>PROFESSIONAL RETRAINING</h3>
            <h4>april 2017 until november 2017</h4>
            <ul>
              <li>
                Programmed a wifi device manager ( authentification, config … ),
                and RF sensor modules
              </li>
              <li>Made contributions to open source projects ( mysensors )</li>
              <li>
                Launched and animated a hacker’s club ( hardware, software, web,
                3D print )
              </li>
              <li>Server administration ( cloud, printers, node-red apps )</li>
            </ul>
            <h5>Technical environment :</h5>
            <ul>
              <li>
                C++, Raspberry Pi, Nginx, Node-red, Kicad, Functional
                programming
              </li>
            </ul>
          </div>
          <div>
            <h3>ENTREPRENEUR / CRAFTSMAN - IVI</h3>
            <h4>april 2014 until april 2017</h4>
            <ul>
              <li>Created innovative growing medium</li>
              <li>Passionate landscape advisor</li>
              <li>Developed showcase website</li>
              <li>
                Market analysis & fast prototyping ( vegetal columns, connected
                sensors, 3D prints )
              </li>
            </ul>
            <h5>Technical environment :</h5>
            <ul>
              <li>Linux, HTML, CSS, Arduino, Cura</li>
            </ul>
          </div>
        </b-col>
        <b-col class="articles" sm="12" md="12">
          <h2>Interests</h2>
          <ul>
            <li>Botanic</li>
            <li>Innovation</li>
            <li>Open source</li>
            <li>Philosophy</li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { select } from "d3-selection";
import * as html2canvas from "html2canvas";
import * as jsPDF from "jspdf";

export default {
  name: "cv",

  data() {
    return {
      img1: "/img/ed2.jpg",
      fr: [1, 2, 3],
      en: [1, 2, 3],
      de: [1]
    };
  },

  created() {},

  mounted() {},

  computed: {
    serverUrl() {
      return this.$store.state.serverUrl;
    },
    domain() {
      return this.$store.state.domain;
    },
    tel() {
      return this.$store.state.tel;
    }
  },

  methods: {
    /// todo : chose methods below to transform SVG to PDF
    // Get the string representation of a DOM node (removes the node)
    domNodeToString(domNode) {
      var element = document.createElement("div");
      element.appendChild(domNode);
      return element.innerHTML;
    },

    serialize() {
      const xmlns = "http://www.w3.org/2000/xmlns/";
      const xlinkns = "http://www.w3.org/1999/xlink";
      const svgns = "http://www.w3.org/2000/svg";
      return function serialize(svg) {
        svg = svg.cloneNode(true);
        svg.setAttributeNS(xmlns, "xmlns", svgns);
        svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
        const serializer = new window.XMLSerializer();
        const string = serializer.serializeToString(svg);
        return new Blob([string], { type: "image/svg+xml" });
      };
    },

    svgToCanvas(className) {
      //var canvas = document.querySelector('.container')
      //var svg = document.querySelector(`.container .${className}`)
      var canvas = select(".container")
        .append("canvas")
        .attr("class", "screenShotTempCanvas");
      var svg = select(".container").select(className);
      var context = canvas.node().getContext("2d");
      //  var svgElems = document.getElementsByTagName("svg");
      // Convert SVG to Canvas
      // see: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
      var DOMURL = window.URL || window.webkitURL || window;
      var svgString = this.domNodeToString(svg.node());
      var image = new Image();
      var svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8"
      });
      var url = DOMURL.createObjectURL(svgBlob);
      image.onload = function() {
        context.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);
      };
      image.src = url;
    },

    transformPdf() {
      // for each svg .icons =>
      //this.svgToCanvas(".icons");
      var pdf = new jsPDF("p", "pt", "letter", "img", "svg", "path");
      pdf.internal.scaleFactor = 2;
      var options = {
        pagesplit: true,
        profile: true,
        letterRendering: 1,
        useCORS: true,
        allowTaint: false
      };

      html2canvas(document.querySelector(".block .container"), options).then(
        canvas => {
          //document.body.appendChild(canvas)
          //select(canvas).attr("class", "screenShotTempCanvas2");
          //var imgData = canvas.toDataURL();
          var imgData = canvas.toDataURL("image/png");
          pdf.addImage(imgData, "PNG", 10, 10);
          pdf.save("edouard_maleix_cv.pdf");
        }
      );

      //select('.screenShotTempCanvas2').remove();
      //select('.tempHide').enter().remove('tempHide');
      //select('.tempHide').enter().remove('tempHide');
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/cv.scss";
</style>
