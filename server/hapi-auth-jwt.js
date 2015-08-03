'use strict';

var Config = require('./config.js');
var jwt = require('jsonwebtoken');
var Boom = require('boom');

var implementation = function(server, options) {
    server.state('authToken', {
        ttl: null,
        isSecure: false,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: true,
        strictHeader: true,
        path: '/'
    });

    return {
        authenticate: function(request, reply) {
            var token = request.headers.authorization || request.state.authToken;

            if(token) {
                jwt.verify(token, Config.tokenSecret, function(err, decoded) {
                    if(err) {
                        return reply(Boom.unauthorized(null, ''));
                    }

                    var requiresAdmin = request.route.settings.plugins['hapi-auth-jwt'] || options.requiresAdmin;

                    if(requiresAdmin && !decoded.admin) {
                        return reply(Boom.unauthorized(null, ''));
                    }

                    return reply.continue({ credentials: decoded });
                });
            }
            else {
                reply(Boom.unauthorized(null, ''));
            }
        }
    };
};

exports.register = function(server, options, next) {
    server.auth.scheme('jwt', implementation);
    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
