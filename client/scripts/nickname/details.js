/* global $, ko, window */
'use strict';

var nicknameData = {
    nick: '',
    email: '',
    lastHost: '',
    lastQuitTime: 0,
    lastQuitMessage: '',
    lastRealname: '',
    regTime: 0,
    errorMessage: '',
    loaded: false
};

var nicknameViewModel = ko.mapping.fromJS(nicknameData);
ko.applyBindings(nicknameViewModel);

$().ready(function() {
    $.get('/api/nickname/' + window.Nickname, {}, function(data) {
        ko.mapping.fromJS(data, nicknameViewModel);
        nicknameViewModel.loaded(true);
    })
    .fail(function() {
        nicknameViewModel.errorMessage('An error occured fetching the nickname data.  It may be private or there may be a problem with the server.');
    });
});
