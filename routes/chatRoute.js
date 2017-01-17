/**
 *  Chat Router
 *  @public
 *  @description Handle all request from customer when they visit localhost:3000/chat or text some input in input box (should use socket in the future)
 */
var express = require('express');
var router = express.Router();

var ChatController = require('../controller/chatController');

var viewpath = 'manage/chat';
var chatController = new ChatController();

router.get('/', function(req, res, next) {
    res.render(viewpath)
});

// request sent from Chatbox form
router.post('/', function (req, res) {
    if ( req.body.chat ) {
        
        chatController.setResponseToClientObject(res);
        
        chatController.wit.runActions(chatController.sessionId, req.body.chat, {}, 5)
            .then((ctx) => {
                console.log('Run actions: ' + JSON.stringify(ctx));
            })
            .catch((err) => {
                return console.error(err);
            });

    }
});

router.post('/runactionsApi', function (req, res) {
    if ( req.body.chat ) {

        chatController.setResponseToClientObject(res);

        chatController.runActionsFromWit( req.body.chat,
            (data) => {
                console.log( JSON.stringify( data ) );
                res.send( chatController.res );
            },
            () => {
                res.send( {message: 'Error'} );
            }
        );
    }
});

router.post('/messageApi', function (req, res) {
    if ( req.body.chat ) {

        chatController.getMessageFromWit( req.body.chat,
            (data) => {
                res.send( data );
            },
            () => {
                res.send( {message: 'Error'} );
            }
        );
    }
});

router.post('/converseApi', function (req, res) {
    if ( req.body.chat ) {

        chatController.getConverseFromWit( req.body.chat,
            (data) => {
                res.send( data );
            },
            () => {
                res.send( {message: 'Error'} );
            }
        );

    }
});

module.exports = router;
