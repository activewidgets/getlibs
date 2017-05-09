
(function(){

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

			var el = scripts[i];
				attr = el.getAttribute('name'),
				lang = el.getAttribute('lang'),
				ext = lang || 'js';
				name = attr || './script' + (i+1) + '.' + ext,
				full = SystemJS.normalizeSync(name),
				meta = {};

			if (lang && !attr){
				SystemJS.config({transpiler: lang});
			}

			content[full] = el.innerHTML;

			meta[name] = {
				loader: 'tag-loader'
			};

			SystemJS.config({
				meta: meta
			});

			if (!attr){
				SystemJS.import(name);
			}
		};
	}

	document.addEventListener('DOMContentLoaded', registerModules, true);

})();
