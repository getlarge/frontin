import * as axios from 'axios';
import config from '@/config.json'

const BASE_URL = config.httpServerURL;
const URL = "localhost:3000";
const username = config.options.username;
const password = config.options.password;
const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

axios.defaults.baseURL = config.httpServerURL;
//axios.defaults.headers.common['Authorization'] = auth;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function upload(format, formData) {
//function upload(formData) {
    const url = `${BASE_URL}/${format}s/upload`;
    console.log("url",url);
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(file => Object.assign({},
            file, { url: `${BASE_URL}/${format}s/name/${file.originalName}` })));
}

export { upload }