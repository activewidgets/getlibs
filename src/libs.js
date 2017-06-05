
/* eslint no-unused-vars: "off" */

function define(){
	return SystemJS.amdDefine.apply(SystemJS, arguments);
}

function config(){
	return SystemJS.config.apply(SystemJS, arguments);
}


define.loader = function(name, plugins){

	function merge(result, plugin){

		var _fetch = result.fetch,
			_translate = result.translate;

		function fetch(load, fallback){

			var loader = this;

			function _fallback(){
				return _fetch.call(loader, load, fallback);
			}

			return plugin.fetch.call(loader, load, _fallback);
		}


		function translate(load){

			var loader = this,
				result = plugin.translate.call(loader, load);

			return Promise.resolve(result).then(function(source){

				if (typeof source == 'string'){
					load.source = source;
				}

				return _translate.call(loader, load);
			});
		}


		function wrap(load){
			return plugin.wrap.call(this, load, _translate);
		}


		if (plugin.fetch){
			result.fetch = _fetch ? fetch : plugin.fetch;
		}

		if (plugin.translate){
			result.translate = _translate ? translate : plugin.translate;
		}

		if (plugin.wrap){
			result.translate = wrap;
		}
	}


	define(name, plugins, function(){

		var i = arguments.length, result = {};

		while(--i >= 0){
			merge(result, arguments[i]);
		}

		return result;
	});
};