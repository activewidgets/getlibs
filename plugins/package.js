
define('getlibs/loader/package', [], function(){

	function fetch(){
		return ''
	}

	var packages = SystemJS.packages;

	function package(address){

		var i, name, parts = address.split('/');

		for(i=parts.length; i>2; --i){
			name = parts.slice(0, i).join('/');
			if (name in packages){
				return name;
			}
		}
	}


	function property(address, loadAddress){

		return function(value){

			var path = address.replace(/^.*\//, '');

			if (path == '@@'){
				return value;
			}

			if (path == '*'){
				path = loadAddress.replace(/^.+\/(\w+)\.js$/, '$1');
			}

			path &&	path.split('.').forEach(function(name){
				value = value[name];
			});

			return value;
		};
	}

	function instantiate(plugin){
		return {
			fetch: fetch,
			instantiate: function(load){
				return System.import(package(load.address)).then(property(plugin.address, load.address));
			}
		};
	}

	return {
		fetch: fetch,
		instantiate: instantiate
	}
});
