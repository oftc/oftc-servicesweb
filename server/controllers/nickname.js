'use strict';

module.exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/nickname/{name}',
        config: { auth: { mode: 'try' } },
        handler: function(request, reply) {
            reply.view('nickname/details', {
                authenticated: request.auth.isAuthenticated,
                admin: request.auth.credentials && request.auth.credentials.admin,
                activeNickname: true,
                nickname: request.params.name
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/nickname',
        config: { auth: { mode: 'try' } },
        handler: function(request, reply) {
            reply.view('nickname/index', {
                authenticated: request.auth.isAuthenticated,
                admin: request.auth.credentials && request.auth.credentials.admin,
                activeNickname: true,
                nickname: request.params.name
            });
        }
    });
};
