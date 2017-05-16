
SystemJS.amdDefine('getlibs/plugins/babel', [], function(){

	function babel(loader, load, traceOpts){
		return System.import('plugin-babel').then(function(plugin){
			return plugin.translate.call(loader, load, traceOpts);
		});
	}


	function translate(load, traceOpts){

		var source = load.source,
			address = load.address,
			sourceKey = 'getlibs\tbabel\tsource\t' + address,
			transpiledKey = 'getlibs\tbabel\ttranspiled\t' + address,
			sourceMapKey = 'getlibs\tbabel\tsourcemap\t' + address;

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
