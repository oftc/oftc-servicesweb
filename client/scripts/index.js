import 'bootstrap/dist/js/bootstrap';
import $ from 'jquery';

$(document).ajaxSend(function() {
	console.info('hello');
	// This will set up the authentication headers for the API
});

$(document).ajaxError((event, xhr) => {
	console.info('hi', event, xhr);
	if(xhr.status === 401) {
		location.href = '/login';
	}
});

console.info('now');

$.ajaxSetup({
	global: true
});