<template>
  <div ref="fileUploader" id="file-upload">
    <div class="container">
       
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox">
          <input type="file" multiple :name="`${mimetype}s`" :disabled="isSaving" @change="filesChange(mimetype, $event.target.name, $event.target.files,); fileCount = $event.target.files.length" :accept="`${mimetype}/*`" class="input-file">
            <p v-if="isInitial">
              <font-awesome-icon :icon="['fas', 'plus']" size="lg" />
              {{ mimetype }} file(s) here to begin
            </p>
            <p v-if="isSaving">
              <font-awesome-icon :icon="['fas', 'spinner']" size="lg" />
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>

       <div v-if="isSuccess">
        <h2><font-awesome-icon :icon="['fas', 'smile']" size="lg" /> Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <font-awesome-icon :icon="['fas', 'arrow-up']" size="xs" />
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <div v-if="mimetype == 'audio'">
            <vue-audio class="player-audio" :file="uploadedFiles[0].url" />
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
        <h2><font-awesome-icon :icon="['fas', 'frown']" size="lg" /> Upload failed.</h2>
        <p>
          <font-awesome-icon :icon="['fas', 'arrow-up']" size="xs" />
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
      </div>
        
  </div>
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import { EventBus } from "@/main"
  import { upload } from '@/services/file-upload.service'
  import VueAudio from 'vue-audio'
  import { wait } from '@/utils';

  //import { upload } from '@/services/file-upload.fake.service'; // fake service


  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    props:["mimetype", "fieldName"],
    data() {
      return {
        formats: "image",
        //uploadedFiles: [],
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
          console.log(this.uploadError);
      }
    },

    computed: {
      ...mapState([
        'uploadedFiles',
      ]),
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
            //this.uploadedFiles = [].concat(x);
            this.$store.state.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
            this.inputUpdate(this.$store.state.uploadedFiles);
            //EventBus.$emit("file-uploader",format, this.uploadedFiles);

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
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
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
  }

  .player-audio {
    max-width: 100px;
    width: 100%;
    height: 30%;
    max-height: 150px;
  }

  .vue-sound__playback-time-wrapper {
    max-width: 150px;
  }

  .dropbox {
    outline-offset: -10px;
    padding: 5px 5px;
    height: 30%;
    max-height: 130px;
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 70%;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; 
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>