
(function(){

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


	function isDefault(name){
		return name.match(/\.js$|[^\.\w]\w*$/);
	}


	function registerModules(){

		var i, meta = {}, start = [], scripts = document.querySelectorAll('script[type="x-module"]');

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

			if (isDefault(name)){
				meta[full] = {
					loader: defaultLoader
				};
			}

			if (!attr){
				start.push(name);
			}
		}

		SystemJS.config({
			meta: meta
		});

		start.forEach(function(name){
			SystemJS.import(name);
		});
	}


	document.addEventListener('DOMContentLoaded', registerModules, true);

})();
