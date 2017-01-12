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

        chatController.wit.runActions(chatController.sessionId, req.body.chat, {}, 5).then(function (ctx) {
            // res.send({ some: JSON.stringify({response:'json'}) });
            res.send( {context: ctx} );
        }).catch(function (err) {
            return console.error(err);
        });
    
    }
});

module.exports = router;
