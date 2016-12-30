var express = require('express');
var router = express.Router();
var userModel = require('../model/userM.js')

var viewpath = 'manage/user'

/* GET users listing. */
router.get('/', function(req, res, next) {
    userModel.getUsers(function (err, rows, fields) {
        res.render(viewpath, {title: "User List", rows: rows})
    })
});

router.post('/', function (req, res) {
    if ( req.body.username && req.body.password ) {

        /**
         * insertParams Object
         * @params
         *
         */
        var insertParams = {
            username : req.body.username,
            password : req.body.password,
            email    : ''
        }
        if ( req.body.email ) insertParams.email = req.body.email

        userModel.insertUser(insertParams, function (err, rows, fields) {
            if (err) res.render(viewpath, {title: "User List", message: err, type: "error"})

            else userModel.getUsers(function (err, rows, fields) {
                if (err) res.render(viewpath, {title: "User List", message: err, type: "error"})
                else res.render(viewpath, {title: "User List", rows: rows, message: "Insert Success", type: "success"})
            })
        })
    }
    else res.render(viewpath, {title: "User List", message: "Error", type: "error"})
})

module.exports = router;
