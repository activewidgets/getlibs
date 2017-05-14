
(function(){

	var registered, configured, startup = [];


	function init(){
		if (registered && configured){
			startup.forEach(function(name){
				SystemJS.import(name);
			});
		}
	}

	var defaultLoader = 'getlibs/loader/default';

	var content = {}, loaders = {'default': defaultLoader};

	function localfetch(load, fetch){

		var name = String(load.name).replace(/!.+$/,'');

		if (content[name]){
			load.source = content[name];
			return content[name];
		}

		var base = Object.getPrototypeOf(this);

		if (base.fetch){
			return base.fetch.apply(this, arguments);
		}

		return fetch(load);
	}

	SystemJS.amdDefine(defaultLoader, [], function(){
		return {
			fetch: localfetch
		};
	});


	function tagLoader(base){
		var loader = Object.create(base);
		loader.fetch = localfetch;
		return loader;
	}


	function registerLoader(name){

		var xname = 'getlibs/loader/' + name,
			basename = SystemJS.normalizeSync(name),
			map = {};

		map[name] = xname;

		SystemJS.amdDefine(xname, [basename], tagLoader);
		SystemJS.config({map: map});

		return xname;
	}


	function makeLoader(name){

		if (!loaders[name]){
			loaders[name] = registerLoader(name);
		}

		return loaders[name];
	}


	Object.keys(SystemJS.meta).forEach(function(key){

		var meta = SystemJS.meta[key],
			name = meta && meta.loader;

		name && makeLoader(name);
	});


	function preloadTranspiler(lang){

		if (lang == 'ts'){
			SystemJS.import('ts');
			SystemJS.import('typescript');
		}
		else if (!lang && SystemJS.transpiler == 'plugin-babel') {
			SystemJS.import('plugin-babel');
			SystemJS.import('systemjs-babel-build');
		}
	}


	function isDefault(name){
		return name.match(/\.js$|[^\.\w]\w*$/);
	}


	function registerModules(){

		var i, meta = {}, scripts = document.querySelectorAll('script[type="x-module"]');

		for(i=0; i<scripts.length; i++) {

			var el = scripts[i],
				attr = el.getAttribute('name'),
				lang = el.getAttribute('lang'),
				src = el.getAttribute('src'),
				source = el.innerHTML,
				ext = lang || 'js',
				name = attr || './script' + (i+1) + '.' + ext,
				full = SystemJS.normalizeSync(name);

			if (src){
				SystemJS.import(src); // lang?
				continue;
			}

			content[full] = source;

			if (lang=='ts' || (!lang && source.match(/\bimport\b|\bexport\b/))){
				preloadTranspiler(lang);
			}

			if (isDefault(name)){
				meta[full] = {
					loader: defaultLoader
				};
			}

			if (!attr){
				startup.push(name);
			}
		}

		SystemJS.config({
			meta: meta
		});

		registered = true;

		init();
	}


	function processCDN(res){

		var pathRegExp = /^(.+\/ajax\/libs\/[^\/]+\/[^\/]+)\/(.+)$/;

		var i, map = {}, packages = {}, item, path, filename, items = res.results, defined = SystemJS.map;

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
	}


	var cdnReady = System.import('https://api.cdnjs.com/libraries!json').then(processCDN);


	document.addEventListener('DOMContentLoaded', registerModules, true);

})();
