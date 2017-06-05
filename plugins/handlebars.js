
define('hbs', ['handlebars'], function(Handlebars){

	function translate(load){

		var precompiled = Handlebars.precompile(load.source),
			output = 'var Handlebars = require("handlebars"); \n module.exports = Handlebars.template(' +  precompiled +');';

		load.source = output;
		return output;
	}

	return {
		translate: translate
	};
});
