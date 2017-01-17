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

        chatController.runActionsFromWit( req.body.chat,
            (data) => {
                console.log( JSON.stringify( data ) );
                chatController.responseApi.status = 1;
                res.send( chatController.responseApi );
            },
            () => {
                chatController.responseApi.status = 0;
                res.send( chatController.responseApi  );
            }
        );

    }
});

router.post('/runactionsApi', function (req, res) {
    if ( req.body.chat ) {

        chatController.runActionsFromWit( req.body.chat,
            (data) => {
                console.log( JSON.stringify( data ) );
                chatController.responseApi.status = 1;
                res.send( chatController.responseApi );
            },
            () => {
                chatController.responseApi.status = 0;
                res.send( chatController.responseApi  );
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
                chatController.responseApi.status = 0;
                res.send( chatController.responseApi  );
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
                chatController.responseApi.status = 0;
                res.send( chatController.responseApi  );
            }
        );

    }
});

module.exports = router;
