/* global ko, location */

'use strict';

var nicknameViewModel = {
    nickname: ko.observable(''),

    search: function() {
        location.href = '/nickname/' + this.nickname();
    }
};

ko.applyBindings(nicknameViewModel);
