
(function($import){

	$import('node_modules/es6-promise/dist/es6-promise.auto.js');
	$import('node_modules/systemjs/dist/system.src.js');
	$import('config.js');

	$import('cfg/activewidgets.js');
	$import('cfg/angular2.js');
	$import('cfg/aurelia.js');
	$import('cfg/ember.js');
	$import('cfg/inferno.js');
	$import('cfg/react.js');

	$import('plugins/x-modules.js');


})((function(){

	function currentScriptURL(){

		if (document.currentScript){
			return document.currentScript.src;  // modern
		}

		document.write('<script id="local-source-loader"><\/script>');

		var script = document.getElementById("local-source-loader");

		if (typeof script.readyState !== 'string') {
			return script.previousSibling.src; // ie11
		}

		while (script){

			if (String(script.tagName).toLowerCase() == 'script' && script.readyState == 'interactive'){
				return script.src; // ie9, ie10
			}

			script = script.previousSibling;
		}

		throw new Error('Cannot find loading script URL');
	}

	var base = currentScriptURL().replace(/\w+\/[^//]+$/, '');

	return function(path){
		document.write("<script src=\"" + base + path + "\"><\/script>");
	};

})());