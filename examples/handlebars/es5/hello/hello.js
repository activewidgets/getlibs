
var data = require('./hello.json'),
	template = require('./hello.hbs'),
	$ = require('jquery');

$('#app').html(template(data));