/* global __dirname */
var Handlebars = require('handlebars');
var Hapi = require('hapi');
var Path = require('path');
var Config = require('./config.js');
var Controllers = require('./controllers');

var server = new Hapi.Server();
server.connection({
    host: '127.0.0.1',
    port: Config.port
});

server.views({
    engines: {
        html: Handlebars.create()
    },
    path: Path.join(__dirname, '../client/views'),
    layoutPath: Path.join(__dirname, '../client/views/layout'),
    layout: true,
    partialsPath: Path.join(__dirname, '../client/views/partials')
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
    path: '/scripts/{filename}',
    config: {
        files: {
            relativeTo: Path.join(__dirname, '../client/scripts')
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
        reply.view('index', { });
    }
});

server.start();