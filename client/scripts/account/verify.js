/* global $, ko */

'use strict';

var accountViewModel;

var onloadCallback = function() {
    $.get('/api/account/get', {}, function(data) {
        accountViewModel = ko.mapping.fromJS(data);
        ko.applyBindings(accountViewModel);

        if (!accountViewModel.verified()) {
            renderCaptcha();
        }
    })
    .fail(function() {
        console.warn('failed');
    });
}

var verifyCallback = function(response) {
    $.post('/api/account/verify', {"response": response}, function(data) {
        var info = JSON.parse(data);
        if (info.verified) {
            accountViewModel.verified(true);
        } else {
            console.warn(data);
        }
    })
    .fail(function() {
        console.warn('/api/account/verify failed');
    });
};
