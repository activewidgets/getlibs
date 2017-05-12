
(function(){

	var registered, configured, startup = [];


	function init(){
		if (registered && configured){
			startup.forEach(function(name){
				SystemJS.import(name);
			});
		}
	}


	function registerModules(){

		var content = {};

		function fetch(load){
			load.source = content[load.name];
			return content[load.name];
		}

		SystemJS.registerDynamic('tag-loader', [], false, function(require, exports, module) {
			exports.fetch = fetch;
		});


		var i, scripts = document.querySelectorAll('script[type="x-module"]');

		for(i=0; i<scripts.length; i++) {

			var el = scripts[i],
				attr = el.getAttribute('name'),
				lang = el.getAttribute('lang'),
				source = el.innerHTML;
				ext = lang || 'js';
				name = attr || './script' + (i+1) + '.' + ext,
				full = SystemJS.normalizeSync(name),
				meta = {};

			if (lang == 'ts') {
				SystemJS.config({transpiler: 'ts'});
			}

			if (!attr && source.match(/\bimport\b|\bexport\b/)){

				if (SystemJS.transpiler == 'ts'){
					SystemJS.import('ts');
					SystemJS.import('typescript');
				}
				else if (SystemJS.transpiler == 'plugin-babel') {
					SystemJS.import('plugin-babel');
					SystemJS.import('systemjs-babel-build');
				}
			}

			content[full] = source;

			meta[name] = {
				loader: 'tag-loader'
			};

			SystemJS.config({
				meta: meta
			});

			if (!attr){
				startup.push(name);
			}
		}

		registered = true;

		init();
	}


	function load(url, fn){

		var xhr = new XMLHttpRequest();

		xhr.open('GET', url);

		xhr.onreadystatechange = function(){

			if (xhr.readyState == 4){

				if (xhr.responseText){
					fn(JSON.parse(xhr.responseText));
				}
				else {
					throw new Error('Cannot load file: ' + url);
				}
			}
		};

		xhr.send(null);
	}


	load('https://api.cdnjs.com/libraries', function(res){

		var pathRegExp = /^(.+\/ajax\/libs\/[^\/]+\/[^\/]+)\/(.+)$/;

		var i, k, map = {}, packages = {}, item, path, filename, items = res.results, defined = SystemJS.map;

		for(i=0; i<items.length; i++){

			item = items[i];

			if (!defined[item.name] && String(item.latest).match(pathRegExp)){

				path = RegExp.$1;
				filename = RegExp.$2;

				packages[path] = {
					main: filename,
					defaultExtension: 'min.js'
				};

				map[item.name] = path;
			}
		}

		SystemJS.config({
			packages: packages,
			map: map
		});

		configured = true;

		init();
	});


	document.addEventListener('DOMContentLoaded', registerModules, true);

})();
