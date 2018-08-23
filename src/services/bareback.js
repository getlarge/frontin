import * as axios from "axios";
import { config } from "@/configFile";

const BASE_URL = config.httpClient.url;
const username = config.httpClient.username;
const password = config.httpClient.password;
const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

//axios.defaults.baseURL = config.httpClient.url;
//axios.defaults.headers.common['Authorization'] = auth;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function upload(resource, formData, filter) {
    const url = `${BASE_URL}${resource}s`;
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
                        //url: `${BASE_URL}${resource}s/name/${file.originalName}`
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

// function getFileByParam(resource, param, name) {
//     const url = `${BASE_URL}${resource}s/${param}/${name}`;
//     return new Promise((resolve) => {
//         db.loadDatabase({}, () => {
//             const _collection = db.getCollection(colName) || db.addCollection(colName);
//             resolve(_collection);
//         });
//     });
// };

function getFileByParam(resource, param, name) {
    const url = `${BASE_URL}${resource}s/${param}/${name}`;
    //console.log(url)
    return axios.get(url).then(res => res);
}

export { upload, getFilesByFormat, getFileByParam };
