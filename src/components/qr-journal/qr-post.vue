<template>

    <div id="qr-post" ref="qrPost">
<!--         <img class="iconic" :src="icon" fluid />
 -->        
        <textarea id="editor" ref="editor" :placeholder="text" :name="name" :value="text" autofocus></textarea> 
        <div id="qr-holder" ref="qrHolder"></div>
    </div>

</template>

<script>
require("simditor/styles/simditor.css");

import Simditor from "simditor";
import * as qrcode from "qrcode-generator";
import { select, selectAll } from "d3-selection";
import { EventBus } from "@/main";

export default {
    props: ["icon", "id", "text", "name"],

    data() {
        return {
            editor: {},
            model: this.$props.text,
            typeNumber: 0,
            errorCorrectionLevel: "L",
            isPlaying: false
        };
    },

    created() {
        this.createQR(this.typeNumber, this.errorCorrectionLevel);
    },

    mounted() {
        this.editor = new Simditor({
            textarea: $(this.$refs.editor),
            toolbarHidden: true,
            toolbar: ["title", "bold", "italic", "underline", "fontScale"],
            params: {}
        });
        //this.onPush(this.$props.text);
        this.editor.on("valuechanged", (e, src) => {
            console.log(this.editor.getValue());
            //console.log('valuechanged', e)
            this.onPush(this.editor.getValue());
        });
    },

    updated() {
        console.log(this.$props.text);
    },

    beforeDestroy() {},

    watch: {},

    computed: {},

    methods: {
        createQR(typeNumber, errorCorrectionLevel) {
            this.qr = qrcode(typeNumber, errorCorrectionLevel);
        },

        onPush(data) {
            this.qr = qrcode(this.typeNumber, this.errorCorrectionLevel);
            this.qr.addData(data);
            this.qr.make();
            //select(this.$el)
            select(this.$refs.qrHolder)
                .attr("class", "qrCode")
                //.html(this.qr.createSvgTag());
                .html(this.qr.createImgTag());
        }
    }
};
</script>

<style lang="scss">
#qr-post {
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

    textarea {
        border-color: #d8d8d8;
        border-radius: 6px;
        height: 250px;
        width: 90%;
    }

    .simditor {
        border-color: #d8d8d8;
        border-radius: 6px;
    }

    .simditor-body {
        height: 280px;
    }

    .iconic {
        margin-left: 20%;
        max-width: 30%;
        opacity: 1 !important;
    }
}
</style>
