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

        var chat = req.body.chat.trim();
        
        chatController.wit.runActions(chatController.sessionId, chat, {}, 5).then(function (ctx) {
            console.log(ctx);
        }).catch(function (err) {
            return console.error(err);
        });

        res.render( viewpath );
    }
});

module.exports = router;
