<template>
    <div id="stream-viewer">
        <div>
          <b-dropdown id="cam-list" text="Cam List" class="m-md-2">
            <b-dropdown-item-btn >{{devices[0]}}</b-dropdown-item-btn>
            <b-dropdown-item-btn >{{devices[1]}}</b-dropdown-item-btn>
          </b-dropdown>
        <b-dropdown id="cam-timelapse" text="Timelapse" class="m-md-2">
            <b-dropdown-item-btn >{{fpm[0]}} frame/m</b-dropdown-item-btn>
            <b-dropdown-item-btn >{{fpm[1]}} frame/m</b-dropdown-item-btn>
            <b-dropdown-item-btn >{{fpm[2]}} frame/m</b-dropdown-item-btn>
            <b-dropdown-item-btn >{{fpm[3]}} frame/m</b-dropdown-item-btn>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-btn v-on:click="stream()">timelapse {{!timelapse}}</b-dropdown-item-btn>
          </b-dropdown>
            <b-btn v-on:click="capture()">Capture</b-btn>
        </div>

        <div v-if="uploadedFiles !== [] && timelapse === false "  id="image-scanner">
            <p>Picture labeled as
            <span id="result">...</span> with a confidence of
            <span id="probability">...</span></p>
        </div>
        <img ref="image" id="image" width="640" height="480"></img>
        <canvas ref="canvas" id="stream-container" width="640" height="480"></canvas>
        <ul>
            <li v-for="c in captures">
                <img v-bind:src="c" height="100" />
            </li>
        </ul>
    </div>
</template>

<script>
import { EventBus } from "@/main";
import ml5 from "ml5";

export default {
    name: "stream-viewer",
    data() {
        return {
            protocol: ["node-webcam"],
            devices: ["Camera2894413", "Camera16769688"],
            events: ["rx", "tx"],
            sensors: ["camera", "system"],
            commands: ["capture", "timelapse", "stream", "fpm", "reso"],
            fpm: [1, 2, 4, 6],
            img: {},
            canvas: {},
            captures: [],
            uploadedFiles: [],
            url: window.URL || window.webkitURL,
            counter: 0,
            timelapse: false
        };
    },

    created() {
        this.captureTopicRX =
            this.protocol[0] +
            "/" +
            this.devices[0] +
            "/" +
            this.events[0] +
            "/" +
            this.sensors[0] +
            "/" +
            this.commands[0];
        this.captureTopic =
            this.protocol[0] +
            "/" +
            this.devices[0] +
            "/" +
            this.events[1] +
            "/" +
            this.sensors[0] +
            "/" +
            this.commands[0];
        this.timelapseTopic =
            this.protocol[0] +
            "/" +
            this.devices[0] +
            "/" +
            this.events[1] +
            "/" +
            this.sensors[0] +
            "/" +
            this.commands[1];
        this.fpmTopicTX =
            this.protocol[0] +
            "/" +
            this.devices[0] +
            "/" +
            this.events[1] +
            "/" +
            this.sensors[0] +
            "/" +
            this.commands[1];
    },

    mounted() {
        document.getElementById("image-scanner").style.opacity = 0;
        EventBus.$emit("sub:mqtt", this.captureTopicRX + "/#");
        /// rename rx event on the subscribe topic rx:mqtt:{topicName}
        EventBus.$on("rx:mqtt", (topic, payload) => {
            if (topic === this.captureTopicRX) {
                this.counter += 1;
                if (!payload.length) {
                    return false;
                }
                this.parseStream(payload, 1024);
            } else {
                //console.log("not matching");
                return false;
            }
        });
    },

    methods: {
        capture() {
            console.log("capture");
            document.getElementById("image-scanner").style.opacity = 0;
            EventBus.$emit("tx:mqtt", this.captureTopicTX, "1");
        },

        stream() {
            if (this.timelapse === false) {
                console.log("timelapse on");
                EventBus.$emit("tx:mqtt", this.timelapseTopic, "1");
                return (this.timelapse = true);
            } else if (this.timelapse === true) {
                console.log("timelapse off");
                EventBus.$emit("tx:mqtt", this.timelapseTopic, "0");
                return (this.timelapse = false);
            }
        },

        setFPM(fpm) {
            EventBus.$emit("tx:mqtt", this.fpmTopicTX, fpm);
        },

        parseStream(payload, bufferSize) {
            if (payload.length === bufferSize) {
                //console.log(this.counter);
                if (this.counter === 1) {
                    return (this.uploadedFiles = new Blob([payload], { type: "image/jpeg" }));
                } else {
                    return (this.uploadedFiles = new Blob([this.uploadedFiles, payload], {
                        type: "image/jpeg"
                    }));
                }
            } else if (payload.length <= 4) {
                //console.log("last", this.counter);
                var blob = new Blob([this.uploadedFiles, payload], { type: "image/jpeg" });
                this.uploadedFiles = [];
                this.counter = 0;
                this.getImage(blob);
                if (this.url) {
                    //var url = this.url.createObjectURL(blob);
                    //console.log(url);
                    //return this.downloadImage(name, url)
                } else {
                    return false;
                }
            }
        },

        getImage(file) {
            //console.log(file);
            return new Promise((resolve, reject) => {
                const fReader = new FileReader();
                const img = document.createElement("img");
                this.img = this.$refs.image;
                fReader.onload = () => {
                    this.img.src = fReader.result;
                    resolve(this.getBase64Image(this.img));
                    if ( this.timelapse === false ) {
                        this.classifyImage();
                    }
                };
                fReader.readAsDataURL(file);
            });
        },

        getBase64Image(img) {
            //console.log(img);
            this.canvas = this.$refs.canvas;
            var context = this.canvas.getContext("2d").drawImage(img, 0, 0, 640, 480);
            this.captures.push(this.canvas.toDataURL("image/png"));
        },

        downloadImage(name, url) {
            var a = document.createElement("a");
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        },

        classifyImage() {
            document.getElementById("image-scanner").style.opacity = 1;
            const image = document.getElementById("image");
            const result = document.getElementById("result");
            const probability = document.getElementById("probability");
            const classifier = ml5.imageClassifier("MobileNet", function() {
                console.log("Model Loaded!");
            });
            classifier.predict(image, function(err, results) {
                result.innerText = results[0].className;
                probability.innerText = results[0].probability.toFixed(4);
            });

        }
    }
};
</script>


<style>
body: {
    background-color: #f0f0f0;
}

#stream-viewer {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#stream-container {
    display: none;
}

li {
    display: inline;
    padding: 5px;
}
</style>
