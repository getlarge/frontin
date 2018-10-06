<template>
     
    <div class="block" id="cv">
        <mq-layout class="pdfExport-mobile" mq="mobile">
            <v-touch title="export pdf" class="pdfExport" v-on:tap="transformPdf" >
                <font-awesome-icon icon="download" size="2x" alt="download"/>
            </v-touch>
        </mq-layout>
        <mq-layout class="pdfExport-tablet" mq="tablet">
            <v-touch title="export pdf" class="pdfExport" v-on:tap="transformPdf" >
                <font-awesome-icon icon="download" size="2x" alt="download"/>
            </v-touch>
        </mq-layout>        
        <mq-layout class="pdfExport-laptop" mq="laptop">
            <button title="export pdf" class="pdfExport" @click="transformPdf">
                <font-awesome-icon icon="download" size="2x" alt="download"/>
            </button>
        </mq-layout>
        <mq-layout class="pdfExport-desktop" mq="desktop">
            <button title="export pdf" class="pdfExport" @click="transformPdf">
                <font-awesome-icon icon="download" size="2x" alt="download"/>
            </button>
        </mq-layout>
        <mq-layout class="pdfExport-xxl" mq="xxl">
            <button title="export pdf" class="pdfExport" @click="transformPdf">
                <font-awesome-icon icon="download" size="3x" alt="download"/>
            </button>
        </mq-layout>

        <b-container class="container" fluid >
            <b-row class="content" align-h="center">
                <b-col xs="12" sm="7" md="7" >
                    <div class="titles">
                       <h1 >Edouard Maleix</h1>
                        <h2>Developer – Consultant</h2>
                    </div>
                    <div class='infos'>
                        <h3><a :href="'tel:'+tel">
                            <font-awesome-icon class="icons" icon="phone" size="sm" /> {{tel}} 
                        </a></h3>
                        <h3><a :href="'mailto:ed@'+domain">
                            <font-awesome-icon class="icons" icon="envelope-open" size="sm" /> ed@{{domain}}
                        </a></h3>
                        <h3><a :href="'https://'+domain" target='_blank'>
                            <font-awesome-icon class="icons" icon="link" size="sm" /> {{domain}}
                        </a></h3>
                        <h3><a>
                            <font-awesome-icon class="icons" icon="home" size="sm" /> 95 rue Paul Bellamy 44000 NANTES
                        </a></h3>
                        <h3><a>
                            <font-awesome-icon class="icons" icon="language" size="sm" /> French (<font-awesome-icon class="icons" v-for="item in fr" :key="item.id" icon="star" size="xs" />) English (<font-awesome-icon class="icons" v-for="item in en" :key="item.id" icon="star" size="xs" />) German (<font-awesome-icon class="icons" v-for="item in de" :key="item.id" icon="star" size="xs" />)
                        </a></h3>             
                    </div>
                </b-col>
                <b-col class="pics" xs="12" sm="5" md="5"  >
                    <img :src="serverURL+img1" class="face" alt="">
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12"  >
                    <h2>Skills</h2>
                    <div>
                        <ul>
                            <li>Realtime data vizualisation - UI/UX design – Graphic creation</li>
                            <li>Embedded development ( software & hardware )</li>
                            <li>Agile - Scrum - Lean Startup</li>
                            <li>Market Analysis – Product design – Testing campaigns</li>
                        </ul>             
                    </div>
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12" >
                    <h2>Experiences</h2>
                    <div>
                        <h3>DEVELOPER / CONSULTANT - FREELANCE</h3>
                        <h4>july 2018 until now</h4>
                        <ul>
                            <li>Developed a web portfolio ( getlarge.eu )</li>
                            <li>Self-training : D3JS, Vue, Nativescript </li>
                            <li>Training courses : React, Loopback </li>
                            <li>Made contributions to open source projects ( Aloes, MySensors, IPSO alliance )</li>
                        </ul>
                        <h5>Technical environment :</h5>
                        <ul>
                            <li>NodeJS, ExpressJS, Webpack, SVG, Event-driven programming</li>
                        </ul>      
                    </div>
                    <div>
                        <h3>DEVELOPER / CONSULTANT - EXOSTIC</h3>
                        <h4>november 2017 until june 2018</h4>
                        <ul>
                            <li>Built web communication tools ( aloes.io - slides.aloes.io/pitch )</li>
                            <li>Customers and testers follow up ( Excel spreadsheets, testing result summaries,  ... ) </li>
                            <li>Prototyped React components to illustrate use cases ( app.aloes.io )</li>
                            <li>Conceived & deployed  LoRaWAN gateway and nodes ( hardware / software open sourced ) </li>
                            <li>Maintained development flow on Kanban boards</li>
                            <li>Tested newly built functionnalities / notifying issues</li>
                            <li>Trained bots, to act as assistants for visitors and platform users</li>
                        </ul>
                        <h5>Technical environment :</h5>
                        <ul>
                            <li>JavaScript, MQTT, HTTP, Git, React, CoffeeJS, Lora, Object-oriented programming</li>
                        </ul>      
                    </div>
                    <div>
                        <h3>PROFESSIONAL RETRAINING</h3>
                        <h4>april 2017 until november 2017</h4>
                        <ul>
                            <li>Programmed a wifi device manager ( authentification, config … ), and RF sensor modules</li>
                            <li>Made contributions to open source projects ( mysensors ) </li>
                            <li>Launched and animated a hacker’s club ( hardware, software, web, 3D print )</li>
                            <li>Server administration ( cloud, printers, node-red apps )</li>
                        </ul>
                        <h5>Technical environment :</h5>
                        <ul>
                            <li>C++, Raspberry Pi, Nginx, Node-red, Kicad, Functional programming</li>
                        </ul>   
                    </div>
                    <div>
                        <h3>ENTREPRENEUR / CRAFTSMAN - IVI</h3>
                        <h4>april 2014 until april 2017</h4>
                        <ul>
                            <li>Created innovative growing medium</li>
                            <li>Passionate landscape advisor</li>
                            <li>Developed showcase website</li>
                            <li>Market analysis & fast prototyping ( vegetal columns, connected sensors, 3D prints )</li>
                        </ul>
                        <h5>Technical environment :</h5>
                        <ul>
                            <li>Linux, HTML, CSS, Arduino, Cura </li>
                        </ul>  
                    </div>
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12"  >
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

<script >

    import { mapState } from "vuex";
    import { select, selectAll } from "d3-selection";
    import * as html2canvas from "html2canvas";
    import * as jsPDF from "jspdf";

    export default {
        name: 'cv',

        data() {
            return {
                img1 : "static/img/ed2.jpg",
                fr: [1,2,3],
                en: [1,2,3],
                de: [1],
            };
        },

        created() {

        },

        mounted() {

        },

        computed: {
            ...mapState({
                serverURL: state => state.base.serverURL,
                domain: state => state.base.domain,
                tel: state => state.base.tel,
            }),
        },

        methods: {

            /// todo : chose methods below to transform SVG to PDF  
            // Get the string representation of a DOM node (removes the node)
            domNodeToString(domNode) {
                var element = document.createElement("div");
                element.appendChild(domNode);
                return element.innerHTML;
            },

            serialize(svg) {
                const xmlns = "http://www.w3.org/2000/xmlns/";
                const xlinkns = "http://www.w3.org/1999/xlink";
                const svgns = "http://www.w3.org/2000/svg";
                return function serialize(svg) {
                    svg = svg.cloneNode(true);
                    svg.setAttributeNS(xmlns, "xmlns", svgns);
                    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
                    const serializer = new window.XMLSerializer;
                    const string = serializer.serializeToString(svg);
                    return new Blob([string], {type: "image/svg+xml"});
              };
            },

            svgToCanvas (className) {
                //var canvas = document.querySelector('.container') 
                //var svg = document.querySelector(`.container .${className}`)
                var canvas = select(".container").append("canvas").attr("class", "screenShotTempCanvas");
                var svg = select(".container").select(className)
                var context = canvas.node().getContext("2d");
                var svgElems = document.getElementsByTagName("svg");
                // Convert SVG to Canvas
                // see: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
                var DOMURL = window.URL || window.webkitURL || window;

                var svgString = this.domNodeToString(svg.node());
                
                var image = new Image();
                var svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
                var url = DOMURL.createObjectURL(svgBlob);

                image.onload = function() {
                    context.drawImage(image, 0, 0);
                    DOMURL.revokeObjectURL(url);
                }
                image.src = url;
            },


            transformPdf() {
                // for each svg .icons =>
                //this.svgToCanvas(".icons");
                var pdf = new jsPDF('p','pt', 'letter', 'img', 'svg', 'path');
                pdf.internal.scaleFactor = 1.7;
                var options = {
                    pagesplit: true,
                    profile: true,
                    letterRendering: 1,
                    useCORS: true,
                    allowTaint : false                
                };
     
                html2canvas(document.querySelector('.block .container'), options).then(canvas => {
                    //document.body.appendChild(canvas)
                    //select(canvas).attr("class", "screenShotTempCanvas2");
                    //var imgData = canvas.toDataURL(); 
                    var imgData = canvas.toDataURL('image/png'); 
                    pdf.addImage(imgData, 'PNG', 10, 10);
                    pdf.save('edouard_maleix_cv.pdf');
                });

                //select('.screenShotTempCanvas2').remove();
                //select('.tempHide').enter().remove('tempHide');
                //select('.tempHide').enter().remove('tempHide');

            },


        },
    }


</script>

<style lang="scss">
#cv {
    .container {
        margin-top: 4%;
        margin-bottom: 4%;
        margin-left: 3%;
        margin-left: 3%;
        border-radius: 5px;
        background: rgba(255, 255, 255, 1);
        color: #686868;
        z-index: 1000 !important;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
        border: 2px solid rgba(200, 200, 200, 0.85);
    }

    .content {
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        margin-bottom: 2%;
    }

    .pdfExport {
        margin-top: 1%;
        margin-left: 5%;
        z-index: 1500;
        background-color: white;
        fill: #01c669 !important;
        border: 0px;
        border-color: #f9b23e;
        color: #686868;
    }

    .pdfExport:focus {
        background-color: white;
        border: 1px;
        border-radius: 2px;
        border-color: #f9b23e;
        color: #686868;
        box-shadow: 0 0 0 0.2rem #f9b23e;
    }

    .pdfExport:hover {
        background-color: transparent;
        border: 1px;
        border-radius: 2px;
        border-color: #f9b23e;
        color: #33b277;
    }

    .titles {
        h1 {
            text-align: left;
            font-size: 26px;
        }
        h2 {
            font-size: 22px;
        }
        padding-top: 3%;
    }

    .face {
        max-width: 60%;
        height: auto;
        margin-top: 5%;
        margin-left: 20%;
        border-radius: 4px;
    }

    .infos {
        margin-top: 4%;
        margin-bottom: 0%;
        h3 {
            font-size: 18px;
        }
        a {
            color: #686868;
        }
    }

    .icons path {
        fill: #01c669 !important;
        opacity: 0.8;
    }

    .articles {
        h2 {
            margin-top: 0%;
            color: #029ea8;
            font-size: 22px;
        }
        h3 {
            font-size: 20px;
            margin-top: 2%;
            margin-left: 2%;
            text-transform: uppercase;
        }
        h4 {
            color: #01c669;
            font-size: 18px;
            margin-left: 2%;
        }
        h5 {
            font-size: 18px;
            margin-left: 5%;
        }
        ul {
            font-size: 18px;
            margin-left: 6%;
            margin-top: 1%;
            margin-bottom: 1%;
        }
        li {
            display: list-item;
            text-align: -webkit-match-parent;
        }
    }
}
</style>
