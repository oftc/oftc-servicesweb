'use strict';

module.exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/channel/{name}',
        handler: function(request, reply) {
            reply.view('channel/details', {
                authenticated: request.auth.isAuthenticated,
                admin: request.auth.credentials && request.auth.credentials.admin,
                activeChannelDetails: true,
                sidebar: 'channel',
                channelName: request.params.name,
                title: 'Channel Details - #' + request.params.name
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/access',
        config: {
            handler: function(request, reply) {
                reply.view('channel/access', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeChannel: true,
                    activeAccessList: true,
                    sidebar: 'channel',
                    channelName: request.params.name,
                    title: 'Access List - #' + request.params.name
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/akicks',
        config: {
            handler: function(request, reply) {
                reply.view('channel/list', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeChannel: true,
                    activeAKickList: true,
                    sidebar: 'channel',
                    channelName: request.params.name,
                    list: 'akicks',
                    title: 'AKick List - #' + request.params.name
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/quiets',
        config: {
            handler: function(request, reply) {
                reply.view('channel/list', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeChannel: true,
                    activeQuietList: true,
                    sidebar: 'channel',
                    channelName: request.params.name,
                    list: 'quiets',
                    title: 'Quiets List - #' + request.params.name
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/excepts',
        config: {
            handler: function(request, reply) {
                reply.view('channel/list', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeChannel: true,
                    activeExceptList: true,
                    sidebar: 'channel',
                    channelName: request.params.name,
                    list: 'excepts',
                    title: 'Excepts List - #' + request.params.name
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/invexes',
        config: {
            handler: function(request, reply) {
                reply.view('channel/list', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials.admin,
                    activeChannel: true,
                    activeInvexList: true,
                    sidebar: 'channel',
                    channelName: request.params.name,
                    list: 'invexes',
                    title: 'Invex List - #' + request.params.name
                });
            }
        }
    });
};
