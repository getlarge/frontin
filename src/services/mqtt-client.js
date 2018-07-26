import mqtt from 'mqtt'
import levelStore from 'mqtt-level-store'
import { AsyncClient } from "async-mqtt"
import moment from 'moment'
import config from '@/config.json'
import { EventBus } from '@/main'

var MQTTStore = require("mqtt-store");
 
export default class mqttClient {
    constructor() {
        this.options = {
            clientId: config.options.clientId + "_" + Math.random().toString(16).substr(2, 8),
            username: config.options.username,
            password: new Buffer(config.options.password),
            incomingStore: null,
            outgoingStore: null
        };
        this.client; 
        //this.store = new MQTTStore();
        //this.manager = levelStore('static/db'); 
        this._initClient();
        this.asyncClient;
        this.buffer = [];
        this.frame = {};
        this.subscribeList = [];
        this.ready = false;
    }

    _initClient() {
        //this.options.incomingStore = this.manager.incoming;
        //this.options.outgoingStore = this.manager.outgoing;
        this.client = mqtt.connect(config.wsServerURL, this.options);
        this.asyncClient = new AsyncClient(this.client);

        EventBus.$on('store:mqtt', () => {
            this.getStore()
        });
        EventBus.$on('sub:mqtt', (topic) => {
            this.sub(topic)
        });
        EventBus.$on('tx:mqtt', (topic, message) => {
            //this.sendAsyncMessage(topic, message)
            //console.log("sending :" ,topic, message)
            this.sendMessage(topic, message)
        });
    }

    _initAsyncClient() {
        this.asyncClient = new AsyncClient(this.client);
    }

    openStream() {
        this.client.on("connect", () => {
            this.ready = true;
            this.setStatus("Connected");
        })
            
        this.client.on("disconnect", () => {
            this.setStatus("Disconnected");
        })

        this.client.on("end", () => {
            this.setStatus("Ended");
        })

        this.client.on("message", (topic, payload) => {
          //this.store.put(topic, payload);
            EventBus.$emit("rx:mqtt", topic, payload); 
          // this.client.publish('hello', 'world', {qos: 1}, function () {
          //     console.log('published')
          //     //this.client.end()
          //   })  
          //this.buffer.push(formatedPayload);
        })
    }

    close() {
        this.client.end();
        return this.asyncClient.end();
    }

    setStatus(status) {
        EventBus.$emit("status:mqtt", status);
    }

    sendAsyncMessage(topic, message) {
        this.asyncClient.publish(topic, message, { retain: false, qos: 1 })
          .then(function(){
            console.log("send message :", message, "to", topic )
            return this.asyncClient.end();
        });
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message, { retain: false, qos: 1 });
    }

    sub(topic) {
        this.client.subscribe(topic, { retain: false, qos:1});
      //console.log("subscribed to :", topic)   
    }
  
    addSubscribe(path, topic) {
        this.asyncClient.subscribe(topic, { retain: false, qos: 1 }).then(function(){
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

    getStore(methods, topic) {
        var buffer;
        if (methods == "get") {
            return console.log(this.store.get(topic));
        }
        if (methods == "findMatching") {
            return console.log(this.store.findMatching(topic));
        }
        if (methods == "findPatterns") {
            return console.log(this.store.findPatterns(topic));
        }
        //EventBus.$emit("got-store", buffer);
    }

    getSubscriptions() {
        EventBus.$emit("got-subscribed-list", this.subscribeList);
    }

}



