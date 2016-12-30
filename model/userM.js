/**
 * Created by nam.tran on 29-Sep-16.
 */
var DBUtil = require('./DBUtil.js')

var UserModel = {
    
    insertUser : function (params, cb) {

        DBUtil.connect()

        DBUtil.query("INSERT INTO user SET ?", params, cb)

        // DBUtil.end()
    },

    getUsers: function (cb) {
        DBUtil.connect()

        DBUtil.query("SELECT * FROM user", {}, cb)

        // DBUtil.end()
    }
    
}

module.exports = UserModel