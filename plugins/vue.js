
define('vue-loader', ['vue-content'], function(content){

	function translate(load){

		var address = load.address,
			ext = SystemJS.resolveSync('./aaaa', address).match(/\.ts$/) ? '-ts' : '-js';

		content[address] = load.source;

		var source = 'module.exports = require(' + JSON.stringify(address + ext) + ');\n';
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

		var address = load.address.replace(/-.s$/, ''),
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

		if (String(text).match(/<style[^>]*>([\s\S]*)<\/style>/)){

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


define.loader('vue-ts', [
	'vue-js',
	'plugins/cached',
	'plugins/typescript'
]);


config({
	meta: {
		'*.vue-js': {loader: 'vue-js'},
		'*.vue-ts': {loader: 'vue-ts'},
		'*.vue-html': {loader: 'vue-html'},
		'*.vue-css': {loader: 'vue-css'},
		'*.vue': {loader: 'vue-loader'}
	}
});
