'use strict';

module.exports.init = function(server) {
    server.route({
        method: 'GET',
        path: '/channel/{name}',
        handler: function(request, reply) {
            reply.view('channel/details', {
                authenticated: request.auth.isAuthenticated,
                activeChannelDetails: true,
                sidebar: 'channel',
                channelName: request.params.name
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/access',
        handler: function(request, reply) {
            reply.view('channel/access', {
                authenticated: request.auth.isAuthenticated,
                activeChannel: true,
                activeAccessList: true,
                sidebar: 'channel',
                channelName: request.params.name
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/akicks',
        handler: function(request, reply) {
            reply.view('channel/list', {
                authenticated: request.auth.isAuthenticated,
                activeChannel: true,
                activeAKickList: true,
                sidebar: 'channel',
                channelName: request.params.name,
                list: 'akicks'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/quiets',
        handler: function(request, reply) {
            reply.view('channel/list', {
                authenticated: request.auth.isAuthenticated,
                activeChannel: true,
                activeQuietList: true,
                sidebar: 'channel',
                channelName: request.params.name,
                list: 'quiets'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/excepts',
        handler: function(request, reply) {
            reply.view('channel/list', {
                authenticated: request.auth.isAuthenticated,
                activeChannel: true,
                activeExceptList: true,
                sidebar: 'channel',
                channelName: request.params.name,
                list: 'excepts'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/channel/{name}/invexes',
        handler: function(request, reply) {
            reply.view('channel/list', {
                authenticated: request.auth.isAuthenticated,
                activeChannel: true,
                activeInvexList: true,
                sidebar: 'channel',
                channelName: request.params.name,
                list: 'invexes'
            });
        }
    });
};
