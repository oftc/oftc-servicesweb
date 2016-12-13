'use strict';

var accountRepository = require('../../accountrepository.js');
var channelRepository = require('../../channelrepository.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var requestjs = require('request');
var config = require('../../config.js');

function accountLogin(request, reply) {
    accountRepository.getByNick(request.payload.nickname, function (result) {
        if(!result) {
            return reply({ error: 'Invalid username or password' });
        }

        var shasum = crypto.createHash('sha1');
        shasum.update(request.payload.password + result.salt);
        var hash = shasum.digest('hex').toUpperCase();

        if(hash !== result.password.toUpperCase()) {
            return reply({ error: 'Invalid username or password' });
        }

        var nickname = {
            id: result.id + '',
            nickname: result.nick,
            email: result.email,
            admin: result.flag_admin
        };

        nickname.token = jwt.sign(nickname, config.tokenSecret);

        reply(nickname).state('authToken', nickname.token);
    });
}

function accountGet(request, reply) {
    var id = request.auth.credentials.id;

    accountRepository.getById(id, function (result) {
        return reply({
            primary_nickname: result.primary_nickname,
            cloak: result.cloak,
            email: result.email,
            url: result.url,
            lastHost: result.last_host,
            lastQuitMessage: result.last_quit_msg,
            lastQuitTime: result.last_quit_time,
            lastRealname: result.last_realname,
            enforce: result.flag_enforce,
            secure: result.flag_secure,
            cloakEnabled: result.flag_cloak_enabled,
            verified: result.flag_verified,
            private: result.flag_private,
            regTime: result.reg_time
        });
    });
}

function accountNicknames(request, reply) {
    accountRepository.getNicknames(request.auth.credentials.id, function (result) {
        reply(result);
    });
}

function accountCertificates(request, reply) {
    accountRepository.getCertificates(request.auth.credentials.id, function (result) {
        reply(result);
    });
}

function accountChannels(request, reply) {
    channelRepository.getChannelsForAccount(request.auth.credentials.id, function (result) {
        reply(result);
    });
}

function accountVerify(request, reply) {
    var id = request.auth.credentials.id;

    requestjs.post('https://www.google.com/recaptcha/api/siteverify',
        {
            form:
            {
                secret: config.recaptcha_secretkey,
                response: request.payload.response,
            }
        },
        function (err, httpresponse, body) {
            if(err || httpresponse.statusCode != 200) {
                console.log('bad: ' + httpresponse.statusCode);
                reply('{"verified": false}');
                return;
            }
            var info = JSON.parse(body);
            if(!info.success) {
                console.log('no success');
                //console.log(httpresponse);
                console.log(body);
                reply('{"verified": false}');
                return;
            }
            accountRepository.accountSetVerified(id);
            console.log('success validating ' + id);
            reply('{"verified": true}');
        });
}

module.exports.init = function (server) {
    server.route({
        method: 'POST',
        plugins: { 'hapi-auth-jwt': { redirectWhenNotAuthed: false } },
        config: { auth: { mode: 'try' } },
        path: '/api/login',
        handler: accountLogin
    });

    server.route({
        method: 'GET',
        plugins: { 'hapi-auth-jwt': { redirectWhenNotAuthed: false } },
        path: '/api/account/{id?}',
        config: {
            handler: accountGet
        }
    });

    server.route({
        method: 'GET',
        plugins: { 'hapi-auth-jwt': { redirectWhenNotAuthed: false } },
        path: '/api/account/nicknames/{id?}',
        config: {
            handler: accountNicknames
        }
    });

    server.route({
        method: 'GET',
        plugins: { 'hapi-auth-jwt': { redirectWhenNotAuthed: false } },
        path: '/api/account/certificates/{id?}',
        config: {
            handler: accountCertificates
        }
    });

    server.route({
        method: 'GET',
        plugins: { 'hapi-auth-jwt': { redirectWhenNotAuthed: false } },
        path: '/api/account/channels/{id?}',
        config: {
            handler: accountChannels
        }
    });

    server.route({
        method: 'POST',
        plugins: { 'hapi-auth-jwt': { redirectWhenNotAuthed: false } },
        path: '/api/account/verify',
        config: {
            handler: accountVerify
        }
    });
};
