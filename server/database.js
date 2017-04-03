const pg = require('pg');
const config = require('./config.js');
const logger = require('./log.js');

module.exports.query = function(query, params, callback) {
    pg.connect(config.connectionString, function(err, client, done) {
        if(err) {
            return logger.error('error fetching client from pool', err);
        }

        client.query(query, params, function(err, result) {
            done(err);

            if(err) {
                return logger.error('error running query', err);
            }

            callback(result.rows);
        });
    });
};
