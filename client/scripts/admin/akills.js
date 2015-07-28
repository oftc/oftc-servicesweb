/* global $, ko */

'use strict';

var akillsViewModel = {
    akills: ko.observable([])
};

ko.applyBindings(akillsViewModel);

$().ready(function() {
    $.get('/api/admin/akills', {}, function(data) {
        akillsViewModel.akills(data);
    })
    .fail(function() {
        console.warn('failed');
    });
});
