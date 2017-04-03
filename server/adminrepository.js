const database = require('./database.js');

exports.getAKills = function(odata, callback) {
    let limit = odata.$top || 25;
    let offset = odata.$skip * limit || 0;

    let query = 'SELECT ns.nick setter, ak.mask, ak.reason, ak.time, ak.duration ' +
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
    let query = 'SELECT COUNT(*) ' +
                'FROM akill ak';

    database.query(query, [], function(result) {
        callback(result[0].count);
    });
};
