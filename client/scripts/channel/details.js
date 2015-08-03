/* global $, ko, window */

'use strict';

var channelData = {
    name: '',
    email: '',
    url: '',
    description: '',
    entryMessage: '',
    modeLock: '',
    topic: '',
    regTime: '',
    lastUsed: '',
    autoLimit: false,
    autoOp: false,
    autoSave: false,
    autoVoice: false,
    expireBans: false,
    floodserv: false,
    leaveOps: false,
    private: false,
    topicLock: false,
    verbose: false,
    restricted: false,
    errorMessage: ''
};

var channelViewModel = ko.mapping.fromJS(channelData);
ko.applyBindings(channelViewModel);

$().ready(function() {
    $.get('/api/channel/' + window.Channel, {}, function(data) {
        ko.mapping.fromJS(data, channelViewModel);
    })
    .fail(function() {
        channelViewModel.errorMessage('An error occured fetching the channel data.  It may be private or there may be a problem with the server.');
    });
});
