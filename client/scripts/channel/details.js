/* global $, ko, window */

'use strict';

var channelViewModel = {
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

ko.applyBindings(channelViewModel);

$().ready(function() {
    $.get('/api/channel/' + window.Channel, {}, function(data) {
        channelViewModel.name(data.name);
        channelViewModel.email(data.email);
        channelViewModel.url(data.url);
        channelViewModel.description(data.description);
        channelViewModel.entryMessage(data.entryMessage);
        channelViewModel.modeLock(data.modeLock);
        channelViewModel.topic(data.topic);
        channelViewModel.regTime(data.regTime);
        channelViewModel.lastUsed(data.lastUsed);
        channelViewModel.private(data.private);
        channelViewModel.autoLimit(data.autoLimit);
        channelViewModel.autoOp(data.autoOp);
        channelViewModel.autoSave(data.autoSave);
        channelViewModel.autoVoice(data.autoVoice);
        channelViewModel.expireBans(data.expireBans);
        channelViewModel.floodserv(data.floodserv);
        channelViewModel.leaveOps(data.leaveOps);
        channelViewModel.topicLock(data.topicLock);
        channelViewModel.verbose(data.verbose);
        channelViewModel.restricted(data.restricted);
    })
    .fail(function() {
        console.warn('failed');
    });
});
