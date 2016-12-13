'use strict';

var account = require('./account.js');
var channel = require('./channel.js');
var nickname = require('./nickname.js');
var admin = require('./admin.js');

module.exports.init = function (server) {
    account.init(server);
    channel.init(server);
    nickname.init(server);
    admin.init(server);
};
