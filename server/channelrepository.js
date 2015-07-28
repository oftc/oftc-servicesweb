'use strict';

var database = require('./database.js');

exports.getChannelsForAccount = function(id, callback) {
    var query = 'SELECT c.channel, ca.level ' +
                'FROM channel c ' +
                'INNER JOIN channel_access ca ON ca.channel_id = c.id ' +
                'INNER JOIN account a ON a.id = ca.account_id ' +
                'WHERE a.id = $1 ' +
                'ORDER BY c.channel';

    database.query(query, [id], function(result) {
        callback(result);
    });
};

exports.getByName = function(name, callback) {
    var query = 'SELECT id, channel, flag_private, flag_restricted, flag_topic_lock, ' +
                '   flag_verbose, flag_autolimit, flag_expirebans, flag_floodserv, ' +
                '   flag_autoop, flag_autovoice, flag_leaveops, flag_autosave, ' +
                '   description, url, email, entrymsg, topic, mlock, expirebans_lifetime, ' +
                '   reg_time, last_used ' +
                'FROM channel ' +
                'WHERE channel = $1';

    database.query(query, [name], function(result) {
        callback(result[0]);
    });
};

exports.getAccessList = function(name, callback) {
    var query = 'SELECT n.nick, ca.level ' +
                'FROM channel_access ca ' +
                'INNER JOIN account a ON ca.account_id = a.id ' +
                'INNER JOIN nickname n ON n.id = a.primary_nick ' +
                'INNER JOIN channel c ON c.id = ca.channel_id ' +
                'WHERE c.channel = $1 ' +
                'ORDER BY ca.level DESC';

    database.query(query, [name], function(result) {
        callback(result);
    });
};

exports.isOnAccessList = function(name, account, callback) {
    var query = 'SELECT 1 ' +
                'FROM channel c ' +
                'INNER JOIN channel_access ca ' +
                'ON c.id = ca.channel_id ' +
                'WHERE ca.account_id = $2 AND c.channel = $1';

    database.query(query, [name, account], function(result) {
        if(result.length === 0) {
            return callback(false);
        }

        return callback(true);
    });
};

exports.getList = function(name, list, callback) {
    var query = 'SELECT ns.nick setter, nt.nick target, ak.mask, ak.reason, ak.time, ak.duration, ak.chmode ' +
                'FROM channel_akick ak ' +
                'INNER JOIN account a ON ak.setter = a.id ' +
                'LEFT OUTER JOIN account at ON ak.target = at.id ' +
                'INNER JOIN nickname ns ON ns.id = a.primary_nick ' +
                'LEFT OUTER JOIN nickname nt ON nt.id = at.primary_nick ' +
                'INNER JOIN channel c ON c.id = ak.channel_id ' +
                'WHERE c.channel = $1 AND ak.chmode = $2 ' +
                'ORDER BY time DESC';

    database.query(query, [name, list], function(result) {
        callback(result);
    });
};
