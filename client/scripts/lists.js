/* global $, ko, window */

'use strict';

var listViewModel = {
    list: ko.observable([])
};

ko.applyBindings(listViewModel);

window.ProcessList = function(channel, list) {
    $.get('/api/channel/' + channel + '/' + list, {}, function(data) {
        listViewModel.list(data);
    })
    .fail(function() {
        console.warn('failed');
    });
};
