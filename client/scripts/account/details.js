/* global $, ko */
'use strict';

$().ready(function() {
    $.get('/api/account/get', {}, function(data) {
        var accountViewModel = ko.mapping.fromJS(data);
        ko.applyBindings(accountViewModel);
    })
    .fail(function() {
        console.warn('failed');
    });
});
