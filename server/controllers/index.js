'use strict';

var account = require('./account.js');
var nickname = require('./nickname.js');
var channel = require('./channel.js');

module.exports.init = function(server) {
    account.init(server);
    nickname.init(server);
    channel.init(server);
};
