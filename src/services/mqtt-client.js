import mqtt from 'mqtt'
import moment from 'moment'
import config from '@/config.json'
import { EventBus } from '@/main';
//import { AsyncClient } from "async-mqtt"

var AsyncClient = require("async-mqtt").AsyncClient;

var options = {
  	clientId: config.options.clientId + "_" + Math.random().toString(16).substr(2, 8),
  	username: config.options.username,
  	password: new Buffer(config.options.password)
};


export default class mqttClient {
  constructor() {
    //super();
    this.client; 
    this._initClient();
    this.asyncClient;
    this.buffer = [];
    this.frame = {};
    this.subscribeList = [];
  }

  _initClient() {
    this.client = mqtt.connect(config.wsClientURL, options);
    this.asyncClient = new AsyncClient(this.client);
    EventBus.$on('get-buffer', () => {
      this.getBuffer()
    });
    EventBus.$on('send-message', (topic, message) => {
      this.sendAsyncMessage(topic, message)
    });

  }

  _initAsyncClient() {
    this.asyncClient = new AsyncClient(this.client);
  }

  openStream() {
    this.client.on("connect", () => {
      this.setStatus("Connected");
    })
        
    this.client.on("disconnect", () => {
      this.setStatus("Disconnected");
    })

    this.client.on("end", () => {
      this.setStatus("Ended");
    })

    this.client.on("message", (topic, payload) => {
      // var newPayload = topic + "//" + payload.toString();       
      // console.log("received :", newPayload);         
      var topicSplit = topic.split("/");
      if (topicSplit[6] == "37" ) {
        this.formatIncomingMessage("json", payload, "got-sound-frame");
      }

      if (topicSplit[6] == "38" ) {
        this.formatIncomingMessage("json", payload, "got-volt-frame");
      }

    })
  }

  formatIncomingMessage(type, payload, event) {
    if (type = "json") {
      var payloadSplit = payload.toString().split('/');
      // var day = moment(Number(payloadSplit[1]));
      // console.log("day", day)
      var x = Number(payloadSplit[1]);
      var y = Number(payloadSplit[0]);
      //var topicSplit = topic.split('/');
      //var sensorType = topicSplit[6];
      var formatedPayload = {
        x: x,
        y: y,
        //type: sensorType
      }; 
      //console.log(event.toString())
      EventBus.$emit(event.toString(), formatedPayload);
      this.buffer.push(formatedPayload);
    }
    if (this.buffer.length == 100 ) {
      this.buffer.pop();
    }
  }

  close() {
    this.client.end();
    return this.asyncClient.end();
  }

  setStatus(status) {
    EventBus.$emit("got-status", status);
  }

  sendAsyncMessage(topic, message) {
    this.asyncClient.publish(topic, message, { retain: false, qos: 0 })
      .then(function(){
        console.log("send message :", message, "to", topic )
        return this.asyncClient.end();
    });
  }

  addSubscribe(path, topic) {
    this.asyncClient.subscribe(topic).then(function(){
      console.log("subscribed to :", topic)
    });

    var pathList = path + "/" + topic;
    this.subscribeList.push(pathList);
    if (this.subscribeList.length == 100 ) {
      this.subscribeList.pop();
    }
    //this.client.subscribe(path);
    //console.log("subscribed to :", path );
    
  }

  removeSubscribe(path, topic) {
    this.asyncClient.subscribe(topic).then(function(){
      console.log("unsubscribed from :", topic)
    });

    //this.client.unsubscribe(path);
    //console.log("unsubscribed from :", path );
    var pathList = path + "/" + topic;
    console.log("index subscribe list :", this.subscribeList.indexOf(pathList));
  }

  getBuffer() {
    EventBus.$emit("got-buffer", this.buffer);
  }

  getSubscriptions() {
    EventBus.$emit("got-subscribed-list", this.subscribeList);
  }


}



