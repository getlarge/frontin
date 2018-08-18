import * as axios from "axios";
import { config } from "@/configFile";

const BASE_URL = config.httpClient.url;
const URL = "localhost:3000/";
const username = config.httpClient.username;
const password = config.httpClient.password;
const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

axios.defaults.baseURL = config.httpClient.url;
//axios.defaults.headers.common['Authorization'] = auth;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function upload(format, formData) {
    const url = `${BASE_URL}${format}s/upload`;
    //console.log("url",url);
    return (
        axios
            .post(url, formData)
            // get data
            .then(x => x.data)
            // add url field
            .then(x =>
                x.map(file => Object.assign({}, file, { url: `${BASE_URL}${format}s/name/${file.originalName}` }))
            )
    );
}

export { upload };
