import * as axios from "axios";
import { config } from "@/configFile";

const BASE_URL = config.httpClient.url;
const username = config.httpClient.username;
const password = config.httpClient.password;
const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

//axios.defaults.baseURL = config.httpClient.url;
//axios.defaults.headers.common['Authorization'] = auth;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// upload: load a collection via bareback API
//   params:
//       resource <string>  : collection name to load
//       formData <object>  : database instance
//       filter <string>  : filter applied to result
//   returns:
//       <object> : return saved file
function upload(resource, formData, filter) {
    const url = `${BASE_URL}${resource}s`;
    //console.log(resource,formData, filter);
    //console.log("url",url);
    return (
        axios
            .post(url, formData)
            // get data
            .then(res => res.data)
            // add url field
            .then(res =>
                res.map(file =>
                    Object.assign({}, file, {
                        url: `${BASE_URL}${resource}s/${filter}`
                    })
                )
            )
    );
}

function getFilesByFormat(resource) {
    const url = `${BASE_URL}${resource}s`;
    return axios
        .get(url)
        .then(response => {
            this.files = response.data;
            console.log(response.data);
        })
        .catch(error => {
            this.errors.push(error);
            console.log(error);
        });
}

function getFileByParam(resource, param, name) {
    const url = `${BASE_URL}${resource}s/${param}/${name}`;
    //console.log(url)
    return axios.get(url).then(res => res);
}

export { upload, getFilesByFormat, getFileByParam };
