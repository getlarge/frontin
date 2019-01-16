import * as axios from "axios";

const BASE_URL = process.env.VUE_APP_SERVER_URL;

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
  return axios.get(url).then(res => res);
}

function getFileByParam(resource, param, name) {
  const url = `${BASE_URL}${resource}s/${param}/${name}`;
  //console.log(url)
  return axios.get(url).then(res => res);
}

export { upload, getFilesByFormat, getFileByParam };
