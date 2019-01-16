const mqttClientId =
  (process.env.VUE_APP_MQTT_CLIENT_ID || "frontin") +
  "_" +
  Math.random()
    .toString(16)
    .substr(2, 8);
const mqttClientPass = process.env.VUE_APP_MQTT_PASS;
const mqttUser = process.env.VUE_APP_MQTT_USER || "";
const mqttUrl = process.env.VUE_APP_BROKER_URL || "mqtt://localhost:3001";

const config = {
  appname: process.env.APP_NAME || "Frontin",
  prefix: process.env.PREFIX || "getlarge",
  homeLink: "/",
  //localhost: process.env.LOCALMACHINE || "localhost",
  localhost: "localhost",
  gitLink:
    process.env.VUE_APP_GIT_LINK || "https://framagit.org/getlarge/frontin/",
  ComponentsPath:
    process.env.VUE_APP_GIT_COMPONENTS_PATH || "tree/master/src/components",
  tel: process.env.VUE_APP_PHONE || "+33624297761",
  domain: process.env.VUE_APP_DOMAIN || "getlarge.eu",
  httpClient: {
    url: process.env.VUE_APP_SERVER_URL || "http://localhost:3000/"
  },
  mqtt: {
    url: mqttUrl,
    options: {
      clientId: mqttClientId,
      username: mqttUser,
      password: new Buffer(mqttClientPass) || ""
    }
  }
};

export { config };
