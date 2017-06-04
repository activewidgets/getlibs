
define('getlibs/plugins/cached', ['getlibs/plugins/idb'], function(db){


	function fetch(){
		return ''
	}


	function instantiate(base){

		var transpilerLoaded;

		function transpiler(loader, load, traceOpts){
			return System.import(base.address).then(function(plugin){
				return plugin.translate.call(loader, load, traceOpts);
			});
		}

		function translate(load, traceOpts){

			var source = load.source,
				address = load.address,
				name = base.address.replace(/^.+plugins.(.+)/, '$1');

			if (!transpilerLoaded && address.match(/\.ts$/)){
				System.import(base.address);
				transpilerLoaded = true;
			}


			function save(result){

				var item = {
					input: source,
					result: result,
					sourceMap: load.metadata.sourceMap,
					transpiler: name
				};

				return db.set(address, item).then(function(){
					return result;
				});
			}


			function compare(item){

				if (item && item.input == source && item.transpiler == name){
					load.metadata.sourceMap = item.sourceMap;
					return item.result;
				}

				return transpiler(this, load, traceOpts).then(save);
			}


			return db.get(address).then(compare);
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
