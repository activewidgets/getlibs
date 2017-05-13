
var glob = require('glob');

describe('hello world', function(){

	glob.sync('**/hello.html').forEach(function(name){

		it(name, function(){

			browser.url(localhost + name);

			browser.waitUntil(function(){
				return browser.getText('#app') == 'Hello World!';
			});
		});
	});
});