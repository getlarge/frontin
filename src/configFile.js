const clientId = process.env.MQTT_CLIENT_ID || "frontin";

const config = {
    appname: process.env.APP_NAME || "Frontin",
    prefix: process.env.PREFIX || "getlarge",
    homeLink: "/",
    //localhost: process.env.LOCALMACHINE || "localhost",
    localhost: "localhost",
    vueDevtoolsPort: process.env.VUE_DEVTOOLS_PORT || "8098",
    gitLink: process.env.GIT_LINK || "https://framagit.org/getlarge/frontin/",
    ComponentsPath: process.env.COMPONENTS_PATH || "tree/master/src/components",
    tel: process.env.PHONE || "+33624297761",
    domain: process.env.DOMAIN || "getlarge.eu",
    httpClient: {
        url: process.env.HTTP_CLIENT_URL || "http://localhost:3000/",
        username: process.env.HTTP_CLIENT_USER || "",
        password: process.env.HTTP_CLIENT_PASS || ""
    },
    mqttClient: {
        url: process.env.MQTT_CLIENT_URL || "mqtt://localhost:3001",
        options: {
            host: process.env.MQTT_CLIENT_HOST || "localhost",
            port: process.env.MQTT_CLIENT_PORT || 3001,
            clientId:
                clientId +
                "_" +
                Math.random()
                    .toString(16)
                    .substr(2, 8),
            username: process.env.MQTT_CLIENT_USER || "",
            password: new Buffer(process.env.MQTT_CLIENT_PASS) || ""
        }
    },
    chatClient: {
        url: process.env.CHAT_CLIENT_URL || "https://chat.aloes.io/livechat",
        scriptUrl: process.env.CHAT_CLIENT_SCRIPT_URL || ""
    }
};

export { config };
