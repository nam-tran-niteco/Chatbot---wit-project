var express = require('express');
var router = express.Router();

var ChatController = require('../controller/chatController');

var viewpath = 'manage/chat';
var chatController = new ChatController();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render(viewpath)
});

router.post('/', function (req, res) {
    if ( req.body.chat ) {

        res.send( {data: 'test'} );
        
        chatController.wit.runActions(chatController.sessionId, req.body.chat, {}, 5)
            .then((ctx) => {
                console.log('Run actions: ' + JSON.stringify(ctx));
            })
            .catch((err) => {
                return console.error(err);
            });
    
        chatController.wit.message(req.body.chat, {})
            .then((data) => {
                console.log('Message: ' + JSON.stringify(data));
            })
            .catch(() => {
                console.error;
            });

        chatController.wit.converse(chatController.sessionId, req.body.chat, {})
            .then((data) => {
                console.log('Converse: ' + JSON.stringify(data));
            })
            .catch(console.error);
        
    }
});

module.exports = router;
