/**
 * Created by nam.tran on 29-Sep-16.
 */
var mysql      = require('mysql')

var DBUtil = {

    connection: mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'nodejs'
    }),

    connect: function () {
        if ( this.connection.state === 'disconnected' ) this.connection.connect()
    },

    end: function() {
        if ( this.connection.state === 'authenticated' ) this.connection.end()
    },

    query: function (queryString, params, cb) {
        this.connection.query(queryString, params, cb)
    },

    getDBState: function () {
        return this.connection.state
    }

}

module.exports = DBUtil