<template>
  <div ref="fileUploader" id="file-upload">
    <div class="container">
      <form v-if="(isInitial || isSaving) && mimetype" enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            :disabled="isSaving"
            :accept="mimetype"
            class="input-file"
            type="file"
            @change="
              onFilesChange(resourceType, $event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
          />
          <p v-if="isInitial">
            <font-awesome-icon icon="plus" size="2x" />
            add {{ mimetype }}
          </p>
          <p v-if="isSaving">
            <font-awesome-icon icon="spinner" size="2x" />
            Uploading {{ fileCount }} files...
          </p>
          <vue-croppie
            v-if="resourceType === 'Images'"
            ref="Croppie"
            :viewport="{ width: maxViewportWidth, height: maxViewportHeight }"
            :boundary="{ width: maxBoundaryWidth, height: maxBoundaryHeight }"
            :show-zoomer="false"
            :enable-orientation="true"
            :enable-resize="true"
          />
          <vue-audio
            v-else-if="resourceType === 'Audios' && uploadedFile"
            ref="vueAudio"
            :size="uploadedFile.size"
            :file="uploadedFile.url"
          />
        </div>
      </form>
      <div v-if="isSuccess">
        <p>
          <font-awesome-icon icon="smile" size="xs" />
          Success!
        </p>
        <p>
          <font-awesome-icon icon="arrow-up" size="xs" />
          <a href="javascript:void(0)" @click="reset()">
            Upload again
          </a>
        </p>
        <!--  <font-awesome-icon icon="arrow-up" size="xs" />
        <button :class="`${imgType.toLowerCase()}-button`" :disabled="isSaving" @click="onFileSave">
          Valider
        </button> -->
        <div v-if="resourceType === 'Audios'">
          <vue-audio v-for="item in uploadedFiles" :key="item.id" :size="size" :file="item.url" />
        </div>
        <div v-else-if="resourceType === 'Images'">
          <img :src="imageUrl" />
          <!--  <ul class="list-unstyled">
            <li v-for="item in uploadedFiles" :key="item.originalName">
              <img :src="item.url" :alt="item.originalName" class="img-responsive img-thumbnail" />
            </li>
          </ul> -->
        </div>
      </div>

      <div v-if="isFailed">
        <h2>
          <font-awesome-icon icon="frown" size="xs" />
          Failed.
        </h2>
        <p>
          <font-awesome-icon icon="arrow-up" size="xs" />
          <a href="javascript:void(0)" @click="reset()">
            Try again
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueAudio from 'vue-audio';
import { EventBus } from '@/services/PubSub';
import { upload } from '@/services/HttpClient';
import logger from '@/services/logger';

export default {
  name: 'FileUploader',

  components: {
    VueAudio,
  },

  props: {
    'access-token': {
      type: Object,
      default: null,
    },
    'profile-type': {
      type: String,
      required: false,
      default: null,
    },
    'resource-type': {
      type: String,
      required: true,
      default: 'Images',
    },
  },

  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      error: null,
      success: null,
      // mimetype: `${this.$props.resourceType.toLowerCase().slice(0, this.$props.resourceType.lastIndexOf("s"))}/*`,
      maxSize: 10000000,
      maxWidth: 250,
      maxHeight: 250,
      fileCount: null,
      fileName: '',
      imageUrl: null,
      uploadedFile: null,
      STATUS_INITIAL: this.$store.state.ambience.STATUS_INITIAL,
      STATUS_SAVING: this.$store.state.ambience.STATUS_SAVING,
      STATUS_SUCCESS: this.$store.state.ambience.STATUS_SUCCESS,
      STATUS_FAILED: this.$store.state.ambience.STATUS_FAILED,
    };
  },

  computed: {
    mimetype() {
      return `${this.resourceType.toLowerCase().slice(0, this.resourceType.lastIndexOf('s'))}/*`;
    },
    isInitial: {
      get() {
        return this.$store.state.ambience[this.resourceType].status === this.STATUS_INITIAL;
      },
    },
    isSaving: {
      get() {
        return this.$store.state.ambience[this.resourceType].status === this.STATUS_SAVING;
      },
    },
    isSuccess: {
      get() {
        return this.$store.state.ambience[this.resourceType].status === this.STATUS_SUCCESS;
      },
    },
    isFailed: {
      get() {
        return this.$store.state.ambience[this.resourceType].status === this.STATUS_FAILED;
      },
    },
    status: {
      get() {
        return this.$store.state.ambience[this.resourceType].status;
      },
      set(value) {
        this.$store.commit('ambience/setModelKV', {
          resourceType: this.resourceType,
          key: 'status',
          value,
        });
      },
    },
    ratio() {
      if (window.innerWidth >= 320 && window.innerWidth <= 480) {
        return 2;
      } else if (window.innerWidth >= 480 && window.innerWidth <= 768) {
        return 1.8;
      } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        return 1.5;
      } else if (window.innerWidth >= 1024 && window.innerWidth <= 1400) {
        return 1.3;
      } else {
        return 1;
      }
    },
    maxBoundaryWidth: {
      get() {
        return this.maxWidth / this.ratio;
      },
    },
    maxBoundaryHeight: {
      get() {
        return this.maxHeight / this.ratio;
      },
    },
    maxViewportWidth: {
      get() {
        return this.maxWidth / 1.2 / this.ratio;
      },
    },
    maxViewportHeight: {
      get() {
        return this.maxHeight / 1.2 / this.ratio;
      },
    },
    windowWidth: {
      get() {
        return this.$store.state.windowWidth;
      },
    },
    windowHeight: {
      get() {
        return this.$store.state.windowHeight;
      },
    },
  },

  mounted() {
    this.reset();
    // this.$refs.Croppie.bind({
    //   url: this.imageUrl,
    // });
  },

  methods: {
    reset() {
      //  this.currentStatus = STATUS_INITIAL;
      //  this.uploadError = null;
      this.error = null;
      this.success = null;
      this.imageUrl = null;
      this.uploadedFile = null;
      this.status = this.STATUS_INITIAL;
      if (this.resourceType === 'Images') {
        this.$refs.Croppie.refresh();
      }
      this.$store.dispatch('ambience/onResetFileImport', {
        resourceType: this.$props.resourceType,
      });
    },

    async save(resource, formData, name) {
      this.currentStatus = this.STATUS_SAVING;
      return upload(resource, formData, 'name/' + name)
        .then((res) => {
          //this.$store.state.uploadedFiles = [].concat(x);
          this.uploadedFiles = [].concat(res);
          this.currentStatus = this.STATUS_SUCCESS;
          EventBus.$emit('file-uploader', resource, this.uploadedFiles);
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = this.STATUS_FAILED;
        });
    },

    async filesChange(resource, fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).forEach((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      return this.save(resource, formData, fileList[0].name);
    },

    async onFilesChange(resourceType, name, files) {
      logger.publish(4, 'files', 'onFilesChange:req', resourceType, name, files);
      this.error = null;
      this.success = null;
      this.fileName = name;
      if (files && files[0]) {
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onload = (e) => {
            this.uploadedFile = e.target;
            if (resourceType === 'Images') {
              this.$refs.Croppie.bind({
                url: e.target.result,
              });
            }
            resolve(e.target.result);
          };
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(files[0]);
        });
      } else {
        this.error = {
          message: "Désolé, ce navigateur ne supporte pas l'envoi d'image",
        };
        logger.publish(4, 'files', 'onFilesChange:err', this.error);
      }
    },

    onRotate(evt) {
      if (evt) evt.preventDefault();
      if (evt) evt.stopPropagation();
      this.$refs.Croppie.rotate(parseInt(90, 10));
    },

    crop() {
      const options = {
        type: 'canvas',
        size: {
          width: this.maxWidth,
          height: this.maxHeight,
        },
      };
      this.$refs.Croppie.result(options, (output) => {
        this.handleCroppedImage(output);
      });
      //  this.$refs[`${this.imgType.toLowerCase()}Croppie`].result(options);
    },

    async handleCroppedImage(output) {
      //  this.imageUrl = output;
      try {
        const blob = await fetch(output).then((res) => res.blob());
        const fileType = blob.type.split('/');
        const blobToFile = new File([blob], `${this.imgType}.${fileType[1]}`, {
          type: blob.type,
        });
        this.uploadedFile = await this.$store.dispatch('ambience/onFileImport', {
          accessToken: this.$props.accessToken,
          resourceType: this.$props.resourceType,
          //  role: this.imgType,
          files: blobToFile,
        });
      } catch (error) {
        this.error = error;
        logger.publish(4, 'ambience', 'onFileSave:err', error);
      }

      if (this.isSuccess) {
        logger.publish(4, 'ambience', 'onFileSave:res', this.uploadedFile);
        this.source = this.uploadedFile.url;
        this.$refs.Croppie.bind({
          url: this.uploadedFile.url,
        });
        this.success = { message: 'Votre image est enregistré' };
        this.$parent.hide();
      } else if (this.isFailed) {
        logger.publish(4, 'ambience', 'onFileSave:err', 'uploadFailed');
        this.error = {
          message: "L'envoi de l'image a échoué, veuillez réessayer",
        };
      }
      logger.publish(4, 'ambience', 'onFileSave:err', 'still loading ?');
    },

    async onFileSave(evt) {
      if (evt) evt.preventDefault();
      if (evt) evt.stopPropagation();
      this.error = null;
      this.success = null;
      // console.log(
      //   "onFileSave:req",
      //   this.$refs[`${this.imgType.toLowerCase()}Croppie`].croppie.data.url,
      // );
      if (!this.$refs.Croppie.croppie.data.url) {
        return null;
      }
      return this.crop();
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/ambienz.scss';
</style>
