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

        this.accessToken = "TBING3ZAMWTJA2QOETNURHTCN7G77UFQ";

        this.actions = {
            send(request, response) {
                // const {sessionId, context, entities} = request;
                // const {text, quickreplies} = response;
                console.log('sending...', JSON.stringify(response));
            },
            getForecast({context, entities}) {
                const val = entities && entities['location'] &&
                        Array.isArray(entities['location']) &&
                        entities['location'].length > 0 &&
                        entities['location'][0].value
                    ;
                var location = typeof val === 'object' ? val.value : val;
                if (location) {
                    context.forecast = 'sunny in ' + location; // we should call a weather API here
                    delete context.missingLocation;
                } else {
                    context.missingLocation = true;
                    delete context.forecast;
                }
                return context;
            },
        };
    }

    constructor () {
        this.properties();
        this.sessionId = uuid.v1();
        var Wit;
        try {
            // if running from repo
            Wit = require('../').Wit;
        } catch (e) {
            Wit = require('node-wit').Wit;
        }
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