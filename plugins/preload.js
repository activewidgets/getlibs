
SystemJS.amdDefine('getlibs/plugins/preload', [], function(){

	var map = System.preload.map;

	var defer = function(fn){
		var channel = new MessageChannel();
		channel.port1.onmessage = fn;
		channel.port2.postMessage(0);
	};

	if (!window.MessageChannel){
		defer = setTimeout;
	}

	function timeout(value){
		return new Promise(function(resolve){
			defer(function(){
				resolve(value);
			}, 0);
		});
	}


	return function(url){
		return function(result){

			var prev = map[url];

			if (!prev) {
				return result;
			}

			return System.import(prev).then(timeout).then(function(){
				return result;
			});
		};
	};
});


System.preload = function(items){

	var i, prev, item, map = System.preload.map;

	for(i=0; i<items.length; i++){
		item = System.normalizeSync(items[i]);
		map[item] = prev;
		prev = item;
		System.import(item);
	}
};

System.preload.map = {};