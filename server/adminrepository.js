'use strict';

var database = require('./database.js');

exports.getAKills = function(odata, callback) {
    var limit = odata.$top || 25;
    var offset = odata.$skip * limit || 0;

    var query = 'SELECT ns.nick setter, ak.mask, ak.reason, ak.time, ak.duration ' +
                'FROM akill ak ' +
                'LEFT OUTER JOIN account a ON ak.setter = a.id ' +
                'LEFT OUTER JOIN nickname ns ON ns.id = a.primary_nick ' +
                'ORDER BY ak.time DESC ' +
                'LIMIT $1 OFFSET $2';

    database.query(query, [limit, offset], function(result) {
        callback(result);
    });
};

exports.getAKillsCount = function(callback) {
    var query = 'SELECT COUNT(*) ' +
                'FROM akill ak';

    database.query(query, [], function(result) {
        callback(result[0].count);
    });
};
