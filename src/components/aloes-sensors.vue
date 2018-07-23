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
          }
        },

        mounted() {
            var self = this;
            json(this.serverURL+"static/data/tables.json").then(function(obj) {
                var root = hierarchy(obj);
                var nodes = root.descendants();
                console.log("nodes", nodes)
                // self.graph = {
                //     nodes : nodes,
                // }
                function tabulate(obj, columns) {
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
                                if ( column !== "img") {
                                    return {column: column, value: row[column]};
                                }
                                if ( column === "img") {
                                    return {column: column, link: row[column]};
                                }
                                else {
                                    return {column: column, value: row[column]};
                                }                               
                            });
                        })
                        .enter()
                        .append('td')
                        .text((d) => d.value ? d.value : "" )
                        .append("img")
                            .attr("class", "icons")
                            .attr("src", (d) => d.link ? self.serverURL+d.link[0] : "" )
                    return table;
                }

                tabulate(nodes[0].data.tables, ['name', 'description', 'ipsoId', 'aloesId', 'size', 'resolution', 'unit', 'min', 'max', 'colors', 'img']); 
          });
        }
    }
</script>

<style lang="scss" >

    #aloes-table td, th {
        padding: 5px 10px;
    }
    #aloes-table .icons {
        height: 20px;
    }
</style>
