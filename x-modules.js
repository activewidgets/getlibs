
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
				name = attr || 'tag-' + i + '.js',
				full = SystemJS.normalizeSync(name),
				meta = {};

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
