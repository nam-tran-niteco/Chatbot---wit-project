'use strict';
var uuid = require('uuid');

let instance = null;

class ChatController {

    firstEntityValue(entities, entity) {
        const val = entities && entities[entity] &&
                Array.isArray(entities[entity]) &&
                entities[entity].length > 0 &&
                entities[entity][0].value
            ;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }


    properties() {

        // create an instance of Class ChatController
        let _this = this;

        // wit.ai app's access token
        this.accessToken = "PGV3JRAW26TKFWSGMCRJIQDXQWDB34SA";
        
        this.sessionId = uuid.v1();

        this.actions = {
            send(request, response) {
                return new Promise(function(resolve, reject) {
                    console.log(JSON.stringify(response));
                    return resolve();
                });
            },
            getContact({context, entities}) {
                var contact = _this.firstEntityValue(entities, 'contactinfo');
                context.contact = 'người bạn tên là ' + contact;
                return context;
            }
        };
    }

    constructor () {
        // load properties
        this.properties();

        var Wit = require('node-wit').Wit;
        
        var config = {
            accessToken: this.accessToken,
            actions: this.actions
        };
        this.wit = new Wit(config);

        if ( !instance )
            instance = this;
        
        return instance;
    }

}

module.exports = ChatController;