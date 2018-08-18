<template>

    <div id="qr-post" ref="qrPost">
<!--         <img class="iconic" :src="icon" fluid />
 -->        
        <froala :tag="'textarea'" :config="config" v-model="model">Init text</froala>
        <div id="qr-holder" ref="qrHolder"></div>
    </div>

</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';
import * as qrcode from "qrcode-generator";
import { select, selectAll } from "d3-selection";
import { EventBus } from "@/main";

export default {
    props: ["icon", "id", "text"],

    data() {
        return {
            config: {
                toolbarInline: true,
                //initOnCLick: true,
                charCounterCount: false,
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'color', 'emoticons', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'],
                heightMin: 300,
                heightMax: 600,
                events: {
                    'froalaEditor.initialized': function () {
                        console.log('initialized')
                    },
                    'froalaEditor.focus' : (e, editor) => {
                        console.log(editor.selection.get());
                    }   
                }
            },
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
        //console.log(this);
        this.onPush(this.$props.text);
    },

    beforeDestroy() {},

    watch: {},

    computed: {},

    methods: {
        createQR(typeNumber, errorCorrectionLevel) {
            this.qr = qrcode(typeNumber, errorCorrectionLevel);
        },

        onPush(data) {
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
        path {
            fill: green;
        }
    }

    .iconic {
        margin-left: 20%;
        max-width: 30%;
        opacity: 1 !important;
    }
}
</style>
