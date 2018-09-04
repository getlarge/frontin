<template>
    <b-container id="qr-journal" fluid >
        <img id="journal" :src="serverURL + journalFrame" />
        <b-row v-if="journalEvent === 'closed'" >
            <form id="digicode">
                <input id="authButton" type="button" @click="auth" value=" ">
                <input id="index1" class="digit-inputs" type="text" v-model="digicode[0]" autofocus required>    
                <input id="index2" class="digit-inputs" type="text" v-model="digicode[1]" required>
                <input id="index3" class="digit-inputs" type="text" v-model="digicode[2]" required>
                <input id="index4" class="digit-inputs" type="text" v-model="digicode[3]" required>
            </form>
        </b-row>
        <b-row v-else-if="journalEvent !== 'closed'">
            <post v-if="pageNumber > 0" class="left-post" :journalId="0" :id="posts[pageNumber].id" :text="posts[pageNumber].text" :name="posts[pageNumber].name" :page="posts[pageNumber].id"></post>
            <post v-if="pageNumber > 0" class="right-post" :journalId="0" :id="posts[pageNumber+1].id" :text="posts[pageNumber+1].text" :name="posts[pageNumber+1].name" :page="posts[pageNumber+1].id"></post>
            <button v-if="pageNumber < posts.length-2" class="change-page-right" @click="changePage(2)"><img :src="serverURL + 'static/icons/arrow-right.png'"/></button>
            <button v-if="pageNumber >= 0" class="change-page-left" @click="changePage(-2)"><img :src="serverURL + 'static/icons/arrow-left.png'"/></button>   
        </b-row>
    </b-container>

</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getFileByParam } from "@/services/bareback";
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
        this.$store.commit("updateJournalFrame", "static/icons/eundi1.png");
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
                this.$store.commit("updateJournalStatus", "opening");
                this.$store.commit("updateJournalFrame", "static/icons/eundi2.png");
                setTimeout(() => {
                    this.$el.querySelector(".left-post").style.opacity = 0;
                    this.$el.querySelector(".right-post").style.opacity = 0;
                    this.$store.commit("updateJournalFrame", "static/icons/eundi3.png");
                    this.$store.commit("updateJournalStatus", "opened");
                    this.loadHtmlFile(this.pageNumber);
                }, 500);

                setTimeout(() => {
                    this.loadHtmlFile(this.pageNumber + 1);
                    this.$el.querySelector(".left-post").style.opacity = 1;
                    this.$el.querySelector(".right-post").style.opacity = 1;
                }, 1100);
            } else {
                setTimeout(() => {
                    this.$store.commit("updateJournalStatus", "opening");
                    this.$store.commit("updateJournalFrame", "static/icons/eundi2.png");
                    this.$el.querySelector(".left-post").style.opacity = 0;
                    this.$el.querySelector(".right-post").style.opacity = 0;
                }, 300);
                setTimeout(() => {
                    this.$store.commit("updateJournalFrame", "static/icons/eundi1.png");
                    this.$store.commit("updateJournalStatus", "closed");
                }, 600);
            }
        },

        loadHtmlFile(page) {
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
                        ? this.$children[1].setTextArea(this.posts[page].text) &
                          this.$children[1].setTitle(this.posts[page].name)
                        : this.$children[0].setTextArea(this.posts[page].text) &
                          this.$children[0].setTitle(this.posts[page].name);
                });
        }
    }
};
</script>

<style lang="scss">

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    #qr-journal {

        #journal {
            height: 500px !important;
        }

        #digicode {
            position: absolute;
            top: 332px !important;
            left: 115px !important;
            input {
                height: 30px !important;
                width: 10px !important;
                font-size: 1.1rem !important;
                margin-left: 2px;
                margin-right: 2px !important;
            }
            #authButton {
                width: 25px !important;
                height: 20px !important;
                margin-right: 5px !important;
            }
        }

        .left-post {
            top: 170px !important;
            left: 40px !important;
            width: 300px !important;
        }

        .right-post {
            top: 170px !important;
            left: 350px !important;
            width: 300px !important;
        }

        .change-page-right {
            position: absolute;
            height: 30px !important;
            width: 50px !important;
            top: 570px !important;
            left: 595px !important;
        }

        .change-page-left {
            position: absolute;
            height: 30px !important;
            width: 50px !important;
            top: 570px !important;
            left: 50px !important;
        }

        #post-editor {
            font-size: 90% !important;
            height: 350px !important;
        }

        #post-title {
            font-size: 80%;
        }
    }
}

#qr-journal {
    margin-top: 50px;
    font-family: "GaramondNo8-Regular";

    #journal {
        width: auto;
        height: 800px;
    }
    #digicode {
        position: absolute;
        top: 464px;
        left: 176px;
        input {
            height: 40px;
            width: 23px;
            font-size: 1.5rem;
            margin-left: 2px;
            margin-right: 2px;
            background-color: transparent;
            border-color: blue;
            border: 0px;
        }
        #authButton {
            width: 40px;
            height: 30px;
            background-color: #029ea8;
            margin-right: 12px;
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
            border: 0px;
            border-color: blue !important;
        }
    }

    .left-post {
        opacity: 0;
        position: absolute;
        top: 200px;
        left: 60px;
        max-width: 485px;
    }

    .right-post {
        opacity: 0;
        position: absolute;
        top: 200px;
        left: 550px;
        max-width: 485px;
    }

    .change-page-right {
        position: absolute;
        background-color: transparent;
        border: none;
        height: 35px;
        width: 60px;
        top: 860px;
        left: 955px;
        cursor: pointer;
        img {
            width: 100%;
            z-index: 2000;
        }
    }
    .change-page-left {
        position: absolute;
        background-color: transparent;
        border: none;
        height: 35px;
        width: 60px;
        top: 860px;
        left: 70px;
        cursor: pointer;
        img {
            width: 100%;
            z-index: 2000;
        }
    }

    #post-editor {
        font-size: 100%;
        height: 610px;
    }
}
</style>
