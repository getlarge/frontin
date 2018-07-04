import * as axios from 'axios';
import config from '@/config.json'

const BASE_URL = config.httpServerURL;

function upload(format, formData) {
//function upload(formData) {
    const url = `${BASE_URL}/${format}s/upload`;
    console.log("url",url);
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/${format}s/${img.id}` })));
}

export { upload }