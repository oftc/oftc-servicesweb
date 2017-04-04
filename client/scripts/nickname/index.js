import ko from 'knockout';
import $ from 'jquery';

function NicknameViewModel() {
    this.nickname = ko.observable('');

    this.search = () => {
        location.href = '/nickname/' + this.nickname();
    };
}

$(() => {
    ko.applyBindings(new NicknameViewModel());
});
