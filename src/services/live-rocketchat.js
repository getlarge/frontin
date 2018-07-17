import config from '@/config.json'
import { EventBus } from '@/main'
//import ToneSynth from '@/tone-components/synth'


export default class liveRocketChat {
  constructor() {
    this.ready = false;
    //this.synth = new(ToneSynth);
  }

  eventListener() {
    EventBus.$on('start-chat', () => {
      this._initClient();
    });
    EventBus.$on('register-chat', (name, email) => {
      RocketChat(function() { this.registerGuest({name: name, email: email }); });
    });

    RocketChat(function() {
     
    });

  }

  _initClient() {
    if ( this.ready === false ) {
      (function(w, d, s, u) {
        w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
        var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
        j.async = true; j.src = 'https://chat.aloes.io/packages/rocketchat_livechat/assets/rocketchat-livechat.min.js?_=201702160944';
        h.parentNode.insertBefore(j, h);
      })(window, document, 'script', 'https://chat.aloes.io/livechat');

      RocketChat(function() {
        // this.setGuestName('ed');
        // this.setGuestMail('ed@getlarge.eu');
        this.setDepartment('Accueil');

        // this.setCustomField('name', 'Any value you want to store');
        // this.setCustomField('mail', 'A value set just once', false); // you can pass false as the third parameter to not overwrite an already set value
        this.setTheme({
            title: 'getlarge',
            color: 'rgba(51, 178, 119, 0.7)', // widget title background color
            registrationForm: true,
            offlineColor: 'rgba(51, 178, 119, 0.7)',
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
        this.onPrechatFormSubmit(function(data) {
            // data is an object containing the following fields: name, email and deparment (the department _id)
            console.log('pre-chat form submitted');
        });
      });
      this.ready = true;
      this.eventListener();

    }

    else {
      return;
    }
  }


}





  

    