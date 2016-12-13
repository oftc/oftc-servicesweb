/* global $, document */

'use strict';

$(document).ajaxSend(function(event, jqxhr, settings) {
	// This will set up the authentication headers for the API
});

$(document).ajaxError((event, xhr) => {
	if(xhr.status === 401) {
		location.href = '/login';
	}
});