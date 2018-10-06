const mqttClientId =
  (process.env.MQTT_CLIENT_ID || 'frontin') +
  '_' +
  Math.random()
    .toString(16)
    .substr(2, 8);
const mqttClientPass = process.env.MQTT_CLIENT_PASS;
const mqttUser = process.env.MQTT_CLIENT_USER || '';
const mqttUrl = process.env.MQTT_CLIENT_URL || 'mqtt://localhost:3001';

const config = {
  appname: process.env.APP_NAME || 'Frontin',
  prefix: process.env.PREFIX || 'getlarge',
  homeLink: '/',
  //localhost: process.env.LOCALMACHINE || "localhost",
  localhost: 'localhost',
  vueDevtoolsPort: process.env.VUE_DEVTOOLS_PORT || '8098',
  gitLink: process.env.GIT_LINK || 'https://framagit.org/getlarge/frontin/',
  ComponentsPath: process.env.COMPONENTS_PATH || 'tree/master/src/components',
  tel: process.env.PHONE || '+33624297761',
  domain: process.env.DOMAIN || 'getlarge.eu',
  httpClient: {
    url: process.env.HTTP_CLIENT_URL || 'http://localhost:3000/',
  },
  mqtt: {
    url: mqttUrl,
    options: {
      clientId: mqttClientId,
      username: mqttUser,
      password: new Buffer(mqttClientPass) || '',
    },
  },
  chatClient: {
    url: process.env.CHAT_CLIENT_URL || 'https://chat.aloes.io/livechat',
    scriptUrl: process.env.CHAT_CLIENT_SCRIPT_URL || '',
  },
};

export {config};
