import * as axios from 'axios';

const BASE_URL = process.env.VUE_APP_SERVER_URL;

async function upload(resource, formData, filter) {
  const url = `${BASE_URL}${resource}s`;
  //console.log(resource,formData, filter);
  return (
    axios
      .post(url, formData)
      // get data
      .then((res) => res.data)
      // add url field
      .then((res) =>
        res.map((file) =>
          Object.assign({}, file, {
            url: `${BASE_URL}${resource}s/${filter}`,
          }),
        ),
      )
  );
}

async function getFilesByFormat(resource) {
  const url = `${BASE_URL}${resource}s`;
  return axios.get(url);
}

async function getFileByParam(resource, param, name) {
  const url = `${BASE_URL}${resource}s/${param}/${name}`;
  //console.log(url)
  return axios.get(url);
}

export { upload, getFilesByFormat, getFileByParam };
