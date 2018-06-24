import mqtt from 'mqtt'
import { AsyncClient } from "async-mqtt"
import moment from 'moment'
import config from '@/config.json'
import { EventBus } from '@/main'

import ToneSynth from '@/tone-components/synth'


var options = {
  	clientId: config.options.clientId + "_" + Math.random().toString(16).substr(2, 8),
  	username: config.options.username,
  	password: new Buffer(config.options.password)
};

export default class mqttClient {
  constructor() {
    this.client; 
    this._initClient();
    this.asyncClient;
    this.buffer = [];
    this.frame = {};
    this.subscribeList = [];
    this.ready = false;
    this.synth = new(ToneSynth);

  }

  _initClient() {
    this.client = mqtt.connect(config.wsClientURL, options);
    this.asyncClient = new AsyncClient(this.client);
    EventBus.$on('get-buffer', () => {
      this.getBuffer()
    });
    EventBus.$on('send-message', (topic, message) => {
      //this.sendAsyncMessage(topic, message)
      this.sendMessage(topic, message)
    });
  }

  _initAsyncClient() {
    this.asyncClient = new AsyncClient(this.client);
  }

  openStream() {
    this.client.on("connect", () => {
      this.ready = true;
      this.sub('#');
      //this.synth.synthQuick("C4")
      this.setStatus("Connected");
    })
        
    this.client.on("disconnect", () => {
      this.setStatus("Disconnected");
    })

    this.client.on("end", () => {
      this.setStatus("Ended");
    })

    this.client.on("message", (topic, payload) => {
      EventBus.$emit("got-incoming-message", topic, payload);     
      var newPayload = topic + ">" + payload.toString();       
      var topicSplit = topic.split("/");
      if (topicSplit[6] == "37" ) {
        this.formatIncomingMessage("json", newPayload, "got-sound-frame");
      }
      if (topicSplit[6] == "38" ) {
        this.formatIncomingMessage("json", newPayload, "got-volt-frame");
      }
    })
  }

  formatIncomingMessage(type, message, event) {
    var messageSplit = message.split(">");
    if (type = "json") {
      var payloadSplit = messageSplit[1].toString().split('/');
      /// formater le timestamp en format prêt à afficher sur D3
      // var day = moment(Number(payloadSplit[1]));
      // console.log("date", day)
      var x = Number(payloadSplit[1]);
      var y = Number(payloadSplit[0]);
      var topicSplit = messageSplit[1].split('/');
      var sensorType = topicSplit[6];
      var formatedPayload = {
        x: x,
        y: y,
        type: sensorType
      }; 
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

  sendMessage(topic, message) {
    this.client.publish(topic, message, { retain: false, qos: 0 });
  }

  sub(topic) {
    this.client.subscribe(topic);
      //console.log("subscribed to :", topic)   
  }
  
  addSubscribe(path, topic) {
    this.asyncClient.subscribe(topic).then(function(){
      //console.log("subscribed to :", topic)
    });

    var pathList = path + "/" + topic;
    this.subscribeList.push(pathList);
    if (this.subscribeList.length == 100 ) {
      this.subscribeList.pop();
    }    
  }

  removeSubscribe(path, topic) {
    this.asyncClient.unsubscribe(topic).then(function(){
      //console.log("unsubscribed from :", topic)
    });
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



