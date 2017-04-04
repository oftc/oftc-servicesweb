import ko from 'knockout';
import komap from 'knockout-mapping';
import moment from 'moment';

let nicknameData = {
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

let NicknameViewModel = function(data) {
    ko.mapping.fromJS(data, {}, this);

    this.formattedLastQuitTime = ko.computed(() => {
        return moment.unix(this.lastQuitTime()).format('Do MMMM YYYY hh:mm') + ' (' + moment.unix(this.lastQuitTime()).fromNow() + ')';
    });

    this.formattedRegTime = ko.computed(() => {
        return moment.unix(this.regTime()).format('Do MMMM YYYY hh:mm') + ' (' + moment.unix(this.regTime()).fromNow() + ')';
    });
}

let nicknameViewModel = new NicknameViewModel(nicknameData);

$(() => {
    ko.applyBindings(nicknameViewModel);

    $.get('/api/nickname/' + window.Nickname, {}, function(data) {
        ko.mapping.fromJS(data, nicknameViewModel);
        nicknameViewModel.loaded(true);
    })
    .fail(function() {
        nicknameViewModel.errorMessage('An error occured fetching the nickname data.  It may be private or there may be a problem with the server.');
    });
});
