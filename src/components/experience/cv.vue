<template>
     
    <div class="block" id="cv">
        <mq-layout class="pdfExport-mobile" mq="mobile">
            <v-touch title="export pdf" class="pdfExport" v-on:tap="transformPdf" >
                <font-awesome-icon :icon="['fas', 'download']" size="2x" alt="download"/>
            </v-touch>
        </mq-layout>
        <mq-layout class="pdfExport-tablet" mq="tablet">
            <v-touch title="export pdf" class="pdfExport" v-on:tap="transformPdf" >
                <font-awesome-icon :icon="['fas', 'download']" size="2x" alt="download"/>
            </v-touch>
        </mq-layout>        
        <mq-layout class="pdfExport-laptop" mq="laptop">
            <button title="export pdf" class="pdfExport" @click="transformPdf">
                <font-awesome-icon :icon="['fas', 'download']" size="2x" alt="download"/>
            </button>
        </mq-layout>
        <mq-layout class="pdfExport-desktop" mq="desktop">
            <button title="export pdf" class="pdfExport" @click="transformPdf">
                <font-awesome-icon :icon="['fas', 'download']" size="2x" alt="download"/>
            </button>
        </mq-layout>
        <mq-layout class="pdfExport-xxl" mq="xxl">
            <button title="export pdf" class="pdfExport" @click="transformPdf">
                <font-awesome-icon :icon="['fas', 'download']" size="3x" alt="download"/>
            </button>
        </mq-layout>

        <b-container class="container" fluid >
            <b-row class="content" align-h="center">
                <b-col xs="12" sm="7" md="7" >
                    <div class="titles">
                       <h1 >Edouard Maleix</h1>
                        <h2>Développeur - Consultant</h2>
                    </div>
                    <div class='infos'>
                        <h3><a :href="'tel:'+tel">
                            <font-awesome-icon class="icons" :icon="['fas', 'phone']" size="sm" /> {{tel}} 
                        </a></h3>
                        <h3><a :href="'mailto:ed@'+domain">
                            <font-awesome-icon class="icons" :icon="['fas', 'envelope-open']" size="sm" /> ed@{{domain}}
                        </a></h3>
                        <h3><a :href="'https://'+domain" target='_blank'>
                            <font-awesome-icon class="icons" :icon="['fas', 'link']" size="sm" /> {{domain}}
                        </a></h3>
                        <h3><a>
                            <font-awesome-icon class="icons" :icon="['fas', 'home']" size="sm" /> 95 rue Paul Bellamy 44000 NANTES
                        </a></h3>
                        <h3><a>
                            <font-awesome-icon class="icons" :icon="['fas', 'language']" size="sm" /> Français (<font-awesome-icon class="icons" v-for="item in fr" :key="item.id" :icon="['fas', 'star']" size="xs" />) Anglais (<font-awesome-icon class="icons" v-for="item in en" :key="item.id" :icon="['fas', 'star']" size="xs" />) Allemand (<font-awesome-icon class="icons" v-for="item in de" :key="item.id" :icon="['fas', 'star']" size="xs" />)
                        </a></h3>             
                    </div>
                </b-col>
                <b-col class="pics" xs="12" sm="5" md="5"  >
                    <img :src="serverURL+img1" class="face" alt="">
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12"  >
                    <h2>Résumé des compétences</h2>
                    <div>
                        <ul>
                            <li>Visualisation données en temps réel - UI/UX design - Création graphique</li>
                            <li>Architecture évenementielle et microservices</li>
                            <li>Développement embarqué ( logiciel et électronique )</li>
                            <li>Agile - Scrum - Lean Startup</li>
                            <li>Analyse de marché - Design produit - Campagne de tests</li>
                        </ul>             
                    </div>
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12" >
                    <h2>Expériences</h2>
                    <div>
                        <h3>Développeur / Consultant - Free</h3>
                        <h4>juin 2018 à maintenant</h4>
                        <ul>
                            <li>Développement d'un portfolio web</li>
                            <li>Contributions à plusieurs libraires open source ( aloes, rocketchat, ipso, mysensors ) </li>
                        </ul>
                        <h5>Environnement technique :</h5>
                        <ul>
                            <li>ExpressJS, D3JS, VueJS, Webpack, Inkscape</li>
                        </ul>      
                    </div>
                    <div>
                        <h3>Développeur / Consultant - Exostic</h3>
                        <h4>novembre 2017 à juin 2018</h4>
                        <ul>
                            <li>Développement d'outils de communications ( pitch, site vitrine ) </li>
                            <li>Suivi de projets clients </li>
                            <li>Conception de PCB pour prototypage rapide d'objet connecté </li>
                            <li>Conception de gateway et node LoRaWAN ( open source ) </li>
                            <li>Développement et entraînement d’un bot assistant les utilisateurs; en interaction avec une plateforme IoT</li>
                        </ul>
                        <h5>Environnement technique :</h5>
                        <ul>
                            <li>HTML, CSS, NodeJS, CoffeeJS, Git, Redis, React, MQTT, Lora </li>
                        </ul>      
                    </div>
                    <div>
                        <h3>Reconversion pro</h3>
                        <h4>avril 2017 à novembre 2017</h4>
                        <ul>
                            <li>Création d'un logiciel embarqué pour connecter rapidement et simplement des capteurs sur Internet </li>
                            <li>Contributions à des librairies open source ( mysensors ) </li>
                            <li>Animation d'un réseau d'amateurs d'électronique, impression 3D et développement web ( DIY )</li>
                            <li>Conception de pièces en 3D</li>
                        </ul>
                        <h5>Environnement technique :</h5>
                        <ul>
                            <li>Arduino, Raspberry Pi, Nginx, Node-red, Linux, Kicad, Cura</li>
                        </ul>   
                    </div>
                    <div>
                        <h3>Entrepreneur / Artisan - IVI</h3>
                        <h4>avril 2014 à avril 2017</h4>
                        <ul>
                            <li>Conception et réalisation de supports de culture innovants</li>
                            <li>Conseil en aménagement paysager</li>
                            <li>Définition d'une stratégie commerciale</li>
                        </ul>
                    </div>
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12"  >
                    <h2>Centres d'intérêts</h2>
                    <ul>
                        <li>Botanique</li>                        
                        <li>Innovation</li>
                        <li>Open source</li>
                        <li>Philosophie</li>
                    </ul>
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script >

    import config from "@/config.json"
    import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
    import { select, selectAll } from "d3-selection"
    import * as html2canvas from "html2canvas"
    import * as jsPDF from "jspdf"

    export default {
        name: 'cv',

        data() {
            return {
                serverURL: config.httpServerURL,
                domain: config.domain,
                tel: config.tel,
                img1 : "static/img/ed2.jpg",
                fr: [1,2,3],
                en: [1,2,3],
                de: [1],
            };
        },

        components: {
            FontAwesomeIcon,
        },

        created() {

        },

        mounted() {

        },

        methods: {


            // Get the string representation of a DOM node (removes the node)
            domNodeToString(domNode) {
                var element = document.createElement("div");
                element.appendChild(domNode);
                return element.innerHTML;
            },

            svgToCanvas (className) {
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
            background: rgba(255,255,255,1);
            color: #686868;
            z-index: 1000 !important;
            box-shadow: 0 1px 5px rgba(0,0,0,0.4);
            -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
            border:2px solid rgba(200,200,200,0.85);
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
            fill : #01c669 !important;
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
            box-shadow: 0 0 0 0.2rem  #f9b23e;

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
            max-width : 60%;
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