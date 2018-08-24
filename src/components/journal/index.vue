<template>
    <b-container id="qr-journal" fluid >
       <img id="journal" :src="serverURL + journalFrame">
            </img> 
        <b-row v-if="journalEvent === 'closed'" >
                <form id="digicode">
                    <input id="authButton" type="button" @click="auth" value=" ">
                    <input id="index1" class="digit-inputs" type="text" v-model="digicode[0]" required>    
                    <input id="index2" class="digit-inputs" type="text" v-model="digicode[1]" required>
                    <input id="index3" class="digit-inputs" type="text" v-model="digicode[2]" required>
                    <input id="index4" class="digit-inputs" type="text" v-model="digicode[3]" required>
                </form>
        </b-row>
        <b-row v-else-if="journalEvent === 'opening' || journalEvent === 'opened'">
            <post v-if="pageNumber > 0" class="posts" :journalId="0" :id="posts[pageNumber].id" :text="posts[pageNumber].text" :name="posts[pageNumber].name" :page="posts[pageNumber].id"></post>
            <post v-if="pageNumber > 0" class="posts" :journalId="0" :id="posts[pageNumber+1].id" :text="posts[pageNumber+1].text" :name="posts[pageNumber+1].name" :page="posts[pageNumber+1].id"></post>
            <button v-if="pageNumber < posts.length-2" class="change-page-right" @click="changePage(2)"><img :src="serverURL + 'static/icons/arrow-right.png'"/></button>
            <button v-if="pageNumber >= 0" class="change-page-left" @click="changePage(-2)"><img :src="serverURL + 'static/icons/arrow-left.png'"/></button>   
        </b-row>
    </b-container>

</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getFileByParam } from "@/services/bareback";
import { select, selectAll } from "d3-selection";
import Post from "./post";

export default {
    data() {
        return {
            pageNumber: -1,
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
    },
    components: {
        Post
    },

    created() {},

    mounted() {
        //console.log(this.posts)
    },

    beforeDestroy() {
        this.$store.commit("updateJournalStatus", "closed");
        this.$store.commit("updateJournalFrame", "static/icons/eundI1.png");
        this.posts = null;
        this.digicode = null;
    },

    computed: {
        ...mapState({
            serverURL: state => state.base.serverURL,
            posts: state => state.journal.posts,
            counter: state => state.journal.counter,
            journalEvent: state => state.journal.journalEvent,
            journalFrame: state => state.journal.journalFrame,
            digicode: state => state.journal.digicode,
            tutorialText: state => state.journal.tutorial.text,
            tutorialTags: state => state.journal.tutorial.tags,
            tutorialImg: state => state.journal.tutorial.img
        }),
        ...mapGetters({
            checkAuth: "checkAuth"
        })
    },

    methods: {
        auth() {
            if (this.checkAuth === true) {
                //console.log("Bravo");
                this.changePage(2);
            }
        },

        changePage(number) {
            this.pageNumber += number;
            //console.log("page", this.pageNumber);
            //selectAll(".posts").style("opacity", this.journalStatus === "opened" ? "1" : "0");
            if (this.pageNumber > 0) {
                setTimeout(() => {
                    this.$store.commit("updateJournalStatus", "opening");
                    this.$store.commit("updateJournalFrame", "static/icons/eundI2.png");
                    selectAll(".posts").style("opacity", "0");
                    this.loadHtmlFile(this.pageNumber);
                }, 500);
                setTimeout(() => {
                    this.$store.commit("updateJournalFrame", "static/icons/eundI3.png");
                    this.$store.commit("updateJournalStatus", "opened");
                    selectAll(".posts").style("opacity", "1");
                    this.loadHtmlFile(this.pageNumber + 1);
                }, 1000);
            } else {
                setTimeout(() => {
                    this.$store.commit("updateJournalStatus", "opening");
                    this.$store.commit("updateJournalFrame", "static/icons/eundI2.png");
                    selectAll(".posts").style("opacity", "0");
                }, 200);
                setTimeout(() => {
                    this.$store.commit("updateJournalFrame", "static/icons/eundI1.png");
                    this.$store.commit("updateJournalStatus", "closed");
                }, 600);
            }
        },

        loadHtmlFile(page) {
            var self = this;
            getFileByParam("text", "page", page)
                .then(res => {
                    // if res.headers.content-type="text/html"
                    //console.log("downloaded : ", res);
                    page % 2 === 0
                        ? this.$children[1].setTextArea(res.data.text) &
                          this.$children[1].setTitle(res.data.name)
                        : this.$children[0].setTextArea(res.data.text) &
                          this.$children[0].setTitle(res.data.name);
                    //this.$store.commit("updatePost", page, res.data);
                })
                .catch(err => {
                    //console.log("downloaded : ", err);
                    page % 2 === 0
                        ? this.$children[1].setTextArea(self.posts[page].text) &
                          this.$children[1].setTitle(self.posts[page].name)
                        : this.$children[0].setTextArea(self.posts[page].text) &
                          this.$children[0].setTitle(self.posts[page].name);
                });
        }
    }
};
</script>

<style lang="scss">
#qr-journal {
    margin-top: 50px;
    font-family: "GaramondNo8-Regular";

    #journal {
        img {
            width: auto;
            max-height: 100%;
        }
    }

    #digicode {
        position: absolute;
        top: 350px;
        left: 125px;
        input {
            height: 40px;
            width: 13px;
            margin-left: 2px;
            margin-right: 2px;
            background-color: transparent;
            border-color: blue;
            border: 0px;
        }
        #authButton {
            width: 27px;
            height: 20px;
            background-color: #029ea8;
            margin-right: 5px;
            border-radius: 25px;
            cursor: pointer;
        }
        #authButton:focus {
            border: 0px;
            border-color: transparent !important;
            stroke: black;
            border-radius: 25px;
            cursor: pointer;
        }
        input:focus {
            border: 1px;
            border-color: blue !important;
        }
    }

    .posts {
        opacity: 0;
        position: relative;
        top: -440px;
        margin-left: 55px;
        margin-right: 0px;
        width: 250px;
        height: 250px;
    }

    .change-page-right {
        position: absolute;
        background-color: transparent;
        border: none;
        height: 35px;
        width: 60px;
        top: 550px;
        left: 555px;
        cursor: pointer;
        img {
            width: 100%;
            z-index: 3000;
        }
    }
    .change-page-left {
        position: absolute;
        background-color: transparent;
        border: none;
        height: 35px;
        width: 60px;
        top: 550px;
        left: 50px;
        cursor: pointer;
        img {
            width: 100%;
        }
    }
}
</style>
