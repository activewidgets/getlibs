
var compile = require('lodash/template'),
	template = require('./hello.tpl'),
	data = require('./hello.json'),
	render = compile(template);

document.getElementById('app').innerHTML = render(data);
