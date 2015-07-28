/* global $, ko, window */
'use strict';

var nicknameData = {
    nick: '',
    email: '',
    lastHost: '',
    lastQuitTime: 0,
    lastQuitMessage: '',
    lastRealname: '',
    regTime: 0
};

var nicknameViewModel = ko.mapping.fromJS(nicknameData);
ko.applyBindings(nicknameViewModel);

$().ready(function() {
    $.get('/api/nickname/' + window.Nickname, {}, function(data) {
        ko.mapping.fromJS(data, nicknameViewModel);
    })
    .fail(function() {
        console.warn('failed');
    });
});
