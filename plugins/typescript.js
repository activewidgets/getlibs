
SystemJS.amdDefine('getlibs/plugins/typescript', [], function(){

	function babel(loader, load, traceOpts){
		return System.import('plugin-typescript').then(function(plugin){
			return plugin.translate.call(loader, load, traceOpts);
		});
	}


	function translate(load, traceOpts){

		var source = load.source,
			address = load.address,
			sourceKey = 'getlibs\ttypescript\tsource\t' + address,
			transpiledKey = 'getlibs\ttypescript\ttranspiled\t' + address,
			sourceMapKey = 'getlibs\ttypescript\tsourcemap\t' + address;

		if (localStorage.getItem(sourceKey) === source){
			load.metadata.sourceMap = JSON.parse(localStorage.getItem(sourceMapKey));
			return localStorage.getItem(transpiledKey);
		}

		return babel(this, load, traceOpts).then(function(transpiled){
			localStorage.setItem(sourceKey, source);
			localStorage.setItem(transpiledKey, transpiled);
			localStorage.setItem(sourceMapKey, JSON.stringify(load.metadata.sourceMap));
			return transpiled;
		});
	}


	return {
		translate: translate
	};
});
