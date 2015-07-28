/* global $, ko, window */

'use strict';

var accessViewModel = {
    access: ko.observable([]),

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

    nickLink: function(nick) {
        return '/nickname/' + nick;
    }
};

ko.applyBindings(accessViewModel);

$().ready(function() {
    $.get('/api/channel/' + window.Channel + '/access', {}, function(data) {
        accessViewModel.access(data);
    })
    .fail(function() {
        console.warn('failed');
    });
});
