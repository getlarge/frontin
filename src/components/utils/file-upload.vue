<template>
  <div ref="fileUploader" id="file-upload">
    <div class="container">
       
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox">
          <input type="file" multiple :name="`${mimetype}s`" :disabled="isSaving" @change="filesChange(mimetype, $event.target.name, $event.target.files,); fileCount = $event.target.files.length" :accept="`${mimetype}/*`" class="input-file">
            <p v-if="isInitial">
              <font-awesome-icon :icon="['fas', 'plus']" size="2x" />
              {{ mimetype }} file(s) here to begin
            </p>
            <p v-if="isSaving">
              <font-awesome-icon :icon="['fas', 'spinner']" size="2x" />
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>

       <div v-if="isSuccess">
        <p>
        <font-awesome-icon :icon="['fas', 'smile']" size="md" /> Success!</p>
        <p>
          <font-awesome-icon :icon="['fas', 'arrow-up']" size="md" />
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <div v-if="mimetype == 'audio'" v-for="item in uploadedFiles" >
            <vue-audio  :keys="item.id" :size="size" :file="item.url" />
        </div>
        <div v-else>
          <ul class="list-unstyled">
            <li v-for="item in uploadedFiles">
              <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
            </li>
          </ul>
        </div>
      </div>

      <div v-if="isFailed">
        <h2><font-awesome-icon :icon="['fas', 'frown']" size="md" /> Failed.</h2>
        <p>
          <font-awesome-icon :icon="['fas', 'arrow-up']" size="md" />
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
      </div>
        
  </div>
</div>
</template>

<script>

  import VueAudio from 'vue-audio'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import { mapState } from 'vuex'
  import { EventBus } from "@/main"
  import { upload } from '@/services/file-upload.service'
  import { wait } from '@/utils';

  //import { upload } from '@/services/file-upload.fake.service'; // fake service


  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    props:["mimetype", "fieldName", "size"],
    data() {
      return {
        formats: "image",
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: "photos",
      }
    },

    components: {
      VueAudio,
      FontAwesomeIcon
    },

    mounted() {
      this.reset();
     
    },

    updated() {
     if ( this.currentStatus === STATUS_FAILED) {
          console.log("error", this.uploadError);
      }
    },

    computed: {
      // ...mapState([
      //   'uploadedFiles',
      // ]),
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },

    methods: {
      reset() {
        this.currentStatus = STATUS_INITIAL;
        this.$store.state.uploadedFiles = [];
        this.uploadError = null;
      },

      save(format, formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        upload(format, formData)
          .then(wait(1500)) // DEV ONLY: wait for 1.5s 
          .then(x => {
            //this.$store.state.uploadedFiles = [].concat(x);
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
            //this.inputUpdate(this.$store.state.uploadedFiles);
            //var uploadedFile = this.uploadedFiles.slice().reverse().find(x ==> x.)
            //var uploadedFile = this.uploadedFile.pop();
            console.log(this.uploadedFiles)
            EventBus.$emit("file-uploader", format, this.uploadedFiles);

          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },

      inputUpdate(files) {
        this.$store.commit('updateFiles', files)
      },

      filesChange(format, fieldName, fileList) {
        const formData = new FormData();
        if (!fileList.length) return;

        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        this.save(format, formData);
      },

    },

  }

</script>

<style lang="scss">
  .img-thumbnail {
    background-color: transparent;
    border:none;
    width: 60%;
    max-width: 150px;
  }

  .player-audio {
   
  }

  .vue-sound__player {
     max-width: 100px;
    width: 100%;
    max-height: 30%;
    height: 30px !important;
    line-height: 30px !important;
    margin-bottom: 2% !important;
  }

  .vue-sound__playback-time-wrapper {
    max-width: 150px !important;
    width: 100%;

  }

  .vue-sound__extern-wrapper{
    margin-top: 2%;
    margin-left: 0px !important;
    font-size: 0.8em;
  }

  .volume-slider {
      -webkit-appearance: none;  /* Override default CSS styles */
      appearance: none;
      width: 50px  !important;
      height: 10px; 
      border-radius: 10px;
      background: #d3d3d3; 
      outline: none; 
      opacity: 0.7; 
      -webkit-transition: .2s; /* 0.2 seconds transition on hover */
      transition: opacity .2s;
  }

  .volume-slider:hover {
      opacity: 1; /* Fully shown on mouse-over */
  }

  .volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px; 
      height: 15px;
      border-radius: 25px;
      background: #FFF; /* Green background */
      cursor: pointer; 
  }

  .volume-slider::-moz-range-thumb {
      width: 15px; 
      height: 15px; 
      border-radius: 25px;
      background: #FFF;
      cursor: pointer; 
  }

  .dropbox {
    outline-offset: -10px;
    height: 30%;
    max-height: 130px;
        align-items: center;

    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    left:0px !important;
    cursor: pointer;
    position: absolute;
  }

  .dropbox:hover {
    background: lightblue; 
  }
 
  .dropbox p {
    font-size: 1em;
    text-align: justify;
  }

  p {
    font-size: 0.8em;
    text-align: justify;
    margin-bottom: 1% !important;
  }
</style>