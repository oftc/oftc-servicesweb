'use strict';

var account = require('./account.js');
var nickname = require('./nickname.js');
var channel = require('./channel.js');

var api = require('./api');

module.exports.init = function(server) {
    account.init(server);
    nickname.init(server);
    channel.init(server);

    api.init(server);
};
