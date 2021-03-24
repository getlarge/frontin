import mqttPattern from 'mqtt-pattern';
import EventBus from './EventBus';
import logger from './logger';

const Storage = window.localStorage;
const PubSub = {};

const pushContainer = (subscriptionName) => {
  if (!subscriptionName) return false;
  let container = JSON.parse(Storage.getItem('subscription-container'));
  logger.publish(4, 'PubSub', 'pushContainer:req', subscriptionName);
  if (!container || container === null) {
    Storage.setItem('subscription-container', '[]');
    container = JSON.parse(Storage.getItem('subscription-container'));
  }
  if (container.find((name) => name === subscriptionName)) return true;
  container.push(subscriptionName);
  Storage.setItem('subscription-container', JSON.stringify(container));
  logger.publish(5, 'PubSub', 'pushContainer:res', container);
  return true;
};

PubSub.subscribe = (socket, options) => {
  logger.publish(4, 'pubsub', 'subscribe:req', options);
  if (options) {
    let route;
    const collectionPattern = '+userId/+collectionName/+method';
    const instancePattern = '+userId/+collectionName/+method/+modelId';
    const params = {
      userId: options.userId,
      collectionName: options.collectionName,
      modelId: options.modelId,
      method: options.method,
    };
    if (options.method === 'POST') {
      route = mqttPattern.fill(collectionPattern, params);
    } else if (options.method === 'DELETE') {
      route = mqttPattern.fill(collectionPattern, params);
    } else {
      route = mqttPattern.fill(instancePattern, params);
    }
    socket.subscribe(route);
    return pushContainer(route);
  }
  return new Error('Error: Option must be an object type');
};

PubSub.unSubscribeWhere = (socket, options) => {
  if (options && socket && Storage) {
    const name = `/${options.accountId}/${options.collectionName}/${options.method}`;
    logger.publish(4, 'pubsub', 'unSubscribeWhere:req', name);
    const container = JSON.parse(Storage.getItem('subscription-container'));
    const index = container.indexOf(name);
    if (index !== -1) {
      container.splice(index, 1);
      socket.unsubscribe(name);
      //  delete socket._callbacks[`$/${name}`];
      //  EventBus.$off(`${options.method.toLowerCase()}${options.collectionName}`);
      //  delete EventBus._events[`${options.method.toLowerCase()}${options.collectionName}`];
      Storage.setItem('subscription-container', JSON.stringify(container));
      logger.publish(4, 'pubsub', 'unSubscribeWhere:res', JSON.parse(Storage.getItem('subscription-container')));
    }
    return new Error('unSubscribeWhere:err : element not found');
  }
  const error = new Error('unSubscribeWhere:err Invalid Params');
  return error;
};

PubSub.removeListeners = async (socket) => {
  if (socket && Storage) {
    const container = JSON.parse(Storage.getItem('subscription-container'));
    await container.forEach((route) => {
      return socket.unsubscribe(route);
      //  delete socket._callbacks[`$/${route}`];
      //  const options = route.split("/");
      //  console.log(`${options[3].toLowerCase()}${options[2]}`);
      // EventBus.$off(`${options[3].toLowerCase()}${options[2]}`);
      // delete EventBus._events[`${options[3].toLowerCase()}${options[2]}`];
    });
    await Storage.setItem('subscription-container', '[]');
    return null;
  }
  const error = new Error('unSubscribeAll:err Invalid Params');
  return error;
};

PubSub.subscribeToCollectionCreation = (socket, collectionName, userId) =>
  PubSub.subscribe(socket, {
    userId,
    collectionName,
    method: 'POST',
  });

PubSub.subscribeToCollectionDeletion = (socket, collectionName, userId) =>
  PubSub.subscribe(socket, {
    userId,
    collectionName,
    method: 'DELETE',
  });

PubSub.subscribeToInstanceUpdate = (socket, collectionName, userId, modelId) =>
  PubSub.subscribe(socket, {
    userId,
    collectionName,
    modelId,
    method: 'PUT',
  });

PubSub.publishToInstance = (socket, collectionName, userId, modelId, payload) =>
  PubSub.publish(socket, {
    userId,
    collectionName,
    modelId,
    method: 'PUT',
    payload,
  });

PubSub.setListeners = (socket, token) => {
  if (socket && socket !== null && token && token !== null) {
    PubSub.subscribeToCollectionCreation(socket, 'Notification', token.userId);
    PubSub.subscribeToCollectionCreation(socket, 'Message', token.userId);
    PubSub.subscribeToCollectionCreation(socket, 'Device', token.userId);
    PubSub.subscribeToCollectionDeletion(socket, 'Message', token.userId);
    PubSub.subscribeToCollectionDeletion(socket, 'Device', token.userId);
  }
};

const onCollectionCreated = (collectionName, instance) => {
  logger.publish(4, 'PubSub', `on${collectionName}Created`, instance);
  EventBus.$emit(`on${collectionName}Created`, instance);
};

const onCollectionDeleted = (collectionName, instance) => {
  logger.publish(4, 'PubSub', `on${collectionName}Deleted`, instance);
  EventBus.$emit(`on${collectionName}Deleted`, instance);
};

const onCollectionUpdated = (collectionName, instance) => {
  logger.publish(4, 'PubSub', `on${collectionName}Updated`, instance);
  EventBus.$emit(`on${collectionName}Updated`, instance);
};

const extractProtocol = (pattern, topic) =>
  new Promise((resolve, reject) => {
    const protocol = mqttPattern.exec(pattern, topic);
    if (protocol !== null) resolve(protocol);
    reject(protocol);
  });

const handler = async (topic) => {
  logger.publish(4, 'pubsub', 'handler:req', topic);
  const instancePattern = '+userId/+collectionName/+method/+modelId';
  const collectionPattern = '+userId/+collectionName/+method';
  let aloesClientProtocol = null;
  if (mqttPattern.matches(collectionPattern, topic)) {
    aloesClientProtocol = await extractProtocol(collectionPattern, topic);
  }
  if (mqttPattern.matches(instancePattern, topic)) {
    aloesClientProtocol = await extractProtocol(instancePattern, topic);
  }
  return aloesClientProtocol;
};

PubSub.handler = async (topic, message) => {
  logger.publish(4, 'PubSub', 'handler:req', message);
  const result = await handler(topic, message);
  if (result.method && result.collectionName) {
    switch (result.method) {
      case 'POST':
        switch (result.collectionName) {
          case 'Device':
            onCollectionCreated('Device', message);
            break;
          case 'Sensor':
            onCollectionCreated('Sensor', message);
            break;
          case 'VirtualObject':
            onCollectionCreated('VirtualObject', message);
            break;
          case 'Notification':
            onCollectionCreated('Notification', message);
            break;
          default:
            logger.publish(4, 'PubSub', `on${result.collectionName}Created`, message);
        }
        break;
      case 'DELETE':
        switch (result.collectionName) {
          case 'Device':
            onCollectionDeleted('Device', message);
            break;
          case 'Sensor':
            onCollectionDeleted('Sensor', message);
            break;
          case 'VirtualObject':
            onCollectionDeleted('VirtualObject', message);
            break;
          default:
            logger.publish(4, 'PubSub', `on${result.collectionName}Deleted`, message);
        }
        break;
      case 'PUT':
        switch (result.collectionName) {
          case 'Device':
            onCollectionUpdated('Device', message);
            break;
          case 'Sensor':
            onCollectionUpdated('Sensor', message);
            break;
          case 'VirtualObject':
            onCollectionUpdated('VirtualObject', message);
            break;
          default:
            logger.publish(4, 'PubSub', `on${result.collectionName}Updated`, message);
        }
        break;
      default:
        logger.publish(4, 'PubSub', result.collectionName, 'unknown operation');
    }
  }
};

PubSub.publish = async (socket, options) => {
  logger.publish(4, 'pubsub', 'publish:req', options);
  if (options && socket) {
    const instancePattern = '+userId/+collectionName/+method/+modelId';
    const params = {
      userId: options.userId,
      collectionName: options.collectionName,
      modelId: options.modelId,
      method: options.method,
    };
    const route = mqttPattern.fill(instancePattern, params);
    return socket.publish(route, JSON.stringify(options.payload));
  }
  return new Error('Error: Option must be an object type');
};
// PubSub.close = socket => {
//   if (
//     socket._callbacks &&
//     socket._callbacks[`$connect`] &&
//     socket._callbacks[`$connect`].length > 1
//   ) {
//     //  console.log("pubsub close", socket._callbacks["$connect"].length);
//     //  socket._callbacks[`$connect`].splice(0, socket._callbacks["$connect"].length - 1);
//     socket._callbacks[`$connect`].shift();
//   }
//   PubSub.unSubscribeAll(socket);
//   //  EventBus.$emit("updatePubSub", {status: false});
// };

PubSub.close = (socket) => {
  PubSub.removeListeners(socket);
  //  EventBus.$off();
};

//  EventBus.$on("sub:instanceUpdate")

export default PubSub;
