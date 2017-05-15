
SystemJS.amdDefine('getlibs/loader/package', [], function(){

	function fetch(){
		return ''
	}

	function package(address){

		var i, name, parts = address.split('/');

		for(i=parts.length; i>2; --i){
			name = parts.slice(0, i).join('/');
			if (SystemJS.packages[name]){
				return name;
			}
		}
	}


	function property(address){

		return function(value){

			var path = address.replace(/^.*\//, '');

			if (path == '@@'){
				return value;
			}

			path &&	path.split('.').forEach(function(name){
				value = value[name];
			});

			return value;
		};
	}

	function instantiate(xyz){
		return {
			fetch: fetch,
			instantiate: function(load){
				return System.import(package(load.address)).then(property(xyz.address));
			}
		};
	}

	return {
		fetch: fetch,
		instantiate: instantiate
	}
});
