var express = require('express');
var router = express.Router();

var chatController = require('../controller/chatController');

var viewpath = 'manage/chat'

/* GET users listing. */
router.get('/', function(req, res, next) {
    userModel.getUsers(function (err, rows, fields) {
        res.render(viewpath)
    })
});

module.exports = router;
