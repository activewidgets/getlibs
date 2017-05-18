
var glob = require('glob');

glob.sync('./examples/**/realworl*/local.html').forEach(function(name){

	describe(name, function(){

		it('has banner', function(){
			browser.url(localhost + name);
			browser.waitForExist('h1=conduit');
		});

		it('shows sign up page', function(){
			browser.click('layout-header a[routerlink="/register"]');
			browser.waitForExist('h1=Sign up');
		});
	});
});