
define('vue-loader', ['vue-content'], function(content){

	function translate(load){

		var address = load.address;

		content[address] = load.source;

		var source = 'module.exports = require(' + JSON.stringify(address + '-js') + ');\n';
		source += 'module.exports = module.exports.default || module.exports;';
		source += 'module.exports.template = require(' + JSON.stringify(address + '-html') + ');\n';
		source += 'require(' + JSON.stringify(address + '-css') + ');\n';

		return source;
	}


	return {
		translate: translate
	};
});


define('vue-js', ['vue-content'], function(content){

	function fetch(load){

		var address = load.address.replace(/-js$/, ''),
			text = content[address],
			source = 'module.exports = {}';

		if (String(text).match(/<script[^>]*>([\s\S]*)<\/script>/)){
			source = RegExp.$1;
		}

		load.source = source;
		return source;
	}

	return {
		fetch: fetch
	};
});


define('vue-html', ['vue-content'], function(content){

	function fetch(load){

		var address = load.address.replace(/-html$/, ''),
			text = content[address],
			source = 'module.exports = ""';

		if (String(text).match(/<template[^>]*>([\s\S]*)<\/template>/)){
			source = 'module.exports = ' + JSON.stringify(RegExp.$1);
		}

		return source;
	}

	return {
		fetch: fetch
	};
});


define('vue-css', ['vue-content'], function(content){

	function fetch(load){

		var address = load.address.replace(/-css$/, ''),
			text = content[address],
			source = '';

		if (String(text).match(/<template[^>]*>([\s\S]*)<\/template>/)){

			var style = RegExp.$1,
				el = document.createElement('style');

			if (el.styleSheet) {
				el.styleSheet.cssText = style;
			}
			else {
				el.appendChild(document.createTextNode(style));
			}

			document.head.appendChild(el);
		}

		return source;
	}


	return {
		fetch: fetch
	};
});


define('vue-content', [], function(){
	return {};
});


config({
	meta: {
		'*.vue-js': {loader: 'vue-js'},
		'*.vue-html': {loader: 'vue-html'},
		'*.vue-css': {loader: 'vue-css'},
		'*.vue': {loader: 'vue-loader'}
	}
});
