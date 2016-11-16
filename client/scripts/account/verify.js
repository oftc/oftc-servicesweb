/* global $, ko */

'use strict';

var verifyData = {
    verified: 'not yet',
};

var verifyViewModel = ko.mapping.fromJS(verifyData);
ko.applyBindings(verifyViewModel);

var verifyCallback = function(response) {
    $.post('/api/account/verify', {"response": response}, function(data) {
        verifyViewModel.verified(data, verifyViewModel);
        console.log(data);
        alert(data);
    })
    .fail(function() {
        console.warn('/api/account/verify failed');
    });
};
