/* global ko */

'use strict';

ko.components.register('pager', {
    viewModel: function(params) {
        var self = this;

        self.pageSize = params.pageSize || 25;
        self.totalCount = params.count;
        self.currentPage = params.currentPage;

        self.pageCount = ko.computed(function() {
            return Math.ceil(self.totalCount() / self.pageSize) - 1;
        });

        self.pages = ko.computed(function() {
            var count = self.pageCount();

            if(!count) {
                return [];
            }

            return new Array(count);
        });

        self.goToPage = function(page) {
            if(page < 1) {
                page = 1;
            }

            if(page > self.pageCount()) {
                page = self.pageCount();
            }

            self.currentPage(page);
            return false;
        };
    },

    template: { element: 'pager-template' },
});
