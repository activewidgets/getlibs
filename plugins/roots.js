
define('getlibs/plugins/roots', [], function(){

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
			config({packages: packages});
			roots.push(root);
		}
	}


	function fetch(load, fallback){

		defineRoots(String(load.address));

		return fallback(load);
	}


	return {
		fetch: fetch
	};
});

