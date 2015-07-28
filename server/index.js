/* global __dirname */

'use strict';

var Handlebars = require('handlebars');
var Hapi = require('hapi');
var Path = require('path');
var Config = require('./config.js');
var Controllers = require('./controllers');
var jwt = require('jsonwebtoken');
var Boom = require('boom');

var server = new Hapi.Server();
server.connection({
    host: '::',
    port: Config.port
});

server.auth.scheme('jwt', function() {
    return {
        authenticate: function(request, reply) {
            var token = request.headers.authorization || request.state.authToken;

            if(token) {
                jwt.verify(token, Config.tokenSecret, function(err, decoded) {
                    if(err) {
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
});

server.auth.strategy('default', 'jwt', 'try');

var globalContext = {};

server.views({
    engines: {
        html: Handlebars.create()
    },
    path: Path.join(__dirname, '../client/views'),
    layoutPath: Path.join(__dirname, '../client/views/layout'),
    layout: true,
    partialsPath: Path.join(__dirname, '../client/views/partials'),
    context: globalContext,
    isCached: false
});

server.route({
    method: 'GET',
    path: '/content/{filename}',
    config: {
        files: {
            relativeTo: Path.join(__dirname, '../client/content')
        }
    },
    handler: {
        file: function (request) {
            return request.params.filename;
        }
    }
});

server.route({
    method: 'GET',
    path: '/scripts/{filename*}',
    handler: {
        directory: {
            path: Path.join(__dirname, '../client/scripts')
        }
    }
});

server.route({
    method: 'GET',
    path: '/fonts/{filename}',
    config: {
        files: {
            relativeTo: Path.join(__dirname, '../client/fonts')
        }
    },
    handler: {
        file: function (request) {
            return request.params.filename;
        }
    }
});

Controllers.init(server);

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index', {
            authenticated: request.auth.isAuthenticated,
            admin: request.auth.credentials && request.auth.credentials.admin,
            activeHome: true
        });
    }
});

server.start();
