/* global $, ko, window */

'use strict';

var channelData = {
    name: ko.observable(''),
    email: ko.observable(''),
    url: ko.observable(''),
    description: ko.observable(''),
    entryMessage: ko.observable(''),
    modeLock: ko.observable(''),
    topic: ko.observable(''),
    regTime: ko.observable(''),
    lastUsed: ko.observable(''),
    autoLimit: ko.observable(false),
    autoOp: ko.observable(false),
    autoSave: ko.observable(false),
    autoVoice: ko.observable(false),
    expireBans: ko.observable(false),
    floodserv: ko.observable(false),
    leaveOps: ko.observable(false),
    private: ko.observable(false),
    topicLock: ko.observable(false),
    verbose: ko.observable(false),
    restricted: ko.observable(false)
};

var channelViewModel = ko.mapping.fromJS(channelData);
ko.applyBindings(channelViewModel);

$().ready(function() {
    $.get('/api/channel/' + window.Channel, {}, function(data) {
        ko.mapping.fromJS(data, channelViewModel);
    })
    .fail(function() {
        console.warn('failed');
    });
});
