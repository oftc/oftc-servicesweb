'use strict';

var accountRepository = require('../accountrepository.js');
var channelRepository = require('../channelrepository.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

function accountLogin(request, reply) {
    accountRepository.getByNick(request.payload.nickname, function(result) {
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

function accountLogout(request, reply) {
    reply.unstate('authToken');
    return reply.redirect('/');
}

function accountGet(request, reply) {
    var id = request.auth.credentials.id;

    accountRepository.getById(id, function(result) {
        return reply({
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
    });
}

function accountNicknames(request, reply) {
    accountRepository.getNicknames(request.auth.credentials.id, function(result) {
        reply(result);
    });
}

function accountCertificates(request, reply) {
    accountRepository.getCertificates(request.auth.credentials.id, function(result) {
        reply(result);
    });
}

function accountChannels(request, reply) {
    channelRepository.getChannelsForAccount(request.auth.credentials.id, function(result) {
        reply(result);
    });
}

module.exports.init = function(server) {
    server.state('authToken', {
        ttl: null,
        isSecure: false,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: true,
        strictHeader: true,
        path: '/'
    });

    server.route({
        method: 'GET',
        path: '/login',
        handler: function(request, reply) {
            reply.view('login', { authenticated: request.auth.isAuthenticated, activeLogin: true });
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        handler: accountLogout
    });

    server.route({
       method: 'POST',
       path: '/api/login',
       handler: accountLogin
    });

    server.route({
       method: 'GET',
       path: '/api/account/{id?}',
       handler: accountGet
    });

    server.route({
       method: 'GET',
       path: '/api/account/nicknames/{id?}',
       handler: accountNicknames
    });

    server.route({
       method: 'GET',
       path: '/api/account/certificates/{id?}',
       handler: accountCertificates
    });

    server.route({
       method: 'GET',
       path: '/api/account/channels/{id?}',
       handler: accountChannels
    });

    server.route({
        method: 'GET',
        path: '/account',
        handler: function(request, reply) {
            reply.view('account', {
                authenticated: request.auth.isAuthenticated,
                activeAccount: true,
                activeDetails: true,
                sidebar: 'account'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/account/nicknames',
        handler: function(request, reply) {
            reply.view('nicknames', {
                authenticated: request.auth.isAuthenticated,
                activeAccount: true,
                activeNicknames: true,
                sidebar: 'account'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/account/certificates',
        handler: function(request, reply) {
            reply.view('certificates', {
                authenticated: request.auth.isAuthenticated,
                activeAccount: true,
                activeCertificates: true,
                sidebar: 'account'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/account/channels',
        handler: function(request, reply) {
            reply.view('channels', {
                authenticated: request.auth.isAuthenticated,
                activeAccount: true,
                activeChannels: true,
                sidebar: 'account'
            });
        }
    });
};
