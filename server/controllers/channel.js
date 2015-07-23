var channelRepository = require('../channelrepository.js');

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

function channelGet(req, res, next) {
    channelRepository.getByName('#' + req.params.name, function(result) {
        if(!result) {
            return next(new restify.NotFoundError());
        }

        if(!req.authObject && result.flag_private) {
            return next(new restify.NotFoundError());
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

        if(!req.authObject) {
            res.json(channel);
            return next();
        }

        if(req.authObject.admin) {
            channel = addPrivateProperties(channel, result);

            res.json(channel);
            return next();
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                channel = addPrivateProperties(channel, result);
            }

            res.json(channel);
            return next();
        });
    });
}

function channelAccessList(req, res, next) {
    channelRepository.getAccessList('#' + req.params.name, function(result) {
        if(!result || !req.authObject) {
            return next(new restify.NotFoundError());
        }

        if(req.authObject.admin) {
            res.json(result);
            return next();
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                res.json(result);
            }

            return next(new restify.NotFoundError());
        });
    });
}

function queryResp(func, type, req, res, next) {
    func('#' + req.params.name, type, function(result) {
        if(!result || !req.authObject) {
            return next(new restify.NotFoundError());
        }

        if(req.authObject.admin) {
            res.json(result);
            return next();
        }

        channelRepository.isOnAccessList(req.params.name, req.authObject.id, function(isOn) {
            if(isOn) {
                res.json(result);
            }

            return next(new restify.NotFoundError());
        });
    });
}

module.exports.init = function(server) {
    /*server.get('/api/channel/:name', channelGet);
    server.get('/api/channel/:name/access', channelAccessList);
    server.get('/api/channel/:name/akicks', queryResp.bind(server, channelRepository.getList, AKICK_LIST));
    server.get('/api/channel/:name/quiets', queryResp.bind(server, channelRepository.getList, QUIET_LIST));
    server.get('/api/channel/:name/invexes', queryResp.bind(server, channelRepository.getList, INVEX_LIST));
    server.get('/api/channel/:name/excepts', queryResp.bind(server, channelRepository.getList, EXCEPT_LIST));*/
};
