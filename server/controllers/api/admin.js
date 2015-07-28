'use strict';

var accountRepository = require('../../accountrepository.js');
var adminRepository = require('../../adminrepository.js');

function adminAdmins(request, reply) {
    accountRepository.getAdmins(function(result) {
        reply(result);
    });
}

function adminAKills(request, reply) {
    adminRepository.getAKills(function(result) {
        reply(result);
    });
}

module.exports.init = function(server) {
    server.route({
       method: 'GET',
       path: '/api/admin/admins',
       handler: adminAdmins
    });

    server.route({
       method: 'GET',
       path: '/api/admin/akills',
       handler: adminAKills
    });
};
