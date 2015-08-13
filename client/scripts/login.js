/* global $, ko, location */

'use strict';

function LoginViewModel() {
    var self = this;

    self.username = ko.observable('');
    self.password = ko.observable('');
    self.errorMessage = ko.observable('');

    self.login = function() {
        $.post('/api/login', { nickname: self.username(), password: self.password() }, function(data) {
            if(data.error) {
                self.errorMessage(data.error);
            }
            else {
                location.href = '/';
            }
        })
        .fail(function() {
            self.errorMessage('An error occured submitting your information');
        });
    };
}

ko.applyBindings(new LoginViewModel());
