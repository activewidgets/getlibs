
define('getlibs/plugins/cached', ['../src/idb'], function(db){

	function wrap(load, translate){

		var loader = this,
			source = load.source,
			address = load.address;


		function save(result){

			var item = {
				input: source,
				result: result,
				sourceMap: load.metadata.sourceMap
			};

			return db.set(address, item).then(function(){
				return result;
			});
		}


		function compare(item){

			if (item && item.input == source){
				load.metadata.sourceMap = item.sourceMap;
				return item.result;
			}

			return translate.call(loader, load).then(save);
		}


		return db.get(address).then(compare);
	}

	return {
		wrap: wrap
	};
});
