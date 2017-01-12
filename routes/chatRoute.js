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

        // chatController.wit.runActions(chatController.sessionId, req.body.chat, {}, 5).then(function (ctx) {
        //     res.send( {context: ctx} );
        // }).catch(function (err) {
        //     return console.error(err);
        // });
    
        // chatController.wit.message(req.body.chat, {}).then((data) => {
        //     res.send({data: data})
        // }).catch(() => {
        //     res.send({status: 'error'});
        // })

        chatController.wit.converse(chatController.sessionId, req.body.chat, {})
            .then((data) => {
                console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
                res.send({data: data})
            })
            .catch(console.error);
        
    }
});

module.exports = router;
