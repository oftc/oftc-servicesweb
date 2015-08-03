/* global __dirname */

'use strict';

var Handlebars = require('handlebars');
var Hapi = require('hapi');
var Path = require('path');
var Config = require('./config.js');
var Controllers = require('./controllers');

var server = new Hapi.Server();
server.connection({
    host: '::',
    port: Config.port
});

server.register(require('./hapi-auth-jwt'), function(err) {
    if(err) {
        console.info(err);
    }
    server.auth.strategy('default', 'jwt', true, { requiresAdmin: false });

    server.views({
        engines: {
            html: Handlebars.create()
        },
        path: Path.join(__dirname, '../client/views'),
        layoutPath: Path.join(__dirname, '../client/views/layout'),
        layout: true,
        partialsPath: Path.join(__dirname, '../client/views/partials'),
        isCached: false
    });

    server.route({
        method: 'GET',
        path: '/content/{filename}',
        config: {
            auth: { mode: 'try' },
            files: {
                relativeTo: Path.join(__dirname, '../client/content')
            },
            handler: {
                file: function (request) {
                    return request.params.filename;
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/scripts/{filename*}',
        config: {
            auth: { mode: 'try' },
            handler: {
                directory: {
                    path: Path.join(__dirname, '../client/scripts')
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/fonts/{filename}',
        config: {
            auth: { mode: 'try' },
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
        config: {
            auth: { mode: 'try' },
            handler: function (request, reply) {
                reply.view('index', {
                    authenticated: request.auth.isAuthenticated,
                    admin: request.auth.credentials && request.auth.credentials.admin,
                    activeHome: true
                });
            }
        }
    });

    server.start();

});
