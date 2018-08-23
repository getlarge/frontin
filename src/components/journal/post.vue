<template>

    <div id="post" ref="post">
<!--         <img class="iconic" :src="icon" fluid />
 -->        
        <input id="post-title" type="text" v-model="post.name" required>    
        <textarea id="post-editor" ref="editor" :placeholder="text" :name="name" autofocus></textarea> 
        <button id="post-button" @click="addPost('text', post)"> Save</button>
        <div id="qr-holder" ref="qrHolder"></div>
    </div>

</template>

<script>
require("simditor/styles/simditor.css");
import Simditor from "simditor";
import * as qrcode from "qrcode-generator";
import { select, selectAll } from "d3-selection";
import { upload } from "@/services/bareback";
import { mapState, mapActions } from "vuex";

const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;

export default {
    props: ["journalId", "id", "text", "textUrl", "name", "page"],

    data() {
        return {
            editor: {},
            post: {
                id: this.id || 0,
                name: this.name || "",
                text: this.text || "",
                //textUrl: this.$props.textUrl || "",
                page: this.page || 0
            },
            typeNumber: 0,
            errorCorrectionLevel: "L"
        };
    },

    created() {},

    mounted() {
        //console.log(this)
        this.createQR(this.typeNumber, this.errorCorrectionLevel);
        this.initEditor();
    },

    updated() {
        console.log("post " + this.page + " updated");
        //selectAll("#qr-holder").remove();
    },

    beforeDestroy() {},

    watch: {},

    computed: {
        ...mapState({
            serverURL: state => state.base.serverURL
            //post: state => state.journal.posts[this.page]
        }),
        ...mapActions({
            savePost: "save"
        })
    },

    methods: {
        initEditor() {
            this.editor = new Simditor({
                textarea: $(this.$refs.editor),
                toolbarHidden: true,
                toolbar: ["title", "bold", "italic", "underline", "fontScale"],
                params: {}
            });
            this.editor.on("valuechanged", (e, src) => {
                //console.log('valuechanged', src)
                this.post.text = this.editor.getValue();
            });
        },

        setTextArea(text) {
            this.editor.setValue(text);
        },

        setTitle(text) {
            this.post.name = text;
        },
        /// move the two next methods to state actions
        addPost(resource, post) {
            //console.log("addItem", resource, post);
            var data = new File([post.text], post.name + ".html", { type: "text/html" });
            //console.log(data);
            if (!data.size) return;
            const formData = new FormData();
            formData.append(resource, data, post.name + ".html");
            formData.append("journalId", post.journalId);
            formData.append("page", this.page);
            // this.$store.commit("updateFormData", formData);
            // this.$store.dispatch('save')
            this.save(resource, formData);
        },

        save(resource, formData) {
            this.currentStatus = STATUS_SAVING;
            upload(resource, formData, "page/" + this.page)
                //.then(wait(1500)) // DEV ONLY: wait for 1.5s
                .then(res => {
                    //console.log("uploaded : ", this.uploadedFiles);
                    this.uploadedFiles = [].concat(res);
                    this.currentStatus = STATUS_SUCCESS;
                    this.pushQRCode(this.uploadedFiles[0].url);
                    /// commit response id in the corresponding page ( in the store )
                    //EventBus.$emit("file-uploader", resource, this.uploadedFiles);
                })
                .catch(err => {
                    //console.log("uploaded : ", err);
                    this.uploadError = err.response;
                    this.currentStatus = STATUS_FAILED;
                });
        },

        createQR(typeNumber, errorCorrectionLevel) {
            this.qr = qrcode(typeNumber, errorCorrectionLevel);
        },

        pushQRCode(data) {
            this.qr = qrcode(this.typeNumber, this.errorCorrectionLevel);
            this.qr.addData(data);
            this.qr.make();
            select(this.$refs.qrHolder)
                .attr("class", "qrCode")
                //.html(this.qr.createSvgTag());
                .html(this.qr.createImgTag());
        }
    }
};
</script>

<style lang="scss">
#post {
    #qr-holder {
        display: block;
        align-items: center;
        justify-content: center;
        width: auto;
        opacity: 1 !important;
        margin-left: 20%;
        img {
            max-height: 70px;
            max-width: 70px;
            z-index: 5000;
        }
        path {
            fill: green;
        }
    }

    #post-title {
        border: 0px !important;
        text-align: center;
    }

    #post-button {
        align-items: center;
    }

    .simditor {
        border-color: #d8d8d8;
        border-radius: 6px;
        border: 0px;
    }

    .simditor-body {
        font-family: "GaramondNo8-Regular" !important;
        font-size: 90%;
        height: 320px;
    }

    textarea {
        border-color: #d8d8d8;
        border-radius: 6px;
        height: 250px;
        width: 90%;
    }
}
</style>
