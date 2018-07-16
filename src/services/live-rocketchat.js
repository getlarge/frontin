import config from '@/config.json'
import { EventBus } from '@/main'
//import ToneSynth from '@/tone-components/synth'


export default class liveRocketChat {
  constructor() {
    this.eventListener();
    this.ready = false;
    //this.synth = new(ToneSynth);
  }

  eventListener() {
    EventBus.$on('start-chat', () => {
      this._initClient();
    });

  }

  _initClient() {
    if ( this.ready == false ) {
      (function(w, d, s, u) {
        w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
        var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
        j.async = true; j.src = 'https://chat.aloes.io/packages/rocketchat_livechat/assets/rocketchat-livechat.min.js?_=201702160944';
        h.parentNode.insertBefore(j, h);
      })(window, document, 'script', 'https://chat.aloes.io/livechat');

      RocketChat(function() {
        this.setDepartment('getlarge');
        this.setCustomField('fieldName1', 'Any value you want to store');
        this.setCustomField('fieldName2', 'A value set just once', false); // you can pass false as the third parameter to not overwrite an already set value
        this.setTheme({
            color: 'rgba(51, 178, 119, 0.7)', // widget title background color
            fontColor: '#FFF' // widget title font color
        });
        this.onChatMaximized(function() {
          console.log('chat widget maximized');
        });
        this.onChatMinimized(function() {
          console.log('chat widget minimized');
        });
        this.onChatEnded(function() {
          console.log('chat ended');
        });
        this.onChatStarted(function() {
          console.log('chat started');
          //EventBus.$emit('chat-started', "chat started");
        });
      });
      this.ready = true;
    }

    else {
      return;
    }
  }

}





  

    