<template>
  <div class="block" id="cv">
    <mq-layout class="pdfExport-mobile" mq="mobile">
      <button title="export pdf" class="pdfExport" @click="transformPdf">
        <font-awesome-icon icon="download" size="2x" alt="download" />
      </button>
    </mq-layout>
    <mq-layout class="pdfExport-tablet" mq="tablet">
      <button title="export pdf" class="pdfExport" @click="transformPdf">
        <font-awesome-icon icon="download" size="2x" alt="download" />
      </button>
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
            <h2>Developer</h2>
          </div>
          <div class="infos">
            <h3>
              <a :href="`mailto:ed@${domain}`">
                <font-awesome-icon class="icons" icon="envelope-open" size="sm" />
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
                1030 VIENNA
              </p>
            </h3>
            <h3>
              <a>
                <font-awesome-icon class="icons" icon="language" size="sm" />
                French (<font-awesome-icon v-for="item in fr" :key="item.id" icon="star" size="xs" class="icons" />)
                English (<font-awesome-icon v-for="item in en" :key="item.id" icon="star" size="xs" class="icons" />)
                German (<font-awesome-icon v-for="item in de" :key="item.id" icon="star" size="xs" class="icons" />)
              </a>
            </h3>
          </div>
        </b-col>
        <b-col class="pics" sm="5" md="5">
          <img :src="`${$store.state.clientUrl}${img1}`" class="face" alt="" />
        </b-col>
        <br />
        <b-col class="articles" sm="12" md="12">
          <h2 class="main-block">Skills</h2>
          <div>
            <ul>
              <li>
                REST, Async and GraphQL API – MVC / MVVM architecture
              </li>
              <li>Build automation and app deployment</li>
              <li>
                Data vizualisation - UI/UX design – Graphic creation
              </li>
              <li>Embedded development ( software & hardware )</li>
              <li>Agile - Scrum - Lean Startup</li>
            </ul>
          </div>
        </b-col>
        <b-col class="articles" sm="12" md="12">
          <h2 class="main-block">Experiences</h2>
          <div>
            <h4 class="dates">10/2020</h4>
            <ul>
              <li>
                Build a notarization platform for materials ( S1Seven, Vienna )
              </li>
              <li>
                Create JSON schemas and renderers for various material certificate types ( EN10168, E-CoC, ... ) and
                distribute them.
              </li>
              <li>
                Build an open source library to build, validate and render (as HTML or PDF) certificates ( schema-tools
                ).
              </li>
              <li>
                Build various PoC to answer specific customer use cases.
              </li>
              <li>
                Create services to notarize documents on blockchain while maintaining keys privacy.
              </li>
              <li>
                Contribute to BigChainDB repositories.
              </li>
              <li>
                Design and implement micro service architecture that reflects business requirements for the platform.
              </li>
              <li>
                Tasks planning and estimation.
              </li>
              <p class="techs">
                # MQTT, # NODE.JS, # TYPESCRIPT, # BIGCHAINDB, # LERNA
              </p>
            </ul>

            <h4 class="dates">06/2020 - 10 /2020</h4>
            <ul>
              <li>
                Participating to the creation of an advertisement platform ( Insticore, Vienna )
              </li>
              <li>
                Integrating Facebook and Linkedin Marketing APIs in a unified API
              </li>
              <li>
                Implementing new services, controllers and tests on the backend
              </li>
              <li>
                Building new UI components Working on SQL query optimizations
              </li>
              <p class="techs">
                # SCRUM, # TYPESCRIPT, #POSTGRESQL, # NEST.JS, # ANGULAR, # JEST
              </p>
            </ul>

            <h4 class="dates">02/2020 - 06/2020</h4>
            <ul>
              <li>
                Working on a SaaS booking solution for tourism ( Cube Tech, Vienna )
              </li>
              <li>Auditing and improving the existing GraphQL API</li>
              <li>
                Code refactoring ( transfer SQL PLV8 functions to the main application, analyze codebase and modularize,
                ... )
              </li>
              <li>Increasing code coverage ( end2end tests )</li>
              <li>Creating a file service with dynamic resizing</li>
              <li>
                Implementing booking notifications feed with PubSub ( back-end / front-end )
              </li>
              <li>
                Contributing to the open-source framework used on the backend ( Shyft )
              </li>
              <p class="techs">
                # NODE.JS, # GRAPHQL, # TYPESCRIPT, # POSTGRESQL, # REACT, # JEST
              </p>
            </ul>

            <h4 class="dates">09/2019 - 11/2019</h4>
            <ul>
              <li>
                Vue.js lecturer at school of design and communication ( ECV Nantes )
              </li>
              <li>
                Writing lessons plan, using Aloes as backbone and API provider
              </li>
              <li>
                Creating use cases for students projects ( IoT digital twin )
              </li>
              <li>
                Overview of the framework principles
              </li>
              <li>
                Studying and testing interactions via HTTP and MQTT transport
              </li>
              <li>
                Individual code review
              </li>
              <p class="techs">
                # VUE.JS, # JAVASCRIPT, # IOT, # ALOES
              </p>
            </ul>

            <h4 class="dates">08/2019</h4>
            <ul>
              <li>
                Self training: IOTA , Docker
              </li>
              <li>
                Realizing PoC to trigger Aloes devices actions by IOTA transactions ( user → device, device→ account ),
                persisting sensor data via MAM publish
              </li>
              <li>
                Containerize Aloes environment for faster deployement
              </li>
              <p class="techs">
                # IOTA.JS, # DOCKER
              </p>
            </ul>

            <h4 class="dates">04/2019 - 10/2019</h4>
            <ul>
              <li>
                Conceiving and setting up devices network applied to an escape game scenario.
              </li>
              <li>
                Implementing Aloes to manage devices and pipe communications to REST and MQTT API
              </li>
              <li>
                Developping firmwares for Arduino uno and ESP8266 and Node Red flows for RaspberryPi to interact with
                players and Aloes network.
              </li>
              <li>
                Writing processes representing rules of the escape game ( filtering incoming MQTT payloads, and
                reactions trigger )
              </li>
              <li>
                Developping control interfaces and dashboard for gamemasters
              </li>
              <li>
                Teaching customers, the basics of Node-Red development to customize scenarios themselves
              </li>
              <p class="techs">
                # NODE.JS, # VUE.JS, # NODE-RED ,# C++, # ARDUINO, # DOCKER
              </p>
            </ul>

            <h4 class="dates">03/2019</h4>
            <ul>
              <li>
                Animated portfolio for a graphic designer / art director
              </li>
              <li>
                Dynamic content generation from JSON file
              </li>
              <p class="techs">
                # VUE.JS, # WEBPACK
              </p>
            </ul>

            <h4 class="dates">01/2019 - 10/2020</h4>
            <ul>
              <li>
                Back on Aloes project to implement V2 and opening sources ( github.com/aloes-io )
              </li>
              <li>
                Defining transport and messaging protocol, based on Open Mobile Alliance
              </li>
              <li>
                Accessing microservices via REST and MQTT API ( device-manager )
              </li>
              <li>
                Encode / decode IoT devices native protocol from / to Aloes Client API ( aloes-handlers library )
              </li>
              <li>
                Building reusable web components with Vue.JS ( sensor-snap library )
              </li>
              <li>
                Binding REST and MQTT API with GraphQL to build higher level API gateway caching results (
                device-manager-graphql )
              </li>
              <li>Adding unit tests on critical functions and code examples</li>
              <p class="techs">
                # NODE.JS # MQTT, # LOOPBACK, # REDIS, # LORAWAN, #OPEN MOBILE ALLIANCE, # GRAPHQL, # MOCHA , # BABEL
              </p>
            </ul>

            <h4 class="dates">10/2018 - 02/2019</h4>
            <ul>
              <li>
                Developing and deploying a web app / social network ( Yogi in my City )
              </li>
              <li>
                In charge of backend / frontend development, and participation in webdesign
              </li>
              <li>Profile edition - search - geolocation - mapping</li>
              <li>Messenger - Agenda edition / matching</li>
              <li>Subscription / payment</li>
              <li>Access controlled by roles and tokens</li>
              <p class="techs">
                # LOOPBACK, # VUE.JS, # SOCKET.IO, # MONGODB, # PM2, # STRIPE
              </p>
            </ul>

            <h4 class="dates">08/2018 - 09/2018</h4>
            <ul>
              <li>Developing my web portfolio ( getlarge.eu )</li>
              <li>Self-training : D3JS, Vue, Nativescript</li>
              <li>Training courses : React, Loopback</li>
              <li>
                Made contributions to open source projects ( Aloes, MySensors, IPSO alliance )
              </li>
              <p class="techs">
                # NODE.JS # EXPRESS.JS, # WEBPACK, # D3.JS, # VUE.JS
              </p>
            </ul>

            <h4 class="dates">11/2017 - 06/2018</h4>
            <ul>
              <li>Building web communication tools ( Exostic )</li>
              <li>Finding customers and testers + driving interviews</li>
              <li>Prototyping React components to answer customer use cases</li>
              <li>
                Designing & deploying LoRaWAN gateway and nodes ( hardware / software open sourced )
              </li>
              <li>Maintaining development flow on Kanban boards</li>
              <li>
                Training bots, to act as assistants for visitors and platform users
              </li>
              <p class="techs">
                # JAVASCRIPT # MQTT, # REACT, # GIT, # COFFEEJS , # LORAWAN
              </p>
            </ul>
          </div>
        </b-col>
        <b-col class="articles" sm="12" md="12">
          <h2 class="main-block">Interests</h2>
          <ul>
            <li>Botanic</li>
            <li>Open source development</li>
            <li>Philosophy</li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { select } from 'd3-selection';
import * as html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default {
  name: 'cv',

  data() {
    return {
      img1: '/img/ed2.jpg',
      fr: [1, 2, 3],
      en: [1, 2, 3],
      de: [1],
    };
  },

  computed: {
    serverUrl() {
      return this.$store.state.serverUrl;
    },
    domain() {
      return this.$store.state.domain;
    },
    tel() {
      return this.$store.state.tel;
    },
  },

  methods: {
    /// todo : chose methods below to transform SVG to PDF
    // Get the string representation of a DOM node (removes the node)
    domNodeToString(domNode) {
      const element = document.createElement('div');
      element.appendChild(domNode);
      return element.innerHTML;
    },

    serialize() {
      const xmlns = 'http://www.w3.org/2000/xmlns/';
      const xlinkns = 'http://www.w3.org/1999/xlink';
      const svgns = 'http://www.w3.org/2000/svg';
      return function serialize(svg) {
        svg = svg.cloneNode(true);
        svg.setAttributeNS(xmlns, 'xmlns', svgns);
        svg.setAttributeNS(xmlns, 'xmlns:xlink', xlinkns);
        const serializer = new window.XMLSerializer();
        const string = serializer.serializeToString(svg);
        return new Blob([string], { type: 'image/svg+xml' });
      };
    },

    svgToCanvas(className) {
      const canvas = select('.container')
        .append('canvas')
        .attr('class', 'screenShotTempCanvas');
      const svg = select('.container').select(className);
      const context = canvas.node().getContext('2d');
      //  const svgElems = document.getElementsByTagName("svg");
      // Convert SVG to Canvas
      // see: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
      const DOMURL = window.URL || window.webkitURL || window;
      const svgString = this.domNodeToString(svg.node());
      const image = new Image();
      const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const url = DOMURL.createObjectURL(svgBlob);
      image.onload = () => {
        context.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);
      };
      image.src = url;
    },

    async transformPdf() {
      // for each svg .icons =>
      //this.svgToCanvas(".icons");

      const cvContainer = document.querySelector('.block .container');
      const containerWidth = cvContainer.clientWidth;
      const containerHeight = cvContainer.clientHeight;
      const topLeftMargin = 15;
      const pdfPageWidth = containerWidth + topLeftMargin * 2;
      const pdfPageHeight = pdfPageWidth * 1.5 + topLeftMargin * 2;
      const pdfPageFormat = [pdfPageWidth, pdfPageHeight];
      const totalPDFPages = Math.ceil(containerHeight / pdfPageHeight) - 1;

      html2canvas(cvContainer, {
        logging: false,
        useCORS: true,
        allowTaint: false,
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          const pdf = new jsPDF('p', 'pt', pdfPageFormat, true);
          pdf.addImage(imgData, 'JPEG', topLeftMargin, topLeftMargin, containerWidth, containerHeight);

          for (let i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(pdfPageFormat, 'p');
            pdf.addImage(
              imgData,
              'JPEG',
              topLeftMargin,
              -(pdfPageHeight * i) + topLeftMargin,
              containerWidth,
              containerHeight,
            );
          }

          return pdf.save('edouard_maleix_cv.pdf', { returnPromise: true });
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/cv.scss';
</style>
