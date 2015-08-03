'use strict';

module.exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/login',
        config: { auth: { mode: 'try' } },
        handler: function(request, reply) {
            reply.view('login', {
                authenticated: request.auth.isAuthenticated,
                admin: request.auth.credentials && request.auth.credentials.admin,
                activeLogin: true
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        config: { auth: { mode: 'try' } },
        handler: function (request, reply) {
            reply.unstate('authToken');
            return reply.redirect('/');
        }
    });

    server.route({
        method: 'GET',
        path: '/account',
        config: {
            handler: function(request, reply) {
                reply.view('account/details', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeAccount: true,
                    activeDetails: true,
                    sidebar: 'account'
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/account/nicknames',
        auth: {
            handler: function(request, reply) {
                reply.view('account/nicknames', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeAccount: true,
                    activeNicknames: true,
                    sidebar: 'account'
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/account/certificates',
        config: {
            handler: function(request, reply) {
                reply.view('account/certificates', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeAccount: true,
                    activeCertificates: true,
                    sidebar: 'account'
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/account/channels',
        config: {
            handler: function(request, reply) {
                reply.view('account/channels', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeAccount: true,
                    activeChannels: true,
                    sidebar: 'account'
                });
            }
        }
    });
};
