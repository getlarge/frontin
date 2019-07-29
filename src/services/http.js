import axios from "axios";
import Storage from "./LocalStore";
import logger from "./logger";

const serverUrl = process.env.VUE_APP_SERVER_URL;
const restApiRoot = process.env.VUE_APP_ROOT_API;

function exportTokenToLocalStorage(token) {
  if (Storage) {
    Storage.setItem("loopback-token", JSON.stringify(token));
  }
}

function removeTokenFromLocalStorage() {
  if (Storage) {
    //  Storage.removeStorage("profile");
    Storage.removeStorage("loopback-token");
  }
}

function addTokenFromLocalStorage(http) {
  const token = Storage && Storage.getStorage("loopback-token");
  if (token) {
    http.setToken(JSON.parse(token), false);
  }
}

const http = axios.create({
  baseURL: `${serverUrl}${restApiRoot}`
});

// Current setLoading function
let setLoading = () => {
  logger.publish(2, "loopback", "setLoadingFunction", "undefined");
};

http.setLoadingFunction = fn => {
  setLoading = fn;
};

http.setToken = async (token, save = true) => {
  http.token = token;
  http.defaults.headers.common.Authorization = token.id;
  if (save) exportTokenToLocalStorage(token);
};

http.removeToken = async () => {
  delete http.token;
  delete http.defaults.headers.common.Authorization;
  return removeTokenFromLocalStorage();
};

http.find = (endpoint, filter) => http.get(endpoint, { params: { filter } });

const interceptResErrors = err => {
  logger.publish(2, "loopback", "listener:interceptResErrors", err);
  try {
    setLoading(false, err.config.uid || err.response.config.uid);
    err = Object.assign(new Error(), err.response.data.error);
  } catch (e) {
    // Will return err if something goes wrong
  }
  return Promise.reject(err);
};
const interceptResponse = res => {
  logger.publish(5, "loopback", "listener:interceptResponse", res);
  setLoading(false, res.config.uid);
  try {
    return res.data;
  } catch (e) {
    return res;
  }
};
http.interceptors.response.use(interceptResponse, interceptResErrors);

// Set storage Token in http if exists
addTokenFromLocalStorage(http);

const interceptReqErrors = err => Promise.reject(err);
const interceptRequest = config => {
  config.uid = setLoading(true, config.uid);
  logger.publish(5, "loopback", "listener:interceptRequest", config);
  return config;
};
http.interceptors.request.use(interceptRequest, interceptReqErrors);

export default http;
