const pg = require('pg');
const config = require('./config.js');
const logger = require('./log.js');

module.exports.query = function(query, params, callback) {
    pg.connect(config.connectionString, function(err, client, done) {
        if(err) {
            logger.error('error fetching client from pool', err);
            if(callback) {
                callback(err);
            }

            return;
        }

        client.query(query, params, function(err, result) {
            done(err);

            if(err) {
                logger.error('error running query', err);
                if(callback) {
                    callback(err);
                }                
            }

            if(callback) {        
                callback(null, result.rows);
            }
        });
    });
};
