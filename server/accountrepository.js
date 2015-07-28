'use strict';

var database = require('./database.js');

exports.getByNick = function(nick, callback) {
    var query = 'SELECT a.id, a.primary_nick, a.password, a.salt, a.url, ' +
                '   a.email, a.cloak, a.flag_enforce, a.flag_secure, ' +
                '   a.flag_verified, a.flag_cloak_enabled, a.flag_admin, ' +
                '   a.flag_email_verified, a.flag_private, a.language, ' +
                '   a.last_host, a.last_realname, a.last_quit_msg, ' +
                '   a.last_quit_time, a.reg_time ' +
                'FROM account a ' +
                'INNER JOIN nickname n ON a.id = n.account_id ' +
                'WHERE n.nick = $1';

    database.query(query, [nick], function(result) {
        if(result.length === 0) {
            return callback(undefined);
        }

        callback(result[0]);
    });
};

exports.getById = function(id, callback) {
    var query = 'SELECT a.id, a.primary_nick, a.password, a.salt, a.url, ' +
                '   a.email, a.cloak, a.flag_enforce, a.flag_secure, ' +
                '   a.flag_verified, a.flag_cloak_enabled, a.flag_admin, ' +
                '   a.flag_email_verified, a.flag_private, a.language, ' +
                '   a.last_host, a.last_realname, a.last_quit_msg, ' +
                '   a.last_quit_time, a.reg_time ' +
                'FROM account a ' +
                'WHERE a.id = $1';

    database.query(query, [id], function(result) {
        if(result.length === 0) {
            return callback(undefined);
        }

        callback(result[0]);
    });
};

exports.getNicknames = function(id, callback) {
    var query = 'SELECT n.nick, n.reg_time, n.last_seen ' +
                'FROM nickname n ' +
                'INNER JOIN account a ON a.id = n.account_id ' +
                'WHERE a.id = $1 ' +
                'ORDER BY n.nick';

    database.query(query, [id], function(result) {
        callback(result);
    });
};

exports.getCertificates = function(id, callback) {
    var query = 'SELECT f.fingerprint, n.nick ' +
                'FROM account_fingerprint f ' +
                'INNER JOIN account a ON a.id = f.account_id ' +
                'LEFT OUTER JOIN nickname n ON f.nickname_id = n.id ' +
                'WHERE a.id = $1';

    database.query(query, [id], function(result) {
        callback(result);
    });
};
