
SystemJS.amdDefine('getlibs/plugins/index', [], function(){

	function build(base){

		var loader = {};

		Object.keys(base).forEach(function(i){
			loader[i] = base[i];
		});


		loader.fetch = function(load, defaultFetch){

			function proceed(source){
				load.source = source;
				return source;
			}

			function retry(err){

				var address = load.address,
					index = address.replace(/\.(ts|js)$/, '/index.$1'),
					ext = RegExp.$1,
					path = JSON.stringify(index),
					source = (ext == 'ts') ?
						'export * from' + path :
						'module.exports = require(' + path + ')';

				function redirect(){
					load.source = source;
					return source;
				}

				if (address.match(/\.(ts|js)$/) && !address.match(/index\.(ts|js)$/)){
					return System.import(index).then(redirect);
				}

				throw err;
			}


			var result = base.fetch ? base.fetch(load, defaultFetch) : defaultFetch(load);

			return Promise.resolve(result).then(proceed, retry);
		}

		return loader;
	}


	function skip(){
		return ''
	}


	function instantiate(load){
		return System.import(load.address).then(build);
	}


	return {
		fetch: skip,
		instantiate: instantiate
	};
});

