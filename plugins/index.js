
SystemJS.amdDefine('getlibs/plugins/index', [], function(){

	var roots = ['https://unpkg.com/', 'https://cdnjs.cloudflare.com/'];

	function defineRoots(url){

		var i, root;

		for(i=0; i<roots.length; i++){

			root = roots[i];

			if (url.substr(0, root.length) == root){
				return;
			}
		}

		if (!url.match(/\.(ts|js)$/)){
			return;
		}

		var ext = RegExp.$1,
			packages = {};


		if (!System.resolveSync('./aaaa', url).match(/\.(ts|js)$/)){
			root = System.resolveSync('.', url);
			packages[root] = {defaultExtension: ext};
			System.config({packages: packages});
			roots.push(root);
		}
	}


	function build(base){

		var loader = {};

		Object.keys(base).forEach(function(i){
			loader[i] = base[i];
		});


		loader.fetch = function(load, defaultFetch){

			defineRoots(String(load.address));

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

				if (address.match(/\.(ts|js)$/) && !address.match(/index\.(ts|js)$/)){
					load.source = source;
					return source;
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

