/* global $, ko */

'use strict';

var adminsViewModel = {
    admins: ko.observable([])
};

ko.applyBindings(adminsViewModel);

$().ready(function() {
    $.get('/api/admin/admins', {}, function(data) {
        adminsViewModel.admins(data);
    })
    .fail(function() {
        console.warn('failed');
    });
});
