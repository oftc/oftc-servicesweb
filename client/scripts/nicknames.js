/* global $, ko */

'use strict';

var nicknamesViewModel = {
    nicknames: ko.observable([])
};

ko.applyBindings(nicknamesViewModel);

$().ready(function() {
    $.get('/api/account/nicknames', {}, function(data) {
        nicknamesViewModel.nicknames(data);
    })
    .fail(function() {
        console.warn('failed');
    });
});
