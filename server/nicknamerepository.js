'use strict';

var database = require('./database.js');

exports.getByName = function(name, callback) {
    var query = 'SELECT n.nick, a.flag_private, a.last_host, a.last_realname, a.last_quit_msg, ' +
                '   a.last_quit_time, a.reg_time ' +
                'FROM account a ' +
                'INNER JOIN nickname n ON n.account_id = a.id ' +
                'WHERE LOWER(n.nick) = LOWER($1)';

    database.query(query, [name], function(result) {
        callback(result[0]);
    });
};
