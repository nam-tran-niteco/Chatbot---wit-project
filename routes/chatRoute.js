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

module.exports = router;
