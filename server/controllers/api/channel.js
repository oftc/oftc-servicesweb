let channelRepository = require('../../channelrepository.js');
let Boom = require('boom');

let AKICK_LIST = 0;
let INVEX_LIST = 2;
let EXCEPT_LIST = 3;
let QUIET_LIST = 4;

function addPrivateProperties(channel, result) {
    channel.topic = result.topic;
    channel.entryMessage = result.entrymsg;
    channel.modeLock = result.mlock;

    return channel;
}

function channelGet(req, res) {
    let channelName = '#' + req.params.name;
    channelRepository.getByName(channelName, function(result) {
        if(!result) {
            return res.send(Boom.notFound('Channel not found'));
        }

        if(!req.user && result.flag_private) {
            return res.send(Boom.forbidden('Not authorised'));
        }

        let channel = {
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

        if(!req.user) {
            return res.send(channel);
        }

        if(req.user.admin) {
            channel = addPrivateProperties(channel, result);

            return res.send(channel);
        }

        channelRepository.isOnAccessList(channelName, req.user.id, function(isOn) {
            if(isOn) {
                channel = addPrivateProperties(channel, result);
            }

            return res.send(channel);
        });
    });
}

function channelAccessList(req, res) {
    let channel = '#' + req.params.name;
    channelRepository.getAccessList(channel, function(result) {
        if(!result || !req.user) {
            return res.send(Boom.notFound());
        }

        if(req.user.admin) {
            return res.send(result);
        }

        channelRepository.isOnAccessList(channel, req.user.id, function(isOn) {
            if(isOn) {
                return res.send(result);
            }

            return res.send(Boom.notFound());
        });
    });
}

function queryResp(func, type, request, reply) {
    let channel = '#' + request.params.name;
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
    server.get('/api/channel/{name}', channelGet);
    server.get('/api/channel/{name}/access', channelAccessList);
    server.get('/api/channel/{name}/akicks', queryResp.bind(server, channelRepository.getList, AKICK_LIST));
    server.get('/api/channel/{name}/quiets', queryResp.bind(server, channelRepository.getList, QUIET_LIST));
    server.get('/api/channel/{name}/excepts', queryResp.bind(server, channelRepository.getList, EXCEPT_LIST));
    server.get('/api/channel/{name}/invexes', queryResp.bind(server, channelRepository.getList, INVEX_LIST));
};
