const pg = require('pg');
const config = require('./config.js');
const logger = require('./log.js');

module.exports.query = function(query, params, callback) {
    pg.connect(config.connectionString, function(err, client, done) {
        if(err) {
            logger.error('error fetching client from pool', err);
            return callback(err);
        }

        client.query(query, params, function(err, result) {
            done(err);

            if(err) {
                logger.error('error running query', err);
                callback(err);
            }

            callback(null, result.rows);
        });
    });
};
