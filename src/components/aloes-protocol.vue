<template>

    <div id="tables">
        <b-container  fluid>
            <b-row >
                <b-col id="description" cols="12">
                    <p> <a href="https://github.com/IPSO-Alliance/pub" target="_blank">IPSO</a> object model description</p>
                </b-col>        
                <b-col cols="6">
                    <b-dropdown id="ddown-split" split text="Table selector" class="m-2">
                        <b-dropdown-item-button  @click="dataPath('static/data/sensors.json')">Sensors Type</b-dropdown-item-button>
                        <b-dropdown-divider/>
                        <b-dropdown-item-button  @click="dataPath('static/data/ressources.json')">Ressources Type</b-dropdown-item-button>
                    </b-dropdown>
                </b-col>
                <b-col id="search" cols="6">
                    <input type="text" id="search-box" @keyup="searchFor()" placeholder="Search for description...">
                    <font-awesome-icon id="search-icon" icon="search" size="lg" ></font-awesome-icon>
                </b-col>
            </b-row>
        </b-container>
        <div id="aloes-table">
        </div> 
    </div>

</template>

<script>
import { mapState } from "vuex";
import { keys } from "d3-collection";
import { json } from "d3-fetch";
import { hierarchy, tree } from "d3-hierarchy";
import { event, select, selectAll } from "d3-selection";
import { EventBus } from "@/main";

export default {
    data() {
        return {
            path: "static/data/sensors.json",
            pageTopic: "getlarge" + this.$route.path,
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            nodes: null,
            titles: null,
            sortAscending: false,
            rows: {},
            headers: {},
            selectedColumns: []
        };
    },

    mounted() {
        this.tableLoader(this.serverURL + this.path, this.selectedColumns);
        EventBus.$on("update:table", path => {
            select("#ipso-table").remove();
            this.tableLoader(this.serverURL + path, this.selectedColumns);
        });
    },

    updated() {
        //console.log("updated")
    },

    beforeDestroy() {
        EventBus.$emit("stop:tutorial");
    },

    watch: {},

    computed: {
        ...mapState({
            serverURL: state => state.base.serverURL
        })
    },

    methods: {
        columnSelector(selection) {
            this.selectedColumns = selection;
        },

        dataPath(path) {
            EventBus.$emit("update:table", path);
        },

        tableLoader(dataPath, colums) {
            json(dataPath).then(obj => {
                const root = hierarchy(obj);
                this.nodes = root.descendants();
                this.titles = keys(this.nodes[0].data.tables[0]);
                this.tabulate(this.nodes[0].data.tables, this.titles);
                //self.tabulate(nodes[0].data.tables, ['name', 'description', 'ipsoId', 'ressources', 'colors', 'img']);
            });
        },

        searchFor() {
            // Declare variables
            //const input, filter, table, tr, td, i;
            var td, i;
            const input = document.getElementById("search-box");
            const filter = input.value.toUpperCase();
            const table = document.getElementById("aloes-table");
            const tr = table.getElementsByTagName("tr");
            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        },

        sortTables(d, headers, rows) {
            //     headers.attr("class", "header");
            if (this.sortAscending) {
                // var test = rows._groups[0].forEach(myFunction);
                // function myFunction(value, index, array) {
                //     if ( typeof(value) === Number ) {
                //}
                // }
                // var aKeys = Object.keys(test[0]).sort();
                //console.log(JSON.stringify(aKeys));
                // todo : create dynamic type detection
                if (d === "name" || d === "description" || d === "resource") {
                    this.rows.sort(function(a, b) {
                        var x = a[d].toLowerCase();
                        var y = b[d].toLowerCase();
                        if (x < y) {
                            return -1;
                        }
                        if (x > y) {
                            return 1;
                        }
                        return 0;
                    });
                } else if (
                    d === "ipsoId" ||
                    d === "mySensorsId" ||
                    d === "aloesId" ||
                    d === "resourceId"
                ) {
                    this.rows.sort((a, b) => a[d] - b[d]);
                }
                this.sortAscending = false;
                this.className = "aes";
            } else {
                if (d === "name" || d === "description" || d === "resource") {
                    this.rows.sort(function(a, b) {
                        var x = a[d].toLowerCase();
                        var y = b[d].toLowerCase();
                        if (x > y) {
                            return -1;
                        }
                        if (x < y) {
                            return 1;
                        }
                        return 0;
                    });
                } else if (
                    d === "ipsoId" ||
                    d === "mySensorsId" ||
                    d === "aloesId" ||
                    d === "resourceId"
                ) {
                    this.rows.sort((a, b) => b[d] - a[d]);
                }
                this.sortAscending = true;
                this.className = "des";
            }
        },

        tabulate(obj, titles) {
            var self = this;
            this.sortAscending = true;
            var table = select("#aloes-table")
                .append("table")
                .attr("id", "ipso-table");
            this.headers = table
                .append("thead")
                .append("tr")
                .selectAll("th")
                //.data(columns).enter()
                .data(titles)
                .enter()
                .append("th")
                .text(d => d)
                .attr("class", "header")
                .on("click", this.sortTables);
            this.rows = table
                .append("tbody")
                .selectAll("tr")
                .data(obj)
                .enter()
                .append("tr");
            this.rows
                .selectAll("td")
                .data(function(row) {
                    return titles.map(function(column) {
                        //return {column: column, value: row[column]};
                        if (column !== "img" && column !== "colors") {
                            return { column: column, value: row[column] };
                        }
                        if (column === "img") {
                            return { column: column, link: row[column] };
                        }
                        if (column === "colors") {
                            return { column: column, colors: row[column] };
                        } else {
                            return { column: column, value: row[column] };
                        }
                    });
                })
                .enter()
                .append("td")
                .attr("data-th", d => d.column)
                .text(d => (d.value !== null ? d.value : ""))
                //function(d) { return d.value !== null ? d.value : "" }
                // TODO : remove this dirty move
                .append("div")
                .attr("class", "cells")
                .style(
                    "background",
                    d =>
                        d.colors
                            ? "linear-gradient(to right," + d.colors[0] + "," + d.colors[1] + ")"
                            : "transparent"
                )
                .style("opacity", d => (d.colors ? "0.7" : "1"))
                .append("img")
                .attr("class", "icons")
                .attr("src", d => (d.link ? self.serverURL + d.link[0] : ""));

            return table;
        }
    }
};
</script>

<style lang="scss" >
#tables {
    margin: 30px;

    #ddown-split {
        padding-left: 5%;
    }

    .btn-secondary {
        color: #fff;
        padding-left: 5%;
    }

    .btn-secondary:hover {
        background-color: white;
        color: #33b277;
        border-color: #f9b23e;
        padding-left: 5%;
    }

    .btn-secondary:focus {
        background-color: white;
        color: #33b277;
        border-color: #f9b23e;
        padding-left: 5%;
    }

    .dropdown-item:active {
        background-color: transparent;
        color: #686868;
        border: 1px;
        border-color: #f9b23e;
    }

    .dropdown-item:hover {
        background-color: transparent;
        color: #33b277;
        border: 1px;
        border-color: #f9b23e;
    }

    #description {
        padding-top: 1%;
        padding-left: 5%;
    }

    #search {
        font-size: 16px;
        padding: 12px 20px 12px 20px;
        border: 1px solid #ddd;
        border-radius: 5px;

        #search-box {
            background-color: transparent;
            width: 90%;
            font-size: 16px;
            border: 0px solid #ddd;
        }

        #search-icon {
            path {
                fill: #d4d4d4 !important;
            }
        }
    }
}

#aloes-table {
    margin: 50px;
}

#aloes-table p {
    margin: 20px 0;
}

#aloes-table table {
    width: 100%;
    border-collapse: collapse;
}

#aloes-table tr.header,
#aloes-table tr:hover,
#aloes-table tr:nth-of-type(odd) {
    background-color: #f1f1f1;
}

#aloes-table tr:nth-of-type(odd):hover {
    background: #ffff;
}

#aloes-table th {
    background: #029ea8;
    color: white;
    font-weight: bold;
    cursor: s-resize;
    background-repeat: no-repeat;
    background-position: 3% center;
}

#aloes-table td,
th {
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
@media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    /* Force table to not be like tables anymore */
    #aloes-table table,
    thead,
    tbody,
    th,
    td,
    tr {
        display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    #aloes-table thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    #aloes-table tr {
        border: 1px solid #ccc;
    }

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

    /* Label the data */
    #aloes-table td:before {
        content: attr(data-th) ": ";
        font-weight: bold;
        width: 6.5em;
        display: inline-block;
    }
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    #aloes-table {
        padding: 0;
        margin: 0;
        width: 320px;
    }
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
