
SystemJS.amdDefine('getlibs/plugins/cached', [], function(){


	function fetch(){
		return ''
	}


	function instantiate(base){

		function transpiler(loader, load, traceOpts){
			return System.import(base.address).then(function(plugin){
				return plugin.translate.call(loader, load, traceOpts);
			});
		}

		function translate(load, traceOpts){

			var source = load.source,
				address = load.address,
				name = base.address.replace(/^.+(plugin-\w+).+$/, '$1'),
				sourceKey = 'getlibs\t' + name + '\tsource\t' + address,
				transpiledKey = 'getlibs\t' + name + '\ttranspiled\t' + address,
				sourceMapKey = 'getlibs\t' + name + '\tsourcemap\t' + address;

			if (localStorage.getItem(sourceKey) === source){
				load.metadata.sourceMap = JSON.parse(localStorage.getItem(sourceMapKey));
				return localStorage.getItem(transpiledKey);
			}

			return transpiler(this, load, traceOpts).then(function(transpiled){
				localStorage.setItem(sourceKey, source);
				localStorage.setItem(transpiledKey, transpiled);
				localStorage.setItem(sourceMapKey, JSON.stringify(load.metadata.sourceMap));
				return transpiled;
			});
		}

		return {
			translate: translate
		};
	}


	return {
		fetch: fetch,
		instantiate: instantiate
	};
});
