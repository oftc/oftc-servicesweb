/* global $, ko */

'use strict';

var vm = {};

function getData() {
    $.get('/api/admin/akills?$top=25&$skip=' + vm.currentPage(), {}, function(data) {
        vm.akills(data.data);
        vm.totalCount(data.totalCount);
    })
    .fail(function() {
        console.warn('failed');
    });
}

function AKillsViewModel() {
    this.akills = ko.observableArray();
    this.totalCount = ko.observable();
    this.currentPage = ko.observable(1);

    this.currentPage.subscribe(function() {
        getData();
    });
}

$().ready(function() {
    vm = new AKillsViewModel();
    ko.applyBindings(vm);

    getData();
});
