import mqtt from "mqtt";
import logger from "./logger";
import PubSub from "./PubSub";

const brokerUrl = process.env.VUE_APP_BROKER_URL;
let options = {
  keepalive: 60,
  // reschedulePings: true,
  // protocolId: "MQTT",
  // protocolVersion: 4,
  // reconnectPeriod: 1000,
  // connectTimeout: 30 * 1000,
  // clean: true,
  clientId: null,
  username: null,
  password: null
};

let socket = {};

socket.setToken = token => {
  logger.publish(3, "socket", "setToken", token);
  //  socket.token = token;
  options = {
    ...options,
    clientId: token.userId.toString(),
    username: token.userId.toString(),
    password: token.id.toString()
  };
  socket.initSocket(token);
  // if already connected, just renew options ?
};

socket.removeToken = () => {
  logger.publish(3, "socket", "removeToken", options);
  options = {
    ...options,
    clientId: null,
    username: null,
    password: null
  };
  //  socket.disconnect();
};

socket.initSocket = token => {
  options = {
    ...options,
    clientId: token.userId.toString(),
    username: token.userId.toString(),
    password: token.id.toString()
  };
  // socket.client = mqtt.connect(brokerUrl, options);
  const client = mqtt.connect(brokerUrl, options);
  socket = { ...client, ...socket };
  socket.on("connect", () => {
    logger.publish(3, "socket", "onConnect", "");
    PubSub.setListeners(socket, token);
    // socket.client.subscribe(`${token.userId.toString()}/Authentication/POST`);
    // socket.client.publish(`${token.userId.toString()}/Authentication/POST`, "yooo");
  });

  socket.on("message", async (topic, message) => {
    await PubSub.handler(topic, message.toString());
  });

  socket.on("disconnect", () => {
    logger.publish(3, "socket", "onDisconnect", "");
    PubSub.close(socket);
  });
  //  return socket;
};

export default socket;
