import ko from 'knockout';
import map from 'knockout-mapping';
import $ from 'jquery';

let accountData = {
    primary_nickname: '',
    email: '',
    url: '',
    cloak: '',
    lastHost: '',
    lastQuitMessage: '',
    lastRealname: '',
    regTime: 0,
    cloakEnabled: false,
    enforce: false,
    private: false,
    secure: false,
    verified: false,
    loaded: false,
    errorMessage: ''
};

let AccountViewModel = function(data) {
    ko.mapping.fromJS(data, {}, this);

    this.formattedRegTime = ko.computed(() => {
        return moment.unix(this.regTime()).format('Do MMMM YYYY hh:mm') + ' (' + moment.unix(this.regTime()).fromNow() + ')';
    });
}

let accountViewModel = new AccountViewModel(accountData);

$(() => {
    ko.applyBindings(accountViewModel);

    $.ajax({ 
        url: '/api/account',
        context: {}
    }).done(data => {
        ko.mapping.fromJS(data, accountViewModel);
        accountViewModel.loaded(true);
    }).fail(() => {
        accountViewModel.errorMessage('An error occured fetching the account data.');
    });
});
