
(function($import){

	$import('node_modules/es6-promise/dist/es6-promise.auto.js');
	$import('node_modules/systemjs/dist/system.src.js');

	$import('src/libs.js');
	$import('src/config.js');
	$import('src/idb.js');
	$import('src/worker.js');
	$import('src/browsersync.js');

	$import('config/activewidgets.js');
	$import('config/angular.js');
	$import('config/angular-1.js');
	$import('config/aurelia.js');
	$import('config/core.js');
	$import('config/ember.js');
	$import('config/inferno.js');
	$import('config/lodash.js');
	$import('config/react.js');
	$import('config/rxjs.js');
	$import('config/vue.js');
	$import('config/zone.js');

	$import('plugins/text.js');
	$import('plugins/json.js');
	$import('plugins/preload.js');
	$import('plugins/cdnjs.js');
	$import('plugins/cached.js');
	$import('plugins/files.js');
	$import('plugins/roots.js');
	$import('plugins/index.js');
	$import('plugins/scan.js');
	$import('plugins/js.js');
	$import('plugins/babel.js');
	$import('plugins/typescript.js');
	$import('plugins/handlebars.js');
	$import('plugins/package.js');
	$import('plugins/vue.js');
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