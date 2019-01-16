<template>
  <div ref="fileUploader" id="file-upload">
    <div class="container">   
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox">
          <input 
            :name="`${mimetype}s`" 
            :disabled="isSaving" 
            :accept="`${mimetype}/*`" 
            class="input-file"
            type="file" 
            multiple 
            @change="filesChange(mimetype, $event.target.name, $event.target.files); fileCount = $event.target.files.length" >
          <p v-if="isInitial">
            <font-awesome-icon 
              icon="plus" 
              size="2x" />
            {{ mimetype }} file(s) here to begin
          </p>
          <p v-if="isSaving">
            <font-awesome-icon 
              icon="spinner" 
              size="2x" />
            Uploading {{ fileCount }} files...
          </p>
        </div>
      </form>
      <div v-if="isSuccess">
        <p>
          <font-awesome-icon icon="smile" size="xs" /> 
          Success!
        </p>
        <p>
          <font-awesome-icon icon="arrow-up" size="xs" />
          <a 
            href="javascript:void(0)" 
            @click="reset()">
            Upload again
          </a>
        </p>
        <div v-if="mimetype === 'audio'" >
          <vue-audio 
            v-for="item in uploadedFiles"
            :key="item.id" 
            :size="size" 
            :file="item.url"/>
        </div>
        <div v-else>
          <ul class="list-unstyled">
            <li 
              v-for="item in uploadedFiles"
              :key="item.originalName">
              <img 
                :src="item.url"
                :alt="item.originalName"
                class="img-responsive img-thumbnail">
            </li>
          </ul>
        </div>
      </div>

      <div v-if="isFailed">
        <h2>
          <font-awesome-icon icon="frown" size="xs"/> 
          Failed.
        </h2>
        <p>
          <font-awesome-icon icon="arrow-up" size="xs" />
          <a 
            href="javascript:void(0)" 
            @click="reset()">
            Try again
          </a>
        </p>
      </div>  
    </div>
  </div>
</template>

<script>
import VueAudio from "vue-audio";
import { EventBus } from "@/main";
import { upload } from "@/services/HttpClient";
//import { wait } from "@/services/utils"
//import { upload } from "@/services/file-upload.fake.service"; // fake service, might be used to decode image on the brower

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  props: ["mimetype", "fieldName", "size"],
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null
    };
  },

  components: {
    VueAudio
  },

  mounted() {
    this.reset();
  },

  updated() {
    // if (this.currentStatus === STATUS_FAILED) {
    //     console.log("error", this.uploadError);
    // }
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

    save(resource, formData, name) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      upload(resource, formData, "name/" + name)
        //.then(wait(1500)) // DEV ONLY: wait for 1.5s
        .then(res => {
          //this.$store.state.uploadedFiles = [].concat(x);
          this.uploadedFiles = [].concat(res);
          this.currentStatus = STATUS_SUCCESS;
          //this.inputUpdate(this.$store.state.uploadedFiles);
          // console.log("uploaded : ", this.uploadedFiles);
          EventBus.$emit("file-uploader", resource, this.uploadedFiles);
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },

    inputUpdate(files) {
      this.$store.commit("updateFiles", files);
    },

    filesChange(resource, fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      //console.log("formData", formData)
      //console.log("file", fileList[0])
      this.save(resource, formData, fileList[0].name);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/ambienz.scss";
</style>
