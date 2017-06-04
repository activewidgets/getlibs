
define('getlibs/plugins/index', [], function(){

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


	function fileAccessWarning(){
		/* eslint no-console: "off" */
		console.warn("Allow file access when running directly from files: http://getlibs.com/allow-file-access.html");
	}


	function build(base){

		var loader = {};

		Object.keys(base).forEach(function(i){
			loader[i] = base[i];
		});


		var loadingFromFiles = (location.protocol == 'file:'),
			fileAccessAllowed;


		loader.fetch = function(load, defaultFetch){

			defineRoots(String(load.address));

			function proceed(source){

				if (load.address.indexOf('file:') == 0){
					fileAccessAllowed = true;
				}

				load.source = source;
				return source;
			}

			function retry(err){

				if (loadingFromFiles && !fileAccessAllowed){
					setTimeout(fileAccessWarning, 100);
					throw new Error('No access to files or wrong path: ' + load.address);
				}

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

