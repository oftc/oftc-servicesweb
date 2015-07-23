'use strict';

var nicknameRepository = require('../nicknamerepository.js');

function nicknameGet(req, res, next) {
    nicknameRepository.getByName(req.params.name, function(result) {
        if(!result) {
            return next(new restify.NotFoundError());
        }

        if((req.authObject && req.authObject.admin) || !result.flag_private) {
            var nick = {
                nick: result.nick,
                lastHost: result.last_host,
                lastRealname: result.last_realname,
                lastQuitMessage: result.last_quit_msg,
                lastQuitTime: result.last_quit_time,
                regTime: result.reg_time,
                email: result.email
            };

            res.json(nick);
            return next();
        }

        return next(new restify.NotFoundError());
    });
}

module.exports.init = function(server) {
    //server.get('/api/nickname/:name', nicknameGet);
};
