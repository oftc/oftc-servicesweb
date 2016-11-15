'use strict';

var channelRepository = require('../../channelrepository.js');
var Boom = require('boom');

var AKICK_LIST = 0;
var INVEX_LIST = 2;
var EXCEPT_LIST = 3;
var QUIET_LIST = 4;

function addPrivateProperties(channel, result) {
    channel.topic = result.topic;
    channel.entryMessage = result.entrymsg;
    channel.modeLock = result.mlock;

    return channel;
}

function channelGet(request, reply) {
    var channelName = '#' + request.params.name;
    channelRepository.getByName(channelName, function(result) {
        if(!result) {
            return reply(Boom.notFound('Channel not found'));
        }

        if(!request.auth.isAuthenticated && result.flag_private) {
            return reply(Boom.forbidden('Not authorised'));
        }

        var channel = {
            name: result.channel,
            description: result.description,
            regTime: result.reg_time,
            email: result.email,
            lastUsed: result.last_used,
            private: result.flag_private,
            restricted: result.flag_restricted,
            topicLock: result.flag_topic_lock,
            verbose: result.flag_verbose,
            autoLimit: result.flag_autolimit,
            expireBans: result.flag_expirebans,
            floodserv: result.flag_floodserv,
            autoOp: result.flag_autoop,
            autoVoice: result.flag_autovoice,
            leaveOps: result.flag_leaveops,
            autoSave: result.flag_autosave
        };

        if(!request.auth.isAuthenticated) {
            return reply(channel);
        }

        if(request.auth.credentials.admin) {
            channel = addPrivateProperties(channel, result);

            return reply(channel);
        }

        channelRepository.isOnAccessList(channelName, request.auth.credentials.id, function(isOn) {
            if(isOn) {
                channel = addPrivateProperties(channel, result);
            }

            return reply(channel);
        });
    });
}

function channelAccessList(request, reply) {
    var channel = '#' + request.params.name;
    channelRepository.getAccessList(channel, function(result) {
        if(!result || !request.auth.isAuthenticated) {
            return reply(Boom.notFound());
        }

        if(request.auth.credentials.admin) {
            return reply(result);
        }

        channelRepository.isOnAccessList(channel, request.auth.credentials.id, function(isOn) {
            if(isOn) {
                return reply(result);
            }

            return reply(Boom.notFound());
        });
    });
}

function queryResp(func, type, request, reply) {
    var channel = '#' + request.params.name;
    func(channel, type, function(result) {
        if(!result || !request.auth.isAuthenticated) {
            return reply(Boom.notFound());
        }

        if(request.auth.credentials.admin) {
            return reply(result);
        }

        channelRepository.isOnAccessList(channel, request.auth.credentials.id, function(isOn) {
            if(isOn) {
                reply(result);
            }

            return reply(Boom.notFound());
        });
    });
}

module.exports.init = function(server) {
    server.route({
       method: 'GET',
       path: '/api/channel/{name}',
       handler: channelGet
    });

    server.route({
        method: 'GET',
        path: '/api/channel/{name}/access',
        handler: channelAccessList
    });

    server.route({
        method: 'GET',
        path: '/api/channel/{name}/akicks',
        handler: queryResp.bind(server, channelRepository.getList, AKICK_LIST)
    });

    server.route({
        method: 'GET',
        path: '/api/channel/{name}/quiets',
        handler: queryResp.bind(server, channelRepository.getList, QUIET_LIST)
    });

    server.route({
        method: 'GET',
        path: '/api/channel/{name}/excepts',
        handler: queryResp.bind(server, channelRepository.getList, EXCEPT_LIST)
    });

    server.route({
        method: 'GET',
        path: '/api/channel/{name}/invexes',
        handler: queryResp.bind(server, channelRepository.getList, INVEX_LIST)
    });
};
