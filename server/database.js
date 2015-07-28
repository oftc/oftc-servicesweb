'use strict';

var pg = require('pg');
var config = require('./config.js');

module.exports.query = function(query, params, callback) {
    pg.connect(config.connectionString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query(query, params, function(err2, result) {
            done();

            if(err2) {
                return console.error('error running query', err2);
            }

            callback(result.rows);
        });
    });
};
