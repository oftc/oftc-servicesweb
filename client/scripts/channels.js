/* global $, ko */

'use strict';

var channelsViewModel = {
    channels: ko.observable([]),

    levelText: function(level) {
        switch(level) {
            case 2:
                return 'Member';
            case 3:
                return 'ChanOp';
            case 4:
                return 'Master';
        }
    },

    channelName: function(name) {
        return name.substring(1);
    }
};

ko.applyBindings(channelsViewModel);

$().ready(function() {
    $.get('/api/account/channels', {}, function(data) {
        channelsViewModel.channels(data);
    })
    .fail(function() {
        console.warn('failed');
    });
});
