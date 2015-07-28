/* global $, ko */
'use strict';

var accountViewModel = {
    email: ko.observable(''),
    url: ko.observable(''),
    cloak: ko.observable(''),
    lastHost: ko.observable(''),
    lastQuitMessage: ko.observable(''),
    lastRealName: ko.observable(''),
    regTime: ko.observable(''),
    cloakEnabled: ko.observable(false),
    enforce: ko.observable(false),
    private: ko.observable(false),
    secure: ko.observable(false)
};

ko.applyBindings(accountViewModel);

$().ready(function() {
    $.get('/api/account/get', {}, function(data) {
        accountViewModel.email(data.email);
        accountViewModel.url(data.url);
        accountViewModel.cloak(data.cloak);
        accountViewModel.lastHost(data.lastHost);
        accountViewModel.lastQuitMessage(data.lastQuitMessage);
        accountViewModel.lastRealName(data.lastRealName);
        accountViewModel.regTime(data.regTime);
        accountViewModel.cloakEnabled(data.cloakEnabled);
        accountViewModel.enforce(data.enforce);
        accountViewModel.secure(data.secure);
        accountViewModel.private(data.private);
    })
    .fail(function() {
        console.warn('failed');
    });
});
