'use strict';

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
            reply.view('login', {
                authenticated: request.auth.isAuthenticated,
                activeLogin: true
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        handler: function (request, reply) {
            reply.unstate('authToken');
            return reply.redirect('/');
        }
    });

    server.route({
        method: 'GET',
        path: '/account',
        handler: function(request, reply) {
            reply.view('account/details', {
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
            reply.view('account/nicknames', {
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
            reply.view('account/certificates', {
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
            reply.view('account/channels', {
                authenticated: request.auth.isAuthenticated,
                activeAccount: true,
                activeChannels: true,
                sidebar: 'account'
            });
        }
    });
};
