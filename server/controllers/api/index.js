const account = require('./account.js');
const channel = require('./channel.js');
const nickname = require('./nickname.js');
const admin = require('./admin.js');

module.exports.init = function(server) {
    account.init(server);
    channel.init(server);
    nickname.init(server);
    admin.init(server);
};
