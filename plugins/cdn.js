
(function(){

	function replaceAddr(addr, map){

		if (!addr.match(/^cdn:([^\/]+)(.*?)$/)){
			return addr;
		}

		var name = RegExp.$1, tail = RegExp.$2, item = map[name];

		if (!item || !item.match(/^(.+\/ajax\/libs\/[^\/]+\/[^\/]+)\/(.+)$/)){
			return addr;
		}

		return RegExp.$1 + tail;
	}


	function processCDN(res){

		var map = {};

		if (Array.isArray(res.results)){
			res.results.forEach(function(item){
				map[item.name] = item.latest;
			});
		}


		var xpackages = SystemJS.packages, packages = {};

		Object.keys(xpackages).forEach(function(key){

			if (key.substr(0, 4) == 'cdn:'){
				packages[replaceAddr(key, map)] = xpackages[key];
			}
		});


		var xmap = SystemJS.map, map2 = {};

		Object.keys(xmap).forEach(function(key){

			if (xmap[key].substr(0, 4) == 'cdn:'){
				map2[key] = replaceAddr(xmap[key], map);
			}
			else if (map[key]){
				map2[key] = xmap[key];
			}
		});


		Object.keys(map2).forEach(function(key){
			map[key] = map2[key];
		});

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
