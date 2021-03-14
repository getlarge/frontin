import tiza from 'tiza';

const logger = {};
const logLevel = Number(process.env.VUE_APP_LOGGER_LEVEL);
const remoteLog = false;

logger.publish = (priority, collectionName, command, content) => {
  let fullContent;
  if (priority <= logLevel) {
    if (typeof content === 'object') {
      fullContent = `[${collectionName.toUpperCase()}] ${command} : ${JSON.stringify(content)}`;
    } else if (typeof content !== 'object') {
      fullContent = `[${collectionName.toUpperCase()}] ${command} : ${content}`;
    }

    switch (collectionName.toUpperCase()) {
      case 'PUBSUB':
        tiza
          .color('#fff')
          .bgColor('#8ac8a3')
          .text(fullContent)
          .log();
        break;
      case 'LOOPBACK':
        tiza
          .color('#686868')
          .bgColor('#8ac8a3')
          .text(fullContent)
          .log();
        break;
      case 'ACCOUNT':
        tiza
          .color('#8ac8a3')
          .bgColor('#fff')
          .text(fullContent)
          .log();
        break;
      case 'TEACHER':
        tiza
          .color('#7ebcaf')
          .bgColor('#fff')
          .text(fullContent)
          .log();
        break;
      case 'STUDIO':
        tiza
          .color('#528fa2')
          .bgColor('#fff')
          .text(fullContent)
          .log();
        break;
      case 'FILES':
        tiza
          .color('#444b4e')
          .bgColor('#fff')
          .text(fullContent)
          .log();
        break;
      case 'APPOINTMENT':
        tiza
          .color('#444b4e')
          .bgColor('#fff')
          .text(fullContent)
          .log();
        break;
      default:
        tiza
          .color('#686868')
          .bgColor('#fff')
          .text(fullContent)
          .log();
    }
    if (remoteLog === true) {
      // pubsub.publish(loopback, {
      //   accountId: 0,
      //   collectionName,
      //   data: content,
      //   method: 'POST',
      // });
    }
    return null;
  } else if (priority > logLevel) {
    return null;
  }
  throw new Error('Error: Missing argument in logger');
};

export default logger;