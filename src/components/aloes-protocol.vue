<template>
    <div id="tables">
        <b-container  fluid>
            <b-row >        
                <b-col xs="5" sm="4" md="3" lg="3" xl="2">
                    <b-dropdown id="ddown-split" split text="Table selector" class="m-2">
                        <b-dropdown-item-button  @click="dataPath('static/data/sensors.json')">Sensors Type</b-dropdown-item-button>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button  @click="dataPath('static/data/ressources.json')">Ressources Type</b-dropdown-item-button>
                    </b-dropdown>
                </b-col>
                <b-col class="desc"  xs="7" sm="8" md="9" lg="9" >
                    <p>Global views describing <a href="https://github.com/IPSO-Alliance/pub">IPSO Protocol</a></p>
                </b-col>
            </b-row>
        </b-container>
        <div id="aloes-table">
        </div> 
    </div>
</template>

<script>

    import config from '@/config.json'
    import { keys } from "d3-collection"
    import { json } from "d3-fetch"
    import { hierarchy, tree } from "d3-hierarchy"
    import { event, select, selectAll } from "d3-selection"
    import { EventBus } from '@/main'

    export default {
        data() {
            return {
                serverURL: config.httpServerURL,
                path: "static/data/sensors.json",
                pageTopic: "getlarge" + this.$route.path,
                width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                selectedColumns: [],
            }
        },

        mounted() {
            var self = this;
            this.tableLoader(this.serverURL+this.path, this.selectedColumns);
            EventBus.$on('update:table', path => {
                select('#ipso-table').remove();
                self.tableLoader(self.serverURL+path, self.selectedColumns);
            });
        },

        updated() {
            //console.log("updated")
        },

        beforeDestroy() {
            EventBus.$emit("stop:tutorial");
        },

        watch: {

        },

        methods: {
            columnSelector(selection) {
                this.selectedColumns = selection;
            },

            dataPath(path) {
                EventBus.$emit("update:table", path);
            },

            tableLoader(dataPath, colums) {
                var self = this;
                json(dataPath).then(function(obj) {
                    var root = hierarchy(obj);
                    var nodes = root.descendants();
                    var titles = keys(nodes[0].data.tables[0]);
                    self.tabulate(nodes[0].data.tables, titles); 
                   //self.tabulate(nodes[0].data.tables, ['name', 'description', 'ipsoId', 'ressources', 'colors', 'img']); 
              });
            },

            tabulate(obj, titles) {
                var self = this;
                var sortAscending = true;
                var table = select('#aloes-table').append('table').attr("id", "ipso-table")
                var headers = table.append('thead')
                                .append('tr')
                                .selectAll('th')
                                //.data(columns).enter()
                                .data(titles).enter()
                                .append('th')
                                .text((d) => d )
                                .on('click', function (d) {
                                    headers.attr('class', 'header');
                                    if (sortAscending) {
                                        rows.sort((a, b) => b[d] < a[d] );
                                        console.log(rows.sort((a, b) => b[d].toString() < a[d].toString() ))
                                        sortAscending = false;
                                        this.className = 'aes';
                                    } else {
                                        rows.sort((a, b) => b[d].toString() > a[d].toString() );
                                        sortAscending = true;
                                        this.className = 'des';
                                    }
                                });
                var rows = table.append('tbody').selectAll('tr')
                  .data(obj)
                  .enter()
                  .append('tr');
                rows.selectAll('td')
                    .data(function (row) {
                        return titles.map(function (column) {
                            //return {column: column, value: row[column]};
                            if ( column !== "img" &&  column !== "colors") {
                                return {column: column, value: row[column]};
                            }
                            if ( column === "img") {
                                return {column: column, link: row[column]};
                            }
                            if ( column === "colors") {
                                return {column: column, colors: row[column]};
                            }
                            else {
                                return {column: column, value: row[column]};
                            }                               
                        });
                    })
                    .enter()
                    .append('td')
                        .attr('data-th',(d) => d.column)
                        .text((d) => d.value !== null ? d.value : "" )
                    //function(d) { return d.value !== null ? d.value : "" }
                    // TODO : remove this dirty move
                    .append('div')
                        .attr("class", "cells")
                        .style("background", (d) => d.colors ? "linear-gradient(to right,"+d.colors[0]+","+d.colors[1]+")" : "transparent" )
                        .style("opacity", (d) => d.colors ? "0.7" : "1" )
                    .append("img")
                        .attr("class", "icons")
                        .attr("src", (d) => d.link ? self.serverURL+d.link[0] : "" )


                return table;
            }
        }
    }
</script>

<style lang="scss" >

    #tables {
        margin: 50px;
    }
    
    #ddown-split {
        padding-left: 5%;
    }

    .btn-secondary {
        color: #FFF;
        padding-left: 5%;
    }

    .btn-secondary:hover {
        background-color: white ;
        color: #33b277 ;
        border-color: #f9b23e ;
        padding-left: 5%;
    }

    .btn-secondary:focus {
        background-color: white;
        color: #33b277;
        border-color: #f9b23e;
        padding-left: 5%;
    }

    .dropdown-item:active {
        background-color: transparent ;
        color: #686868 ;
        border: 1px ;
        border-color: #f9b23e ;
    }

    .dropdown-item:hover {
        background-color: transparent ;
        color: #33b277;
        border: 1px ;
        border-color: #f9b23e ;
    }

    .desc {
        padding-top: 1%;
        padding-left: 5%;
    }

    #aloes-table {
        margin: 50px;
    }

    #aloes-table p {
        margin: 20px 0; 
    }

    /* 
    Generic Styling, for Desktops/Laptops 
    */
    #aloes-table table { 
        width: 100%; 
        border-collapse: collapse; 
    }
    /* Zebra striping */
    #aloes-table tr:nth-of-type(odd) { 
        background: #eee; 
    }

    #aloes-table th { 
        background: #333; 
        color: white; 
        font-weight: bold; 
        cursor: s-resize;
        background-repeat: no-repeat;
        background-position: 3% center;
    }

    #aloes-table td, th { 
        padding: 5px 5px;
        border: 1px solid #ccc; 
        text-align: left; 
        max-width: 350px;
        font-size: 16px;        
    }
    
    #aloes-table th.des:after {
      content: "\21E9";
    }
    
    #aloes-table th.aes:after {
      content: "\21E7";
    }
    /* 
    Max width before this PARTICULAR table gets nasty
    This query will take effect for any screen smaller than 760px
    and also iPads specifically.
    */
    @media 
    only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px)  {
    
        /* Force table to not be like tables anymore */
        #aloes-table table, thead, tbody, th, td, tr { 
            display: block; 
        }
        
        /* Hide table headers (but not display: none;, for accessibility) */
        #aloes-table thead tr { 
            position: absolute;
            top: -9999px;
            left: -9999px;
        }
        
        #aloes-table tr { border: 1px solid #ccc; }
        
        #aloes-table td { 
            /* Behave  like a "row" */
            border: none;
            border-bottom: 1px solid #eee; 
            position: relative;
            padding-left: 50%; 
        }
        
        #aloes-table td:before { 
            /* Now like a table header */
            position: absolute;
            /* Top/left values mimic padding */
            top: 6px;
            left: 6px;
            width: 45%; 
            padding-right: 10px; 
            white-space: nowrap;
        }
        
        /*
        Label the data
        */
        #aloes-table td:before {
          content: attr(data-th) ": ";
          font-weight: bold;
          width: 6.5em;
          display: inline-block;
        }
    }
    
    /* Smartphones (portrait and landscape) ----------- */
    @media only screen
    and (min-device-width : 320px)
    and (max-device-width : 480px) {
        #aloes-table { 
            padding: 0; 
            margin: 0; 
            width: 320px; }
        }
    
    /* iPads (portrait and landscape) ----------- */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
        #aloes-table { 
            width: 495px; 
        }
    }
        
    #aloes-table .icons {
        max-width: 30px;
        max-height: 30px;

    }

    #aloes-table .cells {
        margin: 0px !important;
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }

</style>
