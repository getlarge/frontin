import {config} from '@/configFile';
import mqtt from 'mqtt';
import {AsyncClient} from 'async-mqtt';
import moment from 'moment';
import {EventBus} from '@/main';

export default class mqttClient {
  constructor() {
    this.options = config;
    this.client;
    this._initClient();
    //  this.asyncClient;
    this.buffer = [];
    this.frame = {};
    this.subscribeList = [];
    this.ready = false;
  }

  _initClient() {
    console.log('mqttConfig;', config.mqttClient.url)
    this.client = mqtt.connect(
      config.mqttClient.url,
      this.options,
    );
    //  this.asyncClient = new AsyncClient(this.client);
    EventBus.$on('store:mqtt', () => {
      this.getStore();
    });
    EventBus.$on('sub:mqtt', (topic) => {
      this.sub(topic);
    });
    EventBus.$on('tx:mqtt', (topic, message) => {
      //return this.sendAsyncMessage(topic, message);
      this.sendMessage(topic, message);
    });
  }

  _initAsyncClient() {
    this.asyncClient = new AsyncClient(this.client);
  }

  openStream() {
    this.client.on('connect', () => {
      this.ready = true;
      this.setStatus('Connected');
    });

    this.client.on('disconnect', () => {
      this.setStatus('Disconnected');
    });

    this.client.on('end', () => {
      this.setStatus('Ended');
    });

    this.client.on('message', (topic, payload) => {
      //this.store.put(topic, payload);
      /// rename event on the received topic
      EventBus.$emit('rx:mqtt', topic, payload);
    });
  }

  close() {
    this.client.end();
    //  return this.asyncClient.end();
  }

  setStatus(status) {
    EventBus.$emit('status:mqtt', status);
  }

  sendAsyncMessage(topic, message) {
    this.asyncClient
      .publish(topic, message, {retain: false, qos: 1})
      .then(function() {
        console.log('send message :', message, 'to', topic);
        return this.asyncClient.end();
      });
  }

  sendMessage(topic, message) {
    //console.log("sending :" ,topic, message)
    this.client.publish(topic, message, {retain: false, qos: 0});
    //this.client.publish(topic, message);
  }

  sub(topic) {
    this.client.subscribe(topic, {retain: false, qos: 0});
    //console.log("subscribed to :", topic)
  }

  addSubscribe(path, topic) {
    this.asyncClient.subscribe(topic, {retain: false, qos: 0}).then(function() {
      //console.log("subscribed to :", topic)
    });

    var pathList = path + '/' + topic;
    this.subscribeList.push(pathList);
    if (this.subscribeList.length == 100) {
      this.subscribeList.pop();
    }
  }

  removeSubscribe(path, topic) {
    this.asyncClient.unsubscribe(topic).then(function() {
      //console.log("unsubscribed from :", topic)
    });
    var pathList = path + '/' + topic;
    console.log('index subscribe list :', this.subscribeList.indexOf(pathList));
  }

  getStore(methods, topic) {
    var buffer;
    if (methods == 'get') {
      return console.log(this.store.get(topic));
    }
    if (methods == 'findMatching') {
      return console.log(this.store.findMatching(topic));
    }
    if (methods == 'findPatterns') {
      return console.log(this.store.findPatterns(topic));
    }
    //EventBus.$emit("got-store", buffer);
  }

  getSubscriptions() {
    EventBus.$emit('got-subscribed-list', this.subscribeList);
  }
}
