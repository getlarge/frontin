<template>

    <b-container id="post" ref="post">
        <vue-editor
            id="post-editor" 
            :placeholder="text"
            :customModules="customModulesForEditor"
            :editorToolbar="customToolbar"
            :editorOptions="editorSettings"
            v-model="post.text"
            @text-change=""    
            useCustomImageHandler
            @imageAdded="addImage">
        </vue-editor> 
        <b-row v-if="post.page % 2 !== 0">
            <b-col xs="1" sm="1" lg="1" >
                <button id="post-button" @click="addPost('text', post)"> Save</button>
            </b-col >
            <b-col xs="3" sm="3" lg="3" >
                <input id="post-title" type="text" v-model="post.name" required>
            </b-col >
            <b-col  xs="2" sm="2" lg="1" >
                <div id="qr-holder" ref="qrHolder"></div> 
            </b-col>
        </b-row>
        <b-row v-if="post.page % 2 === 0">
            <b-col xs="2" sm="2" lg="1" >
                <div id="qr-holder" ref="qrHolder"></div> 
            </b-col>
            <b-col xs="3" sm="3" lg="3" >
                <input id="post-title" type="text" v-model="post.name" required>
            </b-col >
            <b-col xs="1" sm="1" lg="1" >
                <button id="post-button" @click="addPost('text', post)"> Save</button>
            </b-col >
        </b-row>
    </b-container>

</template>

<script>
//import { VueEditor, Quill } from "vue2-editor";
import { VueEditor } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import qrcode from "qrcode-generator";
import { upload } from "@/services/bareback";
import { mapState, mapActions } from "vuex";

const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;

// Quill.register("modules/imageDrop", ImageDrop);
// Quill.register('modules/imageResize', ImageResize)

export default {
    props: ["journalId", "id", "text", "textUrl", "name", "page"],
    data() {
        return {
            editorSettings: {
                modules: {
                    toolbar: false,
                    imageDrop: true,
                    imageResize: {}
                }
            },
            customModulesForEditor: [
                { alias: 'imageDrop', module: ImageDrop },
                { alias: 'imageResize', module: ImageResize }
            ],
            customToolbar: [["bold", "italic", "underline", "image"]],
            post: {
                id: this.id || 0,
                name: this.name || "",
                text: this.text || "",
                page: this.page || 0
            },
            typeNumber: 0,
            errorCorrectionLevel: "L"
        };
    },

    components: {
        VueEditor
    },

    created() {},

    mounted() {
        //console.log(this)

    },

    updated() {
        console.log("post " + this.page + " updated");
        this.$el.querySelector("#qr-holder").innerHTML = "";

    },

    beforeDestroy() {},

    watch: {},

    computed: {
        ...mapActions({
            savePost: "save"
        })
    },

    methods: {

        setTextArea(text) {
            //this.editor.setValue(text);
            this.post.text = text;
        },

        setTitle(text) {
            this.post.name = text;
        },
        /// todo : move the two next methods to state actions
        addPost(resource, post) {
            //console.log("addItem", resource, post);
            var data = new File([post.text], post.name + ".html", { type: "text/html" });
            if (!data.size) return;
            const formData = new FormData();
            formData.append(resource, data, post.name + ".html");
            formData.append("journalId", post.journalId);
            formData.append("page", this.page);
            // this.$store.commit("updateFormData", formData);
            // this.$store.dispatch('save')
            this.saveText(resource, formData, "page/" + this.page);
        },

        saveText(resource, formData, filter) {
            this.currentStatus = STATUS_SAVING;
            upload(resource, formData, filter)
                //.then(wait(1500)) // DEV ONLY: wait for 1.5s
                .then(res => {
                    //console.log("uploaded : ", this.uploadedFiles);
                    this.uploadedFiles = [].concat(res);
                    this.currentStatus = STATUS_SUCCESS;
                    this.createQRCode(this.uploadedFiles[0].url);
                    /// commit response id in the corresponding page ( in the store )
                })
                .catch(err => {
                    //console.log("uploaded : ", err);
                    this.uploadError = err.response;
                    this.currentStatus = STATUS_FAILED;
                });
        },

        addImage(file, Editor, cursorLocation) {
            const formData = new FormData();
            //console.log(file)
            if (!file.size) return;
            formData.append("images", file, file.name);
            console.log(file.name);
            //console.log(formData);
            upload("image", formData, "name/" + file.name)
                .then(res => {
                    console.log(res);
                    this.uploadedFiles = [].concat(res);
                    this.currentStatus = STATUS_SUCCESS;
                    let url = this.uploadedFiles[0].url; 
                    Editor.insertEmbed(cursorLocation, "image", url);
                    // resetUploader();
                })
                .catch(err => {
                    console.log(err);
                    this.uploadError = err.response;
                    this.currentStatus = STATUS_FAILED;
                });
        },

        saveImage(resource, formData, filter) {
            this.currentStatus = STATUS_SAVING;
            upload(resource, formData, filter)
                .then(res => {
                    console.log(res);
                    this.uploadedFiles = [].concat(res);
                    this.currentStatus = STATUS_SUCCESS;
                    let url = this.uploadedFiles[0].url; // Get url from response
                    // Editor.insertEmbed(cursorLocation, "image", url);
                    // resetUploader();
                })
                .catch(err => {
                    console.log(err);
                    this.uploadError = err.response;
                    this.currentStatus = STATUS_FAILED;
                });
        },

        createQRCode(data) {
            this.qr = qrcode(this.typeNumber, this.errorCorrectionLevel);
            this.qr.addData(data);
            this.qr.make();
            this.$el.querySelector("#qr-holder").innerHTML = this.qr.createImgTag();
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

    }

    #post-button {
    }

    #post-editor {
        font-family: "GaramondNo8-Regular" !important;
        width: 100%;
        border: 0px !important;
    }

}
</style>
