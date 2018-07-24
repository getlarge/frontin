<template>
    <div id="aloes-table" ></div>
</template>

<script>

    import config from '@/config.json'
    import { json } from "d3-fetch"
    import { hierarchy, tree } from "d3-hierarchy"
    import { append, attr, event, select, selectAll, style } from "d3-selection"

    export default {
        data() {
            return {
              serverURL: config.httpServerURL,
              pageTopic: "getlarge" + this.$route.path,
              width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
              height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
              selectedColumns: [],
          }
        },

        mounted() {
            this.tableLoader(this.serverURL+"static/data/tables.json");
        },

        methods: {
            columnSelector(selection) {
                this.selectedColumns = selection;
            },

            tableLoader(dataPath) {
                var self = this;
                json(dataPath).then(function(obj) {
                    var root = hierarchy(obj);
                    var nodes = root.descendants();
                    console.log("nodes", nodes)
                    // self.graph = {
                    //     nodes : nodes,
                    // }
                   //self.tabulate(nodes[0].data.tables, self.selectedColums); 
                   self.tabulate(nodes[0].data.tables, ['name', 'description', 'ipsoId', 'ressources', 'colors', 'img']); 
                    //self.tabulate(nodes[0].data.tables, ['Resource', 'Description', 'Resource ID', 'Operations', 'Type']); 
              });
            },

            tabulate(obj, columns) {
                var self = this;
                var table = select('#aloes-table').append('table')
                    var thead = table.append('thead')
                    var tbody = table.append('tbody');
                    // append the header row
                    thead.append('tr')
                      .selectAll('th')
                      .data(columns).enter()
                      .append('th')
                        .text(function (column) { return column; });

                    // create a row for each object in the data
                    var rows = tbody.selectAll('tr')
                      .data(obj)
                      .enter()
                      .append('tr');
                    // create a cell in each row for each column
                    var cells = rows.selectAll('td')
                        .data(function (row) {
                            return columns.map(function (column) {
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
                            .text((d) => d.value !== null ? d.value : "" )
                        //function(d) { return d.value !== null ? d.value : "" }
                        .append('p')
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

    #aloes-table th {
        padding: 5px 5px;
        font-size: 18px;        
        max-width: 350px;
    }

    #aloes-table td {
        padding: 5px 5px;
        font-size: 16px;        
        max-width: 350px;

    }
    #aloes-table .icons {
        max-width: 30px;
        max-height: 30px;
    }

    #aloes-table .cells {
        padding: 5px 15px;
        margin: 0px !important;
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }
</style>
