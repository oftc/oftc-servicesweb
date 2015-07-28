/* global $, ko, location */

'use strict';

var loginViewModel = {
    username: ko.observable(''),
    password: ko.observable(''),

    login: function() {
        $.post('/api/login', { nickname: this.username(), password: this.password() }, function(data) {
            console.info(data);
            location.href = '/';
        })
        .fail(function() {
            console.warn('failed');
        });
    }
};

ko.applyBindings(loginViewModel);
