<template>
     
    <div class="block" id="cv">

        <mq-layout class="pdfExport-mobile" mq="mobile">
            <v-touch class="pdfExport" v-on:tap="transformPdf" >
                <font-awesome-icon :icon="['fas', 'download']" size="2x" />
            </v-touch>
        </mq-layout>
        <mq-layout class="pdfExport-tablet" mq="tablet">
            <v-touch class="pdfExport" v-on:tap="transformPdf" >
                <font-awesome-icon :icon="['fas', 'download']" size="2x" />
            </v-touch>
        </mq-layout>        
        <mq-layout class="pdfExport-laptop" mq="laptop">
            <button class="pdfExport" @click="transformPdf">
                <font-awesome-icon :icon="['fas', 'download']" size="2x" />
            </button>
        </mq-layout>
        <mq-layout class="pdfExport-desktop" mq="desktop">
            <button class="pdfExport" @click="transformPdf">
                <font-awesome-icon :icon="['fas', 'download']" size="2x" />
            </button>
        </mq-layout>
        <mq-layout class="pdfExport-xxl" mq="xxl">
            <button class="pdfExport" @click="transformPdf">
                <font-awesome-icon :icon="['fas', 'download']" size="3x" />
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
                            <font-awesome-icon :icon="['fas', 'phone']" size="sm" /> {{tel}} 
                        </a></h3>
                        <h3><a :href="'mailto:ed@'+domain">
                            <font-awesome-icon :icon="['fas', 'envelope-open']" size="sm" /> ed@{{domain}}
                        </a></h3>
                        <h3><a :href="'https://'+domain" target='_blank'>
                            <font-awesome-icon :icon="['fas', 'link']" size="sm" /> {{domain}}
                        </a></h3>
                        <h3><a>
                            <font-awesome-icon :icon="['fas', 'home']" size="sm" /> 95 rue Paul Bellamy 44000 NANTES
                        </a></h3>
                        <h3><a>
                            <font-awesome-icon :icon="['fas', 'language']" size="sm" /> Français (<font-awesome-icon  v-for="item in fr" :key="item.id" :icon="['fas', 'star']" size="xs" />) Anglais (<font-awesome-icon  v-for="item in en" :key="item.id" :icon="['fas', 'star']" size="xs" />) Allemand (<font-awesome-icon  v-for="item in de" :key="item.id" :icon="['fas', 'star']" size="xs" />)
                        </a></h3>             
                    </div>
                </b-col>
                <b-col class="articles" xs="12" sm="5" md="5"  >
                    <img :src="serverURL+img1" class="face" alt="">
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12"  >
                    <h2>Résumé des compétences</h2>
                    <div>
                        <ul>
                            <li>Agile - Scrum - Lean Startup</li>
                            <li>Data visualization - gestion du temps réel </li>
                            <li>Analyse de marché - développement client - campagne de tests</li>
                            <li>UI/UX design - création graphique</li>
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
                            <li>Contributions au projet Aloes et d'autres libraires open source</li>
                        </ul>
                        <h5>Environnement technique :</h5>
                        <ul>
                            <li>D3JS, VueJS, Webpack, Inkscape</li>
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
                            <li>Développement et apprentissage d’un bot, assistant les utilisateurs; en interaction avec le backend Aloes</li>
                        </ul>
                        <h5>Environnement technique :</h5>
                        <ul>
                            <li>HTML, CSS, NodeJS, CoffeeJS, Git, Redis, ExpressJS, React, MQTT, Lora </li>
                        </ul>      
                    </div>
                    <div>
                        <h3>Reconversion pro</h3>
                        <h4>avril 2017 à novembre 2017</h4>
                        <ul>
                            <li>Création d'un logiciel embarqué pour connecter rapidement et simplement des capteurs sur Internet </li>
                            <li>Contributions à des librairies open source </li>
                            <li>Animation d'un réseau d'amateurs d'électronique, impression 3d et développement web</li>
                            <li>Conception et impression de pièces en 3D</li>
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
                            <li>Conception et réalisation de supports de culture</li>
                            <li>Conseil en aménagement paysager</li>
                            <li>Innovation et développement produit</li>
                        </ul>
                    </div>
                </b-col>
                <b-col class="articles" xs="12" sm="12" md="12"  >
                    <h2>Centres d'intérêts</h2>
                    <ul>
                        <li>Botanique</li>
                        <li>Philosophie</li>
                        <li>DIY</li>
                        <li>Innovation</li>
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
                pdf: new jsPDF('p','pt', 'letter'),
                //pdf: new jsPDF(),
                serverURL: config.httpServerURL,
                domain: config.domain,
                tel: config.tel,
                img1 : "static/img/ed2.jpg",
                fr: [1,2,3],
                en: [1,2,3],
                de:[1],
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
            transformPdf() {
                var self = this;
                    //var pdf = new jsPDF('p','pt', 'letter');
                    this.pdf.internal.scaleFactor = 1.9;
                    var options = {
                        pagesplit: true
                    };

                    html2canvas(document.querySelector('.block .container'), options, function(output) {
                        self.pdf.output(output);
                        //this.pdf.save('test.pdf');
                    });

                    // html2canvas(document.querySelector('.block .container'), options).then(function(canvas) {
                    //     //document.body.appendChild(canvas);
                    //     self.pdf.output(canvas);

                    // });
            },
        },
    }


</script>

<style lang="scss">

    #cv {
        .container {
            margin-top: 5%;
            margin-bottom: 5%;
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
            border-color: #f9b23e;
            color: #686868;
            box-shadow: 0 0 0 0.2rem  #f9b23e;

        }

        .pdfExport:hover {
            background-color: transparent;
            border: 1px;
            border-color: #f9b23e;
            color: #33b277;
        }

        .titles {
            h1 {
                font-size: 26px;
            }
            h2 {
                font-size: 22px;
            }
            padding-top: 4%;
        }

        .face {
            max-width : 60%;
            height: auto;
            margin-top: 5%;
            margin-left: 20%;
            border-radius: 4px;
        }

        .infos {
            margin-top: 5%;
            margin-bottom: 5%;
            h3 {
                font-size: 16px;
            }
            a {
                color: #686868;
            }
        }

        .articles {
            h2 {
                color: #029ea8; 
                font-size: 22px;
            }            
            h3 {
                font-size: 20px;
                margin-top: 3%;
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
                margin-bottom: 2%;

            }
            li {
                display: list-items;
                text-align: -webkit-match-parent;
            }
        }

    }
</style>