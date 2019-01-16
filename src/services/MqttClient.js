import mqtt from "mqtt";
import {EventBus} from "@/main";

export default class Mqtt {
  constructor() {
    this.options = {
      clientId: `${process.env.VUE_APP_MQTT_CLIENT_ID || "frontin"}_${Math.random()
        .toString(16)
        .substr(2, 8)}`,
      username: process.env.VUE_APP_MQTT_USER,
      password: new Buffer(process.env.VUE_APP_MQTT_PASS),
    };
    this.client = {};
    this._initClient();
    //  this.asyncClient;
    this.buffer = [];
    this.frame = {};
    this.subscribeList = [];
    this.ready = false;
  }

  _initClient() {
    this.client = mqtt.connect(
      process.env.VUE_APP_BROKER_URL,
      this.options,
    );
    EventBus.$on("store:mqtt", () => {
      this.getStore();
    });
    EventBus.$on("sub:mqtt", (topic) => {
      this.subscribe(topic);
    });
    EventBus.$on("tx:mqtt", (topic, message) => {
      //return this.sendAsyncMessage(topic, message);
      this.publish(topic, message);
    });
  }

  openStream() {
    this.client.on("connect", () => {
      this.ready = true;
      this.setStatus("Connected");
    });

    this.client.on("disconnect", () => {
      this.setStatus("Disconnected");
    });

    this.client.on("end", () => {
      this.setStatus("Ended");
    });

    this.client.on("message", (topic, payload) => {
      //this.store.put(topic, payload);
      /// rename event on the received topic
      EventBus.$emit("rx:mqtt", topic, payload);
    });
  }

  close() {
    this.client.end();
    //  return this.asyncClient.end();
  }

  setStatus(status) {
    EventBus.$emit("status:mqtt", status);
  }

  publish(topic, message) {
    //console.log("sending :" ,topic, message)
    this.client.publish(topic, message, {retain: false, qos: 0});
    //this.client.publish(topic, message);
  }

  subscribe(topic) {
    this.client.subscribe(topic, {retain: false, qos: 0});
    //console.log("subscribed to :", topic)
    //     var pathList = path + '/' + topic;
    // this.subscribeList.push(pathList);
    // if (this.subscribeList.length == 100) {
    //   this.subscribeList.pop();
    // }
  }

  removeSubscribe(path, topic) {
    this.client.unsubscribe(topic);
    // var pathList = path + "/" + topic;
    //  console.log("index subscribe list :", this.subscribeList.indexOf(pathList));
  }

  // getStore(methods, topic) {
  //   //  var buffer;
  //   if (methods == "get") {
  //     return console.log(this.store.get(topic));
  //   }
  //   if (methods == "findMatching") {
  //     return console.log(this.store.findMatching(topic));
  //   }
  //   if (methods == "findPatterns") {
  //     return console.log(this.store.findPatterns(topic));
  //   }
  //   //EventBus.$emit("got-store", buffer);
  // }

  getSubscriptions() {
    EventBus.$emit("got-subscribed-list", this.subscribeList);
  }
}
