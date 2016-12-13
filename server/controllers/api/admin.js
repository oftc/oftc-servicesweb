'use strict';

var accountRepository = require('../../accountrepository.js');
var adminRepository = require('../../adminrepository.js');
var oData = require('odata-parser');
var url = require('url');

function adminAdmins(request, reply) {
    accountRepository.getAdmins(function (result) {
        reply(result);
    });
}

function adminAKills(request, reply) {
    var queryStr = url.parse(request.url).search ? url.parse(request.url).search.substr(1) : '$skip=0';
    var odata = oData.parse(queryStr);
    adminRepository.getAKills(odata, function (result) {
        adminRepository.getAKillsCount(function (count) {
            reply({ totalCount: count, data: result });
        });
    });
}

module.exports.init = function (server) {
    server.route({
        method: 'GET',
        path: '/api/admin/admins',
        config: {
            plugins: { 'hapi-auth-jwt': { requiresAdmin: true, redirectWhenNotAuthed: false } },
            handler: adminAdmins
        }
    });

    server.route({
        method: 'GET',
        path: '/api/admin/akills',
        config: {
            plugins: { 'hapi-auth-jwt': { requiresAdmin: true, redirectWhenNotAuthed: false } },
            handler: adminAKills
        }
    });
};
