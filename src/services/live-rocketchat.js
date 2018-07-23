import config from '@/config.json'
import { EventBus } from '@/main'
//import ToneSynth from '@/tone-components/synth'

export default class liveRocketChat {
    constructor() {
        this.ready = false;
        EventBus.$on('start-chat', () => {
            this._initClient();
        });
        //this.synth = new(ToneSynth);
        this.chatId = "guest32";
    }


     eventListener() {
        // EventBus.$on('start-chat', () => {
        //     this._initClient();
        // });
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
                this.setDepartment('Accueil');
                this.setCustomField('name', this.chatId);
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
            EventBus.$emit("chat-id", this.chatId);
            this.eventListener();
        } else {
          return;
        }
    }

}





  

    