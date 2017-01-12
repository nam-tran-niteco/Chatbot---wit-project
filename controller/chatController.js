'use strict';
var uuid = require('uuid');

let instance = null;

class ChatController {

    properties() {

        // wit.ai app's access token
        this.accessToken = "PGV3JRAW26TKFWSGMCRJIQDXQWDB34SA";
        
        this.sessionId = uuid.v1();
        
        this.actions = {
            send(request, response) {
                return Promise.resolve(response);
            },
            myAction({sessionId, context, text, entities}) {
                console.log(`Session ${sessionId} received ${text}`);
                console.log(`The current context is ${JSON.stringify(context)}`);
                console.log(`Wit extracted ${JSON.stringify(entities)}`);
                return Promise.resolve(context);
            }
            // getForecast({context, entities}) {
            //     const val = entities && entities['location'] &&
            //             Array.isArray(entities['location']) &&
            //             entities['location'].length > 0 &&
            //             entities['location'][0].value
            //         ;
            //     var location = typeof val === 'object' ? val.value : val;
            //     if (location) {
            //         context.forecast = 'sunny in ' + location; // we should call a weather API here
            //         delete context.missingLocation;
            //     } else {
            //         context.missingLocation = true;
            //         delete context.forecast;
            //     }
            //     return context;
            // },
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