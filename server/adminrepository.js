'use strict';

var database = require('./database.js');

exports.getAKills = function(callback) {
    var query = 'SELECT ns.nick setter, ak.mask, ak.reason, ak.time, ak.duration ' +
                'FROM akill ak ' +
                'INNER JOIN account a ON ak.setter = a.id ' +
                'INNER JOIN nickname ns ON ns.id = a.primary_nick ' +
                'ORDER BY time DESC';

    database.query(query, [], function(result) {
        callback(result);
    });
};
