

let accountRepository = require('../../accountrepository.js');
let adminRepository = require('../../adminrepository.js');
let oData = require('odata-parser');
let url = require('url');

function adminAdmins(request, reply) {
    accountRepository.getAdmins(function(result) {
        reply(result);
    });
}

function adminAKills(req, res) {
    let queryStr = url.parse(req.url).search ? url.parse(req.url).search.substr(1) : '$skip=0';
    let odata = oData.parse(queryStr);
    adminRepository.getAKills(odata, function(result) {
        adminRepository.getAKillsCount(function(count) {
            res.send({ totalCount: count, data: result });
        });
    });
}

module.exports.init = function(server) {
    server.get('/api/admin/admins', adminAdmins);
    server.get('/api/admin/akills', adminAKills);
};
