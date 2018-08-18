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
        <b-row v-else-if="journalEvent === 'opening'" >
       
        </b-row>
        <b-row v-else-if="journalEvent === 'opened'">
            <div class="posts" v-for="(element, index) in qrPosts[pageNumber]" :key="element.id" >
                <qr-post :icon="element.iconFile" :text="element.text" :name="element.name"></qr-post>
            </div>
            <button v-if="pageNumber < qrPosts.length-1" class="change-page-right" @click="changePage(1)"><img :src="serverURL + 'static/icons/arrow-right.png'"/></button>
            <button v-if="pageNumber >= 0" class="change-page-left" @click="changePage(-1)"><img :src="serverURL + 'static/icons/arrow-left.png'"/></button>
        </b-row>
    </b-container>

</template>

<script>
import { mapState, mapGetters } from "vuex";
import { EventBus } from "@/main";
import { select, selectAll } from "d3-selection";
import qrPost from "./qr-post";

export default {
    data() {
        return {
            pageNumber: 0,
            quill: null,
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
    },
    components: {
        qrPost
    },

    created() {},

    mounted() {},

    beforeDestroy() {
        //this.$store.commit("updateJournalStatus", "closed");
    },

    computed: {
        ...mapState({
            serverURL: state => state.base.serverURL,
            qrPosts: state => state.posts.qrPosts,
            counter: state => state.posts.counter,
            journalEvent: state => state.posts.journalEvent,
            journalFrame: state => state.posts.journalFrame,
            digicode: state => state.posts.digicode,
            tutorialText: state => state.posts.tutorial.text,
            tutorialTags: state => state.posts.tutorial.tags,
            tutorialImg: state => state.posts.tutorial.img
        }),
        ...mapGetters({
            checkAuth: "checkAuth"
        })
    },

    methods: {
        auth() {
            if (this.checkAuth === true) {
                console.log("Bravo");
                this.changePage(1);
            }
        },

        changePage(number) {
            selectAll(".posts").style("opacity", this.journalStatus === "opening" ? "0" : "1");
            var self = this;
            setTimeout(function() {
                self.pageNumber += number;
                self.$store.commit("updateJournalStatus", "opening");
                self.$store.commit("updateJournalFrame", "static/icons/eundI2.png");
            }, 500);
            setTimeout(function() {
                if (self.pageNumber > 0) {
                    self.$store.commit("updateJournalFrame", "static/icons/eundI3.png");
                    self.$store.commit("updateJournalStatus", "opened");
                } else {
                    self.$store.commit("updateJournalFrame", "static/icons/eundI1.png");
                    self.$store.commit("updateJournalStatus", "closed");
                }
            }, 1000);
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
