'use strict';

var account = require('./account.js');
var channel = require('./channel.js');

module.exports.init = function(server) {
    account.init(server);
    channel.init(server);
};
