<template>
    <div id="stream-viewer">
        <div><button id="snap" v-on:click="capture()">Snap Photo</button></div>
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
     
    export default {
        name: "stream-viewer",
        data() {
            return {
                img: {},
                canvas: {},
                captures: []
            }
        },
        mounted() {
          // s'abonner au topic mqtt de flux image
          // lors de l'arrivé d'un stream, transformer en image 
          // update du canvas
        },        
        
        methods: {
   
            upload(formData) {
                const photos = formData.getAll('photos');
                const promises = photos.map((x) => getImage(x)
                    .then(img => ({
                        id: img,
                        originalName: x.name,
                        fileName: x.name,
                        url: img
                    })));
                return Promise.all(promises);
            },

            getImage(file) {
                console.log(file)
                return new Promise((resolve, reject) => {
                    const fReader = new FileReader();
                    const img = document.createElement('img');
                    this.img = this.$refs.image;

                    fReader.onload = () => {
                        this.img.src = fReader.result;
                        resolve(getBase64Image(this.img));
                    }

                    fReader.readAsDataURL(file);
                })
            },

            getBase64Image(img) {
                console.log(img)
                this.canvas = this.$refs.canvas;
                var context = this.canvas.getContext("2d").drawImage(img, 0, 0, 640, 480);
                this.captures.push(canvas.toDataURL("image/png"));
                // const dataURL = canvas.toDataURL('image/png');
                // return dataURL;
            },

        },
    }    
    
</script>


<style>

    body: {
        background-color: #F0F0F0;
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
