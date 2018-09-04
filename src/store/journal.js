import { config } from "@/configFile";
import { getFileByName, upload } from "@/services/bareback";

const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;

const serverURL = config.httpClient.url;

const state = {
    posts: [
        {
            id: 0,
            journalId: 0,
            name: "cover",
            text: "",
            textURL: ""
        },
        {
            id: 1,
            journalId: 0,
            name: "page1",
            text: "this is the page 1",
            textUrl: serverURL + "texts/page/1"
        },
        {
            id: 2,
            journalId: 0,
            name: "page2",
            text: "this is the page 2",
            textUrl: serverURL + "texts/page/2"
        },
        {
            id: 3,
            journalId: 0,
            name: "page3",
            text: "this is the page 3",
            textUrl: serverURL + "texts/page/3"
        },
        {
            id: 4,
            journalId: 0,
            name: "expérience",
            text: "L’expérience est une bougie qui n’éclaire que celui qui la porte. - Confucius",
            textUrl: serverURL + "texts/page/4"
        },
        {
            id: 5,
            journalId: 0,
            name: "langage",
            text:
                "Le langage est-il l'expression adéquate de toutes les réalités ? - Friedrich Nietzsche",
            textUrl: serverURL + "texts/page/5"
        },
        {
            id: 6,
            journalId: 0,
            name: "détermination",
            text:
                "Tout obstacle renforce la détermination. Celui qui s'est fixé un but n'en change pas. - Leonard de Vinci",
            textUrl: serverURL + "texts/page/6"
        },
        {
            id: 7,
            journalId: 0,
            name: "page7",
            text: "this is the page 7",
            textUrl: serverURL + "texts/page/7"
        },
        {
            id: 8,
            journalId: 0,
            name: "page8",
            text: "this is the page 8",
            textUrl: serverURL + "texts/page/8"
        },
        {
            id: 9,
            journalId: 0,
            name: "page9",
            text: "this is the page 9",
            textUrl: serverURL + "texts/page/9"
        },
        {
            id: 10,
            journalId: 0,
            name: "page10",
            text: "this is the page 10",
            textUrl: serverURL + "texts/page/10"
        },
        {
            id: 11,
            journalId: 0,
            name: "page11",
            text: "this is the page 11",
            textUrl: serverURL + "texts/page/11"
        },
        {
            id: 12,
            journalId: 0,
            name: "page12",
            text: "this is the page 12",
            textUrl: serverURL + "texts/page/12"
        },
        {
            id: 13,
            journalId: 0,
            name: "page13",
            text: "this is the page 13",
            textUrl: serverURL + "texts/page/13"
        },
        {
            id: 14,
            journalId: 0,
            name: "page14",
            text: "this is the page 14",
            textUrl: serverURL + "texts/page/14"
        },{
            id: 15,
            journalId: 0,
            name: "page15",
            text: "this is the page 15",
            textUrl: serverURL + "texts/page/15"
        },{
            id: 16,
            journalId: 0,
            name: "page16",
            text: "this is the page 16",
            textUrl: serverURL + "texts/page/16"
        },{
            id: 17,
            journalId: 0,
            name: "page17",
            text: "",
            textUrl: serverURL + "texts/page/17"
        },{
            id: 18,
            journalId: 0,
            name: "page18",
            text: "this is the page 18",
            textUrl: serverURL + "texts/page/18"
        },{
            id: 19,
            journalId: 0,
            name: "page19",
            text: "this is the page 19",
            textUrl: serverURL + "texts/page/19"
        },{
            id: 20,
            journalId: 0,
            name: "page20",
            text: "this is the page 20",
            textUrl: serverURL + "texts/page/20"
        },{
            id: 21,
            journalId: 0,
            name: "page21",
            text: "this is the page 21",
            textUrl: serverURL + "texts/page/21"
        },
    ],
    arrowRight: "static/icons/arrow-right.png",
    arrowLeft: "static/icons/arrow-left.png",
    journalEvent: "closed",
    journalFrame: "static/icons/eundi1.png",
    counter: 0,
    pageNumber: 0,
    digicode: ["0", "0", "0", "0"],
    solution: "1433",
    uploadStatus: STATUS_INITIAL,
    formData: {},
    resource: "text",
    tutorial: {
        text: "",
        tags: "",
        img: "static/img/tuto-ambience.gif"
    }
};

const mutations = {
    addPost(state, obj) {
        state.posts.push(obj);
    },
    updatePost(state, page, text) {
        state.posts[page].text = text;
    },
    updatePostsCounter(state, i) {
        state.counter += i;
    },
    updateJournalStatus(state, status) {
        state.journalEvent = status;
    },
    updateJournalFrame(state, url) {
        state.journalFrame = url;
    },
    uploadStatus(state, status) {
        state.uploadStatus = status;
    },
    updateFormData(state, formData) {
        state.formData = formData;
    }
};

const getters = {
    /// GET journal content by Id ( pageNumber ), from bareback server
    checkAuth: state => {
        //console.log(state.digicode.reduce(getters.getDigicode));
        if (state.digicode.reduceRight(getters.getDigicode) === state.solution) {
            return true;
        } else {
            return false;
        }
    },
    getDigicode(total, value, index, array) {
        return total + value;
    }
};

const actions = {
    // save({ state, commit }, resource, formData) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             upload(state.resource, state.formData)
    //             console.log(state.formData)
    //             commit('uploadStatus', STATUS_SAVING)
    //             resolve()
    //         }, 1000)
    //     })
    // },
    // save(resource, formData) {
    //         this.currentStatus = STATUS_SAVING;
    //         //console.log(formData);
    //         upload(resource, formData)
    //             //.then(wait(1500)) // DEV ONLY: wait for 1.5s
    //             .then(x => {
    //                 this.uploadedFiles = [].concat(x);
    //                 this.currentStatus = STATUS_SUCCESS;
    //                 console.log("uploaded : ", this.uploadedFiles);
    //                 this.pushQRCode(this.uploadedFiles[0].url);
    //                 /// commit response id in the corresponding page ( in the store )
    //                 //EventBus.$emit("file-uploader", resource, this.uploadedFiles);
    //             })
    //             .catch(err => {
    //                 console.log("uploaded : ", err);
    //                 this.uploadError = err.response;
    //                 this.currentStatus = STATUS_FAILED;
    //             });
    //     },
};

const journal = {
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
};

export { state, mutations, getters, actions, journal };
