import ko from 'knockout';
import $ from 'jquery';

function LoginViewModel() {
    this.username = ko.observable('');
    this.password = ko.observable('');
    this.errorMessage = ko.observable('');

    this.login = () => {
        $.post('/api/login', { nickname: this.username(), password: this.password() }, data => {
            if(data.error) {
                this.errorMessage(data.error);
            }
            else {
                location.href = '/';
            }
        })
        .fail(() => {
            this.errorMessage('An error occured submitting your information');
        });
    };
}

$(() => {
    ko.applyBindings(new LoginViewModel());
});
