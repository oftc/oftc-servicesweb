'use strict';

module.exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/admin',
        handler: function(request, reply) {
            reply.view('admin/index', {
                authenticated: request.auth.isAuthenticated,
                admin: request.auth.credentials.admin,
                activeAdmin: true,
                sidebar: 'admin'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/admin/admins',
        handler: function(request, reply) {
            reply.view('admin/admins', {
                authenticated: request.auth.isAuthenticated,
                admin: request.auth.credentials.admin,
                activeAdmin: true,
                activeAdminList: true,
                sidebar: 'admin'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/admin/akills',
        handler: function(request, reply) {
            reply.view('admin/akills', {
                authenticated: request.auth.isAuthenticated,
                admin: request.auth.credentials.admin,
                activeAdmin: true,
                activeAKillList: true,
                sidebar: 'admin'
            });
        }
    });
};
