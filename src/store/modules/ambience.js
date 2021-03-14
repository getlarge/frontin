import { FileUploadService } from 'v-file-upload';
import logger from '@/services/logger';

const clientUrl = process.env.VUE_APP_CLIENT_URL;

export default {
  namespaced: true,
  state: {
    collectionName: 'Ambience',
    resources: 'Ambiences',
    counter: 0,
    headers: {},
    STATUS_INITIAL: 0,
    STATUS_SAVING: 1,
    STATUS_SUCCESS: 2,
    STATUS_FAILED: 3,
    Audios: {
      name: '',
      file: [],
      url: [],
      status: 0,
    },
    Document: {
      name: '',
      file: [],
      url: [],
      status: 0,
    },
    Images: {
      name: '',
      file: [],
      url: '',
      status: 0,
    },
    as0: [],
    as1: [
      {
        id: 1,
        name: 'vent',
        audioSource: [`${clientUrl}/sounds/wind.mp3`],
        iconFile: `${clientUrl}/icons/blaetter.png`,
      },
      {
        id: 2,
        name: 'feu',
        audioSource: [`${clientUrl}/sounds/fire.mp3`],
        iconFile: `${clientUrl}/icons/feuer.png`,
      },
      {
        id: 3,
        name: 'eau',
        audioSource: [`${clientUrl}/sounds/water-stream.mp3`],
        iconFile: `${clientUrl}/icons/meer.png`,
      },
    ],
    as2: [
      {
        id: 4,
        name: 'pluie',
        audioSource: [`${clientUrl}/sounds/rain.mp3`],
        iconFile: `${clientUrl}/icons/wolke.png`,
      },
      {
        id: 5,
        name: 'foret',
        audioSource: [`${clientUrl}/sounds/forrest.mp3`],
        iconFile: `${clientUrl}/icons/wald.png`,
      },
      {
        id: 6,
        name: 'tempête',
        audioSource: [`${clientUrl}/sounds/storm.mp3`],
        iconFile: `${clientUrl}/icons/sturm.png`,
      },
    ],
    as3: [
      {
        id: 7,
        name: 'café',
        audioSource: [`${clientUrl}/sounds/cafe.mp3`],
        iconFile: `${clientUrl}/icons/koffee.png`,
      },
      {
        id: 8,
        name: 'livre',
        audioSource: [`${clientUrl}/sounds/book.mp3`],
        iconFile: `${clientUrl}/icons/buch.png`,
      },
      {
        id: 9,
        name: 'trophée',
        audioSource: [`${clientUrl}/sounds/champion.mp3`],
        iconFile: `${clientUrl}/icons/trophae.png`,
      },
    ],
    tutorial: {
      text:
        'Create your own sound ambiance.\nEach icons can play a sound and the slider updates the volume, you can create your own widget too, just add audio and image files.\n Icons hand drawn by Isabella Kohout.',
      tags: '',
      img: '/img/tuto-ambience.gif',
    },
  },
  mutations: {
    updateASCounter(state, i) {
      state.counter += i;
    },

    updateAS0(state, obj) {
      state.as0.push(obj);
      //ambience.state.as0 = { ...ambience.state.as0, obj }
    },
    setModelKV(state, { resourceType, key, value }) {
      state[resourceType][key] = value;
      //  console.log("setUploadedFile : ", state[resourceType][key])
    },
  },
  actions: {
    async onResetFileImport({ state, commit }, { resourceType }) {
      logger.publish(4, state.collectionName, 'dispatch:onResetFileImport:req', {
        resourceType,
      });
      await commit('setModelKV', {
        resourceType,
        key: 'file',
        value: [],
      });
      return commit('setModelKV', {
        resourceType,
        key: 'status',
        value: state.STATUS_INITIAL,
      });
    },

    async onUploadSuccess({ state, commit }, { resourceType, res }) {
      logger.publish(4, state.collectionName, 'dispatch:onUploadSuccess:res', res.target.response);
      commit('setModelKV', {
        resourceType,
        key: 'url',
        value: `${res.target.response.url}`,
      });
      commit('setModelKV', {
        resourceType,
        key: 'status',
        value: state.STATUS_SUCCESS,
      });
      return res.target.response;
    },

    onUploadProgress(event) {
      logger.publish(4, 'files', 'onUploadProgress:res', event);
    },

    async onUploadError({ state, commit }, { resourceType, err }) {
      logger.publish(2, state.collectionName, 'dispatch:onUploadError:err', err);
      commit('setModelKV', {
        resourceType,
        key: 'status',
        value: state.STATUS_FAILED,
      });
      return err;
    },

    async onFileImport({ state, commit, dispatch }, { accessToken, resourceType, files }) {
      logger.publish(4, state.collectionName, 'dispatch:onFileImport:req', resourceType);
      commit('setModelKV', {
        resourceType,
        key: 'status',
        value: state.STATUS_SAVING,
      });

      const fileUpload = new FileUploadService(
        `${process.env.VUE_APP_SERVER_URL}${process.env.VUE_APP_ROOT_API}/files/${accessToken.userId}/upload`,
        {
          'access-token': accessToken.id,
          authorization: accessToken.id,
          //  "Access-Control-Allow-Origin": ["*"]
        },
        dispatch('onUploadProgress'),
      );

      return fileUpload
        .upload(files)
        .then((res) => dispatch('onUploadSuccess', { resourceType, res }))
        .catch((err) => dispatch('onUploadError', { resourceType, err }));
    },
  },
};
