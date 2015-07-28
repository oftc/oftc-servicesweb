/* global $, ko */

'use strict';

var certificatesViewModel = {
    certificates: ko.observable([])
};

ko.applyBindings(certificatesViewModel);

$().ready(function() {
    $.get('/api/account/certificates', {}, function(data) {
        certificatesViewModel.certificates(data);
    })
    .fail(function() {
        console.warn('failed');
    });
});
