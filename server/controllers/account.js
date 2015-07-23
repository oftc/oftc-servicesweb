var accountRepository = require('../accountrepository.js');
var channelRepository = require('../channelrepository.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
//var middleware = require('../middleware.js');

function accountLogin(req, res, next) {
    accountRepository.getByNick(req.body.nickname, function(result) {
        if(!result) {
            res.json({ error: 'Invalid username or password' });
            return next();
        }

        var shasum = crypto.createHash('sha1');
        shasum.update(req.body.password + result.salt);
        var hash = shasum.digest('hex').toUpperCase();

        if(hash !== result.password.toUpperCase()) {
            res.json({ error: 'Invalid username or password' });
            return next();
        }

        var nickname = {
            id: result.id + '',
            nickname: result.nick,
            email: result.email,
            admin: result.flag_admin
        };

        nickname.token = jwt.sign(nickname, config.tokenSecret);

        res.json(nickname);
        return next();
    });
}

function accountGet(req, res, next) {
    var id = req.authObject.id;

    accountRepository.getById(id, function(result) {
        res.json({
            cloak: result.cloak,
            email: result.email,
            url: result.url,
            lastHost: result.last_host,
            lastQuitMessage: result.last_quit_message,
            lastQuitTime: result.last_quit_time,
            lastRealname: result.last_realname,
            enforce: result.flag_enforce,
            secure: result.flag_secure,
            cloakEnabled: result.flag_cloak_enabled,
            private: result.flag_private,
            regTime: result.reg_time
        });
        return next();
    });
}

function accountNicknames(req, res, next) {
    accountRepository.getNicknames(req.authObject.id, function(result) {
        res.json(result);
        next();
    });
}

function accountCertificates(req, res, next) {
    accountRepository.getCertificates(req.authObject.id, function(result) {
        res.json(result);
        next();
    });
}

function accountChannels(req, res, next) {
    channelRepository.getChannelsForAccount(req.authObject.id, function(result) {
        res.json(result);
        next();
    });
}

module.exports.init = function(server) {
    console.info('hi');
    server.route({
        method: 'GET',
        path: '/login',
        handler: function(request, reply) {
            reply.view('login');
        }
    });
/*    server.post('/api/account/login', accountLogin);
    server.get('/api/account/nicknames', middleware.ensureAuthorised, accountNicknames);
    server.get('/api/account/certificates', middleware.ensureAuthorised, accountCertificates);
    server.get('/api/account/channels', middleware.ensureAuthorised, accountChannels);
    server.get('/api/account/:id', middleware.ensureAuthorised, accountGet);*/
};
