
(function(){

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
	}


	var cdnReady = System.import('https://api.cdnjs.com/libraries!json').then(processCDN);

	var _import = System.import;

	System.import = function(name, context){

		function load(){
			return _import.call(System, name, context);
		}

		return name.match(/getlibs\/(loader|plugins)\/json$/) ? load() : cdnReady.then(load);
	};

})();
