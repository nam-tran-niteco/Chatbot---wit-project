'use strict';
var uuid = require('uuid');

let instance = null;

class ChatController {

    /**
     * Class Constructor function
     * @returns an instance of Class ChatController (Singleton) 
     */
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

    /**
     * Get the first entity in Entities Array sent from Wit server after extract the request
     * @param entities
     * @param entity
     * @returns {value}
     */
    firstEntityValue(entities, entity) {
        let val = entities && entities[entity] &&
                Array.isArray(entities[entity]) &&
                entities[entity].length > 0 &&
                entities[entity][0].value
            ;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }

    /**
     * Load all class's properties
     * @returns {*}
     */
    properties() {

        /**
         * create an instance of Class ChatController
         * @type {ChatController}
         * @private
         */
        let _this = this;

        /**
         * wit.ai app's access token (should be a parameter in the future)
         */
        this.accessToken = "PGV3JRAW26TKFWSGMCRJIQDXQWDB34SA";

        /**
         * session id for each request sent to the Wit server (used for counting maximum accepted request)
         */
        this.sessionId = uuid.v1();

        /**
         * maximum steps allowed
         */
        this.max_steps = 5;

        /**
         * 
         * @type {{context: {}, response: {}}}
         * @type status 0: Error, 1: Success
         */
        this.responseApi = { context: {}, response: {}, status: 0 };

        /**
         * All of implementation for all actions that declared in Wit.ai story dashboard
         * Used for Wit constructor
         * @Object
         * send: a default function that Wit call after all custom function was excuted
         */
        this.actions = {
            send(request, response) {
                return new Promise(function(resolve, reject) {

                    if ( response ) {
                        
                        _this.responseApi.response = response;

                        return resolve();
                    }
                    else {
                        return reject();
                    }

                });
            },
            getContact({context, entities}) {
                var contactinfo = _this.firstEntityValue(entities, 'contactinfo');
                context.contactinfo = contactinfo;
                
                _this.responseApi.context = context;
                _this.responseApi.entities = entities;
                
                return context;
            },
            getRequest({context, entities}) {
                var request_action = _this.firstEntityValue(entities, 'request_action');
                var request_object = _this.firstEntityValue(entities, 'request_object');

                context.request_action = request_action;
                context.request_object = request_object;

                _this.responseApi.context = context;
                _this.responseApi.entities = entities;

                return context;
            },
            agreedHandle({context, entities}) {
                return context;
            }
        };
    }

    /**
     * Methods that handle request from client
     * 1. Get Entities extracted by WIT 
     * 2. Get simple response from wit stories declared by user
     * 3. Implement all suitable actions declared in stories by user
     * @param request Message from client
     * @param success Callback function handle if method success
     * @param err Callback function handle if have some error
     */
    getMessageFromWit( request, success, err ) {
        
        this.wit.message( request, {} )
            .then( success )
            .catch( err );
    }
    
    getConverseFromWit( request, success, err ) {
        
        this.wit.converse( this.sessionId, request, {} )
            .then( success )
            .catch( err );
    }

    runActionsFromWit( request, success, err ) {

        this.wit.runActions( this.sessionId, request, {}, this.max_steps)
            .then( success )
            .catch( err );
    }
    
}

module.exports = ChatController;