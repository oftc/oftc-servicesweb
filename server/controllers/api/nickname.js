'use strict';

var nicknameRepository = require('../../nicknamerepository.js');
var Boom = require('boom');

function nicknameGet(request, reply) {
    nicknameRepository.getByName(request.params.name, function (result) {
        if(!result) {
            return reply(Boom.notFound());
        }

        if((request.auth.credentials && request.auth.credentials.admin) || !result.flag_private) {
            var nick = {
                nick: result.nick,
                lastHost: result.last_host,
                lastRealname: result.last_realname,
                lastQuitMessage: result.last_quit_msg,
                lastQuitTime: result.last_quit_time,
                regTime: result.reg_time,
                email: result.email
            };

            return reply(nick);
        }

        return reply(Boom.notFound());
    });
}

module.exports.init = function (server) {
    server.route({
        method: 'GET',
        path: '/api/nickname/{name}',
        config: {
            plugins: { 'hapi-auth-jwt': { redirectWhenNotAuthed: false } }, 
            auth: { mode: 'try' } },
        handler: nicknameGet
    });
};
